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

  const [childrenMounted, setChildrenMounted] = useState(false);
  const [childrenFadeClass, setChildrenFadeClass] = useState("opacity-0");

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isLoading) {
      setChildrenMounted(true);
      const childrenFadeTimer = setTimeout(() => {
        setChildrenFadeClass("opacity-100");
      }, 50);

      const loaderDomTimer = setTimeout(() => {
        setShowDOM(false);
      }, 500);

      return () => {
        clearTimeout(childrenFadeTimer);
        clearTimeout(loaderDomTimer);
      };
    } else {
      setShowDOM(true);
      setChildrenMounted(false);
      setChildrenFadeClass("opacity-0");
    }
  }, [isLoading]);

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
      {isMounted && showDOM && (
        <ScreenLoader onComplete={() => setIsLoading(false)} />
      )}
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
