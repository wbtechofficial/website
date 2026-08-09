export type FilterCategory =
  | "all"
  | "news"
  | "startups"
  | "opensource"
  | "meetups"
  | "jobs";

export interface FilterStateValues {
  searchQuery: string;
  activeCategory: string;
}

export interface FilterStateActions {
  setSearchQuery: (query: string) => void;
  setActiveCategory: (category: string) => void;
  resetFilters: () => void;
}

export type FilterStoreState = FilterStateValues & FilterStateActions;

export type FilterInitState = Partial<FilterStateValues>;
