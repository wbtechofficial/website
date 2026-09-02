import { Metadata } from "next";
import { DevelopersSection } from "@/@module/home/components/developers-section";
import { HeroSection } from "@/@module/home/components/hero-section";
import RibbonTicker from "@/components/custom/ribbon-ticker";
import RoadmapSection from "@/@module/home/components/roadmap-section/roadmap-section";

import { SITE_CONFIG } from "@/lib/seo-config";
import { JsonLd } from "@/components/custom/json-ld";

export const metadata: Metadata = {
  title: "westbengal.tech — West Bengal Developer Network & Tech Ecosystem",
  description:
    "The primary open digital hub for software developers, tech startups, open-source projects, and engineering careers across Kolkata and West Bengal.",
  alternates: {
    canonical: SITE_CONFIG.url,
  },
};

export default async function Home() {
  const homeEventJsonLd = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: "Open Source Con India Call for Proposals (CFP)",
    description:
      "Open Source Con India Call for Proposals is open for software developers, open source maintainers, and tech leaders to submit talk proposals.",
    url: "https://forms.gle/tFUzkFuCyb1heshu9",
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    location: {
      "@type": "Place",
      name: "Sector V, Salt Lake",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Kolkata",
        addressRegion: "West Bengal",
        addressCountry: "India",
      },
    },
    organizer: {
      "@type": "Organization",
      name: "West Bengal Tech Guild",
      url: SITE_CONFIG.url,
    },
  };

  return (
    <>
      <JsonLd data={homeEventJsonLd} />
      {/* Hero Section */}
      <HeroSection />

      {/* Scrolling values ticker */}
      <RibbonTicker />

      {/* Pointer Sections */}
      <DevelopersSection />

      {/* Roadmap Section */}
      <RoadmapSection />
    </>
  );
}
