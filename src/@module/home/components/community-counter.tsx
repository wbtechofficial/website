"use client";

import CountUp from "react-countup";
import { useRegisteredUserCount } from "@/@module/home/hooks/use-registered-user-count";

type CommunityCounterProps = {
  refreshKey?: number;
};

export function CommunityCounter({ refreshKey = 0 }: CommunityCounterProps) {
  const { count } = useRegisteredUserCount(refreshKey);

  return (
    <p
      className="mt-6 h-5 text-sm leading-5 text-muted-foreground"
      role="status"
      aria-live="polite"
    >
      {count === null ? (
        <>
          <span
            className="inline-block h-3.5 w-6 align-text-bottom bg-foreground/25 animate-pulse"
            aria-hidden
          />{" "}
          <span className="text-lg">Members Joined</span>
          </>
      ) : (
        <>
          <CountUp
            end={count}
            duration={1.4}
            preserveValue
            className="font-bold text-foreground tabular-nums text-lg"
          />{" "}
          <span className="text-lg">Members Joined</span>
        </>
      )}
    </p>
  );
}
