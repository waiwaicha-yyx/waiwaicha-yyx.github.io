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
  let activeId = C.scene.default || 'research';
  let selectedTouch = '';
  let lastTrigger = null;
  let closing = false;
  let raf = 0;
  let refreshAtmosphere = () => {};
  const images = new Map();
  const buttons = new Map();
  const dialog = $('detail');
  const video = $('intro-video');
  const directVideo = C.intro.mode === 'direct-video';
  $('intro').classList.toggle('direct-video', directVideo);
  $('intro').classList.toggle('unified-intro', C.intro.mode === 'unified-alpha');

  document.title = C.ui.pageTitle;
  document.querySelector('meta[name="description"]').content = C.ui.description;
  // 背景地址集中在配置里；同一海景用于开场、移动端及图片加载时的底图。
  const seaBackground = safeURL(C.scene.background);
  if (seaBackground) document.documentElement.style.setProperty('--ocean-background', 'url(' + JSON.stringify(seaBackground) + ')');
  $('mobile-character').src = safeURL(C.scene.mobileCharacter);
  put('intro-name', C.profile.name);
  put('intro-display-name', C.profile.name);
  put('intro-display-motto', C.profile.motto);
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
    // 原子切换：每帧至多显示一个人物，不交叉淡化两双脚。
    images.forEach(image => image.classList.toggle('is-active', image === selected));
    $('stage').dataset.pose = [...images].find(([, image]) => image === selected)?.[0] || '';
    $('stage').dataset.scene = activeId;
    updateBeam();
  }
  function preview(id) {
    if (!buttons.has(id)) return;
    activeId = id;
    drawScene();
    buttons.forEach((button, key) => button.classList.toggle('is-selected', key === id));
  }
  function resetPreview() {
    if (dialog.open) return;
    selectedTouch = '';
    // 保留最后选中的模块；离开按钮、关闭弹窗或点击空白均不重置。
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
    wireTrigger(button, card.id, false);
  });
  preview(activeId);
  // 开场使用同样的六个真实按钮；点击任意入口即可跳过动画并打开章节。
  $('intro-character').src = safeURL(C.intro.character);
  C.cards.filter(card => C.scene.hotspots[card.id]).forEach(card => {
    const b = buttons.get(card.id).cloneNode(true);
    const hit = directVideo && C.intro.directVideoHotspots?.[card.id];
    if (hit) Object.entries({x:hit.x,y:hit.y,w:hit.width,h:hit.height}).forEach(([key,value])=>b.style.setProperty('--'+key,value+'%'));
    b.removeAttribute('aria-expanded');
    b.addEventListener('click', () => { enterMain(); openCard(card.id, buttons.get(card.id)); });
    $('intro-scrolls').append(b);
  });
  new ResizeObserver(() => updateBeam()).observe($('stage'));
  // 人物尺寸只取决于舞台尺寸，绝不能由目标卷轴、光线角度或姿态决定。
  // 所有素材同为 1024×1536，保持同一个中心点、脚底锚点和等比缩放。
  function poseGeometry(pose, width, height, tx, ty, mobile) {
    if (mobile) {
      const scale = Math.min(width*.5/pose.size[0],295/pose.size[1]);
      return {scale,x:(width-pose.size[0]*scale)/2,y:120+(295-pose.size[1]*scale)/2};
    }
    const ground=height*C.scene.ground;
    const scale=height*.76/1536;
    return {scale,x:width/2-512*scale,y:ground-1516*scale};
  }
  // 光束沿镜头—卷轴中心的直线延伸至舞台边缘，不在卷轴处折弯或截断。
  function updateBeam() {
    const stage = $('stage'), beam = $('telescope-beam'), glow = $('lens-glow');
    if (!beam || C.scene.mode === 'reference-frames') return; // 六张参考图已包含与人物姿态一致的光束，不叠加第二束光。
    const target = buttons.get(activeId) || buttons.get('research');
    const poseId = stage.dataset.pose === 'idle' ? 'research' : stage.dataset.pose;
    const figure = images.get(stage.dataset.pose), pose = C.scene.poses[poseId];
    // 尚未载好目标姿态时不让旧人物发出指向新目标的光。
    beam.hidden = glow.hidden = !pose || poseId !== activeId;
    if (!pose) return;
    if (!target || !figure?.naturalWidth) return;
    const box = stage.getBoundingClientRect();
    const targetBox = target.getBoundingClientRect();
    const tx = targetBox.left + targetBox.width / 2 - box.left;
    const ty = targetBox.top + targetBox.height / 2 - box.top;
    const geometry=poseGeometry(pose,box.width,box.height,tx,ty,matchMedia('(max-width:760px)').matches);
    const {scale,x,y}=geometry;
    figure.style.cssText=`left:${x}px;top:${y}px;width:${pose.size[0]*scale}px;height:${pose.size[1]*scale}px`;
    const sx=x+pose.lens[0]*scale,sy=y+pose.lens[1]*scale;
    // 方向只来自望远镜前后端两个标定点。整束光是一条射线，既不分段也不独立追踪卷轴。
    // 光仍沿真实镜筒轴线出射，不用人物缩放去追逐按钮。
    const angle = Math.atan2(pose.lens[1]-pose.rear[1],pose.lens[0]-pose.rear[0]);
    const distance = Math.hypot(tx-sx,ty-sy);
    const length = Math.max(box.width,box.height)*1.5;
    // 在同一条直线两侧展开光锥，让目标保持在暖光范围内，不扭转镜筒。
    const miss=Math.abs((tx-sx)*Math.sin(angle)-(ty-sy)*Math.cos(angle));
    const height = length * Math.min(.72, Math.max(.22,(targetBox.height+2*miss)/Math.max(distance,100)));
    beam.style.cssText = `left:${sx}px;top:${sy-height/2}px;width:${length}px;height:${height}px;transform:rotate(${angle}rad)`;
    glow.style.left = sx+'px'; glow.style.top = sy+'px';
  }
  $('awards').setAttribute('aria-haspopup', 'dialog');
  $('awards').setAttribute('aria-expanded', 'false');
  wireTrigger($('awards'), 'awards', false);
  // 扩展经历与研究计划分别提供入口，保持原有四张卷轴的图片和位置不变。
  $('beyond').setAttribute('aria-haspopup', 'dialog');
  $('beyond').setAttribute('aria-expanded', 'false');
  wireTrigger($('beyond'), 'competition', false);
  const more = node('button', 'more-button', 'More experiences ↗');
  $('beyond').after(more); wireTrigger(more, 'beyond', false);

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
    meta.append(node('h3', project.singleLineTitle ? 'single-line-title' : '', project.title));
    if (project.date) meta.append(node('time', '', project.date));
    article.append(meta, node('p', 'project-role', project.role));
    // 爱好照片从配置加载；没有真实照片时显示明确占位，不冒用他人照片。
    if (project.photoSlot || project.photo) {
      const figure = node('figure', 'hobby-photo');
      const fallback = node('div', 'photo-placeholder', project.title + ' · Photo coming soon');
      figure.append(fallback);
      if (safeURL(project.photo)) {
        const photo = node('img'); photo.alt = project.photoAlt || project.title;
        photo.loading = 'lazy'; photo.src = safeURL(project.photo);
        photo.addEventListener('load', () => fallback.hidden = true);
        photo.addEventListener('error', () => photo.remove()); figure.append(photo);
      }
      if (project.photoCaption) figure.append(node('figcaption', '', project.photoCaption));
      article.append(figure);
    }
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
    dialog.dataset.card = id;
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

  const alpha = C.intro.alphaAnimation;
  const alphaCanvas = $('intro-alpha');
  const alphaContext = alphaCanvas.getContext('2d');
  let alphaSheets = [], alphaReady = false, alphaCallback = 0;
  alphaCanvas.width = alpha.width; alphaCanvas.height = alpha.height;
  function loadAlpha() { return Promise.all(alpha.sheets.map(path => new Promise((resolve,reject) => {
    const image = new Image(); image.onload = async () => {
      try { if(image.decode) await image.decode(); resolve(image); } catch(error) { reject(error); }
    }; image.onerror = reject;
    image.src = safeURL(path);
  }))).then(sheets => { if(!isIntro)return false; alphaSheets = sheets; alphaReady = true; return true; }).catch(() => false); }
  let prepareAlpha = directVideo ? null : loadAlpha();
  function paintAlpha() {
    if (!alphaReady || !alphaContext) return;
    // 原片末尾字幕压在帽子上；招手收尾后转入清晰持镜姿态，避免携带旧字幕及海浪残片。
    if (C.intro.endAt && video.currentTime >= C.intro.endAt && isIntro) { enterMain(); return; }
    const elapsed=Math.max(0,video.currentTime-(C.intro.startAt||0));
    const frame = Math.min(alpha.frameCount-1,Math.floor(elapsed*alpha.fps));
    const sheet = alphaSheets[Math.floor(frame/alpha.framesPerSheet)];
    const cell = frame%alpha.framesPerSheet;
    alphaContext.clearRect(0,0,alpha.width,alpha.height);
    const remaining=(C.intro.endAt||video.duration)-video.currentTime;
    // 人物单独渐入/渐出，海景和卷轴始终保持；先退场再显示静态人物，绝不重叠。
    alphaContext.globalAlpha=reduced?1:Math.max(0,Math.min(1,elapsed/.16,remaining/.2));
    alphaContext.drawImage(sheet,(cell%alpha.columns)*alpha.width,Math.floor(cell/alpha.columns)*alpha.height,alpha.width,alpha.height,0,0,alpha.width,alpha.height);
    alphaContext.globalAlpha=1;
  }
  function stopAlpha() {
    if (video.cancelVideoFrameCallback) video.cancelVideoFrameCallback(alphaCallback);
    else cancelAnimationFrame(alphaCallback);
    alphaCallback = 0;
  }
  function animateAlpha() {
    stopAlpha();
    function tick() {
      paintAlpha();
      if (video.paused || !isIntro || document.hidden) {alphaCallback=0;return;}
      alphaCallback = video.requestVideoFrameCallback ? video.requestVideoFrameCallback(tick) : requestAnimationFrame(tick);
    }
    tick();
  }
  function soundLabel() { put('sound', video.muted ? C.intro.soundOn : C.intro.soundOff); }
  async function playIntro() {
    if (!safeURL(C.intro.video) || !isIntro) return;
    if (!directVideo && !prepareAlpha) prepareAlpha = loadAlpha();
    const loaded = directVideo || await prepareAlpha;
    if (!isIntro || reduced) return;
    if (!loaded) { enterMain(); return; } // 抠图资源失败时直接进入静态场景，不回退到带旧背景的视频。
    try {
      if (video.ended || video.currentTime < (C.intro.startAt||0)) video.currentTime=C.intro.startAt||0;
      await video.play();
      if (!isIntro) {video.pause();return;}
      $('play-video').hidden=true;
    } catch {if(isIntro) $('play-video').hidden=false;}
  }
  video.muted = C.intro.muted !== false; video.defaultMuted = video.muted;
  video.autoplay=false;video.src=safeURL(C.intro.video);video.hidden=!directVideo;
  $('intro').classList.add('has-video');$('sound').hidden=false;soundLabel();
  video.addEventListener('playing',()=>{$('intro').classList.add('video-playing');if(!directVideo)animateAlpha();});
  video.addEventListener('seeked',paintAlpha);
  video.addEventListener('pause',()=>{stopAlpha();if(isIntro&&!video.ended)$('play-video').hidden=false;});
  // 新视频为完整场景：先让旧场景退场，再显示交互人物，绝不交叉叠加两双脚。
  let handoffTimer = 0;
  video.addEventListener('ended',()=>{
    stopAlpha();
    if (directVideo && !reduced && isIntro) {
      $('intro').classList.add('video-ending');
      handoffTimer=setTimeout(()=>{enterMain();$('main').classList.add('intro-arrival');},160);
    } else enterMain();
  });
  video.addEventListener('error',()=>{stopAlpha();enterMain();});
  $('play-video').addEventListener('click',()=>{if(reduced){reduced=false;motionOverride=true;updateMotion();}playIntro();});
  $('sound').addEventListener('click',()=>{video.muted=!video.muted;soundLabel();});
  if (!reduced) playIntro(); else $('play-video').hidden=false;
  function enterMain() {
    if (!isIntro) return;
    clearTimeout(handoffTimer);
    isIntro = false; video.pause(); stopAlpha();
    // 在显示主场景之前清空最终视频帧；同一个渲染帧内移交人物，杜绝脚部双曝光。
    alphaContext?.clearRect(0,0,alpha.width,alpha.height);
    $('intro').classList.remove('video-playing');
    alphaSheets = []; alphaReady = false; prepareAlpha = null; // 播完释放已解码的帧图，重播时从缓存重载。
    $('stage').classList.add('beam-ready');
    updateBeam();
    $('main').inert = false; $('main').classList.add('is-ready');
    if (!reduced) $('stage').classList.add('character-arrival');
    $('intro').classList.add('is-leaving'); $('intro').inert = true;
    document.body.classList.remove('intro-open');
    refreshAtmosphere();
    $('brand').focus({preventScroll: true});
  }
  $('enter').addEventListener('click', enterMain);
  $('skip-intro').addEventListener('click', enterMain);
  $('replay').addEventListener('click', () => {
    clearTimeout(handoffTimer);$('intro').classList.remove('video-ending');$('main').classList.remove('intro-arrival');
    $('stage').classList.remove('character-arrival');
    isIntro = true; $('intro').classList.remove('video-playing'); $('intro').inert = false; $('intro').classList.remove('is-leaving');
    $('main').inert = true; document.body.classList.add('intro-open');
    refreshAtmosphere();
    if (video.readyState > 0) video.currentTime = C.intro.startAt||0;
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
        const quiet = p.y < .18 || (p.x > .38 && p.x < .65 && p.y < .55) || ((p.x > .13 && p.x < .29 || p.x > .72 && p.x < .87) && p.y > .28 && p.y < .75);
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
      $('stage').classList.toggle('scene-paused', paused);
      $('intro-layout').classList.toggle('scene-paused', reduced || !isIntro || document.hidden);
      if (paused) { cancelAnimationFrame(frame); frame = 0; last = 0; }
      else if (!frame) frame = requestAnimationFrame(paint);
      if (reduced) ctx.clearRect(0, 0, w, h);
    };
    new ResizeObserver(resizeAtmosphere).observe(atmosphere);
    new IntersectionObserver(entries => { inView = entries[0].isIntersecting; refreshAtmosphere(); }, {threshold: .05}).observe(atmosphere);
    document.addEventListener('visibilitychange', refreshAtmosphere);
    resizeAtmosphere(); refreshAtmosphere();
  } else atmosphere.hidden = true;

  // 鼠标星尘与人物、光束完全独立：不移动任何布局元素，不拦截点击。
  // 只有鼠标移动才产生粒子，粒子消失后停止 RAF；后台、触屏及减少动态模式不运行。
  const trailOptions=C.scene.pointerTrail || {};
  if (trailOptions.enabled !== false) {
    const trail=node('canvas','pointer-stardust');trail.setAttribute('aria-hidden','true');
    document.body.append(trail);
    const ink=trail.getContext('2d');
    if (ink) {
      let stars=[],trailFrame=0,lastTime=0,lastPoint=null,lastSpawn=0;
      let width=innerWidth,height=innerHeight;
      const cap=Math.min(100,trailOptions.maxParticles||72);
      const lifetime=Math.max(200,Math.min(1200,trailOptions.lifetimeMs||650));
      const blocked=()=>reduced||coarse.matches||document.hidden||dialog.open;
      function clearTrail(){cancelAnimationFrame(trailFrame);trailFrame=0;stars=[];lastTime=0;lastPoint=null;ink.clearRect(0,0,width,height);}
      function sizeTrail(){clearTrail();width=innerWidth;height=innerHeight;const dpr=Math.min(devicePixelRatio||1,1.5);trail.width=Math.round(width*dpr);trail.height=Math.round(height*dpr);ink.setTransform(dpr,0,0,dpr,0,0);}
      function paintTrail(now){
        trailFrame=0;if(blocked()){clearTrail();return;}
        const dt=lastTime?Math.min((now-lastTime)/1000,.05):0;lastTime=now;
        ink.clearRect(0,0,width,height);
        stars=stars.filter(p=>now-p.born<lifetime);
        for(const p of stars){
          p.x+=p.vx*dt;p.y+=p.vy*dt;
          const life=1-(now-p.born)/lifetime,opacity=.65*life*life;
          const radius=p.size*(.6+.4*life),rgb=p.warm?'255,224,163':'188,241,255';
          const glow=ink.createRadialGradient(p.x,p.y,0,p.x,p.y,radius*5);
          glow.addColorStop(0,`rgba(${rgb},${opacity})`);glow.addColorStop(.25,`rgba(${rgb},${opacity*.4})`);glow.addColorStop(1,`rgba(${rgb},0)`);
          ink.fillStyle=glow;ink.fillRect(p.x-radius*5,p.y-radius*5,radius*10,radius*10);
          ink.fillStyle=`rgba(${rgb},${opacity})`;ink.beginPath();ink.arc(p.x,p.y,radius*.5,0,Math.PI*2);ink.fill();
        }
        if(stars.length)trailFrame=requestAnimationFrame(paintTrail);else lastTime=0;
      }
      document.addEventListener('pointermove',event=>{
        if(event.pointerType!=='mouse'||blocked()){clearTrail();return;}
        const now=performance.now();if(now-lastSpawn<24)return;lastSpawn=now;
        const point={x:event.clientX,y:event.clientY};
        const from=lastPoint&&Math.hypot(point.x-lastPoint.x,point.y-lastPoint.y)<100?lastPoint:point;
        for(let i=0;i<3;i++){const t=(i+1)/3;stars.push({x:from.x+(point.x-from.x)*t+(Math.random()-.5)*7,y:from.y+(point.y-from.y)*t+(Math.random()-.5)*7,vx:(Math.random()-.5)*14,vy:-10-Math.random()*14,size:1+Math.random()*1.4,warm:Math.random()>.35,born:now});}
        if(stars.length>cap)stars.splice(0,stars.length-cap);
        lastPoint=point;if(!trailFrame)trailFrame=requestAnimationFrame(paintTrail);
      },{passive:true});
      addEventListener('resize',sizeTrail,{passive:true});addEventListener('blur',clearTrail);
      document.addEventListener('visibilitychange',clearTrail);
      document.documentElement.addEventListener('pointerleave',()=>{lastPoint=null;});
      sizeTrail();
    }
  }
})();
