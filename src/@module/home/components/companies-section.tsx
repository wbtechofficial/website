"use client";

import Link from "next/link";
import { Building2, MapPin, ExternalLink, Users, Briefcase } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { COMPANIES } from "@/base/data/companies-mock-data";

export function CompaniesSection() {
  return (
    <section id="companies" className="container mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 border-b border-border/40">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary mb-2">
            <Building2 className="h-3.5 w-3.5" /> Hiring Partners
          </div>
          <h2 className="font-heading text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
            Top Companies
          </h2>
          <p className="text-muted-foreground text-sm leading-relaxed mt-1 max-w-2xl">
            Explore product companies and tech teams hiring across Kolkata, Salt Lake and beyond.
          </p>
        </div>

        <Link
          href="#"
          className="inline-flex items-center gap-1 text-xs font-bold text-primary hover:underline self-start sm:self-auto shrink-0"
        >
          View all companies <ExternalLink className="h-3.5 w-3.5" />
        </Link>
      </div>

      {/* Companies Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {COMPANIES.map((company) => (
          <Link
            key={company.id}
            href={company.link}
            className="group flex flex-col justify-between rounded-2xl border border-border/80 bg-gradient-to-br from-card via-card to-primary/5 hover:from-card hover:via-card hover:to-primary/10 p-5 shadow-xs transition-all duration-300 hover:border-primary/70 hover:shadow-[0_0_20px_rgba(11,160,156,0.2)]"
          >
            <div>
              {/* Header */}
              <div className="flex items-center gap-3 mb-4">
                <div className="h-10 w-10 rounded-xl bg-secondary text-secondary-foreground font-bold text-xs flex items-center justify-center border border-border/60 shrink-0">
                  {company.logoText}
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="font-heading text-sm font-bold text-foreground group-hover:text-primary transition-colors truncate">
                    {company.name}
                  </h3>
                  <p className="text-[10px] text-muted-foreground font-medium flex items-center gap-1 mt-0.5">
                    <MapPin className="h-3 w-3 text-primary/70" /> {company.location}
                  </p>
                </div>
                <Badge variant="outline" className="rounded-md px-2 py-0.5 text-[10px] font-semibold shrink-0">
                  {company.category}
                </Badge>
              </div>

              {/* Tagline */}
              <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3 mb-4">
                {company.tagline}
              </p>

              {/* Tech Stack */}
              <div className="flex flex-wrap gap-1.5 mb-4">
                {company.techStack.map((tech) => (
                  <Badge
                    key={tech}
                    variant="secondary"
                    className="rounded-md px-2 py-0.5 text-[10px] font-medium bg-muted text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary transition-colors"
                  >
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="pt-3 border-t border-border/50 flex items-center justify-between text-[11px]">
              <span className="flex items-center gap-1 text-muted-foreground font-medium">
                <Users className="h-3 w-3" /> {company.size} employees
              </span>
              <span className="flex items-center gap-1 font-semibold text-primary bg-primary/10 border border-primary/20 px-2 py-0.5 rounded-md">
                <Briefcase className="h-3 w-3" /> {company.openRoles} roles
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
