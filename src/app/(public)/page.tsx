import { DevelopersSection } from "@/@module/home/components/developers-section";
import { HeroSection } from "@/@module/home/components/hero-section";

export default async function Home() {
    return (
        <>
            {/* Hero Section */}
            <HeroSection />

            {/* Pointer Sections — Inspired by existing UI (same container, gradients, rounded-2xl cards) */}
            <DevelopersSection />
        </>
    );
}
