"use client";

import Link from "next/link";
import { Code2, Star, GitFork, ExternalLink, ShieldCheck } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { REPOS } from "@/base/data/repo-mock-data";

export interface OpenSourceRepo {
  id: string;
  name: string;
  description: string;
  stars: string;
  forks: string;
  language: string;
  maintainer: string;
  link: string;
}

export function OpenSourceShowcase() {
  return (
    <section className="container mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-secondary dark:text-primary mb-2">
            <Code2 className="h-3.5 w-3.5" /> Public Infrastructure
          </div>
          <h2 className="font-heading text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
            Featured Open Source Repositories
          </h2>
          <p className="text-muted-foreground text-sm leading-relaxed mt-1 max-w-2xl">
            Community repositories and open-source libraries maintained by
            developers in West Bengal.
          </p>
        </div>

        <Link
          href="#updates"
          className="inline-flex items-center gap-1 text-xs font-bold text-secondary dark:text-primary hover:underline self-start sm:self-auto shrink-0"
        >
          Explore repositories <ExternalLink className="h-3.5 w-3.5" />
        </Link>
      </div>

      {/* Repo Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {REPOS.map((repo) => (
          <Link
            key={repo.id}
            href={repo.link}
            className="group flex flex-col justify-between rounded-2xl border border-border/80 bg-gradient-to-br from-card via-card to-secondary/5 hover:from-card hover:via-card hover:to-secondary/10 p-5 shadow-xs transition-all duration-300 hover:border-secondary/70 hover:shadow-[0_0_20px_rgba(60,24,116,0.2)]"
          >
            <div>
              {/* Title & Badge */}
              <div className="flex items-center justify-between gap-2 mb-3">
                <div className="flex items-center gap-2">
                  <Code2 className="h-4 w-4 text-secondary shrink-0" />
                  <h3 className="font-mono text-sm font-bold text-foreground group-hover:text-secondary transition-colors truncate max-w-[180px]">
                    {repo.name}
                  </h3>
                </div>
                <Badge
                  variant="outline"
                  className="rounded-full px-2 py-0.5 text-[10px] font-mono shrink-0"
                >
                  {repo.language}
                </Badge>
              </div>

              {/* Description */}
              <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3 mb-4">
                {repo.description}
              </p>
            </div>

            {/* Footer Stats & Maintainer */}
            <div className="pt-3 border-t border-border/50 flex items-center justify-between text-xs text-muted-foreground">
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1 text-[11px] font-semibold text-amber-500">
                  <Star className="h-3.5 w-3.5 fill-current" /> {repo.stars}
                </span>
                <span className="flex items-center gap-1 text-[11px] font-semibold">
                  <GitFork className="h-3.5 w-3.5 text-muted-foreground" />{" "}
                  {repo.forks}
                </span>
              </div>
              <span className="text-[10px] font-medium text-foreground bg-muted px-2 py-0.5 rounded-full flex items-center gap-1">
                <ShieldCheck className="h-3 w-3 text-secondary" />{" "}
                {repo.maintainer}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
