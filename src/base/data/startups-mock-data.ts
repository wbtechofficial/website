export interface StartupItem {
  id: string;
  name: string;
  tagline: string;
  category: string;
  location: string;
  funding: string;
  founded: string;
  logoText: string;
  link: string;
}

export const STARTUPS: StartupItem[] = [
  {
    id: "bengal-ai",
    name: "BengalAI",
    tagline:
      "PioneeringIndic LLMs and domain-specific AI tokenizers for Indic regional languages.",
    category: "AI & DeepTech",
    location: "Salt Lake Sector V, Kolkata",
    funding: "$1.2M Pre-Seed",
    founded: "2025",
    logoText: "BAI",
    link: "/article/startup-1",
  },
  {
    id: "devstudio",
    name: "DevStudio",
    tagline:
      "Open-source draggable component dashboard builder for React & Next.js.",
    category: "Developer Tools",
    location: "Kolkata, WB",
    funding: "Bootstrapped",
    founded: "2024",
    logoText: "DS",
    link: "/article/opensource-1",
  },
  {
    id: "bengalscale",
    name: "BengalScale",
    tagline:
      "High-throughput cloud data pipelines and real-time analytics platforms.",
    category: "Cloud Infrastructure",
    location: "New Town, Kolkata",
    funding: "Series A",
    founded: "2023",
    logoText: "BS",
    link: "/article/job-1",
  },
  {
    id: "healthkolkata",
    name: "HealthKolkata",
    tagline:
      "Regional telemedicine platform connecting rural clinics with specialist doctors.",
    category: "HealthTech",
    location: "Durgapur & Kolkata",
    funding: "Seed Funded",
    founded: "2024",
    logoText: "HK",
    link: "/article/job-2",
  },
];
