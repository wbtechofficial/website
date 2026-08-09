import { Metadata } from "next";
import { ProjectShowcaseView } from "@/@module/projects/components/project-showcase-view";
import { MOCK_PROJECTS } from "@/base/data/projects-mock-data";

export const metadata: Metadata = {
  title: "Project Showcase | West Bengal Tech",
  description:
    "Discover, upvote, and explore innovative web applications, Indic AI engines, and developer tools built by software engineers across West Bengal.",
};

export default async function ProjectShowcasePage() {
  const initialProjects = MOCK_PROJECTS;

  return (
    <div className="py-8 sm:py-12">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ProjectShowcaseView initialProjects={initialProjects} />
      </div>
    </div>
  );
}
