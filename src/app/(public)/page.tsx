import { DevelopersSection } from "@/@module/home/components/developers-section";
import { HeroSection } from "@/@module/home/components/hero-section";
import RibbonTicker from "@/components/custom/ribbon-ticker";
import RoadmapSection from "@/@module/home/components/roadmap-section";

export default async function Home() {
  return (
    <>
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
