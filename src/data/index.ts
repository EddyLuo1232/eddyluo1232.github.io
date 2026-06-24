import type { Publication, NewsItem, SocialLink, TimelineItem, AwardItem } from '../types';

// Personal information
export const personalInfo = {
  name: 'Weidi(Eddy) Luo',
  title: {
    en: 'CS PhD student @ The University of Georgia',
    zh: '佐治亚大学计算机科学博士生'
  },
  location: {
    en: 'Athens, GA, United States',
    zh: '美国佐治亚州雅典市'
  },
  email: 'luo.1455@uga.edu',
  profileImages: {
    photo: '/images/assets/profile.jpg',
    anime: '/images/assets/eddy_anime.png'
  }
};

// About section content
export const aboutContent = {
  bio: {
    en: `Eddy Luo (罗威迪 & 一ノ瀬 エイジ), 1st year Ph.D. student at <a href="https://www.uga.edu/">University of Georgia</a>, where I will be advised by Prof.<a href="https://zhenxianglance.github.io/">Xiang Zhen</a>. I am also fortunate to be co-advised by <a href="https://xiaocw11.github.io/">Prof. Chaowei Xiao</a> at <a href="https://www.jhu.edu/">Johns Hopkins University</a>, a mentor I deeply respect and am sincerely grateful to. My research focuses on <strong>AI Safety and Security</strong>, including foundation models and AI agents. Beyond research, I am broadly drawn to cognitive science, philosophy, psychology, sociology, linguistics, and classical music.`,
    zh: `罗威迪（Eddy Luo）（罗威迪 & 一ノ瀬 エイジ），<a href='https://www.uga.edu/'>佐治亚大学</a>一年级博士研究生，我将在那里师从<a href='https://zhenxianglance.github.io/'>Xiang Zhen教授</a>。我也很幸运能够由<a href='https://www.jhu.edu/'>约翰霍普金斯大学</a>的<a href='https://xiaocw11.github.io/'>Prof. Chaowei Xiao</a>共同指导，他是我深深尊敬并由衷感激的导师。我的研究领域专注于<strong>AI安全与安全性</strong>，包括基础模型和AI智能体。研究之余，我对认知科学、哲学、心理学、社会学、语言学与古典音乐也有广泛的兴趣。`
  },
  contact: {
    en: `Beyond research, Eddy is a violinist (Level 10, Sichuan Musicians Association), proudly advised by <a href="https://www.xiaohongshu.com/user/profile/5b82d671bced64000175907a?xsec_token=ABmARYBZrXyQ87uzzA7CCwODns1tLOerFGI4QDmBSDK9s%3D&xsec_source=pc_note">Weiyi Hu</a>. Eddy warmly welcomes collaboration opportunities and supports undergraduates who want to apply for a PhD program. He hopes we can conduct significant research together. Please feel free to contact him at Email: luo.1455[shift+2]uga[dot]edu. どうぞよろしくお願いします!`,
    zh: `除了研究之外，Eddy还是一名小提琴手（四川省音乐家协会十级），师从<a href="https://www.xiaohongshu.com/user/profile/5b82d671bced64000175907a?xsec_token=ABmARYBZrXyQ87uzzA7CCwODns1tLOerFGI4QDmBSDK9s%3D&xsec_source=pc_note">Weiyi Hu老师</a>。Eddy热忱欢迎合作机会，并支持想要申请博士项目的本科生。他希望我们能够一起进行重要的研究。请随时通过邮箱：luo.1455[shift+2]uga[dot]edu联系他。どうぞよろしくお願いします!`
  }
};

// Quote section
export const quote = {
  text: {
    en: `"It's not that life has dreams, but that dreams create life."`,
    zh: `"人生不是因为有梦想才精彩，而是因为精彩才有梦想。"`
  },
  japanese: '「人生に夢があるのではなく、夢が人生をつくるのです」',
  author: {
    en: '— Taeko Uzuki',
    zh: '— 宇月拓雄'
  },
  images: {
    left: '/images/assets/ttr.png',
    right: '/images/assets/ttg.png'
  }
};

// Social links
export const socialLinks: SocialLink[] = [
  {
    id: 'github',
    href: 'https://github.com/EddyLuo1232',
    icon: 'fab fa-github',
    label: { en: 'Github', zh: 'Github' }
  },
  {
    id: 'twitter',
    href: 'https://x.com/luoweidi84',
    icon: 'fab fa-twitter',
    label: { en: 'Twitter', zh: 'Twitter' }
  },
  {
    id: 'linkedin',
    href: 'https://www.linkedin.com/in/weidi-luo-aa02b5242',
    icon: 'fab fa-linkedin',
    label: { en: 'LinkedIn', zh: 'LinkedIn' }
  },
  {
    id: 'scholar',
    href: 'https://scholar.google.com/citations?hl=zh-CN&user=EZzmjVUAAAAJ',
    icon: 'fas fa-graduation-cap',
    label: { en: 'Google Scholar', zh: 'Google Scholar' }
  },
  {
    id: 'cv',
    href: '/docs/pdfs/CV_Eddy.pdf',
    icon: 'fas fa-file-lines',
    label: { en: 'Curriculum Vitae', zh: 'Curriculum Vitae' }
  }
];

// Education and experience
export const educationItems: TimelineItem[] = [
  {
    id: 'uga-phd',
    initials: 'UGA',
    logo: '/images/assets/uga-top-shield.png',
    name: {
      en: 'University of Georgia',
      zh: '佐治亚大学'
    },
    dept: {
      en: 'School of Computing',
      zh: '计算学院'
    },
    position: {
      en: 'Ph.D. Student in Computer Science',
      zh: '计算机科学博士研究生'
    },
    date: {
      en: 'Aug 2025 - Present',
      zh: '2025.08 - 至今'
    }
  },
  {
    id: 'osu-ba',
    initials: 'OSU',
    logo: '/images/assets/osu-buckeyes-logo.png',
    name: {
      en: 'The Ohio State University',
      zh: '俄亥俄州立大学'
    },
    dept: {
      en: 'College of Arts and Sciences',
      zh: '文理学院'
    },
    position: {
      en: 'B.A. in Computer and Information Science',
      zh: '计算机与信息科学文学学士'
    },
    date: {
      en: 'Aug 2022 - Jul 2025',
      zh: '2022.08 - 2025.07'
    }
  }
];

export const experienceItems: TimelineItem[] = [
  {
    id: 'virtue-ai',
    initials: 'VAI',
    logo: '/images/assets/virtue-ai-logo.jpg',
    name: {
      en: 'Virtue AI',
      zh: 'Virtue AI'
    },
    dept: {
      en: 'San Francisco, CA, USA',
      zh: '美国加利福尼亚州旧金山'
    },
    position: {
      en: 'Internship, Research Scientist',
      zh: '实习，Research Scientist'
    },
    date: {
      en: 'May 2026 - Present',
      zh: '2026.05 - 至今'
    }
  },
  {
    id: 'idea',
    initials: 'IDEA',
    logo: '/images/assets/idea-logo.png',
    name: {
      en: 'IDEA',
      zh: 'IDEA'
    },
    dept: {
      en: 'Shenzhen, China',
      zh: '中国深圳'
    },
    position: {
      en: 'Internship, Large Language Model Engineer',
      zh: '实习，大语言模型工程师'
    },
    date: {
      en: 'Jul 2024 - Oct 2024',
      zh: '2024.07 - 2024.10'
    }
  }
];

export const awardItems: AwardItem[] = [
  {
    id: 'uga-research-award',
    name: {
      en: 'SoC Graduate Student Research Award, University of Georgia',
      zh: '佐治亚大学 SoC Graduate Student Research Award'
    },
    date: {
      en: '2026',
      zh: '2026'
    }
  },
  {
    id: 'safebench-prize',
    name: {
      en: '$20,000 SafeBench Prize, Center for AI Safety',
      zh: 'AI 安全中心 $20,000 SafeBench 奖'
    },
    date: {
      en: '2025',
      zh: '2025'
    }
  }
];

// News items
export const newsItems: NewsItem[] = [
  {
    id: 'microsoft-pyrit',
    date: '2026.06.07',
    tag: { en: 'Industry', zh: '工业界' },
    content: {
      en: `Our work <em>JailBreakV-28K: A Benchmark for Assessing the Robustness of MultiModal Large Language Models against Jailbreak Attacks</em> has been integrated into <strong><a href="https://github.com/microsoft/PyRIT" target="_blank" rel="noopener noreferrer">Microsoft's PyRIT</a></strong>, an open-source framework that helps security professionals and engineers proactively identify risks in generative AI systems.`,
      zh: `我们的工作《JailBreakV-28K: A Benchmark for Assessing the Robustness of MultiModal Large Language Models against Jailbreak Attacks》已被集成到<strong><a href="https://github.com/microsoft/PyRIT" target="_blank" rel="noopener noreferrer">微软的PyRIT</a></strong>中，这是一个帮助安全人员和工程师主动识别生成式AI系统风险的开源框架。`
    }
  },
  {
    id: 'virtue-ai-intern',
    date: '2026.05.07',
    tag: { en: 'Position', zh: '入职' },
    content: {
      en: `I will join <strong><a href="https://www.virtueai.com/" target="_blank">Virtue AI</a></strong> as a <strong>Research Scientist Intern</strong> in <strong>San Francisco, CA, USA</strong>.`,
      zh: `我将以<strong>实习Research Scientist</strong>的身份加入位于<strong>美国加利福尼亚州旧金山</strong>的<strong><a href="https://www.virtueai.com/" target="_blank">Virtue AI</a></strong>。`
    }
  },
  {
    id: 'uga-graduate-student-research-award',
    date: '2026.04.10',
    tag: { en: 'Award', zh: '获奖' },
    content: {
      en: `I received the <strong>SoC Graduate Student Research Award</strong> from the <strong>University of Georgia</strong>.`,
      zh: `我获得了<strong>佐治亚大学</strong>颁发的<strong>SoC Graduate Student Research Award</strong>。`
    }
  },
  {
    id: 'iclr-2026',
    date: '2026.01.26',
    tag: { en: 'Paper', zh: '中稿' },
    content: {
      en: `Our work <em>Doxing via the Lens: Revealing Location-related Privacy Leakage on Multi-modal Large Reasoning Models</em> has been accepted by <strong>ICLR'2026</strong>. Thanks to my collaborators.`,
      zh: `我们的工作《Doxing via the Lens: Revealing Location-related Privacy Leakage on Multi-modal Large Reasoning Models》被<strong>ICLR'2026</strong>接收。感谢我的合作者们。`
    }
  },
  {
    id: 'nvidia-garak',
    date: '2025.07.15',
    tag: { en: 'Industry', zh: '工业界' },
    content: {
      en: `Our work <em>JailBreakV-28K: A Benchmark for Assessing the Robustness of MultiModal Large Language Models against Jailbreak Attacks</em> has been integrated into <strong><a href="https://github.com/NVIDIA/garak" target="_blank" rel="noopener noreferrer">NVIDIA's garak</a></strong>, an LLM vulnerability scanner, enhancing multimodal AI security assessment capabilities.`,
      zh: `我们的工作《JailBreakV-28K: A Benchmark for Assessing the Robustness of MultiModal Large Language Models against Jailbreak Attacks》已被集成到<strong><a href="https://github.com/NVIDIA/garak" target="_blank" rel="noopener noreferrer">NVIDIA的garak</a></strong>中，这是一个LLM漏洞扫描器，增强了多模态AI安全评估能力。`
    }
  },
  {
    id: 'acl-2025',
    date: '2025.05.15',
    tag: { en: 'Paper', zh: '中稿' },
    content: {
      en: `Two of our works, <em>AGrail: A Lifelong Agent Guardrail with Effective and Adaptive Safety Detection</em> and <em>Disentangling Memory and Reasoning Ability in Large Language Models</em> have been accepted by <strong>ACL'2025</strong> main conference. Thanks to my collaborators.`,
      zh: `我们的两项工作《AGrail: A Lifelong Agent Guardrail with Effective and Adaptive Safety Detection》和《Disentangling Memory and Reasoning Ability in Large Language Models》被<strong>ACL'2025</strong>主会议接收。感谢我的合作者们。`
    }
  },
  {
    id: 'safebench-award',
    date: '2025.04.15',
    tag: { en: 'Award', zh: '获奖' },
    content: {
      en: `Our work <em>JailBreakV-28K: A Benchmark for Assessing the Robustness of MultiModal Large Language Models against Jailbreak Attacks</em> wins <strong>$20,000</strong> SafeBench Prize for Advancing MultiModal Large Language Model Security Benchmarking from <strong>Center for AI Safety</strong>.`,
      zh: `我们的工作《JailBreakV-28K: A Benchmark for Assessing the Robustness of MultiModal Large Language Models against Jailbreak Attacks》获得了<strong>AI安全中心</strong>颁发的<strong>20,000美元</strong>SafeBench奖，以表彰其在推进多模态大语言模型安全基准测试方面的贡献。`
    }
  },
  {
    id: 'uga-phd',
    date: '2025.04.09',
    tag: { en: 'Position', zh: '入职' },
    content: {
      en: `I will join the University of Georgia as a <strong>PhD student</strong> in August 2025.`,
      zh: `我将于2025年8月加入佐治亚大学，攻读<strong>博士学位</strong>。`
    }
  }
];

// Publications
export const publications: Publication[] = [
  {
    id: 'doxing',
    badge: 'ICLR\'2026',
    badgeLogo: '/images/conference/ICLR.jpeg',
    image: '/images/publications/doxing_via_the_lens.png',
    alt: 'Doxing via the Lens',
    authors: '<span class="highlight"><strong>Weidi Luo*</strong></span>, Tianyu Lu*, Qiming Zhang*, Xiaogeng Liu, Bin Hu, Yue Zhao, Jieyu Zhao, Song Gao, Patrick McDaniel, Zhen Xiang, Chaowei Xiao',
    title: {
      en: '<em>Doxing via the Lens: Revealing Location-related Privacy Leakage on Multi-modal Large Reasoning Models</em>',
      zh: '<em>通过镜头进行人肉搜索：揭示多模态大型推理模型中与位置相关的隐私泄露</em>'
    },
    links: [
      { href: 'https://arxiv.org/pdf/2504.19373', label: { en: '[Paper]', zh: '[论文]' } },
      { href: 'https://doxbench.github.io/', label: { en: '[Project Page]', zh: '[项目页面]' } },
      { href: 'https://github.com/SaFo-Lab/DoxBench', label: { en: '[Code]', zh: '[代码]' } },
      { href: 'https://mp.weixin.qq.com/s/_pDsKWz9f9rjXFHWN2UJ_A', label: { en: '[机器之心 Synced]', zh: '[机器之心 Synced]' } }
    ],
    stats: {
      en: '23,000+ views, 1,300+ shares',
      zh: '23,000+ 浏览量, 1,300+ 分享量'
    }
  },
  {
    id: 'jailbreakv',
    badge: 'COLM\'2024',
    badgeLogo: '/images/conference/COLM.png',
    image: '/images/publications/jbv.png',
    alt: 'JailBreakV-28K',
    authors: '<span class="highlight"><strong>Weidi Luo*</strong></span>, Siyuan Ma*, Xiaogeng Liu*, Xiaoyu Guo, Chaowei Xiao',
    title: {
      en: '<em>JailBreakV-28K: A Benchmark for Assessing the Robustness of MultiModal Large Language Models against Jailbreak Attacks</em>',
      zh: '<em>JailBreakV-28K: 评估多模态大语言模型抗越狱攻击鲁棒性的基准</em>'
    },
    links: [
      { href: 'https://arxiv.org/abs/2404.03027', label: { en: '[Paper]', zh: '[论文]' } },
      { href: 'https://eddyluo1232.github.io/JailBreakV28K/', label: { en: '[Project Page]', zh: '[项目页面]' } },
      { href: 'https://github.com/EddyLuo1232/JailBreakV_28K', label: { en: '[Code]', zh: '[代码]' } }
    ],
    award: {
      en: '$20,000 SafeBench Award from Center for AI Safety',
      zh: '来自人工智能安全中心的$20,000 SafeBench奖'
    },
    integrations: [
      {
        href: 'https://github.com/NVIDIA/garak',
        label: { en: 'NVIDIA/garak', zh: 'NVIDIA/garak' }
      },
      {
        href: 'https://github.com/microsoft/PyRIT',
        label: { en: 'Microsoft\'s PyRIT', zh: 'Microsoft\'s PyRIT' }
      }
    ]
  },
  {
    id: 'agrail',
    badge: 'ACL\'2025',
    badgeLogo: '/images/conference/ACL.svg.png',
    image: '/images/publications/agrail.png',
    alt: 'AGrail',
    authors: '<span class="highlight"><strong>Weidi Luo</strong></span>, Shenghong Dai, Xiaogeng Liu, Suman Banerjee, Huan Sun, Muhao Chen, Chaowei Xiao',
    title: {
      en: '<em>AGrail: A Lifelong Agent Guardrail with Effective and Adaptive Safety Detection</em>',
      zh: '<em>AGrail: 具有有效和自适应安全检测的终身智能体护栏</em>'
    },
    links: [
      { href: 'https://arxiv.org/abs/2502.11448', label: { en: '[Paper]', zh: '[论文]' } },
      { href: 'https://eddyluo1232.github.io/AGrail/', label: { en: '[Project Page]', zh: '[项目页面]' } },
      { href: 'https://github.com/EddyLuo1232/AGrail4Agent', label: { en: '[Code]', zh: '[代码]' } }
    ]
  },
  {
    id: 'dynamic-safeguards',
    badge: 'NAACL\'2025',
    badgeLogo: '/images/conference/ACL.svg.png',
    image: '/images/publications/teaser.png',
    alt: 'Dynamic Safeguards',
    authors: '<span class="highlight"><strong>Weidi Luo*</strong></span>, He Cao*, Yu Wang, Zijing Liu, Aidan Wong, Bin Feng, Yuan Yao, Yu Li',
    title: {
      en: '<em>Dynamic Guided and Domain Applicable Safeguards for Enhanced Security in Large Language Models</em>',
      zh: '<em>面向大语言模型增强安全性的动态引导和领域适用性防护措施</em>'
    },
    links: [
      { href: 'https://arxiv.org/abs/2410.17922', label: { en: '[Paper]', zh: '[论文]' } },
      { href: 'https://github.com/IDEA-XL/G4D', label: { en: '[Code]', zh: '[代码]' } }
    ]
  },
  {
    id: 'memory-reasoning',
    badge: 'ACL\'2025',
    badgeLogo: '/images/conference/ACL.svg.png',
    image: '/images/publications/overview.png',
    alt: 'Memory and Reasoning',
    authors: 'Mingyu Jin, <span class="highlight"><strong>Weidi Luo</strong></span>, Sitao Cheng, Xinyi Wang, Wenyue Hua, Ruixiang Tang, William Yang Wang, Yongfeng Zhang',
    title: {
      en: '<em>Disentangling Memory and Reasoning Ability in Large Language Models</em>',
      zh: '<em>解耦大语言模型中的记忆与推理能力</em>'
    },
    links: [
      { href: 'https://arxiv.org/abs/2411.13504', label: { en: '[Paper]', zh: '[论文]' } },
      { href: 'https://github.com/MingyuJ666/Disentangling-Memory-and-Reasoning', label: { en: '[Code]', zh: '[代码]' } }
    ]
  }
];

// Pre-prints
export const preprints: Publication[] = [
  {
    id: 'agentlens',
    badge: 'Arxiv',
    badgeLogo: '/images/conference/Arxiv.jpeg',
    image: '/images/publications/agentlens.png',
    alt: 'AgentLens',
    authors: '<span class="highlight"><strong>Weidi Luo</strong></span>, Qiming Zhang, Yihao Quan, Mingyu Jin, Jie Cai, Chaowei Xiao, Jingcheng Niu, Zhen Xiang',
    title: {
      en: '<em>AgentLens: Interpretable Safety Steering via Mechanistic Subspaces for Multi-Turn Coding Agent</em>',
      zh: '<em>AgentLens: 通过机械性子空间实现多轮代码智能体的可解释安全引导</em>'
    },
    links: [
      { href: 'https://arxiv.org/pdf/2606.22673', label: { en: '[Paper]', zh: '[论文]' } },
      { href: 'https://github.com/EddyLuo1232/AgentLens', label: { en: '[Code]', zh: '[代码]' } }
    ]
  },
  {
    id: 'foodguardbench',
    badge: 'Arxiv',
    badgeLogo: '/images/conference/Arxiv.jpeg',
    image: '/images/publications/foodguardbench.png',
    alt: 'FoodGuardBench',
    authors: '<span class="highlight"><strong>Weidi Luo*</strong></span>, Xiaofei Wen*, Tenghao Huang*, Hongyi Wang, Zhen Xiang, Chaowei Xiao, Kristina Gligorić, Muhao Chen',
    title: {
      en: '<em>Cooking Up Risks: Benchmarking and Reducing Food Safety Risks in Large Language Models</em>',
      zh: '<em>烹饪风险：大语言模型中食品安全风险的基准测试与缓解</em>'
    },
    links: [
      { href: 'https://arxiv.org/pdf/2604.01444', label: { en: '[Paper]', zh: '[论文]' } },
      { href: 'https://github.com/tenghaohuang/FoodGuardBench', label: { en: '[Code]', zh: '[代码]' } }
    ]
  },
  {
    id: 'advcua',
    badge: 'Arxiv',
    badgeLogo: '/images/conference/Arxiv.jpeg',
    image: '/images/publications/advcua.png',
    alt: 'AdvCUA',
    authors: '<span class="highlight"><strong>Weidi Luo</strong></span>, Qiming Zhang, Tianyu Lu, Xiaogeng Liu, CHIU Hung Chun, Siyuan Ma, Bin Hu, Yizhe Zhang, Xusheng Xiao, Yinzhi Cao, Zhen Xiang, Chaowei Xiao',
    title: {
      en: '<em>Code Agent can be an End-to-end System Hacker: Benchmarking Real-world Threats of Computer-use Agent</em>',
      zh: '<em>代码智能体可以成为端到端的系统黑客：计算机使用智能体的真实世界威胁基准测试</em>'
    },
    links: [
      { href: 'https://arxiv.org/abs/2510.06607', label: { en: '[Paper]', zh: '[论文]' } },
      { href: 'https://eddyluo.com/AdvCUA/', label: { en: '[Project Page]', zh: '[项目页面]' } },
      { href: 'https://github.com/EddyLuo1232/VRAP', label: { en: '[Code]', zh: '[代码]' } }
    ]
  },
  {
    id: 'visual-roleplay',
    badge: 'Arxiv',
    badgeLogo: '/images/conference/Arxiv.jpeg',
    image: '/images/publications/vrp.png',
    alt: 'Visual-RolePlay',
    authors: 'Siyuan Ma*, <span class="highlight"><strong>Weidi Luo*</strong></span>, Yu Wang, Xiaogeng Liu, Muhao Chen, Bo Li, Chaowei Xiao',
    title: {
      en: '<em>Visual-RolePlay: Universal Jailbreak Attack on MultiModal Large Language Models via Role-playing Image Character</em>',
      zh: '<em>Visual-RolePlay: 通过角色扮演图像字符对多模态大语言模型的通用越狱攻击</em>'
    },
    links: [
      { href: 'https://arxiv.org/abs/2405.20773', label: { en: '[Paper]', zh: '[论文]' } },
      { href: 'https://github.com/SiyuanMaCS/VisualRoleplay', label: { en: '[Code]', zh: '[代码]' } }
    ]
  }
];
