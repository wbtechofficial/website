"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, X } from "lucide-react";

export function AnnouncementBanner() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="relative border-b border-border/50 bg-[#e8eef6]/50 dark:bg-navy/40 text-foreground py-2 px-10 sm:px-12 text-xs sm:text-sm font-medium backdrop-blur-md transition-all duration-300">
      <div className="container mx-auto max-w-7xl flex flex-wrap items-center justify-center gap-x-3 gap-y-1.5 text-center">
        {/* Live Pulsing Indicator & Badge */}
        <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 dark:bg-primary/20 px-2.5 py-0.5 text-[11px] font-semibold text-primary dark:text-teal border border-primary/10 dark:border-primary/20">
          <span className="relative flex h-1.5 w-1.5 shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal opacity-75"></span>
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-teal"></span>
          </span>
          Speaker CFP
        </span>
        
        {/* Core Message */}
        <span className="text-muted-foreground dark:text-ice/70 font-normal">
          React Kolkata Meetup #18 Call for Proposals (CFP) is open.
        </span>

        {/* CTA Link */}
        <Link
          href="/article/meetup-2"
          className="group inline-flex items-center gap-1 font-semibold text-foreground hover:text-primary dark:text-white dark:hover:text-teal transition-colors ml-0.5 shrink-0"
        >
          Submit Talk 
          <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1" />
        </Link>
      </div>

      {/* Dismiss Button */}
      <button
        onClick={() => setIsVisible(false)}
        className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground p-1.5 rounded-full hover:bg-muted/50 dark:hover:bg-white/5 active:scale-95 transition-all duration-200"
        title="Dismiss banner"
        aria-label="Dismiss banner"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}
