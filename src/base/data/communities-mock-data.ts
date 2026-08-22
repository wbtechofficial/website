export interface CommunityItem {
  id: string;
  name: string;
  handle: string;
  description: string;
  members: string;
  focus: string[];
  location: string;
  iconText: string;
  link: string;
}

export const COMMUNITIES: CommunityItem[] = [
  {
    id: "comm-1",
    name: "React Kolkata",
    handle: "@reactkolkata",
    description: "Core guild powering westbengal.tech. Monthly meetups, open-source sprints & mentorship.",
    members: "1,200+ members",
    focus: ["React 19", "Next.js", "Design Systems"],
    location: "Sector V, Kolkata",
    iconText: "RK",
    link: "https://x.com/reactkolkata",
  },
  {
    id: "comm-2",
    name: "GDG Kolkata",
    handle: "@gdgkolkata",
    description: "Google Developer Group hosting Cloud, AI & Web Tech talks across Bengal campuses.",
    members: "3.4k members",
    focus: ["GCP", "Flutter", "GenAI"],
    location: "Kolkata & Siliguri",
    iconText: "GD",
    link: "#",
  },
  {
    id: "comm-3",
    name: "KolkataJS",
    handle: "@kolkatajs",
    description: "JavaScript community organizing KolkataJS Conf — Eastern India's largest JS conference.",
    members: "2.8k members",
    focus: ["JavaScript", "Node.js", "Tooling"],
    location: "Salt Lake, Kolkata",
    iconText: "KJ",
    link: "#",
  },
  {
    id: "comm-4",
    name: "AI Bengal Guild",
    handle: "@aibengal",
    description: "Researchers & engineers building Indic LLMs, datasets & AI for social good.",
    members: "900+ members",
    focus: ["LLMs", "Indic NLP", "MLOps"],
    location: "New Town, Kolkata",
    iconText: "AI",
    link: "#",
  },
];
