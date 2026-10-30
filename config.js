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
    "headline": "Exploring a lower-carbon world.",
    "subtitle": "Energy · Mobility · Urban futures",
    "bio": "I am a master's student in Carbon Neutrality and Green Finance at HKUST(GZ). I connect carbon accounting, mobility research and data storytelling, and am developing my interests in AI and 3D cities.",
    "email": "yyuan559@connect.hkust-gz.edu.cn",
    "githubUrl": "https://github.com/waiwaicha-yyx/energy-carbon-workflow-demo",
    "cvUrl": "",
    "proposalUrl": "",
    "education": "HKUST(GZ) · MSc, Carbon Neutrality and Green Finance · 2026–2028",
    "educationPrevious": "Guangdong University of Finance · BBA · 2022–2026",
    "motto": "take what you can, give nothing back."
  },
  "intro": {
    "video": "pirate-intro-v2.mp4",
    "poster": "01-competition-v6.png",
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
    "soundOff": "Mute sound"
  },
  "scene": {
    "images": {
      "idle": "01-competition-v6.png",
      "competition": "01-competition-v6.png",
      "internship": "02-internship-v6.png",
      "research": "03-research-v6.png",
      "github": "04-github-v6.png",
      "awards": ""
    },
    "hotspots": {
      "competition": {
        "x": 54.1,
        "y": 25.4,
        "width": 14.1,
        "height": 8.0
      },
      "internship": {
        "x": 54.1,
        "y": 37.7,
        "width": 14.1,
        "height": 8.0
      },
      "research": {
        "x": 54.1,
        "y": 50.0,
        "width": 14.1,
        "height": 8.0
      },
      "github": {
        "x": 54.1,
        "y": 62.3,
        "width": 14.1,
        "height": 8.0
      }
    },
    "parallax": true,
    "atmosphere": {"enabled": true, "desktopParticles": 66, "mobileParticles": 28},
    "longPressMs": 480
  },
  "ui": {
    "pageTitle": "Yixin Yuan — A Personal Voyage",
    "description": "The wider journey of Yixin Yuan: research, modeling competitions, sustainability, leadership and creative projects.",
    "navigation": "Explore the portfolio",
    "desktopHint": "Follow the light. Open a scroll.",
    "touchHint": "Tap to illuminate. Tap again to open. Hold to preview.",
    "close": "Close chapter",
    "responsibilities": "My contribution",
    "outcomes": "Outcome",
    "about": "About me",
    "awards": "Honors & awards",
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
    "moreExperiences": "Beyond research",
    "researchPlan": "Research proposal"
  },
  "cards": [
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
      "id": "internship",
      "label": "Internship",
      "number": "02",
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
          "title": "Guangzhou Yuanzi Digital Intelligence Technology Co., Ltd.",
          "date": "Nov–Dec 2025",
          "role": "Research Assistant",
          "tags": [
            "Data cleaning",
            "Excel",
            "Python"
          ],
          "responsibilities": [
            "Reviewed missing, duplicate and anomalous records using Excel and Python.",
            "Organized and grouped more than 2,000 customer records by residential area."
          ],
          "outcomes": [
            "Prepared structured records to support subsequent retrieval and analysis."
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
      "id": "research",
      "label": "Research",
      "number": "03",
      "subtitle": "Firms, public finance & carbon data",
      "intro": "My research spans manufacturing firms’ green transition, local-government debt sustainability and carbon-emissions inventories for developing economies. Related research support and coursework are included below.",
      "projects": [
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
      "id": "awards",
      "label": "Honors & awards",
      "number": "05",
      "subtitle": "Milestones along the way",
      "intro": "Selected recognition for research, analysis and teamwork.",
      "projects": [
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
