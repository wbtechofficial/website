"use client";

import { useRegisteredUserCount } from "@/@module/home/hooks/use-registered-user-count";
import { useAnimatedCounter } from "@/@module/home/hooks/use-animated-counter";
import { Users } from "lucide-react";

interface CommunityCounterProps {
  refreshKey?: number;
  className?: string;
}

export function CommunityCounter({
  refreshKey = 0,
  className = "",
}: CommunityCounterProps) {
  const { count, isLoading } = useRegisteredUserCount(refreshKey);
  const targetCount = count ?? 0;

  // Animate smoothly from 0 to targetCount on load, and adjust whenever count changes
  const { formattedValue } = useAnimatedCounter(targetCount, {
    duration: 1600,
    decimals: 0,
  });

  return (
    <div
      role="status"
      aria-live="polite"
      aria-atomic="true"
      className={`mt-6 inline-flex items-center gap-2.5 rounded-full border border-border/40 bg-card/40 px-4 py-1.5 backdrop-blur-md shadow-xs select-none transition-all duration-300 hover:border-primary/30 ${className}`}
    >
      {/* Live Activity Pulse Indicator */}
      <span className="relative flex h-2 w-2" aria-hidden="true">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
      </span>

      <Users className="h-3.5 w-3.5 text-primary/80" aria-hidden="true" />

      {/* Value & Label */}
      <div className="flex items-center gap-1.5 text-xs sm:text-sm font-medium">
        {isLoading && count === null ? (
          <span className="inline-block h-4 w-8 animate-pulse rounded bg-muted/60" />
        ) : (
          <span className="font-mono font-bold tracking-tight text-foreground tabular-nums">
            {formattedValue}
          </span>
        )}
        <span className="text-muted-foreground">
          Members Joined
        </span>
      </div>
    </div>
  );
}
