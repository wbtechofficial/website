import { createStore } from "zustand/vanilla";
import { FilterStoreState, FilterInitState } from "./filter-store.types";

export const defaultInitState: FilterInitState = {
  searchQuery: "",
  activeCategory: "all",
};

export const createFilterStore = (
  initState: FilterInitState = defaultInitState,
) => {
  return createStore<FilterStoreState>()((set) => ({
    searchQuery: initState.searchQuery ?? "",
    activeCategory: initState.activeCategory ?? "all",

    setSearchQuery: (query: string) =>
      set(() => ({
        searchQuery: query,
      })),

    setActiveCategory: (category: string) =>
      set(() => ({
        activeCategory: category,
      })),

    resetFilters: () =>
      set(() => ({
        searchQuery: defaultInitState.searchQuery ?? "",
        activeCategory: defaultInitState.activeCategory ?? "all",
      })),
  }));
};

export type FilterStoreApi = ReturnType<typeof createFilterStore>;

export const globalFilterStore = createFilterStore();
