"use client";

import Link from "next/link";
import { Users, MapPin, ExternalLink, Hash } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { COMMUNITIES } from "@/base/data/communities-mock-data";

export function CommunitiesSection() {
  return (
    <section id="communities" className="container mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 border-b border-border/40">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary mb-2">
            <Users className="h-3.5 w-3.5" /> Ecosystem Guilds
          </div>
          <h2 className="font-heading text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
            Active Communities
          </h2>
          <p className="text-muted-foreground text-sm leading-relaxed mt-1 max-w-2xl">
            Join peer-led guilds running meetups, sprints and mentorship across West Bengal.
          </p>
        </div>

        <Link
          href="#"
          className="inline-flex items-center gap-1 text-xs font-bold text-primary hover:underline self-start sm:self-auto shrink-0"
        >
          Explore all communities <ExternalLink className="h-3.5 w-3.5" />
        </Link>
      </div>

      {/* Communities Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {COMMUNITIES.map((community) => (
          <Link
            key={community.id}
            href={community.link}
            target={community.link.startsWith("http") ? "_blank" : undefined}
            rel={community.link.startsWith("http") ? "noreferrer" : undefined}
            className="group flex flex-col justify-between rounded-2xl border border-border/80 bg-gradient-to-br from-card via-card to-primary/5 hover:from-card hover:via-card hover:to-primary/10 p-5 shadow-xs transition-all duration-300 hover:border-primary/70 hover:shadow-[0_0_20px_rgba(11,160,156,0.2)]"
          >
            <div>
              {/* Header */}
              <div className="flex items-center gap-3 mb-3">
                <div className="h-10 w-10 rounded-xl bg-primary/10 text-primary font-bold text-xs flex items-center justify-center border border-primary/20 shrink-0">
                  {community.iconText}
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="font-heading text-sm font-bold text-foreground group-hover:text-primary transition-colors truncate">
                    {community.name}
                  </h3>
                  <p className="text-[11px] text-primary font-mono font-medium">{community.handle}</p>
                </div>
              </div>

              {/* Description */}
              <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3 mb-4">
                {community.description}
              </p>

              {/* Focus Tags */}
              <div className="flex flex-wrap gap-1.5 mb-4">
                {community.focus.map((tag) => (
                  <Badge
                    key={tag}
                    variant="outline"
                    className="rounded-md px-2 py-0.5 text-[10px] font-medium bg-muted/40 border-border/60"
                  >
                    <Hash className="h-3 w-3 mr-0.5 text-muted-foreground" />
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="pt-3 border-t border-border/50 flex items-center justify-between text-[11px]">
              <span className="flex items-center gap-1 font-semibold text-foreground bg-muted/60 px-2 py-0.5 rounded-md">
                <Users className="h-3 w-3 text-primary" /> {community.members}
              </span>
              <span className="flex items-center gap-1 text-muted-foreground text-[10px] font-medium">
                <MapPin className="h-3 w-3 text-primary/70" /> {community.location}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
