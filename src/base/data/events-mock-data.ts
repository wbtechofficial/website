export interface EventItem {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  time: string;
  location: string;
  attendees: string;
  category: string;
  imageUrl: string;
  link: string;
}

export const EVENTS: EventItem[] = [
  {
    id: "event-1",
    title: "React Kolkata Meetup #18: High-Performance Web Apps",
    excerpt: "Deep-dives on React 19 Server Components, Tailwind v4 & WebAssembly with lightning demos.",
    date: "22 Feb 2026",
    time: "10:00 AM IST",
    location: "TechHub, Sector V",
    attendees: "150+ builders",
    category: "Meetup",
    imageUrl: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=80",
    link: "/article/meetup-1",
  },
  {
    id: "event-2",
    title: "KolkataJS Conf 2026 — Call for Proposals Open",
    excerpt: "Eastern India's largest JS conference returns this winter. Talks on engines, UI & AI.",
    date: "15 Mar 2026",
    time: "CFP Open",
    location: "Biswa Bangla Convention",
    attendees: "500+ devs",
    category: "Conference",
    imageUrl: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=1200&q=80",
    link: "/article/meetup-2",
  },
  {
    id: "event-3",
    title: "Bengal AI Hackathon: Build Indic Language Tools",
    excerpt: "48-hour hackathon to build datasets & apps for Bengali OCR, voice & translation.",
    date: "05 Apr 2026",
    time: "9:00 AM IST",
    location: "New Town, Kolkata",
    attendees: "300+ hackers",
    category: "Hackathon",
    imageUrl: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1200&q=80",
    link: "#",
  },
  {
    id: "event-4",
    title: "Open Source Sprint: Contribute to DevStudio & More",
    excerpt: "Hands-on sprint for first-time contributors. Pair with maintainers & ship PRs.",
    date: "18 Apr 2026",
    time: "11:00 AM IST",
    location: "Salt Lake, Kolkata",
    attendees: "80+ contributors",
    category: "Sprint",
    imageUrl: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80",
    link: "#",
  },
];
