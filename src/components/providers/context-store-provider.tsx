"use client";

import { PropsWithChildren } from "react";
import { FilterStoreProvider } from "@/store/providers/filter-store-provider";

export default function ContextStoreProvider({ children }: PropsWithChildren) {
  return <FilterStoreProvider>{children}</FilterStoreProvider>;
}
