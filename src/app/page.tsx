"use client";

import { useMemo, useState } from "react";
import { AnnouncementBanner } from "@/components/custom/announcement-banner";
import { Navbar } from "@/components/custom/navbar";
import { HeroSection } from "@/components/custom/hero-section";
import { FeaturedGrid } from "@/components/custom/featured-grid";
import { OpenSourceShowcase } from "@/components/custom/opensource-showcase";
import { FilterSection } from "@/components/custom/filter-section";
import { CardGrid } from "@/components/custom/card-grid";
import { NewsletterCard } from "@/components/custom/newsletter-card";
import { FloatingSocials } from "@/components/custom/floating-socials";
import { CookieConsent } from "@/components/custom/cookie-consent";
import { Footer } from "@/components/custom/footer";
import { MOCK_ITEMS } from "@/base/constants/mock-data";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredItems = useMemo(() => {
    return MOCK_ITEMS.filter((item) => {
      // Category filter match
      const matchesCategory =
        activeCategory === "all" || item.category === activeCategory;

      // Search query match
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !query ||
        item.title.toLowerCase().includes(query) ||
        item.excerpt.toLowerCase().includes(query) ||
        item.categoryLabel.toLowerCase().includes(query) ||
        item.authorName.toLowerCase().includes(query);

      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, activeCategory]);

  return (
    <div className="relative min-h-screen bg-background font-sans text-foreground selection:bg-primary selection:text-primary-foreground flex flex-col">
      {/* Community Announcement Top Banner */}
      <AnnouncementBanner />

      {/* Header Navigation */}
      <Navbar />

      {/* Refactored Human-Centric Hero Section */}
      <HeroSection
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
      />

      <main className="flex-1 space-y-2">
        {/* Featured Stories Grid */}
        {!searchQuery && activeCategory === "all" && <FeaturedGrid />}

        {/* Regional Startups Spotlight Section */}
        {/* {!searchQuery && activeCategory === "all" && <StartupShowcase />} */}

        {/* Regional Open Source Repos Section */}
        {!searchQuery && activeCategory === "all" && <OpenSourceShowcase />}

        {/* Filter Toolbar (Search & Category Pills) */}
        <FilterSection
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
        />

        {/* Dynamic Article Grid */}
        <CardGrid items={filteredItems} />

        {/* Weekly Newsletter Sign-Up Card */}
        <NewsletterCard />
      </main>

      {/* Sticky Floating Social Media Sidebar */}
      <FloatingSocials position="left" />

      {/* Footer */}
      <Footer />

      {/* System Integrated Cookie Consent Notification */}
      <CookieConsent />
    </div>
  );
}
