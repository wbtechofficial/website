"use client";

import * as React from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface FilterSectionProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  activeCategory: string;
  setActiveCategory: (category: string) => void;
}

const CATEGORIES = [
  { id: "all", label: "All Topics" },
  { id: "news", label: "Development News" },
  { id: "startups", label: "Startups" },
  { id: "opensource", label: "Open Source" },
  { id: "meetups", label: "Meetups & Events" },
  { id: "jobs", label: "Job Directory" },
];

export function FilterSection({
  searchQuery,
  setSearchQuery,
  activeCategory,
  setActiveCategory,
}: FilterSectionProps) {
  return (
    <section
      id="updates"
      className="container mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 border-t border-border/40 mt-6"
    >
      {/* Title & Description */}
      <div className="mb-8">
        <h2 className="font-heading text-2xl sm:text-3xl font-bold tracking-tight mb-2">
          Community Updates & Directory
        </h2>
        <p className="text-muted-foreground text-sm max-w-2xl leading-relaxed">
          Stay informed with the latest tech events, check out innovative
          products coming out of Bengal, explore open-source libraries, or find
          your next career path.
        </p>
      </div>

      {/* Search & Filter Buttons Toolbar */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        {/* Search Input Box */}
        <div className="relative w-full sm:max-w-xs group">
          <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground transition-colors group-focus-within:text-primary" />
          <Input
            type="search"
            placeholder="Search updates, startups..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 rounded-full bg-muted/40 focus-visible:bg-background transition-all"
          />
        </div>

        {/* Scrollable Categories List */}
        <div className="w-full sm:w-auto overflow-x-auto no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0">
          <div className="flex space-x-2 min-w-max pb-1">
            {CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <Button
                  key={cat.id}
                  variant={isActive ? "default" : "outline"}
                  onClick={() => setActiveCategory(cat.id)}
                  size="sm"
                  className={`rounded-full px-4 text-xs font-semibold tracking-wide transition-all ${
                    isActive
                      ? "shadow-sm"
                      : "hover:bg-muted text-muted-foreground"
                  }`}
                >
                  {cat.label}
                </Button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
