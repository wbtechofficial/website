"use client";

import { createContext, useRef, type ReactNode } from "react";
import { createFilterStore, type FilterStoreApi } from "../filter/filter-store";
import { type FilterInitState } from "../filter/filter-store.types";

export const FilterStoreContext = createContext<FilterStoreApi | undefined>(
  undefined,
);

export interface FilterStoreProviderProps {
  children: ReactNode;
  initialValues?: FilterInitState;
}

export function FilterStoreProvider({
  children,
  initialValues,
}: FilterStoreProviderProps) {
  const storeRef = useRef<FilterStoreApi>(null);

  if (!storeRef.current) {
    storeRef.current = createFilterStore(initialValues);
  }

  return (
    <FilterStoreContext.Provider value={storeRef.current}>
      {children}
    </FilterStoreContext.Provider>
  );
}
