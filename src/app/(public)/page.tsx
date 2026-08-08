"use client";

import { useMemo, useState } from "react";
import { HeroSection } from "@/@module/home/components/hero-section";
import { FeaturedGrid } from "@/@module/home/components/featured-grid";
import { OpenSourceShowcase } from "@/@module/home/components/opensource-showcase";
import { FilterSection } from "@/components/custom/filter-section";
import { CardGrid } from "@/@module/home/components/card-grid";
import { MOCK_ITEMS } from "@/base/data/mock-data";

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
    <>
      {/* Hero Section */}
      <HeroSection
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
      />

      <main className="flex-1 space-y-2">
        {/* Featured Stories Grid */}
        {!searchQuery && activeCategory === "all" && <FeaturedGrid />}

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
      </main>
    </>
  );
}
