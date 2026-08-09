import {
  Home as HomeIcon,
  FileText,
  Rocket,
  Code2,
  Briefcase,
} from "lucide-react";

export const NAVIGATION_ITEMS = [
  { label: "Home", href: "/", icon: HomeIcon },
  { label: "Articles", href: "#featured-feed", icon: FileText },
  { label: "Startups", href: "#startups", icon: Rocket },
  { label: "Open Source", href: "#opensource", icon: Code2 },
  { label: "Jobs", href: "#updates", icon: Briefcase },
];
