export interface ProjectTag {
  label: string;
  category: "tech" | "eco" | "ai" | "web" | "mobile";
}

export interface ProjectItem {
  id: string;
  title: string;
  slug: string;
  brandBadge: string;
  tagline: string;
  description: string;
  imageUrl: string;
  authorName: string;
  authorAvatar: string;
  authorRole: string;
  date: string;
  category: string;
  tags: ProjectTag[];
  upvotes: number;
  commentsCount: number;
  savesCount: number;
  isFeatured?: boolean;
  liveUrl?: string;
  githubUrl?: string;
}

export const MOCK_PROJECTS: ProjectItem[] = [
  {
    id: "proj-1",
    title: "ECO-HABITAT: Sustainable Modular Homes",
    slug: "eco-habitat-sustainable-homes",
    brandBadge: "ECO-HABITAT",
    tagline: "Revolutionizing affordable living with modular, eco-friendly homes.",
    description:
      "Revolutionizing affordable living with modular, eco-friendly homes using sustainable materials & smart energy solutions. Explore 100+ designs engineered for tropical climates.",
    imageUrl:
      "https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&w=1200&q=80",
    authorName: "Alex Chen",
    authorAvatar: "AC",
    authorRole: "Sustainable Architect & Lead Dev",
    date: "May 15, 2024",
    category: "Sustainability & Tech",
    tags: [
      { label: "Modular Living", category: "eco" },
      { label: "Eco-Friendly", category: "eco" },
      { label: "Smart Home", category: "tech" },
    ],
    upvotes: 1435,
    commentsCount: 122,
    savesCount: 89,
    isFeatured: true,
    liveUrl: "https://eco-habitat.example.com",
    githubUrl: "https://github.com/reactkolkata/eco-habitat",
  },
  {
    id: "proj-2",
    title: "BENGAL-AI: High-Precision Indic LLM Engine",
    slug: "bengal-ai-indic-llm",
    brandBadge: "BENGAL-AI",
    tagline: "Open-weights Indic language model optimized for regional dialects.",
    description:
      "A lightweight, fine-tuned transformer model specializing in Bengali and Hindi technical translation, OCR digitization of historical manuscripts, and voice synthesis.",
    imageUrl:
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80",
    authorName: "Subhashis Roy",
    authorAvatar: "SR",
    authorRole: "AI Researcher @ Salt Lake Labs",
    date: "Jun 02, 2024",
    category: "Artificial Intelligence",
    tags: [
      { label: "Indic LLM", category: "ai" },
      { label: "Open Weights", category: "ai" },
      { label: "NLP Bengal", category: "tech" },
    ],
    upvotes: 2140,
    commentsCount: 184,
    savesCount: 156,
    isFeatured: true,
    liveUrl: "https://bengal-ai.example.com",
    githubUrl: "https://github.com/reactkolkata/bengal-ai",
  },
  {
    id: "proj-3",
    title: "KOLKATA-TRANSIT: Live Commute & Metro Radar",
    slug: "kolkata-transit-metro-radar",
    brandBadge: "METRO-RADAR",
    tagline: "Real-time crowdsourced transit tracker for Kolkata metro and buses.",
    description:
      "Progressive Web App delivering real-time train arrivals, AC bus GPS telemetry, and river ferry schedules with offline caching for daily suburban commuters.",
    imageUrl:
      "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1200&q=80",
    authorName: "Priya Banerjee",
    authorAvatar: "PB",
    authorRole: "Full Stack Engineer",
    date: "Apr 28, 2024",
    category: "Smart Mobility",
    tags: [
      { label: "PWA", category: "web" },
      { label: "Realtime GPS", category: "mobile" },
      { label: "Open Data", category: "tech" },
    ],
    upvotes: 980,
    commentsCount: 64,
    savesCount: 72,
    isFeatured: false,
    liveUrl: "https://transit.example.com",
    githubUrl: "https://github.com/reactkolkata/kolkata-transit",
  },
  {
    id: "proj-4",
    title: "DEV-DOCK: Cloud Microservices Studio",
    slug: "dev-dock-microservices-studio",
    brandBadge: "DEV-DOCK",
    tagline: "Zero-config local Kubernetes emulator and visual API designer.",
    description:
      "Accelerating local dev workflows with instant container sandboxes, mock GraphQL endpoints, and live performance profiling for microservices developers.",
    imageUrl:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80",
    authorName: "Arka Sengupta",
    authorAvatar: "AS",
    authorRole: "DevOps Engineer",
    date: "Jul 11, 2024",
    category: "Developer Tools",
    tags: [
      { label: "Docker & K8s", category: "tech" },
      { label: "Developer UX", category: "web" },
      { label: "Rust Core", category: "tech" },
    ],
    upvotes: 1850,
    commentsCount: 145,
    savesCount: 110,
    isFeatured: true,
    liveUrl: "https://dev-dock.example.com",
    githubUrl: "https://github.com/reactkolkata/dev-dock",
  },
];
