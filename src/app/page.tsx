"use client";

import { useMemo, useState } from "react";
import { Navbar } from "@/components/custom/navbar";
import { HeroSection } from "@/components/custom/hero-section";
import { FeaturedGrid } from "@/components/custom/featured-grid";
import { FilterSection } from "@/components/custom/filter-section";
import { CardGrid } from "@/components/custom/card-grid";
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
      {/* Header Navigation */}
      <Navbar />

      {/* Hero Showcase Section with Landing Text & Search */}
      <HeroSection
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
      />

      <main className="flex-1">
        {/* Featured Showcase Cards */}
        {!searchQuery && activeCategory === "all" && <FeaturedGrid />}

        {/* Filter Section (category tabs) */}
        <FilterSection
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
        />

        {/* Dynamic Article Card Grid */}
        <CardGrid items={filteredItems} />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
