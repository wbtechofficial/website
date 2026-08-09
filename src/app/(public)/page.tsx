import { HeroSection } from "@/@module/home/components/hero-section";
import { DefaultViewSections } from "@/@module/home/components/default-view-sections";
import { FilterSection } from "@/components/custom/filter-section";
import { FilteredCardGrid } from "@/@module/home/components/filtered-card-grid";

export default async function Home() {
  return (
    <>
      {/* Hero Section */}
      <HeroSection />

      {/* Conditional Default View Sections (Featured Grid & Open Source Repos) */}
      <DefaultViewSections />

      {/* Filter Toolbar (Search Input & Topic Category Pills) */}
      <FilterSection />

      {/* Dynamic Article Grid (Client Component receiving SSR initial data) */}
      <FilteredCardGrid />
    </>
  );
}
