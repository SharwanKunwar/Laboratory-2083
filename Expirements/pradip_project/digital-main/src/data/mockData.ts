import { ServiceItem, CoreValue } from '../types';

export const BRAND_ASSETS = {
  logo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBWkD0Hf4sKV6ybFLz2tU0O_p6TA9ewrAho7gBnNzy9mQ0dvboh3W2ohiNeROaIPogpvnD8xTqF_FJuQ8HXsdv9l_Kt3k5510fWnk0Dh-EMGRC7lNBRVQxXGXJ-wnovmx0Ia8okmmntcF8R2rW2gjj9ZUCiHoovJ2a4yY4n4OufCOFDj5bJqg8-jHQKOXiFEEg-8TOyoD4Du6RS3XEtAqDkP3uZcM3mQZ-bcnWOVhCyZPCLKXQ1apUOXBDTHc8AoY2kxBA',
  ceoPhoto: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBg64dNgmdlC0x0j-Kp1RnJjKM9mTtL_0vCL_V6CPFaT9yKEjVoyuOkGA01T_6To00w5q_WJsoGwWSvlGbu42jkQYS5LGTMFLFqJjij5LmOLkv15Etpkh3REvKcH8gTONSpCBx8Oyjnlby233UP-7W5_1fn2qacXlHlvPmfkgbIiH-K42zfJsfHrZgncN9IoXbfK_ALrgBhwv77_zwFK2w7JL9ggnCjMRQ5rs0NqoNTdKL_zoRefisIAKv-gl92iSvTbAY',
  dashboardHero: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAMABLEcbfin5EQF1DLiDxm9SVgGqv_zlDQHtEfOpyrBafhWx0a37xhVDqo5LrOTL8MaidY1xdQBwCe9vs_PuusElOKWte0i2xAYPBVD2_vub81tj7WGA8mj6IC7t2r76kpyYcgQ5IZs58E07pl3DY0r9_-9hSDyQE3NR7MQSbZMCGnh7-deVcyJA4xunaxOU2VZ5g6IEBqqbR66OiLE00Gz0Ssk8e6-vK5FCCxx1mY5xj6oEArHfq7CA',
  codeSnippet: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB1CqBiGYS5XjfekVE7RmbXmlMgPBgiDEnjZf92R2YoWhEymltPCstl0jYDRNSymfHnbASWA6vM-yu44XxsbZ9caWV9AjHsbdOs_odFEer7yjTxcQHuJzcDCDug7rejU2saorQgN2u2PCq_jK66p4LJ93NF_gqKN7k5hgw8Dc1B7XkzXQXYfgt5UZENZAW-LkRYbJkPo735vSheggCU1R8r0LSPt56-mnKtwJjbOX-noQNFe_oeodRNTA',
  patternBg: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAKJWhHGGb6FTcbIPW5GnBvOWKAfMcxU9Ir7UPmzbyhmrEJRuUrTRjJK0cFacHklNSn9RGba6lIp_YLTT8N97tQKOc57SKEcGDGtMhpy4ouxoFGwyY2NOwWdubGj7yJNJKACcYC8V_02KwrOEvTEieQpaQ9cKOn9zqAb_Txn09_24RJbZmMnK2WKNjlyOM8SIlw80WIGNdDQQnVJh_tZ27K2CCP3236P4oxGA_ljR7aCq692Mdp14Dyig'
};

export const CONTACT_INFO = {
  phone: '9763382200',
  email: 'apexnovadigital2026@gmail.com',
  social: 'fb page / linkedin',
  address: 'Kathmandu, Nepal',
  hours: {
    weekdays: '8:00 AM - 6:00 PM PST',
    saturday: '10:00 AM - 2:00 PM PST (Support Only)',
    sunday: 'Closed'
  }
};

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: 'web-development',
    title: 'Web Platforms',
    category: 'Web Engineering',
    description: 'Custom websites and web applications built for speed, security, and exceptional user experiences. We utilize modern frameworks to ensure your digital presence is robust and scalable.',
    icon: 'web',
    tags: ['React', 'Next.js', 'Node.js', 'TypeScript', 'Tailwind CSS'],
    features: [
      'Server-side rendering & static generation',
      'Micro-frontend & modular component design',
      'High-concurrency cloud deployments',
      'Sub-second page load optimization'
    ],
    deliverables: ['Production Web Portal', 'API Architecture', 'CMS Integration', 'Automated CI/CD Pipelines']
  },
  {
    id: 'mobile-development',
    title: 'Mobile App Development',
    category: 'Mobile Engineering',
    description: 'Native and cross-platform mobile applications designed to engage users seamlessly across devices. We deliver high performance across iOS and Android ecosystems.',
    icon: 'smartphone',
    tags: ['React Native', 'Swift', 'Kotlin', 'Flutter', 'GraphQL'],
    features: [
      'Offline-first sync engines',
      'Biometric authentication & keychains',
      'Push notification orchestration',
      'App Store & Play Store publication compliance'
    ],
    deliverables: ['iOS App (IPA)', 'Android App (APK/AAB)', 'Mobile Backend API', 'Analytics Dashboard']
  },
  {
    id: 'seo-services',
    title: 'Technical SEO & Performance',
    category: 'Digital Strategy',
    description: 'Data-driven search engine optimization strategies to increase your visibility, drive organic traffic, and improve your ranking on major search engines.',
    icon: 'search_insights',
    tags: ['Technical SEO', 'Content Strategy', 'Core Web Vitals', 'Analytics'],
    features: [
      'Core Web Vitals diagnostic & repair',
      'Structured schema markup & JSON-LD',
      'Sitemap & crawl budget optimization',
      'Enterprise keyword & competitor intelligence'
    ],
    deliverables: ['Audit Report', 'Schema Injection Plan', 'Monthly Ranking Analytics', 'Conversion Optimization Matrix']
  },
  {
    id: 'software-engineering',
    title: 'Custom Software Engineering',
    category: 'Enterprise Solutions',
    description: 'Bespoke system architecture and API integrations designed specifically to streamline your unique operational workflows and scale with business expansion.',
    icon: 'code_blocks',
    tags: ['Python', 'Java', 'Cloud Architecture', 'Docker', 'Kubernetes'],
    features: [
      'Event-driven microservices architecture',
      'Legacy system modernization & migration',
      'High-speed database indexing & caching',
      'Enterprise SSO & OAuth 2.0 security'
    ],
    deliverables: ['Custom Microservices', 'OpenAPI/Swagger Specs', 'Infrastructure as Code', 'SLA Support Framework']
  }
];

export const CORE_VALUES: CoreValue[] = [
  {
    title: 'Technical Precision',
    description: 'We demand exactness in our code and architecture, ensuring flawless execution across every deployment.',
    icon: 'precision_manufacturing'
  },
  {
    title: 'Visionary Agility',
    description: 'Adapting rapidly to emerging technologies while maintaining strategic long-term goals for enterprise growth.',
    icon: 'insights'
  },
  {
    title: 'Unwavering Reliability',
    description: 'Building trust through consistent, secure, and robust enterprise solutions engineered for maximum uptime.',
    icon: 'shield_locked'
  }
];

export const STATS_DATA = [
  { label: 'Years of Engineering Excellence', value: '3+' },
  { label: 'Enterprise Platforms Delivered', value: '10+' },
  { label: 'Infrastructure Uptime Guarantee', value: '99.99%' },
  { label: 'Client Value Accelerated', value: 'Rs. 1 Cr+' }
];

export const FAQ_DATA = [
  {
    question: 'How does Apex Nova Digital initiate a new enterprise project?',
    answer: 'We begin with an architecture discovery phase to map business objectives, technical constraints, and performance benchmarks. From there, we deliver a comprehensive blueprint before sprint execution.'
  },
  {
    question: 'Can Apex Nova Digital modernize an existing enterprise platform?',
    answer: 'Yes. We specialize in zero-downtime migrations, converting monolithic legacy systems into agile microservices or serverless cloud architectures.'
  },
  {
    question: 'What security standards are embedded in your software build pipeline?',
    answer: 'Every line of code undergoes automated static analysis, vulnerability scanning, OWASP compliance audits, and role-based access control (RBAC) verification.'
  },
  {
    question: 'How do I schedule a direct executive consultation with CEO Pradip Khadka?',
    answer: 'You can use the "Get a Consultation" button on our platform or submit an inquiry through our Contact page. Our executive leadership team reviews all incoming inquiries within 24 business hours.'
  }
];
