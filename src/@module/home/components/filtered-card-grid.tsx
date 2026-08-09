"use client";

import { MOCK_ITEMS } from "@/base/data/mock-data";
import { CardGrid } from "./card-grid";
import { useFilteredItems } from "@/store/filter/use-filter-store";

export function FilteredCardGrid() {
  const filteredItems = useFilteredItems(MOCK_ITEMS);
  return <CardGrid items={filteredItems} />;
}
