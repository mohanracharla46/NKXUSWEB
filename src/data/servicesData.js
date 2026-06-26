export const servicesCategoriesData = [
  {
    title: 'Website Design',
    id: 'website-design',
    description: 'Engineering visually stunning, high-performance web systems tailored for enterprise scaling.',
    prefix: 'WD',
    color: 'var(--text-primary)',
    items: [
      {
        id: 'website-development',
        title: 'Website Development',
        description: 'High-performance React & Next.js systems optimized for page speed and clean coding standards.',
        tech: ['Next.js', 'React', 'Vite', 'TypeScript'],
        metric: '0.2s TTI',
        code: 'WD-01',
        features: [
          'Server-Side Rendering (SSR) & Static Site Generation (SSG)',
          'Semantic SEO structure with zero hydration mismatch errors',
          'Component-driven architecture for rapid module updates',
          'Lighthouse auditing targeting 100/100 performance scores'
        ]
      },
      {
        id: 'website-redesign',
        title: 'Website Redesign',
        description: 'Overhauling existing layouts to improve conversion rates, refresh visual design, and maximize speed.',
        tech: ['UX Redesign', 'Audit', 'Tailwind CSS'],
        metric: '99+ Lighthouse',
        code: 'WD-02',
        features: [
          'Core Web Vitals diagnostic and bottleneck analysis',
          'Aesthetic overhaul aligned with luxury prestige brands',
          'Streamlining user pathways to boost conversion by 30%+',
          'Refactoring outdated codebases into modular, scalable React code'
        ]
      },
      {
        id: 'responsive-web-design',
        title: 'Responsive Web Design',
        description: 'Ensuring fluid rendering across mobile, tablet, laptop, and ultra-wide desktop viewport grids.',
        tech: ['Flexbox', 'CSS Grid', 'Media Queries'],
        metric: 'Mobile First',
        code: 'WD-03',
        features: [
          'Fluid layouts that render perfectly on 4K grids to 320px screens',
          'Touch-optimized interaction elements and swiper frameworks',
          'Flexbox & CSS Grid modern responsive layout patterns',
          'Cross-browser rendering tests on Chrome, Safari, Edge, Firefox'
        ]
      },
      {
        id: 'wordpress-development',
        title: 'WordPress Development',
        description: 'Sleek custom WordPress storefronts and blogs engineered for modularity, custom Gutenberg blocks, and fast runtimes.',
        tech: ['PHP', 'Gutenberg', 'CMS'],
        metric: 'Secure Core',
        code: 'WD-04',
        features: [
          'Custom Gutenberg block development matching design tokens',
          'Speed-optimized theme layouts and database indexing',
          'Robust security configurations and automated spam defense',
          'Seamless API integrations with third-party ERP/CRM layers'
        ]
      },
      {
        id: 'website-maintenance',
        title: 'Website Maintenance',
        description: 'Regular security patching, performance checks, backups, and styling alignments for continuous uptime.',
        tech: ['Uptime Checks', 'Backups', 'Node updates'],
        metric: '99.9% Uptime',
        code: 'WD-05',
        features: [
          '24/7 automated uptime diagnostics and ping alerts',
          'Regular node package manager dependency updates and patch audits',
          'Secure daily database backups stored in cloud endpoints',
          'Immediate CSS bug fixes, graphic changes, and landing alignments'
        ]
      },
      {
        id: 'ecommerce-website',
        title: 'E-commerce Website',
        description: 'Robust online storefronts equipped with secure checkout pathways, inventory sync, and gateway integrations.',
        tech: ['Stripe', 'Shopify API', 'Tailwind CSS'],
        metric: '+35% Conv',
        code: 'WD-06',
        features: [
          'Secure Stripe, PayPal, and Apple Pay payment processing checkout',
          'Automated inventory synchronization and ERP catalog integrations',
          'High-performance cart actions with fast checkouts',
          'SEO optimized category catalogs and product details schema markup'
        ]
      },
      {
        id: 'windows-app-devt',
        title: 'Windows App Devt',
        description: 'Native desktop application engineering configured to operate efficiently on the Windows OS environment.',
        tech: ['C#', '.NET Core', 'WPF'],
        metric: 'Native Execution',
        code: 'WD-07',
        features: [
          'Native code compilation configured to leverage OS capabilities',
          'WPF & WinForms modern styling interfaces',
          'Hardware-accelerated rendering and background thread performance',
          'Full security permissions management and offline execution support'
        ]
      },
      {
        id: 'ui-ux-design',
        title: 'UI-UX Design',
        description: 'Wireframing, interactive mockup prototyping, and prestige visual styling built to express digital authority.',
        tech: ['Figma', 'Prototyping', 'Design System'],
        metric: 'Modern Aesthetics',
        code: 'WD-08',
        features: [
          'Detailed wireframing mapping user click paths and hierarchies',
          'Prestige interactive mockup prototyping built inside Figma',
          'Strict Design Token definitions covering typography, colors, padding',
          'Comprehensive component specification handover for frontend dev'
        ]
      }
    ]
  },
  {
    title: 'Digital Marketing',
    id: 'digital-marketing',
    description: 'Data-driven marketing architecture designed to scale client acquisition funnels and boost search dominance.',
    prefix: 'DM',
    color: 'var(--text-primary)',
    items: [
      {
        id: 'seo-services',
        title: 'SEO services',
        description: 'Holistic SEO strategy mapping target intent keywords to achieve top rankings and organic growth loops.',
        tech: ['Ahrefs', 'Semrush', 'Keywords'],
        metric: '1st Page Targets',
        code: 'DM-01',
        features: [
          'Target user intent search keyword mapping and competitor audits',
          'Organic traffic scaling and rank growth strategies',
          'Comprehensive monthly rankings progress report summaries',
          'Technical crawls to resolve broken references and index blocks'
        ]
      },
      {
        id: 'seo-on-page',
        title: 'SEO On-Page',
        description: 'Optimizing internal content, heading hierarchies, meta tags, and structured schemas for crawl eligibility.',
        tech: ['Schema.org', 'Meta tags', 'JSON-LD'],
        metric: 'Rich Snippets',
        code: 'DM-02',
        features: [
          'Structured JSON-LD schema config for rich search results snippet eligibility',
          'Precise content styling and H1-H6 heading hierarchy audits',
          'Meta title, meta description, and alt tag placement',
          'Internal link hierarchy audits to distribute ranking authority'
        ]
      },
      {
        id: 'seo-off-page',
        title: 'SEO Off-Page',
        description: 'High-authority backlink architecture and digital citation syndication to expand brand search metrics.',
        tech: ['Link Building', 'Citators', 'Domain Auth'],
        metric: 'DA/DR Scaling',
        code: 'DM-03',
        features: [
          'Acquisition of high Domain Authority (DA) link placements',
          'Geographical citation directories setup and syncing',
          'Strategic guest posting and content amplification campaigns',
          'Removal of toxic backlinks that impact organic index metrics'
        ]
      },
      {
        id: 'search-engine-marketing',
        title: 'Search Engine Marketing',
        description: 'Yield-optimized search campaigns built to target high-intent customers, lowering acquisition spend.',
        tech: ['Google Ads', 'Bid Modifiers', 'GA4'],
        metric: 'High ROAS',
        code: 'DM-04',
        features: [
          'Yield-optimized Google Ads structures targeting purchase-intent queries',
          'Daily bidding modifiers configuration and ad copy testing splits',
          'Precise conversion metrics configuration using GA4 tracking tag layers',
          'Smart negative-matching keyword management to trim budget waste'
        ]
      },
      {
        id: 'social-media-optimization',
        title: 'Social Media Optimization',
        description: 'Organic profile alignment and share-loop structures to establish consistent authority on social platforms.',
        tech: ['SMO Loops', 'Audience Growth', 'Banners'],
        metric: '+150% Reach',
        code: 'DM-05',
        features: [
          'Organic profile banners, biographies, and messaging alignment',
          'Viral content loop structures to maximize share-based impressions',
          'Strategic publishing calendars built for social algorithm preferences',
          'Consistent community interactions to cement brand loyalty'
        ]
      },
      {
        id: 'social-media-marketing',
        title: 'Social Media Marketing',
        description: 'Paid social funnels structured to capture demographical intent, build retargeting loops, and generate leads.',
        tech: ['Meta Ads', 'Pixel tracking', 'Audiences'],
        metric: '-28% CPL',
        code: 'DM-06',
        features: [
          'High-performance paid social funnels on Instagram, Facebook, LinkedIn',
          'Meta Pixel tracking setups to compile exact conversion analytics',
          'Precise demographic and interest-based audience structuring',
          'Layered retargeting cycles to move prospects from awareness to purchase'
        ]
      },
      {
        id: 'orm',
        title: 'ORM (Reputation Management)',
        description: 'Automated review reminders, rating systems, and citation monitoring to command consumer brand trust.',
        tech: ['Yext', 'Review Autopilot', 'GBP'],
        metric: '4.9/5.0 Goal',
        code: 'DM-07',
        features: [
          'Strategic Yext & GBP syncing covering all branding profiles',
          'Automated review reminders setup integrated into checkout/support',
          'Rapid response systems for positive review collection and negative control',
          'Audit and removal of fake reviews that damage consumer trust'
        ]
      },
      {
        id: 'pay-per-click-advertising',
        title: 'Pay Per Click Advertising',
        description: 'Precision PPC campaign configuration with daily monitoring, negative matching, and visual copy splits.',
        tech: ['PPC Ads', 'Bid Management', 'Analytics'],
        metric: 'Max Conversions',
        code: 'DM-08',
        features: [
          'End-to-end PPC administration across search engine and display channels',
          'Continuous A/B copy tests covering visual banners and heading scripts',
          'Yield tracking connecting ad clicks to direct sales value pipelines',
          'Weekly budget adjustments to redirect funds into top converting channels'
        ]
      }
    ]
  },
  {
    title: 'Email Services',
    id: 'email-services',
    description: 'Corporate email hosting and workspace integrations to secure team communications under custom domains.',
    prefix: 'EM',
    color: 'var(--text-primary)',
    items: [
      {
        id: 'g-suite',
        title: 'G-Suite',
        description: 'Professional domain email configuration and onboarding for Google Workspace collaboration tools.',
        tech: ['Workspace', 'MX records', 'Admin console'],
        metric: 'Zero Spam',
        code: 'EM-01',
        features: [
          'Professional domain email addresses setup (name@yourdomain.com)',
          'Precise DNS routing covering MX, SPF, DKIM, and DMARC parameters',
          'Onboarding and configuration of Google Drive, Meet, and Calendar layers',
          'Security console configuration with strict access policies'
        ]
      },
      {
        id: 'microsoft-office-365',
        title: 'Microsoft Office 365',
        description: 'Enterprise Outlook email setup, DNS record routing, and OneDrive suite provisioning.',
        tech: ['Office 365', 'DNS config', 'Exchange'],
        metric: 'Secure Cloud',
        code: 'EM-02',
        features: [
          'Microsoft Exchange migration and admin panel routing',
          'Provisioning of OneDrive, SharePoint, and Teams collaborations',
          'Security configs preventing phishing attempts and unauthorized logins',
          'Outlook desktop and mobile setup across team viewport machines'
        ]
      },
      {
        id: 'zoho-email-services',
        title: 'Zoho Email Services',
        description: 'Secure, cost-effective custom domain email setups optimized for growing organizations.',
        tech: ['Zoho Mail', 'DKIM/SPF', 'Control Panel'],
        metric: '100% Secure',
        code: 'EM-03',
        features: [
          'High-performance custom domain configuration on Zoho Mail servers',
          'SPF, DKIM, DMARC security handshakes preventing email spoofing',
          'Modular admin console setups for user creation and group management',
          'Seamless Zoho CRM mail integration linking leads with interactions'
        ]
      }
    ]
  },
  {
    title: 'Creative Communications',
    id: 'creative-communications',
    description: 'Premium visual brand assets, motion design, and video editing to articulate your authority.',
    prefix: 'CC',
    color: 'var(--text-primary)',
    items: [
      {
        id: 'graphic-design',
        title: 'Graphic Design',
        description: 'Custom promotional vectors, banners, and digital marketing creatives tailored to custom brand guidelines.',
        tech: ['Illustrator', 'Photoshop', 'Brand Assets'],
        metric: 'High Definition',
        code: 'CC-01',
        features: [
          'Vibrant vector and promotional graphic design assets',
          'Banners, social creatives, and landing graphics',
          'Consistency matching typography, color hex values, and margins',
          'Handover of layered vector format source files (AI, PSD, Figma)'
        ]
      },
      {
        id: 'logo-design',
        title: 'Logo Design',
        description: 'Vector logo design systems custom-engineered to communicate corporate identity and luxury prestige.',
        tech: ['Vector Design', 'Tokens', 'Brand Book'],
        metric: 'Prestige Marks',
        code: 'CC-02',
        features: [
          'Concept sketching representing core values and industry prestige',
          'Vector formats scalable from ultra-wide banners to app favicons',
          'Branding rules mapping exact placement parameters',
          'Delivery of print and digital formats (SVG, PDF, PNG, AI)'
        ]
      },
      {
        id: 'brochure-design',
        title: 'Brochure Design',
        description: 'Cinematic layout composition for print-ready catalog files and interactive digital PDF books.',
        tech: ['InDesign', 'Layout Grid', 'Interactive PDF'],
        metric: 'Premium Print',
        code: 'CC-03',
        features: [
          'Layout designs covering print catalogs and annual report booklets',
          'High definition vector layout matching modern margin rules',
          'Color code configurations for correct offset printing',
          'Interactive digital PDFs featuring clickable links and pagination indexes'
        ]
      },
      {
        id: 'intro-videos-creation',
        title: 'Intro Videos Creation',
        description: 'Cinematic corporate intro motion graphics, keyframe transitions, and professional video hooks.',
        tech: ['Premiere Pro', 'After Effects', 'Audition'],
        metric: '4K Renders',
        code: 'CC-04',
        features: [
          'Cinematic introductory motion graphics that hook viewer attention',
          'Fluid transition editing and precise sound design alignments',
          'Color grading and visual corrections matching company branding',
          'Delivery of files formatted for social channels and website embeds'
        ]
      }
    ]
  }
];

export const allServices = servicesCategoriesData.flatMap(cat => 
  cat.items.map(item => ({ ...item, categoryColor: cat.color, categoryId: cat.id, categoryTitle: cat.title }))
);
