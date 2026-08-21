export interface DeveloperItem {
  id: string;
  name: string;
  role: string;
  location: string;
  avatarText: string;
  bio: string;
  skills: string[];
  contributions: string;
  github: string;
  link: string;
}

export const DEVELOPERS: DeveloperItem[] = [
  {
    id: "dev-1",
    name: "Aarav Sharma",
    role: "Staff Frontend Engineer @ BengalScale",
    location: "Salt Lake, Kolkata",
    avatarText: "AS",
    bio: "Building high-performance React dashboards & design systems. Maintainer of DevStudio grid.",
    skills: ["React", "Next.js", "TypeScript"],
    contributions: "5.2k stars",
    github: "@aaravsharma",
    link: "#",
  },
  {
    id: "dev-2",
    name: "Priyanka Roy",
    role: "Open Source Maintainer & UI Engineer",
    location: "New Town, Kolkata",
    avatarText: "PR",
    bio: "Creator of draggable dashboard builder. Passionate about accessible component libraries.",
    skills: ["React", "Tailwind", "a11y"],
    contributions: "35+ repos",
    github: "@priyankaroy",
    link: "#",
  },
  {
    id: "dev-3",
    name: "Subhashis Roy",
    role: "AI Researcher @ Salt Lake Labs",
    location: "Sector V, Kolkata",
    avatarText: "SR",
    bio: "Fine-tuning Indic LLMs for Bengali OCR & voice. Published 12 papers on NLP.",
    skills: ["Python", "PyTorch", "LLMs"],
    contributions: "1.8k stars",
    github: "@subhashis",
    link: "#",
  },
  {
    id: "dev-4",
    name: "Ananya Das",
    role: "Full Stack Engineer @ HealthKolkata",
    location: "Durgapur",
    avatarText: "AD",
    bio: "Telemedicine platform engineer. Loves WebAssembly & edge rendering patterns.",
    skills: ["Node.js", "Go", "WASM"],
    contributions: "40+ PRs",
    github: "@ananyadas",
    link: "#",
  },
];
