"use client";

import { useCallback, useEffect, useState } from "react";
import { onboardingService } from "@/@module/home/services/onboarding";

const POLL_INTERVAL_MS = 10000;

export function useRegisteredUserCount(refreshKey = 0) {
  const [count, setCount] = useState<number | null>(null);

  const fetchCount = useCallback(async () => {
    try {
      const countN = await onboardingService.getRegisteredCount()
      setCount(countN as number);
    } catch (error) {
      console.error("Failed to fetch registered user count:", error);
    }
  }, []);

  useEffect(() => {
    void fetchCount();
    const id = window.setInterval(() => void fetchCount(), POLL_INTERVAL_MS);
    return () => window.clearInterval(id);
  }, [fetchCount, refreshKey]);

  return { count };
}
