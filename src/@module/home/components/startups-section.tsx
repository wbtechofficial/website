"use client";

import Link from "next/link";
import { Rocket, ExternalLink, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { STARTUPS } from "@/base/data/startups-mock-data";

export function StartupsSection() {
  return (
    <section id="startups" className="container mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 border-b border-border/40">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary mb-2">
            <Rocket className="h-3.5 w-3.5" /> Regional Innovation
          </div>
          <h2 className="font-heading text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
            Bengal Startup Spotlight
          </h2>
          <p className="text-muted-foreground text-sm leading-relaxed mt-1 max-w-2xl">
            Highlighting technology startups founded across Kolkata, Salt Lake, Durgapur, and Siliguri building for global markets.
          </p>
        </div>

        <Link
          href="#"
          className="inline-flex items-center gap-1 text-xs font-bold text-primary hover:underline self-start sm:self-auto shrink-0"
        >
          View all startups <ExternalLink className="h-3.5 w-3.5" />
        </Link>
      </div>

      {/* Startup Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {STARTUPS.map((item) => (
          <Link
            key={item.id}
            href={item.link}
            className="group flex flex-col justify-between rounded-2xl border border-border/80 bg-gradient-to-br from-card via-card to-primary/5 hover:from-card hover:via-card hover:to-primary/10 p-5 shadow-xs transition-all duration-300 hover:border-primary/70 hover:shadow-[0_0_20px_rgba(11,160,156,0.2)]"
          >
            <div>
              {/* Header */}
              <div className="flex items-center justify-between gap-3 mb-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-primary/10 text-primary font-bold text-xs flex items-center justify-center border border-primary/20 shrink-0">
                    {item.logoText}
                  </div>
                  <div>
                    <h3 className="font-heading text-base font-bold text-foreground group-hover:text-primary transition-colors">
                      {item.name}
                    </h3>
                    <p className="text-[10px] text-muted-foreground font-medium flex items-center gap-1 mt-0.5">
                      <MapPin className="h-3 w-3 text-primary/70" /> {item.location}
                    </p>
                  </div>
                </div>
              </div>

              {/* Tagline */}
              <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3 mb-4">
                {item.tagline}
              </p>
            </div>

            {/* Footer Badges */}
            <div className="pt-3 border-t border-border/50 flex items-center justify-between text-[10px]">
              <Badge variant="outline" className="rounded-md px-2.5 py-0.5 font-semibold text-[10px]">
                {item.category}
              </Badge>
              <span className="font-semibold text-foreground bg-muted/60 px-2 py-0.5 rounded-md">
                {item.funding}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
