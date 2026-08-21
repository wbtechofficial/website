import { CommunitiesSection } from "@/@module/home/components/communities-section";
import { CompaniesSection } from "@/@module/home/components/companies-section";

import { DevelopersSection } from "@/@module/home/components/developers-section";
import { EventsSection } from "@/@module/home/components/events-section";
import { HeroSection } from "@/@module/home/components/hero-section";
import { StartupsSection } from "@/@module/home/components/startups-section";


export default async function Home() {
  return (
    <>
      {/* Hero Section */}
      <HeroSection />



      {/* Pointer Sections — Inspired by existing UI (same container, gradients, rounded-2xl cards) */}
      <DevelopersSection />
      <StartupsSection />;
      {/* <CompaniesSection /> */}
      <CommunitiesSection />
      <EventsSection />;
      {/* <StudentsSection /> */}

      <CompaniesSection />
      {/* <CommunitiesSection />
      <EventsSection />
      <StudentsSection /> */}
      {/* Conditional Default View Sections (Featured Grid & Open Source Repos) */}
      {/* <DefaultViewSections /> */}

      {/* Filter Toolbar (Search Input & Topic Category Pills) */}
      {/* <FilterSection /> */}

      {/* Dynamic Article Grid (Client Component receiving SSR initial data) */}
      {/* <FilteredCardGrid /> */}
    </>
  );
}
