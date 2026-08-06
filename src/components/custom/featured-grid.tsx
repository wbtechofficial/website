"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowUpRight, Calendar, Users, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function FeaturedGrid() {
  return (
    <section className="container mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Main Featured Card - Left (Spans 2 columns on desktop) */}
        <div className="lg:col-span-2 group relative overflow-hidden rounded-3xl border border-border bg-card p-6 sm:p-8 flex flex-col justify-between min-h-[450px] lg:min-h-[500px] shadow-sm transition-all duration-300 hover:shadow-md hover:border-muted-foreground/30">
          {/* Stunning Premium Gradient Placeholder Background */}
          <div className="absolute inset-0 -z-10 bg-radial-[at_top_right] from-violet-500/10 via-background to-background dark:from-violet-500/15" />
          <div className="absolute top-0 right-0 -z-10 h-72 w-72 rounded-full bg-violet-500/20 blur-3xl opacity-60 transition-transform duration-500 group-hover:scale-110" />
          <div className="absolute inset-0 -z-10 opacity-[0.02] dark:opacity-[0.03] bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:24px_24px]" />

          {/* Card Top Details */}
          <div>
            <div className="flex flex-wrap items-center justify-between gap-2 mb-6">
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="rounded-full bg-violet-500/10 text-violet-600 dark:text-violet-400 border border-violet-500/20 font-semibold px-3 py-1">
                  Ecosystem Initiave
                </Badge>
                <Badge variant="outline" className="rounded-full font-medium px-2 py-0.5 text-xs">
                  ★ Featured
                </Badge>
              </div>
              <span className="text-xs font-semibold text-muted-foreground bg-muted px-2.5 py-1 rounded-full">
                5 min read
              </span>
            </div>

            <div className="max-w-2xl">
              <h1 className="font-heading text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight mb-4 group-hover:text-primary transition-colors">
                React Kolkata Unveils the west-bengal.tech Initiative to Empower Local Developers
              </h1>
              <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                A community-driven digital hub crafted to showcase West Bengal's talent, spotlight local startups, drive open-source contributions, and host the definitive tech job directory. Built by developers, for developers.
              </p>
            </div>
          </div>

          {/* Card Bottom Details */}
          <div className="mt-8 pt-6 border-t border-border/60 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-violet-500 to-indigo-500 flex items-center justify-center text-white font-bold text-sm shadow">
                RK
              </div>
              <div>
                <p className="text-xs font-bold leading-none">React Kolkata Team</p>
                <p className="text-[11px] text-muted-foreground mt-1">Published Aug 6, 2026</p>
              </div>
            </div>

            <Link 
              href="#updates" 
              className="inline-flex items-center justify-center gap-1.5 text-sm font-semibold hover:underline group-hover:text-primary transition-colors text-muted-foreground self-start sm:self-auto"
            >
              Explore Updates
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>
        </div>

        {/* Stacked Cards - Right (Spans 1 column on desktop) */}
        <div className="flex flex-col gap-6">
          
          {/* Card 1: Meetups/Events */}
          <div className="group relative overflow-hidden rounded-3xl border border-border bg-card p-6 flex flex-col justify-between flex-1 min-h-[210px] shadow-sm transition-all duration-300 hover:shadow-md hover:border-muted-foreground/30">
            {/* Background Gradient */}
            <div className="absolute inset-0 -z-10 bg-radial-[at_top_right] from-amber-500/10 via-background to-background dark:from-amber-500/15" />
            <div className="absolute top-0 right-0 -z-10 h-40 w-40 rounded-full bg-amber-500/20 blur-2xl opacity-55 transition-transform duration-500 group-hover:scale-110" />

            <div>
              <div className="flex items-center gap-2 mb-4">
                <Badge variant="secondary" className="rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 font-semibold px-2.5 py-0.5 text-xs">
                  Meetup
                </Badge>
                <span className="text-[11px] font-semibold text-muted-foreground flex items-center gap-1">
                  <Calendar className="h-3 w-3" /> Aug 29, 2026
                </span>
              </div>
              <h3 className="font-heading text-lg font-bold leading-snug group-hover:text-primary transition-colors">
                React Kolkata Meetup #18: Building Premium Web Apps
              </h3>
              <p className="text-muted-foreground text-xs leading-relaxed mt-2 line-clamp-2">
                Join our quarterly in-person developer meetup. Experience deep-dive technical talks, lightning demos, and network with 150+ builders.
              </p>
            </div>

            <div className="mt-4 pt-4 border-t border-border/40 flex items-center justify-between">
              <span className="text-[11px] font-medium text-muted-foreground flex items-center gap-1">
                <Users className="h-3 w-3" /> Sector V, Salt Lake
              </span>
              <a 
                href="https://x.com/reactkolkata" 
                target="_blank" 
                rel="noreferrer" 
                className="inline-flex items-center gap-1 text-xs font-bold text-amber-600 dark:text-amber-400 hover:underline"
              >
                RSVP Now
                <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>

          {/* Card 2: Startup Spotlight */}
          <div className="group relative overflow-hidden rounded-3xl border border-border bg-card p-6 flex flex-col justify-between flex-1 min-h-[210px] shadow-sm transition-all duration-300 hover:shadow-md hover:border-muted-foreground/30">
            {/* Background Gradient */}
            <div className="absolute inset-0 -z-10 bg-radial-[at_top_right] from-emerald-500/10 via-background to-background dark:from-emerald-500/15" />
            <div className="absolute top-0 right-0 -z-10 h-40 w-40 rounded-full bg-emerald-500/20 blur-2xl opacity-55 transition-transform duration-500 group-hover:scale-110" />

            <div>
              <div className="flex items-center gap-2 mb-4">
                <Badge variant="secondary" className="rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 font-semibold px-2.5 py-0.5 text-xs">
                  Startup Spotlight
                </Badge>
                <span className="text-[11px] font-semibold text-muted-foreground flex items-center gap-1">
                  <Sparkles className="h-3 w-3" /> AI & Automation
                </span>
              </div>
              <h3 className="font-heading text-lg font-bold leading-snug group-hover:text-primary transition-colors">
                Spotlight: BengalAI Tech
              </h3>
              <p className="text-muted-foreground text-xs leading-relaxed mt-2 line-clamp-2">
                Pioneering localized AI agents and models for Indian regional languages. Check out their new open source LLM toolkit.
              </p>
            </div>

            <div className="mt-4 pt-4 border-t border-border/40 flex items-center justify-between">
              <span className="text-[11px] font-medium text-muted-foreground">
                Founded: 2025 • Kolkata
              </span>
              <Link 
                href="#startups"
                className="inline-flex items-center gap-1 text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline"
              >
                Read Showcase
                <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
