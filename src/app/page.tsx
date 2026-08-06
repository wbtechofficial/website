"use client";

import { Navbar } from "@/components/custom/navbar";
import { FeaturedGrid } from "@/components/custom/featured-grid";
import { FilterSection } from "@/components/custom/filter-section";
import { CardGrid, CardItem } from "@/components/custom/card-grid";
import { Footer } from "@/components/custom/footer";
import { MOCK_ITEMS } from "@/base/constants/mock-data";
import { useMemo, useState } from "react";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredItems = useMemo(() => {
    return MOCK_ITEMS.filter((item) => {
      // Category filter match
      const matchesCategory =
        activeCategory === "all" || item.category === activeCategory;

      // Search match
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

      {/* Hero Showcase Section */}
      <main className="flex-1">
        <FeaturedGrid />

        {/* Filter Section (search bar & tags) */}
        <FilterSection
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
        />

        {/* Dynamic Card Grid containing resources & updates */}
        <CardGrid items={filteredItems} />
      </main>

      {/* Footer Branding & Actions */}
      <Footer />
    </div>
  );
}
