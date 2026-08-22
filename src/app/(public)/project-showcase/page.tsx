import { Metadata } from "next";
import { ProjectShowcaseView } from "@/@module/projects/components/project-showcase-view";
import { MOCK_PROJECTS } from "@/base/data/projects-mock-data";
import { SITE_CONFIG } from "@/lib/seo-config";
import { JsonLd } from "@/components/custom/json-ld";

export const metadata: Metadata = {
  title: "Project Showcase | westbengal.tech — West Bengal Open Source",
  description:
    "Discover, upvote, and explore innovative web applications, Indic AI engines, and open-source developer tools built by software engineers across West Bengal.",
  keywords: [
    "West Bengal Open Source",
    "Kolkata Developers Showcase",
    "Indic AI Projects",
    "West Bengal Tech Projects",
    ...SITE_CONFIG.keywords,
  ],
  alternates: {
    canonical: `${SITE_CONFIG.url}/project-showcase`,
  },
  openGraph: {
    title: "Project Showcase | westbengal.tech — West Bengal Open Source",
    description:
      "Discover, upvote, and explore innovative web applications, Indic AI engines, and open-source developer tools built by software engineers across West Bengal.",
    url: `${SITE_CONFIG.url}/project-showcase`,
    siteName: SITE_CONFIG.name,
    images: [
      {
        url: SITE_CONFIG.ogImage, // Placeholder
        width: 1200,
        height: 630,
        alt: "West Bengal Tech Project Showcase",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Project Showcase | westbengal.tech — West Bengal Open Source",
    description:
      "Discover, upvote, and explore innovative web applications, Indic AI engines, and open-source developer tools built by software engineers across West Bengal.",
    images: [SITE_CONFIG.ogImage],
  },
};

export default async function ProjectShowcasePage() {
  const initialProjects = MOCK_PROJECTS;

  const showcaseJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "West Bengal Tech Open Source Showcase",
    description:
      "Discover, upvote, and explore innovative web applications, Indic AI engines, and developer tools built by software engineers across West Bengal.",
    url: `${SITE_CONFIG.url}/project-showcase`,
    mainEntity: {
      "@type": "ItemList",
      itemListElement: initialProjects.map((project, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "SoftwareApplication",
          name: project.title,
          description: project.description,
          applicationCategory: project.category,
          operatingSystem: "Web",
          author: {
            "@type": "Person",
            name: project.authorName,
          },
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: "5.0",
            reviewCount: project.upvotes,
          },
        },
      })),
    },
  };

  return (
    <div className="py-8 sm:py-12">
      <JsonLd data={showcaseJsonLd} />
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ProjectShowcaseView initialProjects={initialProjects} />
      </div>
    </div>
  );
}
