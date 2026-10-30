/*
关键逻辑说明：
1. 所有内容来自 config.js，使用 textContent 写入，避免把文案当 HTML 执行。
2. 桌面悬停/键盘聚焦切换预载图片；缺少状态图时保留默认图并高亮真实按钮。
3. 触屏首击预览、再次点按打开；长按只预览，移动手指会取消长按，避免抢占滚动。
4. 原生 dialog 提供焦点约束与 Escape；关闭后焦点回到对应卷轴。
5. 视频静音自动播放受浏览器策略限制，失败时显示播放按钮；缺失时保留封面。
6. 无眼球追踪或 WebGL 依赖。轻量 CSS 视差可关闭，也尊重系统减少动态的偏好。
*/
(() => {
  'use strict';
  const C = window.PORTFOLIO_CONFIG;
  if (!C) return;
  const $ = id => document.getElementById(id);
  const put = (id, value) => { $(id).textContent = value || ''; };
  const node = (tag, className, text) => {
    const el = document.createElement(tag);
    if (className) el.className = className;
    if (text !== undefined) el.textContent = text;
    return el;
  };
  // 仅允许站内相对路径、HTTP(S) 及邮件链接，不允许配置注入脚本 URL。
  function safeURL(value) {
    if (typeof value !== 'string' || !value.trim()) return '';
    if (/^(javascript|data|vbscript):/i.test(value.trim())) return '';
    try {
      const url = new URL(value, location.href);
      return ['http:', 'https:', 'file:', 'mailto:'].includes(url.protocol) ? value : '';
    } catch { return ''; }
  }
  const systemMotion = matchMedia('(prefers-reduced-motion: reduce)');
  const coarse = matchMedia('(hover: none), (pointer: coarse)');
  const touchCapable = () => coarse.matches || navigator.maxTouchPoints > 0;
  let reduced = systemMotion.matches;
  let motionOverride = false;
  let isIntro = true;
  let activeId = 'idle';
  let selectedTouch = '';
  let lastTrigger = null;
  let closing = false;
  let raf = 0;
  let refreshAtmosphere = () => {};
  const images = new Map();
  const buttons = new Map();
  const dialog = $('detail');
  const video = $('intro-video');

  document.title = C.ui.pageTitle;
  document.querySelector('meta[name="description"]').content = C.ui.description;
  put('intro-name', C.profile.name);
  put('intro-kicker', C.intro.kicker);
  put('intro-title', C.intro.title);
  put('intro-description', C.intro.description);
  $('enter').firstElementChild.textContent = C.intro.button;
  put('skip-intro', C.intro.skip);
  put('play-video', C.intro.play);
  put('replay', C.intro.replay);
  put('brand', C.profile.name);
  put('subtitle', C.profile.subtitle);
  put('scene-title', C.profile.name + ' — ' + C.profile.subtitle);
  put('scene-name-mobile', C.profile.name);
  put('motto', C.profile.motto);
  put('beyond', C.ui.moreExperiences + ' ↗');
  put('education', C.profile.education);
  put('education-previous', C.profile.educationPrevious);
  put('about-kicker', C.ui.about);
  put('headline', C.profile.headline);
  put('bio', C.profile.bio);
  put('skills-label', C.ui.skillsTitle);
  put('footer-text', C.ui.footer);
  put('footer-name', C.profile.name);
  $('awards').children[1].textContent = C.ui.awards;
  $('close-detail').setAttribute('aria-label', C.ui.close);
  $('scroll-nav').setAttribute('aria-label', C.ui.navigation);
  $('intro-poster').src = safeURL(C.intro.poster) || safeURL(C.scene.images.idle);
  C.ui.skills.forEach(skill => $('skills').append(node('li', '', skill)));

  function setupLink(id, text, url) {
    const el = $(id), href = safeURL(url);
    el.textContent = text;
    el.hidden = !href;
    if (href) el.href = href;
  }
  setupLink('contact', C.ui.contact + ' ↗', 'mailto:' + C.profile.email);
  setupLink('cv', C.ui.download + ' ↓', C.profile.cvUrl);
  $('cv').setAttribute('download', 'Yixin_Yuan_CV.pdf');
  setupLink('github-profile', C.ui.github, C.profile.githubUrl);
  $('github-profile').target = '_blank';
  $('github-profile').rel = 'noopener noreferrer';
  setupLink('research-plan', C.ui.researchPlan + ' ↗', C.profile.proposalUrl);
  $('research-plan').target = '_blank';
  $('research-plan').rel = 'noopener noreferrer';

  function updateMotion() {
    document.body.classList.toggle('reduce-motion', reduced);
    $('motion').textContent = reduced ? C.ui.motionOff : C.ui.motionOn;
    $('motion').setAttribute('aria-pressed', String(reduced));
    $('stage').style.setProperty('--rx', '0deg');
    $('stage').style.setProperty('--ry', '0deg');
    if (reduced) video.pause();
    refreshAtmosphere();
  }
  $('motion').addEventListener('click', () => { motionOverride = true; reduced = !reduced; updateMotion(); });
  systemMotion.addEventListener('change', event => { if (!motionOverride) { reduced = event.matches; updateMotion(); } });
  updateMotion();
  function hint() { put('scene-hint', touchCapable() ? C.ui.touchHint : C.ui.desktopHint); }
  coarse.addEventListener('change', hint); hint();

  // 同时预载小量定帧，快速切换时只显示最近选择；未就绪图片不会把画面清空。
  Object.entries(C.scene.images).forEach(([id, path]) => {
    if (!safeURL(path)) return;
    const img = node('img', 'scene-image');
    img.alt = ''; img.decoding = 'async'; img.draggable = false;
    if (id === 'idle') img.fetchPriority = 'high';
    img.addEventListener('load', () => { img.dataset.ready = 'true'; drawScene(); });
    img.addEventListener('error', () => { img.dataset.failed = 'true'; img.classList.remove('is-active'); drawScene(); });
    images.set(id, img); $('scene-images').append(img); img.src = path;
  });
  function drawScene() {
    let selected = images.get(activeId);
    if (!selected || selected.dataset.ready !== 'true') selected = images.get('idle');
    if (!selected || selected.dataset.ready !== 'true') selected = [...images.values()].find(image => image.dataset.ready === 'true');
    images.forEach(image => image.classList.toggle('is-active', image === selected));
    $('stage').dataset.scene = activeId;
  }
  function preview(id) {
    activeId = id;
    drawScene();
    buttons.forEach((button, key) => button.classList.toggle('is-selected', key === id));
  }
  function resetPreview() {
    if (dialog.open) return;
    selectedTouch = '';
    preview('idle');
  }

  C.cards.filter(card => C.scene.hotspots[card.id]).forEach(card => {
    const button = node('button', 'scroll-button');
    const hotspot = C.scene.hotspots[card.id];
    button.type = 'button'; button.dataset.card = card.id;
    button.setAttribute('aria-label', card.label);
    button.setAttribute('aria-haspopup', 'dialog');
    button.setAttribute('aria-expanded', 'false');
    button.style.setProperty('--x', hotspot.x + '%');
    button.style.setProperty('--y', hotspot.y + '%');
    button.style.setProperty('--w', hotspot.width + '%');
    button.style.setProperty('--h', hotspot.height + '%');
    button.append(node('span', 'scroll-number', card.number), node('span', 'scroll-label', card.label), node('span', 'scroll-arrow', '↗'));
    $('scroll-nav').append(button); buttons.set(card.id, button);
    wireTrigger(button, card.id, true);
  });
  $('awards').setAttribute('aria-haspopup', 'dialog');
  $('awards').setAttribute('aria-expanded', 'false');
  wireTrigger($('awards'), 'awards', false);
  // 扩展经历与研究计划分别提供入口，保持原有四张卷轴的图片和位置不变。
  $('beyond').setAttribute('aria-haspopup', 'dialog');
  $('beyond').setAttribute('aria-expanded', 'false');
  wireTrigger($('beyond'), 'beyond', false);

  function wireTrigger(button, id, touchPreview) {
    let timer = 0, start = null, longPressed = false, canceled = false, touchGesture = false;
    button.addEventListener('pointerenter', event => { if (event.pointerType === 'mouse') preview(id); });
    button.addEventListener('pointerleave', event => { clearTimeout(timer); if (event.pointerType === 'mouse') resetPreview(); });
    button.addEventListener('focus', () => { if (!touchCapable()) preview(id); });
    button.addEventListener('blur', () => { clearTimeout(timer); if (!dialog.open && !touchCapable()) resetPreview(); });
    button.addEventListener('pointerdown', event => {
      touchGesture = event.pointerType !== 'mouse';
      longPressed = false; canceled = false;
      if (!touchGesture || !touchPreview) return;
      start = {x: event.clientX, y: event.clientY};
      timer = setTimeout(() => { longPressed = true; selectedTouch = id; preview(id); }, C.scene.longPressMs || 480);
    });
    button.addEventListener('pointermove', event => {
      if (start && Math.hypot(event.clientX - start.x, event.clientY - start.y) > 12) { clearTimeout(timer); canceled = true; }
    });
    button.addEventListener('pointerup', () => { clearTimeout(timer); start = null; });
    button.addEventListener('pointercancel', () => { clearTimeout(timer); start = null; canceled = true; });
    button.addEventListener('contextmenu', event => { if (touchGesture) event.preventDefault(); });
    button.addEventListener('click', event => {
      const keyboard = event.detail === 0;
      if (!keyboard && (canceled || longPressed)) { longPressed = false; return; }
      if (!keyboard && touchPreview && (touchGesture || coarse.matches) && selectedTouch !== id) {
        selectedTouch = id; preview(id); return;
      }
      openCard(id, button);
    });
  }
  document.addEventListener('pointerdown', event => {
    if (coarse.matches && !event.target.closest('.scroll-button') && !event.target.closest('#detail') && !dialog.open) resetPreview();
  });

  // 将纯数据渲染为语义化项目列表，不解析配置内 HTML。所有外链都使用安全协议检查。
  function renderProject(project) {
    const article = node('article', 'project');
    const meta = node('div', 'project-meta');
    meta.append(node('h3', '', project.title), node('time', '', project.date));
    article.append(meta, node('p', 'project-role', project.role));
    if (project.tags?.length) {
      const tags = node('div', 'tags'); project.tags.forEach(tag => tags.append(node('span', '', tag))); article.append(tags);
    }
    [['responsibilities', C.ui.responsibilities], ['outcomes', C.ui.outcomes]].forEach(([key, label]) => {
      if (!project[key]?.length) return;
      article.append(node('h4', '', label));
      const list = node('ul'); project[key].forEach(text => list.append(node('li', '', text))); article.append(list);
    });
    // 保留原有演示入口；links 可额外配置源码、论文等资料链接。
    const projectLinks = [...(project.link ? [project.link] : []), ...(project.links || [])];
    projectLinks.forEach(item => {
      if (!safeURL(item.url)) return;
      const link = node('a', 'project-link', item.label + ' ↗');
      link.href = safeURL(item.url); link.target = '_blank'; link.rel = 'noopener noreferrer'; article.append(link);
    });
    return article;
  }
  function openCard(id, trigger) {
    const card = C.cards.find(item => item.id === id);
    if (!card || dialog.open || closing) return;
    lastTrigger = trigger;
    preview(id);
    put('detail-number', C.ui.chapter + ' / ' + card.number);
    put('detail-subtitle', card.subtitle);
    put('detail-title', card.label);
    put('detail-intro', card.intro);
    $('detail-projects').replaceChildren(...card.projects.map(renderProject));
    // 弹窗从被点卷轴的方向展开；限制位移，避免小屏幕出现过大的飞入动画。
    const box = trigger.getBoundingClientRect();
    dialog.style.setProperty('--origin-x', Math.max(-100, Math.min(100, box.x + box.width / 2 - innerWidth / 2)) + 'px');
    dialog.style.setProperty('--origin-y', Math.max(-90, Math.min(90, box.y + box.height / 2 - innerHeight / 2)) + 'px');
    dialog.showModal(); dialog.scrollTop = 0;
    trigger.setAttribute('aria-expanded', 'true');
    document.body.classList.add('modal-open');
    refreshAtmosphere();
    $('main').inert = true;
    $('close-detail').focus({preventScroll: true});
  }
  function closeCard() {
    if (!dialog.open || closing) return;
    closing = true;
    dialog.classList.add('is-closing');
    setTimeout(() => {
      dialog.close(); dialog.classList.remove('is-closing'); closing = false;
      $('main').inert = false;
      document.body.classList.remove('modal-open');
      refreshAtmosphere();
      if (lastTrigger) { lastTrigger.setAttribute('aria-expanded', 'false'); lastTrigger.focus({preventScroll: true}); }
      resetPreview();
    }, reduced ? 0 : 220);
  }
  $('close-detail').addEventListener('click', closeCard);
  dialog.addEventListener('cancel', event => { event.preventDefault(); closeCard(); });
  // 只在按下与抬起都落在纸张外侧时关闭，拖选文字不会意外关窗。
  let backdropDown = false;
  dialog.addEventListener('pointerdown', event => { backdropDown = event.target === dialog; });
  dialog.addEventListener('click', event => { if (event.target === dialog && backdropDown) closeCard(); backdropDown = false; });

  function soundLabel() { put('sound', video.muted ? C.intro.soundOn : C.intro.soundOff); }
  async function playIntro() {
    if (!safeURL(C.intro.video) || !isIntro) return;
    try {
      await video.play();
      // 用户可能在视频加载期间点了跳过，避免晚到的 play() 恢复后台播放。
      if (!isIntro) { video.pause(); return; }
      $('play-video').hidden = true;
    }
    catch { if (isIntro && !video.error) $('play-video').hidden = false; }
  }
  if (safeURL(C.intro.video)) {
    // 只裁剪网页中的播放窗口，不改动原视频。cropTop 为顶部裁切比例，设为 0 可恢复。
    // 根据视频实际尺寸和窗口计算 contain 布局，手机仍完整显示人物，不会横向放大截断。
    const film = $('intro-film');
    const crop = Math.max(0, Math.min(.15, Number(C.intro.cropTop) || 0));
    function fitFilm() {
      const ratio = (video.videoWidth || 16) / (video.videoHeight || 10);
      const visibleRatio = ratio / (1 - crop);
      const width = Math.min($('intro').clientWidth, $('intro').clientHeight * visibleRatio);
      film.style.width = width + 'px';
      film.style.height = width / visibleRatio + 'px';
      video.style.height = (100 / (1 - crop)) + '%';
      video.style.top = (-100 * crop / (1 - crop)) + '%';
    }
    video.addEventListener('loadedmetadata', fitFilm);
    new ResizeObserver(fitFilm).observe($('intro'));
    fitFilm();
    $('intro').classList.toggle('has-video', C.intro.cinematic === true);
    video.muted = C.intro.muted !== false; video.defaultMuted = video.muted; video.autoplay = !reduced;
    video.hidden = false; video.poster = safeURL(C.intro.poster); video.src = C.intro.video;
    $('sound').hidden = false; soundLabel();
    video.addEventListener('error', () => {
      video.hidden = true; $('play-video').hidden = true; $('sound').hidden = true;
      $('intro').classList.remove('has-video'); // 失败后恢复介绍文案和进入按钮。
    });
    video.addEventListener('ended', () => { if (C.intro.enterOnEnd) enterMain(); else $('play-video').hidden = false; });
    video.addEventListener('pause', () => { if (isIntro && !video.error) $('play-video').hidden = false; });
    if (!reduced) playIntro(); else $('play-video').hidden = false;
  }
  $('play-video').addEventListener('click', playIntro);
  $('sound').addEventListener('click', () => { video.muted = !video.muted; soundLabel(); });
  function enterMain() {
    if (!isIntro) return;
    isIntro = false; video.pause();
    $('main').inert = false; $('main').classList.add('is-ready');
    $('intro').classList.add('is-leaving'); $('intro').inert = true;
    document.body.classList.remove('intro-open');
    refreshAtmosphere();
    $('brand').focus({preventScroll: true});
  }
  $('enter').addEventListener('click', enterMain);
  $('skip-intro').addEventListener('click', enterMain);
  $('replay').addEventListener('click', () => {
    isIntro = true; $('intro').inert = false; $('intro').classList.remove('is-leaving');
    $('main').inert = true; document.body.classList.add('intro-open');
    refreshAtmosphere();
    if (video.readyState > 0) video.currentTime = 0;
    $('play-video').hidden = !reduced || !!video.error;
    if (!reduced) playIntro();
    $('skip-intro').focus({preventScroll: true});
  });
  document.addEventListener('keydown', event => { if (event.key === 'Escape' && isIntro) enterMain(); });
  document.addEventListener('visibilitychange', () => { if (document.hidden) video.pause(); });
  document.body.classList.add('intro-open');

  $('stage').addEventListener('pointermove', event => {
    if (event.pointerType !== 'mouse' || reduced || !C.scene.parallax || touchCapable() || dialog.open || raf) return;
    raf = requestAnimationFrame(() => {
      const r = $('stage').getBoundingClientRect();
      const x = (event.clientX - r.left) / r.width - .5;
      const y = (event.clientY - r.top) / r.height - .5;
      $('stage').style.setProperty('--ry', (x * 1.2).toFixed(3) + 'deg');
      $('stage').style.setProperty('--rx', (-y * .8).toFixed(3) + 'deg');
      raf = 0;
    });
  });
  $('stage').addEventListener('pointerleave', () => {
    if (raf) { cancelAnimationFrame(raf); raf = 0; }
    $('stage').style.setProperty('--rx', '0deg'); $('stage').style.setProperty('--ry', '0deg');
  });

  // 海底星尘：一张透明 Canvas，30fps 上限；不另下载视频或 GIF。
  // 在开场、弹窗、离屏、后台及减少动态模式下暂停，避免持续占用手机电量。
  const atmosphere = $('atmosphere'), canvas = $('stardust');
  const ctx = canvas.getContext('2d');
  const options = C.scene.atmosphere || {};
  if (ctx && options.enabled !== false) {
    let w = 1, h = 1, particles = [], frame = 0, last = 0, phase = 0, inView = true;
    function resizeAtmosphere() {
      const rect = atmosphere.getBoundingClientRect();
      w = rect.width; h = rect.height;
      const dpr = Math.min(devicePixelRatio || 1, 1.5);
      canvas.width = Math.round(w * dpr); canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.min(100, Math.max(0, Number(coarse.matches ? options.mobileParticles ?? 28 : options.desktopParticles ?? 66)));
      particles = Array.from({length: count}, () => ({
        x: Math.random(), y: Math.random(), size: .6 + Math.random() * 1.5,
        speed: .006 + Math.random() * .012, seed: Math.random() * Math.PI * 2,
        warm: Math.random() > .72
      }));
    }
    function paint(now) {
      frame = requestAnimationFrame(paint);
      if (last && now - last < 1000 / 30) return;
      const dt = last ? Math.min((now - last) / 1000, .08) : 0;
      last = now; phase += dt;
      ctx.clearRect(0, 0, w, h);
      for (const p of particles) {
        p.y -= p.speed * dt;
        if (p.y < -.03) p.y = 1.03;
        const x = (p.x + Math.sin(phase * .16 + p.seed) * .018) * w;
        const y = p.y * h;
        // 姓名、人物脸部及卷轴区域降低亮度，动效服务于画面而不干扰阅读。
        const quiet = p.y < .20 || (p.x > .12 && p.x < .36 && p.y < .60) || (p.x > .53 && p.x < .70 && p.y < .73);
        const alpha = (.28 + .26 * Math.sin(phase * .55 + p.seed) ** 2) * (quiet ? .2 : 1);
        const rgb = p.warm ? '255,228,170' : '201,244,255';
        const glow = ctx.createRadialGradient(x,y,0,x,y,p.size * 5);
        glow.addColorStop(0, `rgba(${rgb},${alpha})`);
        glow.addColorStop(.22, `rgba(${rgb},${alpha * .55})`);
        glow.addColorStop(1, `rgba(${rgb},0)`);
        ctx.fillStyle = glow; ctx.beginPath(); ctx.arc(x,y,p.size * 5,0,Math.PI * 2); ctx.fill();
        ctx.fillStyle = `rgba(${rgb},${alpha})`; ctx.beginPath(); ctx.arc(x,y,p.size * .45,0,Math.PI * 2); ctx.fill();
      }
    }
    refreshAtmosphere = () => {
      const paused = reduced || isIntro || dialog.open || document.hidden || !inView;
      atmosphere.classList.toggle('is-paused', paused);
      if (paused) { cancelAnimationFrame(frame); frame = 0; last = 0; }
      else if (!frame) frame = requestAnimationFrame(paint);
      if (reduced) ctx.clearRect(0, 0, w, h);
    };
    new ResizeObserver(resizeAtmosphere).observe(atmosphere);
    new IntersectionObserver(entries => { inView = entries[0].isIntersecting; refreshAtmosphere(); }, {threshold: .05}).observe(atmosphere);
    document.addEventListener('visibilitychange', refreshAtmosphere);
    resizeAtmosphere(); refreshAtmosphere();
  } else atmosphere.hidden = true;
})();
