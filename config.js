/*
素材替换指南
1. 图片与本文件放在同一目录，修改下方 scene.images 对应路径。图片保持 16:10 且卷轴位置一致。
2. 开场视频现为 pirate-intro-v2.mp4；替换时更新 intro.video；缺少视频时显示封面。
3. 所有英文履历、按钮、日期、图片、视频及下载链接均在这个独立配置对象中；无需改 app.js。
4. cards 内的项目按 title / role / responsibilities / outcomes 填写，未完成的课题保留 Proposed 标签。
5. GitHub 真实地址填写 profile.githubUrl；没有公开作品时保留空值，不生成虚构仓库。
6. intro.cropTop 控制视频显示裁切；scene.atmosphere 控制星点。
7. 想改首页构图：修改 scene.hotspots 百分比坐标。移动端自动改用可点击卷轴列表。
对象内容采用 JSON 语法；使用 .js 包装是为了双击 index.html 时也能加载，无需 fetch 或服务器。
*/
window.PORTFOLIO_CONFIG = {
  "profile": {
    "name": "Yixin Yuan",
    "eyebrow": "A portfolio of curiosity",
    "headline": "Learning from markets. Thinking in systems.",
    "subtitle": "Machine Learning · Electricity Markets · Financial Trading",
    "bio": "I am a master's student in Carbon Neutrality and Green Finance at HKUST(GZ). My research interests lie in machine learning for electricity markets and financial trading, particularly scenario generation, temporal dependence and risk-aware decisions. My experience spans carbon accounting, empirical research, data cleaning and analysis with Python and SPSS, and AI-assisted workflows.",
    "email": "yyuan559@connect.hkust-gz.edu.cn",
    "githubUrl": "https://github.com/waiwaicha-yyx/energy-carbon-workflow-demo",
    "cvUrl": "",
    "proposalUrl": "",
    "education": "HKUST(GZ) · MSc, Carbon Neutrality and Green Finance · 2026–2028",
    "educationPrevious": "Guangdong University of Finance · BBA · 2022–2026",
    "motto": "TAKE WHAT YOU CAN, GIVE NOTHING BACK."
  },
  "intro": {
    "video": "pirate-intro-v3.mp4",
    "poster": "assets-ocean-background.jpg",
    "cinematic": true,
    "cropTop": 0.065,
    "muted": true,
    "enterOnEnd": true,
    "kicker": "The next chapter",
    "title": "Every question is a new horizon.",
    "description": "I'm Yixin. Welcome aboard my journey through research, sustainability and discovery.",
    "button": "Explore my journey",
    "skip": "Skip intro",
    "play": "Play introduction",
    "replay": "Replay intro",
    "soundOn": "Turn sound on",
    "soundOff": "Mute sound",
    "character": "assets-poses-research.webp",
    "layout": "six-scrolls",
    "alphaAnimation": {
      "width": 737,
      "height": 900,
      "columns": 5,
      "framesPerSheet": 10,
      "frameCount": 47,
      "fps": 20,
      "sheets": [
        "assets-intro-v3-stable-frames-00.webp",
        "assets-intro-v3-stable-frames-01.webp",
        "assets-intro-v3-stable-frames-02.webp",
        "assets-intro-v3-stable-frames-03.webp",
        "assets-intro-v3-stable-frames-04.webp"
      ]
    },
    "mode": "unified-alpha",
    "directVideoHotspots": {
      "interests": {
        "x": 14.1,
        "y": 29.3,
        "width": 13.8,
        "height": 7.7
      },
      "hobbies": {
        "x": 14.1,
        "y": 47.8,
        "width": 13.8,
        "height": 7.7
      },
      "volunteering": {
        "x": 14.1,
        "y": 66.6,
        "width": 13.8,
        "height": 7.7
      },
      "research": {
        "x": 72.2,
        "y": 29.3,
        "width": 13.8,
        "height": 7.7
      },
      "awards": {
        "x": 72.2,
        "y": 47.8,
        "width": 13.8,
        "height": 7.7
      },
      "internship": {
        "x": 72.2,
        "y": 66.6,
        "width": 13.8,
        "height": 7.7
      }
    },
    "endAt": 3.85,
    "startAt": 1.5
  },
  "scene": {
    "images": {
      "idle": "assets-poses-research.webp",
      "interests": "assets-poses-interests.webp",
      "hobbies": "assets-poses-hobbies.webp",
      "volunteering": "assets-poses-volunteering.webp",
      "research": "assets-poses-research.webp",
      "awards": "assets-poses-awards.webp",
      "internship": "assets-poses-internship.webp"
    },
    "hotspots": {
      "interests": {
        "x": 10,
        "y": 30,
        "width": 19,
        "height": 9
      },
      "hobbies": {
        "x": 10,
        "y": 52,
        "width": 19,
        "height": 9
      },
      "volunteering": {
        "x": 10,
        "y": 74,
        "width": 19,
        "height": 9
      },
      "research": {
        "x": 71,
        "y": 30,
        "width": 19,
        "height": 9
      },
      "awards": {
        "x": 71,
        "y": 52,
        "width": 19,
        "height": 9
      },
      "internship": {
        "x": 71,
        "y": 74,
        "width": 19,
        "height": 9
      }
    },
    "parallax": false,
    "atmosphere": {
      "enabled": true,
      "desktopParticles": 90,
      "mobileParticles": 35
    },
    "longPressMs": 480,
    "lens": {
      "x": 0.75,
      "y": 0.132
    },
    "mode": "layered-character",
    "background": "assets-ocean-background.jpg",
    "mobileCharacter": "assets-poses-research.webp",
    "default": "research",
    "poses": {
      "interests": {
        "rear": [
          505,
          205
        ],
        "lens": [
          190,
          234
        ],
        "size": [
          1024,
          1536
        ],
        "anchor": [
          512,
          1516
        ]
      },
      "hobbies": {
        "rear": [
          515,
          225
        ],
        "lens": [
          245,
          350
        ],
        "size": [
          1024,
          1536
        ],
        "anchor": [
          512,
          1516
        ]
      },
      "volunteering": {
        "rear": [
          438,
          270
        ],
        "lens": [
          145,
          584
        ],
        "size": [
          1024,
          1536
        ],
        "anchor": [
          512,
          1516
        ]
      },
      "research": {
        "rear": [
          550,
          205
        ],
        "lens": [
          804,
          225
        ],
        "size": [
          1024,
          1536
        ],
        "anchor": [
          512,
          1516
        ]
      },
      "awards": {
        "rear": [
          548,
          223
        ],
        "lens": [
          755,
          352
        ],
        "size": [
          1024,
          1536
        ],
        "anchor": [
          512,
          1516
        ]
      },
      "internship": {
        "rear": [
          539,
          220
        ],
        "lens": [
          783,
          451
        ],
        "size": [
          1024,
          1536
        ],
        "anchor": [
          512,
          1516
        ]
      }
    },
    "ground": 0.98,
    "pointerTrail": {
      "enabled": true,
      "maxParticles": 72,
      "lifetimeMs": 650
    }
  },
  "ui": {
    "pageTitle": "Yixin Yuan — A Personal Voyage",
    "description": "Yixin Yuan: machine learning for electricity markets and financial trading, research, awards, internships and life beyond research.",
    "navigation": "Explore the portfolio",
    "desktopHint": "Six scrolls. One evolving journey.",
    "touchHint": "Tap a scroll to explore.",
    "close": "Close chapter",
    "responsibilities": "Focus & contribution",
    "outcomes": "Results & next steps",
    "about": "About me",
    "awards": "Awards & publications",
    "contact": "Get in touch",
    "download": "Download CV",
    "github": "Visit GitHub",
    "chapter": "Chapter",
    "skillsTitle": "Tools I work with",
    "skills": [
      "SPSS",
      "Python visualization",
      "Carbon accounting",
      "AI-assisted prototyping"
    ],
    "footer": "Built with curiosity. Guided by evidence.",
    "motionOn": "Reduce motion",
    "motionOff": "Enable motion",
    "introUnavailable": "Welcome aboard",
    "error": "This chapter is unavailable. Please reload the page.",
    "moreExperiences": "Competitions & more",
    "researchPlan": "Research proposal"
  },
  "cards": [
    {
      "id": "interests",
      "label": "Research Interests",
      "number": "01",
      "subtitle": "Questions I want to explore",
      "intro": "Machine learning for electricity markets and financial trading, with a focus on the order, persistence and consequences of risk.",
      "projects": [
        {
          "title": "Electricity markets & storage",
          "role": "Research interest",
          "responsibilities": [
            "How do wind shortfalls and high imbalance prices interact over time? I am interested in whether better scenarios can help storage hedge sustained adverse events."
          ],
          "tags": [
            "Electricity trading",
            "Scenario generation",
            "Risk-aware control"
          ],
          "date": "",
          "outcomes": []
        },
        {
          "title": "Financial time series & trading risk",
          "role": "Research interest",
          "responsibilities": [
            "How does the sequence of volatility states affect drawdowns? I want to study conditional diffusion models that connect monthly market states with weekly and daily return paths."
          ],
          "tags": [
            "Machine learning",
            "Conditional diffusion",
            "Drawdown risk"
          ],
          "date": "",
          "outcomes": [],
          "singleLineTitle": true
        }
      ]
    },
    {
      "id": "hobbies",
      "label": "Hobbies & Skills",
      "number": "02",
      "subtitle": "Beyond the desk",
      "intro": "Time outdoors, time on court, and the practical tools I bring to research.",
      "projects": [
        {
          "title": "Hiking",
          "role": "Outside the classroom",
          "responsibilities": [
            "I enjoy hiking and spending time outdoors."
          ],
          "tags": [],
          "date": "",
          "outcomes": [],
          "photo": "assets-hiking-coast.jpg",
          "photoAlt": "Yixin enjoying a walk along the coast",
          "photoSlot": "hiking",
          "photoCaption": "A day outdoors, by the sea."
        },
        {
          "title": "Tennis",
          "role": "Practice, focus and competition",
          "responsibilities": [
            "Tennis is a regular part of my life. I have also helped organize university tennis events."
          ],
          "tags": [],
          "date": "",
          "outcomes": [
            "Quarterfinalist, Tunan Cup Greater Bay Area University Clay-Court Tennis Tournament, July 2025."
          ],
          "photo": "assets-tennis.jpg",
          "photoAlt": "Yixin on the tennis court",
          "photoSlot": "tennis",
          "photoCaption": "On court."
        },
        {
          "title": "Skiing",
          "role": "Winter outdoors",
          "date": "",
          "responsibilities": [
            "I also enjoy spending time on the slopes."
          ],
          "outcomes": [],
          "photo": "assets-skiing.jpg",
          "photoSlot": "skiing",
          "photoAlt": "Yixin skiing on a snowy mountain",
          "photoCaption": "A winter day in the mountains."
        },
        {
          "title": "Research & technical skills",
          "role": "Tools I use",
          "responsibilities": [
            "Python: data cleaning and web scraping.",
            "Machine learning: generative AI and reinforcement learning.",
            "Academic writing."
          ],
          "tags": [
            "Python",
            "Machine learning",
            "Academic writing"
          ],
          "date": "",
          "outcomes": []
        }
      ]
    },
    {
      "id": "volunteering",
      "label": "Volunteering",
      "number": "03",
      "subtitle": "Showing up for others",
      "intro": "Sports, international conferences and community service.",
      "projects": [
        {
          "title": "12th National Games for Persons with Disabilities & 9th National Special Olympic Games",
          "role": "Volunteer",
          "responsibilities": [
            "Participated in volunteer service for the Games."
          ],
          "tags": [
            "Sports volunteering"
          ],
          "date": "",
          "outcomes": [],
          "photo": "assets-volunteer-national-games.jpg",
          "photoSlot": "games",
          "photoAlt": "Yixin volunteering at the national para and special olympic games venue",
          "photoCaption": "Volunteer service at the Games."
        },
        {
          "title": "Defining the Road to Zero Carbon Prosperity",
          "role": "International conference volunteer",
          "responsibilities": [
            "Participated in volunteer service at the international conference “Defining the Road to Zero Carbon Prosperity.”"
          ],
          "tags": [
            "Conference volunteering"
          ],
          "date": "",
          "outcomes": [],
          "photo": "assets-volunteer-zero-carbon.jpg",
          "photoSlot": "conference",
          "photoAlt": "Yixin at the Defining the Road to Zero Carbon Prosperity international conference",
          "photoCaption": "International conference · HKUST(GZ)"
        },
        {
          "title": "Blue Letter",
          "role": "Student volunteer",
          "responsibilities": [
            "Exchanged letters with students in underserved communities, sharing encouragement and experiences related to study and daily life."
          ],
          "tags": [],
          "date": "Dec 2022–May 2024",
          "outcomes": []
        },
        {
          "title": "Community events",
          "role": "Volunteer",
          "responsibilities": [
            "Supported registration and event order at a parent–child reading activity, and tea service and event logistics at the 2025 Chinese Tea New Year Gathering."
          ],
          "tags": [],
          "date": "",
          "outcomes": []
        }
      ]
    },
    {
      "id": "research",
      "label": "Research",
      "number": "04",
      "subtitle": "Firms, public finance & carbon data",
      "intro": "Current proposals in electricity and financial markets, alongside earlier empirical and sustainability research.",
      "projects": [
        {
          "title": "Wind Shortfalls, Imbalance Prices & Storage Decisions",
          "role": "Research proposal · Power Systems course project",
          "responsibilities": [
            "Investigate whether severe wind forecast shortfalls and high imbalance prices co-occur and persist, using Belgian Elia open data aligned at 15-minute intervals.",
            "Plan conditional dependence tests, event-duration analysis and block-bootstrap comparisons to assess cumulative imbalance losses.",
            "A proposed second phase compares traditional and conditional-diffusion scenarios within common storage-control benchmarks, including MPC and risk-sensitive reinforcement learning."
          ],
          "tags": [
            "Electricity markets",
            "Joint tail risk",
            "Storage",
            "Conditional diffusion"
          ],
          "date": "Nov 2026",
          "outcomes": [
            "Current stage: research design. Empirical tests and decision-value comparisons are planned; no performance gains are claimed."
          ],
          "singleLineTitle": true
        },
        {
          "title": "Conditional Hierarchical Diffusion for Financial Returns",
          "role": "Research proposal · Machine Learning in Finance course project",
          "responsibilities": [
            "Study whether the sequence and persistence of monthly volatility states improve the prediction of multi-week drawdowns.",
            "Propose duration-dependent state probabilities and a monthly-to-weekly-to-daily conditional diffusion hierarchy using SPY adjusted-price data, with return-sum consistency across levels.",
            "Plan comparisons using Brier scores, volatility consistency and drawdown CRPS, including shuffled-week controls that isolate the effect of temporal ordering."
          ],
          "tags": [
            "Financial time series",
            "Diffusion models",
            "Volatility states",
            "Drawdown risk"
          ],
          "date": "Nov 2026",
          "outcomes": [
            "Current stage: research design. The proposed models and out-of-sample evaluation remain to be implemented and tested."
          ]
        },
        {
          "title": "Digital Empowerment & Manufacturing Firms’ Green Transition",
          "date": "2025",
          "role": "Co-author · Supervisor: Guolin Zhou",
          "tags": [
            "Published paper",
            "Value-chain analysis",
            "Green transition"
          ],
          "responsibilities": [
            "Reviewed dual-carbon, digital-transformation and green-manufacturing policies alongside manufacturing-firm cases.",
            "Used a value-chain perspective to connect policy, governance and company practice, and contributed to the paper’s analysis and writing."
          ],
          "outcomes": [
            "Yuan, Y. & Zhou, G. Green Transformation Path of Manufacturing Industry under Digital Empowerment. Management & Technology of SME, 2025(7), 151–153."
          ]
        },
        {
          "title": "Local Debt Refinancing & Economic Stability",
          "date": "Research project",
          "role": "Evidence collection & research writing · Supervisor: Yuxia Cao",
          "tags": [
            "Local-government debt",
            "Panel data",
            "Policy analysis"
          ],
          "responsibilities": [
            "Collected and organized five-year provincial evidence on local-government debt, banks and local investment corporations using Wind and Chinese economic-data sources.",
            "Contributed to a study using a 15-indicator framework to examine refinancing and economic stability.",
            "Synthesized the analysis and policy implications into the research manuscript."
          ],
          "outcomes": [
            "Prepared a research manuscript on local-debt sustainability and refinancing; journal publication is not claimed."
          ]
        },
        {
          "title": "Carbon-Emissions Database Development for Developing Economies",
          "date": "Jul 2026",
          "role": "Research project · Supervisor: Dabo Guan",
          "tags": [
            "Energy balances",
            "CO₂ inventories",
            "LMDI"
          ],
          "responsibilities": [
            "Constructed Eswatini’s 2011–2023 energy-related CO₂ inventory from energy balance data and emission factors.",
            "Prepared sector and city allocations using trade and population data.",
            "Applied LMDI decomposition to emissions drivers across 12 Ethiopian cities to examine transition pathways."
          ],
          "outcomes": [
            "Contributed inventory tables and comparative emissions analysis to research on developing economies.",
            "Independently built an AI-assisted browser demo to communicate the accounting workflow; available in the GitHub chapter."
          ]
        },
        {
          "title": "Power Grid Construction Quality Management",
          "date": "Nov 2025",
          "role": "Research support",
          "tags": [
            "Policy review",
            "Digital quality management"
          ],
          "responsibilities": [
            "Reviewed policies, management approaches and cases on mechanized power-grid construction.",
            "Drafted the research background and significance for a proposed digital quality-management framework."
          ],
          "outcomes": [
            "Prepared research-proposal material connecting industry challenges with a proposed management framework."
          ]
        },
        {
          "title": "From Annual Memberships to Services: Digital Transformation in Gyms",
          "date": "Jun–Jul 2025",
          "role": "Course research · Evidence collection & writing",
          "tags": [
            "PEST–SWOT",
            "Value-chain analysis",
            "Service design"
          ],
          "responsibilities": [
            "Collected company cases and transformation evidence to compare traditional and digitally native gym businesses.",
            "Contributed to a customer-centered analysis of operational digitization and service transformation."
          ],
          "outcomes": [
            "Ranked first in the Enterprise Information Management course project."
          ]
        }
      ]
    },
    {
      "id": "awards",
      "label": "Awards & Publications",
      "number": "05",
      "subtitle": "Research outputs & recognition",
      "intro": "Published research, modeling competitions, scholarships and sporting achievements.",
      "projects": [
        {
          "title": "Green Transformation Path of Manufacturing Industry under Digital Empowerment",
          "role": "Publication · Yixin Yuan & Guolin Zhou",
          "responsibilities": [
            "Management & Technology of SME, 2025(7), pp. 151–153.",
            "Examines manufacturing firms’ green transformation through policy analysis and company cases."
          ],
          "tags": [
            "Published article"
          ],
          "date": "2025",
          "outcomes": []
        },
        {
          "title": "National Third Prize",
          "date": "2025",
          "role": "15th CP Cup Market Research and Analysis Competition",
          "tags": [
            "Autonomous-driving acceptance"
          ],
          "responsibilities": [],
          "outcomes": []
        },
        {
          "title": "Guangdong First Prize",
          "date": "2023 competition",
          "role": "Contemporary Undergraduate Mathematical Contest in Modeling",
          "tags": [
            "Mathematical modeling"
          ],
          "responsibilities": [],
          "outcomes": []
        },
        {
          "title": "Honorable Mention",
          "date": "2024",
          "role": "Mathematical Contest in Modeling",
          "tags": [
            "MCM"
          ],
          "responsibilities": [],
          "outcomes": []
        },
        {
          "title": "Successful Participant",
          "date": "2025",
          "role": "Mathematical Contest in Modeling",
          "tags": [
            "MCM"
          ],
          "responsibilities": [],
          "outcomes": []
        },
        {
          "title": "Guangdong Third Prize",
          "date": "Statistical modeling competition",
          "role": "National College Student Statistical Modeling Competition",
          "tags": [
            "Energy & carbon efficiency"
          ],
          "responsibilities": [],
          "outcomes": []
        },
        {
          "title": "Scientific Research Innovation Scholarship",
          "date": "2024",
          "role": "Guangdong University of Finance",
          "tags": [
            "Research"
          ],
          "responsibilities": [],
          "outcomes": []
        },
        {
          "title": "University Third Prize",
          "date": "2022",
          "role": "Zhiyuan Cup Logistics Competition",
          "tags": [
            "Logistics"
          ],
          "responsibilities": [],
          "outcomes": []
        },
        {
          "title": "Excellent Student Scholarship",
          "date": "2023–2024",
          "role": "Guangdong University of Finance",
          "tags": [
            "Academic performance"
          ],
          "responsibilities": [],
          "outcomes": []
        },
        {
          "title": "Quarter-finalist",
          "date": "Jul 2025",
          "role": "Tunan Cup Greater Bay Area University Clay Court Tennis Tournament",
          "tags": [
            "Tennis"
          ],
          "responsibilities": [],
          "outcomes": []
        }
      ]
    },
    {
      "id": "internship",
      "label": "Internships",
      "number": "06",
      "subtitle": "Sustainability in practice",
      "intro": "Practical experience taught me to connect environmental questions with usable data, clear reporting and dependable delivery.",
      "projects": [
        {
          "title": "Tanyi Technology Co., Ltd.",
          "date": "20 May–20 Aug 2026",
          "role": "Project Delivery Intern",
          "tags": [
            "Scope 1–3",
            "CDP",
            "ESG"
          ],
          "responsibilities": [
            "Independently handled corporate carbon-accounting delivery, from data review and emission-factor matching to GHG modeling and report revisions.",
            "Prepared carbon-emissions and ESG reports, and developed an AI-assisted reporting workflow."
          ],
          "outcomes": [
            "Independently completed CDP submissions for four companies.",
            "Connected emissions data collection with client reporting requirements."
          ]
        },
        {
          "title": "Fandao Network Technology",
          "date": "Dec 2025–Mar 2026",
          "role": "Sustainability Internship",
          "tags": [
            "Client operations",
            "Coordination"
          ],
          "responsibilities": [
            "Created a WeChat communication procedure to help identify client needs and business stages.",
            "Coordinated invitations, venue arrangements and on-site support for an 80-guest client event, working with three other interns."
          ],
          "outcomes": [
            "Built practical experience in organizing information and coordinating delivery."
          ]
        }
      ]
    },
    {
      "id": "competition",
      "label": "Competition",
      "number": "01",
      "subtitle": "Turning questions into evidence",
      "intro": "A wider record of the questions I have explored through mathematical modeling, market research, business simulations and entrepreneurship.",
      "projects": [
        {
          "title": "Autonomous Driving Acceptance in Guangzhou",
          "date": "Jan–Apr 2025",
          "role": "Survey research & statistical modeling",
          "tags": [
            "638 responses",
            "SPSS",
            "Mobility"
          ],
          "responsibilities": [
            "Contributed to questionnaire design, evidence collection, user profiles and research writing.",
            "Performed K-means clustering, Apriori association analysis and ANN modeling using SPSS to examine user groups and travel scenarios."
          ],
          "outcomes": [
            "National Third Prize, 15th CP Cup Market Research and Analysis Competition.",
            "Translated survey findings into recommendations for different user groups."
          ]
        },
        {
          "title": "Tennis Momentum & Player Scoring",
          "date": "2024 · MCM",
          "role": "Team leader · Evidence collection & research writing",
          "tags": [
            "Mathematical modeling",
            "Tennis",
            "Research communication"
          ],
          "responsibilities": [
            "Led a three-person team exploring the relationship between player scoring and momentum in tennis.",
            "Collected and organized supporting evidence, and wrote the report explaining the team’s modeling approach, analysis and conclusions."
          ],
          "outcomes": [
            "Honorable Mention, Mathematical Contest in Modeling (2024)."
          ]
        },
        {
          "title": "Mathematical Contest in Modeling",
          "date": "2025 · MCM",
          "role": "Team participant · Research writing",
          "tags": [
            "Mathematical modeling",
            "Teamwork"
          ],
          "responsibilities": [
            "Participated in a second MCM, contributing to the written presentation of the team’s model, solution process and findings."
          ],
          "outcomes": [
            "Successful Participant, Mathematical Contest in Modeling (2025)."
          ]
        },
        {
          "title": "Vegetable Pricing & Replenishment Decisions",
          "date": "2023 · CUMCM",
          "role": "Team leader · Research writing & visualization",
          "tags": [
            "Demand forecasting",
            "Retail operations",
            "Decision modeling"
          ],
          "responsibilities": [
            "Led the team’s analysis of vegetable sales and demand patterns for pricing and replenishment decisions.",
            "Prepared visualizations and wrote the report connecting the team’s forecasts, assumptions and recommendations."
          ],
          "outcomes": [
            "Guangdong First Prize, China Undergraduate Mathematical Contest in Modeling (2023 competition; award received in January 2024)."
          ]
        },
        {
          "title": "Green Energy & Carbon Emission Efficiency",
          "date": "2023 · Statistical modeling",
          "role": "Visualization & research writing",
          "tags": [
            "30 provinces",
            "2011–2019 data",
            "SBM–Malmquist"
          ],
          "responsibilities": [
            "Prepared visualizations and research writing for a team analysis of provincial carbon emission efficiency.",
            "Synthesized input–output indicators and efficiency changes into an accessible research narrative."
          ],
          "outcomes": [
            "Guangdong Third Prize, National College Student Statistical Modeling Competition."
          ]
        },
        {
          "title": "An O2O Baking Retail Platform",
          "date": "2023",
          "role": "Team leader · Concept development & business planning",
          "tags": [
            "Innovation & entrepreneurship",
            "O2O retail",
            "Pitching"
          ],
          "responsibilities": [
            "Proposed a platform connecting home bakers, professional bakers and customers through customized products and online baking lessons.",
            "Formed the team, allocated tasks and led the business plan covering market research, competitors, marketing and financial projections.",
            "Presented the concept and development plan in the project pitch."
          ],
          "outcomes": [
            "Developed a business-plan entry for a university innovation and entrepreneurship competition."
          ]
        },
        {
          "title": "Zhiyuan Cup Logistics Competition",
          "date": "2022",
          "role": "Team participant",
          "tags": [
            "Logistics",
            "Business competition"
          ],
          "responsibilities": [],
          "outcomes": [
            "University-level Third Prize, Zhiyuan Cup Logistics Competition."
          ]
        },
        {
          "title": "11th ERP Business Simulation Competition",
          "date": "2023",
          "role": "Team participant",
          "tags": [
            "ERP",
            "Business simulation"
          ],
          "responsibilities": [],
          "outcomes": [
            "Participated in the ERP business simulation competition."
          ]
        },
        {
          "title": "E-commerce Livestreaming Competition",
          "date": "2023",
          "role": "Product selection & live presentation",
          "tags": [
            "E-commerce",
            "Communication",
            "Sales"
          ],
          "responsibilities": [
            "Selected products, arranged the livestreaming venue and introduced products during live sessions."
          ],
          "outcomes": [
            "Hands-on experience connecting product choices, live communication and customer response."
          ]
        }
      ]
    },
    {
      "id": "github",
      "label": "GitHub",
      "number": "04",
      "subtitle": "Interactive projects & source code",
      "intro": "A place for browser prototypes, documented workflows and reproducible project materials. Explore the interactive carbon-accounting demonstration below.",
      "projects": [
        {
          "title": "Energy Balance & CO₂ Workflow Demo",
          "date": "Independent project",
          "role": "Independently developed with AI assistance",
          "tags": [
            "HTML / CSS / JavaScript",
            "Interactive prototype",
            "Sample downloads"
          ],
          "responsibilities": [
            "Designed a browser interface for pairing files by year, showing workflow stages and downloading example outputs.",
            "Used AI assistance to implement and refine the local web prototype."
          ],
          "outcomes": [
            "An interactive demo with embedded Eswatini 2011 example tables and a downloadable result package.",
            "This demonstration uses fixed sample outputs; it does not parse uploaded workbooks to calculate new emissions inventories."
          ],
          "link": {
            "label": "Open the workflow demo",
            "url": "carbon-workflow-demo.html"
          },
          "links": [
            {
              "label": "View source on GitHub",
              "url": "https://github.com/waiwaicha-yyx/energy-carbon-workflow-demo"
            }
          ]
        }
      ]
    },
    {
      "id": "beyond",
      "label": "Beyond research",
      "number": "06",
      "subtitle": "Learning, leading & creating",
      "intro": "The wider experiences behind my research: teamwork, circular-business ideas, community service and a love of tennis.",
      "projects": [
        {
          "title": "HKU Summer School · EVERLEAF",
          "date": "Jul 2025",
          "role": "Participant · Driving Business Success in a Sustainable Circular Economy",
          "tags": [
            "Circular economy",
            "Business planning"
          ],
          "responsibilities": [
            "Developed a business plan for EVERLEAF, a project exploring the reuse of branches and leaves."
          ],
          "outcomes": [
            "Completed the summer-school program and received a completion certificate."
          ]
        },
        {
          "title": "Guardian Belt · Sustainable Business Course",
          "date": "Course project",
          "role": "Market research & concept development",
          "tags": [
            "Older-adult care",
            "Business analysis",
            "Product concept"
          ],
          "responsibilities": [
            "Developed market-size assumptions and a spreadsheet-based business case for an older-adult safety product.",
            "Proposed a safety-distance concept to connect response time with emergency assistance."
          ],
          "outcomes": [
            "Produced a team business concept; projections were scenario estimates, not observed sales or a deployed medical device."
          ]
        },
        {
          "title": "Student Leadership & Campus Communities",
          "date": "2022–2025",
          "role": "Student Union · Quantitative Investment Studio · Tennis Association",
          "tags": [
            "Event planning",
            "Communication",
            "Team coordination"
          ],
          "responsibilities": [
            "Drafted Student Union activity plans, prepared publicity and supported on-site coordination.",
            "Organized mathematics-sharing sessions and publicity for the Quantitative Investment Studio.",
            "Planned tennis events and coordinated competition arrangements and publicity for the Tennis Association."
          ],
          "outcomes": [
            "Experience translating ideas into organized campus events and student participation."
          ]
        },
        {
          "title": "Community Service & Tea Culture",
          "date": "2022–2025",
          "role": "Volunteer",
          "tags": [
            "Blue Letter",
            "Community events",
            "Tea culture"
          ],
          "responsibilities": [
            "Exchanged letters with school students through the Blue Letter program to discuss study and everyday life.",
            "Supported registration and event order at a parent–child reading activity.",
            "Served tea, introduced tea products and supported logistics at the 2025 Chinese Tea New Year gathering."
          ],
          "outcomes": [
            "Received a volunteer certificate for the tea gathering."
          ]
        },
        {
          "title": "Independent Ventures & Digital Communication",
          "date": "2023–2024",
          "role": "Small-business & content projects",
          "tags": [
            "E-commerce",
            "Customer experience",
            "Content creation"
          ],
          "responsibilities": [
            "Set up a Taobao shop for bullet-journal supplies and gained experience in small-business operations.",
            "Participated in running board-game and murder-mystery activities.",
            "Created Xiaohongshu content about everyday English learning and introduced tea culture in English livestreams."
          ],
          "outcomes": [
            "Explored how product presentation, communication and customer experience shape a small venture."
          ]
        },
        {
          "title": "Tennis Beyond the Classroom",
          "date": "2024–2025",
          "role": "Player & student organizer",
          "tags": [
            "Tennis",
            "Teamwork"
          ],
          "responsibilities": [
            "Participated in campus and Greater Bay Area university tennis events alongside student tennis-association activities."
          ],
          "outcomes": [
            "Quarter-finalist, Tunan Cup Greater Bay Area University Clay Court Tennis Tournament (July 2025)."
          ]
        }
      ]
    }
  ]
};
