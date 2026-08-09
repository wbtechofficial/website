import { useContext, useMemo } from "react";
import { useStore } from "zustand";
import { FilterStoreContext } from "../providers/filter-store-provider";
import { globalFilterStore } from "./filter-store";
import { FilterStoreState } from "./filter-store.types";
import { CardItem } from "@/@module/home/components/card-grid";

export function useFilterStore<T>(selector: (state: FilterStoreState) => T): T {
  const storeContext = useContext(FilterStoreContext);
  const store = storeContext || globalFilterStore;
  return useStore(store, selector);
}

export const useSearchQuery = () =>
  useFilterStore((state) => state.searchQuery);

export const useActiveCategory = () =>
  useFilterStore((state) => state.activeCategory);

export const useIsDefaultFilterView = () =>
  useFilterStore(
    (state) => !state.searchQuery && state.activeCategory === "all",
  );

export const useFilterActions = () =>
  useFilterStore((state) => ({
    setSearchQuery: state.setSearchQuery,
    setActiveCategory: state.setActiveCategory,
    resetFilters: state.resetFilters,
  }));

export const useFilteredItems = (items: CardItem[]) => {
  const searchQuery = useSearchQuery();
  const activeCategory = useActiveCategory();

  return useMemo(() => {
    return items.filter((item) => {
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
  }, [items, searchQuery, activeCategory]);
};
