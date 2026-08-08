export interface ArticleSection {
  id: string;
  title: string;
  content: string[];
}

export interface ArticleItem {
  id: string;
  slug: string;
  category: "news" | "startups" | "opensource" | "meetups" | "jobs";
  categoryLabel: string;
  title: string;
  excerpt: string;
  imageUrl: string;
  authorName: string;
  authorRole: string;
  authorAvatarText: string;
  authorAvatarUrl?: string;
  date: string;
  readingTime: string;
  link: string;
  gradient: string;
  isFeatured?: boolean;
  sections: ArticleSection[];
  toc: { id: string; title: string }[];
  tags: string[];
}

export const MOCK_ARTICLES: ArticleItem[] = [
  {
    id: "news-1",
    slug: "react-kolkata-unveils-west-bengal-tech",
    category: "news",
    categoryLabel: "Ecosystem Initiative",
    title: "React Kolkata Unveils the west-bengal.tech Initiative to Empower Local Developers",
    excerpt:
      "A community-driven digital hub crafted to showcase West Bengal's talent, spotlight local startups, drive open-source contributions, and host the definitive tech job directory.",
    imageUrl:
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1600&q=80",
    authorName: "React Kolkata Team",
    authorRole: "Core Community Guild",
    authorAvatarText: "RK",
    date: "17 Jan 2026",
    readingTime: "5 min read",
    link: "/article/news-1",
    gradient: "from-violet-600 via-indigo-600 to-purple-800",
    isFeatured: true,
    tags: ["React", "Community", "WestBengalTech", "OpenSource"],
    toc: [
      { id: "vision", title: "The Vision Behind West Bengal Tech" },
      { id: "pillars", title: "Core Community Pillars" },
      { id: "ecosystem", title: "Empowering Local Ecosystems" },
      { id: "get-involved", title: "How Developers Can Get Involved" },
    ],
    sections: [
      {
        id: "vision",
        title: "The Vision Behind West Bengal Tech",
        content: [
          "West Bengal has long been an incubator for intellectual brilliance and technical curiosity. From prestigious academic institutions to thriving engineering hubs in Salt Lake Sector V and New Town, the region boasts an impressive concentration of engineering talent.",
          "However, developer communities, open-source projects, and regional startup stories have often remained fragmented across disparate social channels. The west-bengal.tech initiative was born out of a collective passion within the React Kolkata community to unify this ecosystem under a singular, high-performance digital platform.",
          "Our primary objective is clear: create a transparent, inclusive, and modern community forum where developers can discover fresh perspectives, publish high-impact articles, showcase open-source projects, and connect directly with hiring startups across West Bengal.",
        ],
      },
      {
        id: "pillars",
        title: "Core Community Pillars",
        content: [
          "To serve the diverse needs of developers, students, and technology leaders, the platform is anchored by four foundational pillars:",
          "• Technical Articles & Insights: An open platform for deep-dive tutorials, system architecture breakdowns, and technology reviews authored by regional builders.",
          "• Startup & Project Spotlights: Dedicated showcase spaces highlighting innovative startups founded in Kolkata, Durgapur, Siliguri, and across Bengal.",
          "• Open Source Directory: A curated registry of regional open-source repositories, making it effortless for developers to contribute and collaborate.",
          "• Verified Tech Jobs: Direct listings for high-growth frontend, backend, AI, and cloud engineering positions without recruiter noise.",
        ],
      },
      {
        id: "ecosystem",
        title: "Empowering Local Ecosystems",
        content: [
          "In modern software development, proximity and active peer networks are vital for career acceleration. By building a unified digital pulse, we enable early-stage engineering students to learn alongside senior staff engineers and startup founders.",
          "Through regular technical write-ups, community meetups, and collaborative open-source projects, west-bengal.tech bridges the gap between regional talent and global opportunities.",
        ],
      },
      {
        id: "get-involved",
        title: "How Developers Can Get Involved",
        content: [
          "Getting involved is completely open and community-driven. Whether you wish to submit a blog post detailing your latest technical challenge, register your open-source library, or join our community Discord, your contribution matters.",
          "Visit our project submissions portal or connect with us at the next React Kolkata monthly meetup to take an active role in shaping the future of tech in West Bengal.",
        ],
      },
    ],
  },
  {
    id: "meetup-1",
    slug: "react-kolkata-meetup-18-announcement",
    category: "meetups",
    categoryLabel: "Meetup",
    title: "React Kolkata Meetup #18: Building Modern High-Performance Web Apps",
    excerpt:
      "Join our quarterly in-person developer meetup in Sector V, Salt Lake. Experience deep-dive technical talks, lightning demos, and network with 150+ builders.",
    imageUrl:
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=80",
    authorName: "Zafor Iqbal",
    authorRole: "Event Lead, ReactKolkata",
    authorAvatarText: "ZI",
    date: "17 Jan 2026",
    readingTime: "4 min read",
    link: "/article/meetup-1",
    gradient: "from-amber-500 to-orange-600",
    tags: ["React 19", "Meetup", "WebDev", "Kolkata"],
    toc: [
      { id: "agenda", title: "Event Agenda & Talk Lineup" },
      { id: "location", title: "Venue & Access Details" },
      { id: "networking", title: "Networking & Demos" },
    ],
    sections: [
      {
        id: "agenda",
        title: "Event Agenda & Talk Lineup",
        content: [
          "We are thrilled to announce React Kolkata Meetup #18! This session focuses on the real-world application of React 19 Server Components, Tailwind CSS v4 design systems, and WebAssembly in browser engines.",
          "Our featured speakers include lead engineers from regional scale-ups as well as active open-source maintainers. Each talk is designed to provide actionable patterns you can integrate immediately into your daily workflow.",
        ],
      },
      {
        id: "location",
        title: "Venue & Access Details",
        content: [
          "The meetup will take place at the TechHub Innovation Center, Sector V, Salt Lake City, Kolkata. Doors open at 10:00 AM with complimentary refreshments provided.",
        ],
      },
      {
        id: "networking",
        title: "Networking & Demos",
        content: [
          "After the keynote sessions, attendees will have dedicated time for 5-minute lightning project demos and open networking with local hiring managers and co-founders.",
        ],
      },
    ],
  },
  {
    id: "startup-1",
    slug: "bengal-ai-tech-spotlight",
    category: "startups",
    categoryLabel: "Startup Spotlight",
    title: "BengalAI Raises $1.2M Pre-Seed to Build Regional Language LLMs",
    excerpt:
      "Pioneering localized AI agents and domain-specific models for Indian regional languages. Check out their new open source LLM developer toolkit.",
    imageUrl:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80",
    authorName: "Aniket Sen",
    authorRole: "Tech Journalist",
    authorAvatarText: "AS",
    date: "15 Jan 2026",
    readingTime: "6 min read",
    link: "/article/startup-1",
    gradient: "from-emerald-500 to-teal-600",
    tags: ["AI", "LLM", "Startups", "Funding"],
    toc: [
      { id: "funding", title: "The Funding Milestone" },
      { id: "technology", title: "Regional Language Architecture" },
      { id: "roadmap", title: "Future Expansion" },
    ],
    sections: [
      {
        id: "funding",
        title: "The Funding Milestone",
        content: [
          "BengalAI, a deep-tech startup headquartered in Salt Lake Sector V, has successfully closed a $1.2M pre-seed funding round led by prominent angel syndicates.",
          "The funding will directly support the compute infrastructure needed to pre-train and fine-tune compact language models tailored specifically for Bengali and Eastern Indian vernaculars.",
        ],
      },
      {
        id: "technology",
        title: "Regional Language Architecture",
        content: [
          "Current global foundation models frequently suffer from tokenization inefficiencies when processing Indic scripts. BengalAI's custom tokenizer and attention layer optimizations achieve a 3.4x throughput increase for Bengali text processing.",
        ],
      },
      {
        id: "roadmap",
        title: "Future Expansion",
        content: [
          "The startup plans to open-source its Indic NLP toolkit next month, enabling developers across India to build context-aware conversational bots for healthcare, local governance, and e-commerce.",
        ],
      },
    ],
  },
  {
    id: "opensource-1",
    slug: "devstudio-draggable-dashboard-builder",
    category: "opensource",
    categoryLabel: "Open Source",
    title: "DevStudio: A Draggable Component Dashboard Builder for React",
    excerpt:
      "A lightweight, highly extensible dashboard builder library for React and Next.js that lets builders deploy custom control panels in minutes.",
    imageUrl:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80",
    authorName: "Priyanka Roy",
    authorRole: "Maintainer",
    authorAvatarText: "PR",
    date: "12 Jan 2026",
    readingTime: "4 min read",
    link: "/article/opensource-1",
    gradient: "from-purple-500 to-pink-600",
    tags: ["React", "UI", "OpenSource", "GitHub"],
    toc: [
      { id: "overview", title: "What is DevStudio?" },
      { id: "features", title: "Key Technical Features" },
      { id: "getting-started", title: "Quickstart Guide" },
    ],
    sections: [
      {
        id: "overview",
        title: "What is DevStudio?",
        content: [
          "DevStudio is an open-source React grid library built to simplify complex dashboard creation. Created by developers in Kolkata, the project recently surpassed 5,000 stars on GitHub.",
        ],
      },
      {
        id: "features",
        title: "Key Technical Features",
        content: [
          "• Zero external dependencies outside React & CSS Grid.",
          "• Built-in responsive breakpoints and container queries.",
          "• Full ARIA screen-reader support out of the box.",
        ],
      },
      {
        id: "getting-started",
        title: "Quickstart Guide",
        content: [
          "Install with npm or pnpm in seconds: `npm i @devstudio/react-grid`. Integrates seamlessly with Next.js App Router and Server Components.",
        ],
      },
    ],
  },
  {
    id: "job-1",
    slug: "senior-frontend-engineer-bengalscale",
    category: "jobs",
    categoryLabel: "Job Directory",
    title: "Senior Frontend Engineer (React / TypeScript) at BengalScale",
    excerpt:
      "BengalScale is seeking a senior frontend engineer to architect next-generation analytics dashboards. Modern office in Sector V with flexible hybrid work options.",
    imageUrl:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80",
    authorName: "BengalScale HR",
    authorRole: "Talent Acquisition",
    authorAvatarText: "BS",
    date: "10 Jan 2026",
    readingTime: "3 min read",
    link: "/article/job-1",
    gradient: "from-cyan-500 to-sky-600",
    tags: ["Jobs", "Frontend", "TypeScript", "React"],
    toc: [
      { id: "role", title: "Role Description" },
      { id: "requirements", title: "Technical Requirements" },
      { id: "perks", title: "Benefits & Perks" },
    ],
    sections: [
      {
        id: "role",
        title: "Role Description",
        content: [
          "As a Senior Frontend Engineer at BengalScale, you will lead the design and implementation of customer-facing dashboards processing millions of daily analytics events.",
        ],
      },
      {
        id: "requirements",
        title: "Technical Requirements",
        content: [
          "• 4+ years of professional experience with React, TypeScript, and modern CSS architectures.",
          "• Deep understanding of browser performance optimization, bundle size analysis, and state management.",
        ],
      },
      {
        id: "perks",
        title: "Benefits & Perks",
        content: [
          "• Competitive salary package + equity options.",
          "• Modern campus workspace in Salt Lake Sector V with wellness allowances.",
        ],
      },
    ],
  },
  {
    id: "meetup-2",
    slug: "kolkatajs-conf-2026-cfp",
    category: "meetups",
    categoryLabel: "Meetup",
    title: "KolkataJS Conf 2026: Call for Proposals Now Open for Speakers",
    excerpt:
      "The largest JavaScript & Web Tech conference in Eastern India returns this winter. CFP is open for talks on JS engines, UI rendering, and AI web applications.",
    imageUrl:
      "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=1200&q=80",
    authorName: "KolkataJS Org",
    authorRole: "Conference Committee",
    authorAvatarText: "KJ",
    date: "08 Jan 2026",
    readingTime: "3 min read",
    link: "/article/meetup-2",
    gradient: "from-amber-500 to-orange-600",
    tags: ["JavaScript", "Conference", "CFP", "Kolkata"],
    toc: [
      { id: "about", title: "About KolkataJS Conf" },
      { id: "submission", title: "Submission Guidelines" },
    ],
    sections: [
      {
        id: "about",
        title: "About KolkataJS Conf",
        content: [
          "KolkataJS Conf gathers over 500 web developers, cloud architects, and tech enthusiasts. We invite proposals for 30-minute keynotes and 15-minute lightning sessions.",
        ],
      },
      {
        id: "submission",
        title: "Submission Guidelines",
        content: [
          "Submit your talk outline before September 30. Travel grants and accommodation stipends are available for selected out-of-station speakers.",
        ],
      },
    ],
  },
  {
    id: "news-2",
    slug: "sector-v-fiber-upgrades",
    category: "news",
    categoryLabel: "Development News",
    title: "Sector V Tech Parks Receive Fiber Optic Upgrades & Co-Working Hubs",
    excerpt:
      "A new public-private infrastructure initiative is deploying ultra-high-speed fiber networks and modern co-working spaces across Salt Lake and New Town.",
    imageUrl:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80",
    authorName: "EcoDev WB",
    authorRole: "Infrastructure Desk",
    authorAvatarText: "ED",
    date: "05 Jan 2026",
    readingTime: "4 min read",
    link: "/article/news-2",
    gradient: "from-zinc-500 to-slate-600",
    tags: ["Infrastructure", "SectorV", "TechPark"],
    toc: [
      { id: "details", title: "Infrastructure Details" },
      { id: "impact", title: "Impact on Local Tech Companies" },
    ],
    sections: [
      {
        id: "details",
        title: "Infrastructure Details",
        content: [
          "The upgraded fiber ring provides redundant 10Gbps symmetrical connectivity across Sector V and New Town Action Area 1.",
        ],
      },
      {
        id: "impact",
        title: "Impact on Local Tech Companies",
        content: [
          "Startup incubators and IT firms will benefit from zero-latency cloud interconnects and subsidized high-speed public Wi-Fi zones.",
        ],
      },
    ],
  },
];

// Helper to get article by ID or Slug
export function getArticleByIdOrSlug(idOrSlug: string): ArticleItem | undefined {
  return MOCK_ARTICLES.find(
    (item) => item.id === idOrSlug || item.slug === idOrSlug
  );
}

export interface CardItem {
  id: string;
  category: "news" | "startups" | "opensource" | "meetups" | "jobs";
  categoryLabel: string;
  title: string;
  excerpt: string;
  authorName: string;
  authorAvatarText: string;
  date: string;
  link: string;
  gradient: string;
  imageUrl?: string;
  readingTime?: string;
}

export const MOCK_ITEMS: CardItem[] = MOCK_ARTICLES.map((article) => ({
  id: article.id,
  category: article.category,
  categoryLabel: article.categoryLabel,
  title: article.title,
  excerpt: article.excerpt,
  authorName: article.authorName,
  authorAvatarText: article.authorAvatarText,
  date: article.date,
  link: `/article/${article.id}`,
  gradient: article.gradient,
  imageUrl: article.imageUrl,
  readingTime: article.readingTime,
}));
