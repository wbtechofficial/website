"use client";

import {
  ArrowDown,
  ArrowRight,
  Sparkles,
  Code2,
  Users,
  Rocket,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface HeroSectionProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  activeCategory: string;
  setActiveCategory: (category: string) => void;
}

export function HeroSection({
  activeCategory,
  setActiveCategory,
}: HeroSectionProps) {
  const quickSearchTags = [
    { label: "React & Web", value: "React" },
    { label: "AI Startups", value: "startups" },
    { label: "Open Source", value: "opensource" },
    { label: "Dev Meetups", value: "meetups" },
    { label: "Tech Jobs", value: "jobs" },
  ];

  const handleTagClick = (val: string) => {
    setActiveCategory(activeCategory === val ? "all" : val);
  };

  const scrollToFeed = () => {
    const featuredEl = document.getElementById("featured-feed");
    if (featuredEl) {
      featuredEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative pt-12 pb-12 sm:pt-16 sm:pb-16 lg:pt-20 lg:pb-20 border-b border-border/50 bg-background overflow-hidden">
      {/* Ambient Radial Accent */}
      <div className="pointer-events-none absolute top-0 left-0 -z-10 h-96 w-[600px] rounded-full bg-primary/5 blur-[120px]" />

      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Main Grid Layout to Fill Whitespace & Create High-End Aesthetic */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end sm:mb-14 pb-10 border-b border-border/40">
          {/* Left Column: Bold Headline & Subtitle (Spans 8 columns) */}
          <div className="lg:col-span-8 space-y-6">
            {/* Top Ecosystem Pill */}
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3.5 py-1 text-xs font-semibold text-primary">
              <Sparkles className="h-3.5 w-3.5 text-primary" />
              <span>West Bengal Tech Ecosystem</span>
            </div>

            {/* Bold Impactful Headline (Inspired directly by the reference image layout) */}
            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground leading-[1.1]">
              Uncover fresh perspectives, ideas, and developer knowledge.
            </h1>

            {/* Subtitle Description */}
            <p className="text-muted-foreground text-base sm:text-lg lg:text-xl leading-relaxed max-w-2xl">
              West Bengal Tech is an open platform where developers, startup
              founders, and regional open-source creators share dynamic
              thinking, ecosystem updates, and tech opportunities.
            </p>

            <Button
              onClick={scrollToFeed}
              size="lg"
              className="rounded-full px-7 py-6 font-bold text-sm sm:text-base shadow-md hover:shadow-lg transition-all gap-2.5 group"
            >
              <span>Start Reading</span>
              <div className="h-6 w-6 rounded-full bg-white/20 flex items-center justify-center transition-transform group-hover:translate-x-0.5">
                <ArrowDown className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-1 text-white" />
              </div>
            </Button>
          </div>

          {/* Right Column: Live Community Pulse Cards to Elegantly Fill Whitespace (Spans 4 columns) */}
          <div className="lg:col-span-4 flex flex-col gap-3">
            <div className="rounded-2xl border border-border/70 bg-card p-4 shadow-xs flex items-center gap-3.5 hover:border-primary/40 transition-colors">
              <div className="h-10 w-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                <Users className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs font-bold text-foreground">
                  1,200+ Regional Builders
                </p>
                <p className="text-[11px] text-muted-foreground">
                  Engineers & founders in Salt Lake & Kolkata
                </p>
              </div>
            </div>

            <div className="rounded-2xl border border-border/70 bg-card p-4 shadow-xs flex items-center gap-3.5 hover:border-secondary/40 transition-colors">
              <div className="h-10 w-10 rounded-xl bg-secondary/10 text-secondary flex items-center justify-center shrink-0">
                <Code2 className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs font-bold text-foreground">
                  Open Source Initiatives
                </p>
                <p className="text-[11px] text-muted-foreground">
                  Driven by React Kolkata & local communities
                </p>
              </div>
            </div>

            <div className="rounded-2xl border border-border/70 bg-card p-4 shadow-xs flex items-center gap-3.5 hover:border-primary/40 transition-colors">
              <div className="h-10 w-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                <Rocket className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs font-bold text-foreground">
                  Startup Directories
                </p>
                <p className="text-[11px] text-muted-foreground">
                  Spotlighting Bengal's deep-tech pioneers
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
