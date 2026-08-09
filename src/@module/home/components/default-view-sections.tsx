"use client";

import { useIsDefaultFilterView } from "@/store/filter/use-filter-store";
import { FeaturedGrid } from "./featured-grid";
import { OpenSourceShowcase } from "./opensource-showcase";

export function DefaultViewSections() {
  const isDefaultView = useIsDefaultFilterView();

  if (!isDefaultView) return null;

  return (
    <>
      {/* Featured Stories Grid */}
      <FeaturedGrid />

      {/* Regional Open Source Repos Section */}
      <OpenSourceShowcase />
    </>
  );
}
