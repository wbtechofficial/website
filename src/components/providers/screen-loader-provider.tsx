"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import ScreenLoader from "../custom/screen-loader";

interface ScreenLoaderContextType {
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}

const ScreenLoaderContext = createContext<ScreenLoaderContextType | undefined>(
  undefined,
);

export function ScreenLoaderProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isLoading, setIsLoading] = useState(true);
  const [isMounted, setIsMounted] = useState(false);
  const [showDOM, setShowDOM] = useState(true);
  const [fadeClass, setFadeClass] = useState("opacity-100");

  const [childrenMounted, setChildrenMounted] = useState(false);
  const [childrenFadeClass, setChildrenFadeClass] = useState("opacity-0");

  useEffect(() => {
    setIsMounted(true);
    // Auto-hide initial loading state after 1.2 seconds
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isLoading) {
      setFadeClass("opacity-0 pointer-events-none");
      setChildrenMounted(true);
      // Give a tiny delay to trigger the CSS transition
      const childrenFadeTimer = setTimeout(() => {
        setChildrenFadeClass("opacity-100");
      }, 50);

      const loaderDomTimer = setTimeout(() => {
        setShowDOM(false);
      }, 500); // Wait for transition fade-out to complete (500ms)

      return () => {
        clearTimeout(childrenFadeTimer);
        clearTimeout(loaderDomTimer);
      };
    } else {
      setShowDOM(true);
      setChildrenMounted(false);
      setChildrenFadeClass("opacity-0");
      const timer = setTimeout(() => {
        setFadeClass("opacity-100");
      }, 10);
      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  // SEO & Hydration guard rail: Render children on server and initial client render,
  // then unmount/hide client-side during active loader to avoid layout flash,
  // and remount when loader completes.
  const shouldRenderChildren = !isMounted || childrenMounted;

  return (
    <ScreenLoaderContext.Provider value={{ isLoading, setIsLoading }}>
      <div
        className={cn(
          "transition-opacity duration-700 ease-in-out",
          childrenFadeClass,
        )}
      >
        {shouldRenderChildren && children}
      </div>
      {isMounted && showDOM && <ScreenLoader className={fadeClass} />}
    </ScreenLoaderContext.Provider>
  );
}

export function useScreenLoader() {
  const context = useContext(ScreenLoaderContext);
  if (context === undefined) {
    throw new Error(
      "useScreenLoader must be used within a ScreenLoaderProvider",
    );
  }
  return context;
}
