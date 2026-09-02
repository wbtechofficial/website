"use client";

import { useEffect, useRef, useState } from "react";

interface UseAnimatedCounterOptions {
  duration?: number;
  decimals?: number;
  easing?: (t: number) => number;
}

const easeOutCubic = (t: number): number => 1 - Math.pow(1 - t, 3);

export function useAnimatedCounter(
  targetValue: number,
  options: UseAnimatedCounterOptions = {},
) {
  const { duration = 1400, decimals = 0, easing = easeOutCubic } = options;

  const [displayValue, setDisplayValue] = useState<number>(0);
  const currentRef = useRef<number>(0);
  const frameRef = useRef<number | null>(null);

  useEffect(() => {
    // Check for user's prefers-reduced-motion setting
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion || duration <= 0) {
      currentRef.current = targetValue;
      setDisplayValue(targetValue);
      return;
    }

    const startValue = currentRef.current;
    const difference = targetValue - startValue;

    if (difference === 0) {
      return;
    }

    const startTime = performance.now();

    const updateCounter = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easing(progress);

      const nextValue = startValue + difference * easedProgress;
      currentRef.current = nextValue;
      setDisplayValue(nextValue);

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(updateCounter);
      } else {
        currentRef.current = targetValue;
        setDisplayValue(targetValue);
        frameRef.current = null;
      }
    };

    frameRef.current = requestAnimationFrame(updateCounter);

    return () => {
      if (frameRef.current !== null) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, [targetValue, duration, easing]);

  const formattedValue = new Intl.NumberFormat("en-IN", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(displayValue);

  return {
    value: displayValue,
    formattedValue,
  };
}
