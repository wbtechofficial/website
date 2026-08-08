"use client";

import { useState } from "react";
import Link from "next/link";
import { Sparkles, ArrowRight, X } from "lucide-react";

export function AnnouncementBanner() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="relative border-b border-primary/20 bg-primary/10 text-primary-foreground px-4 py-2 text-xs sm:text-sm font-medium backdrop-blur-md">
      <div className="container mx-auto max-w-7xl flex items-center justify-between gap-4">
        
        <div className="flex items-center gap-2 mx-auto sm:mx-0 truncate">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-primary px-2.5 py-0.5 text-[11px] font-semibold text-primary-foreground shadow-xs shrink-0">
            <Sparkles className="h-3 w-3" /> Event Announcement
          </span>
          <span className="truncate text-foreground font-medium">
            React Kolkata Meetup #18 Call for Proposals (CFP) is open for speakers.
          </span>
          <Link
            href="/article/meetup-2"
            className="hidden sm:inline-flex items-center gap-1 font-semibold text-primary hover:underline ml-1 shrink-0"
          >
            Submit Talk <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <button
          onClick={() => setIsVisible(false)}
          className="text-muted-foreground hover:text-foreground p-1 rounded-full shrink-0 transition-colors"
          title="Dismiss banner"
        >
          <X className="h-3.5 w-3.5" />
        </button>

      </div>
    </div>
  );
}
