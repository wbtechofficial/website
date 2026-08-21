export interface CompanyItem {
  id: string;
  name: string;
  tagline: string;
  location: string;
  size: string;
  category: string;
  openRoles: number;
  techStack: string[];
  logoText: string;
  link: string;
}

export const COMPANIES: CompanyItem[] = [
  {
    id: "company-1",
    name: "BengalScale",
    tagline: "Real-time analytics & cloud data pipelines for enterprise scale.",
    location: "New Town, Kolkata",
    size: "150-300",
    category: "Cloud Infrastructure",
    openRoles: 8,
    techStack: ["React", "Go", "Kubernetes"],
    logoText: "BS",
    link: "#",
  },
  {
    id: "company-2",
    name: "Salt Lake Labs",
    tagline: "Deep-tech R&D lab pioneering Indic language AI research.",
    location: "Salt Lake Sector V",
    size: "50-100",
    category: "AI Research",
    openRoles: 5,
    techStack: ["Python", "PyTorch", "Rust"],
    logoText: "SL",
    link: "#",
  },
  {
    id: "company-3",
    name: "HealthKolkata",
    tagline: "Telemedicine platform connecting rural clinics with specialists.",
    location: "Kolkata & Durgapur",
    size: "80-150",
    category: "HealthTech",
    openRoles: 12,
    techStack: ["Next.js", "Node.js", "Postgres"],
    logoText: "HK",
    link: "#",
  },
  {
    id: "company-4",
    name: "TransitRadar",
    tagline: "Mobility OS powering Kolkata metro & bus live tracking.",
    location: "Sector V, Kolkata",
    size: "30-60",
    category: "Smart Mobility",
    openRoles: 4,
    techStack: ["PWA", "Maps", "Realtime"],
    logoText: "TR",
    link: "#",
  },
];
