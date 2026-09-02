"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { onboardingService } from "@/@module/home/services/onboarding";

interface UseRegisteredUserCountOptions {
  pollingInterval?: number;
  enabled?: boolean;
}

export function useRegisteredUserCount(
  refreshKey = 0,
  options: UseRegisteredUserCountOptions = {},
) {
  const { pollingInterval = 12000, enabled = true } = options;

  const [count, setCount] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const isFetchingRef = useRef(false);

  const fetchCount = useCallback(async () => {
    if (isFetchingRef.current) return;
    isFetchingRef.current = true;

    try {
      const data = await onboardingService.getRegisteredCount();
      setCount(data);
      setError(null);
    } catch (err) {
      console.error("Failed to fetch registered user count:", err);
      setError(err instanceof Error ? err : new Error(String(err)));
    } finally {
      setIsLoading(false);
      isFetchingRef.current = false;
    }
  }, []);

  // Fetch when mounted or when refreshKey changes
  useEffect(() => {
    void fetchCount();
  }, [fetchCount, refreshKey]);

  // Handle visibility-aware polling
  useEffect(() => {
    if (!enabled || pollingInterval <= 0) return;

    let intervalId: ReturnType<typeof setInterval> | null = null;

    const startPolling = () => {
      if (!intervalId) {
        intervalId = setInterval(() => {
          if (document.visibilityState === "visible") {
            void fetchCount();
          }
        }, pollingInterval);
      }
    };

    const stopPolling = () => {
      if (intervalId) {
        clearInterval(intervalId);
        intervalId = null;
      }
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        void fetchCount();
        startPolling();
      } else {
        stopPolling();
      }
    };

    startPolling();
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      stopPolling();
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [fetchCount, pollingInterval, enabled]);

  return {
    count,
    isLoading,
    error,
    refetch: fetchCount,
  };
}
