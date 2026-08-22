export interface StudentProgramItem {
  id: string;
  title: string;
  description: string;
  provider: string;
  level: string;
  duration: string;
  learners: string;
  tags: string[];
  iconText: string;
  link: string;
}

export const STUDENT_PROGRAMS: StudentProgramItem[] = [
  {
    id: "student-1",
    title: "Campus Ambassador Program",
    description: "Represent westbengal.tech on your campus. Host workshops, grow your community.",
    provider: "React Kolkata Guild",
    level: "For All Years",
    duration: "6 Months",
    learners: "120+ ambassadors",
    tags: ["Leadership", "Community", "Events"],
    iconText: "CA",
    link: "#",
  },
  {
    id: "student-2",
    title: "Open Source Fellowship — Spring 2026",
    description: "12-week mentored fellowship to ship production open-source features with maintainers.",
    provider: "DevStudio & BengalAI",
    level: "Intermediate",
    duration: "12 Weeks",
    learners: "40 fellows",
    tags: ["GitHub", "React", " mentorship"],
    iconText: "OS",
    link: "#",
  },
  {
    id: "student-3",
    title: "Bengal Tech Mentorship Circles",
    description: "Small group mentorship with senior engineers from Salt Lake & New Town startups.",
    provider: "Community Mentors",
    level: "Beginner Friendly",
    duration: "8 Weeks",
    learners: "200+ mentees",
    tags: ["Career", "Resume", "Mock Interviews"],
    iconText: "MC",
    link: "#",
  },
  {
    id: "student-4",
    title: "Learn Web Dev: React to Production",
    description: "Free cohort-based course — from fundamentals to deploying Next.js apps on the edge.",
    provider: "KolkataJS & GDG",
    level: "Beginner",
    duration: "10 Weeks",
    learners: "800+ learners",
    tags: ["React", "Next.js", "Deploy"],
    iconText: "WD",
    link: "#",
  },
];
