"use client";

import { ArrowRight, Sparkles, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

export function NewsletterCard() {
  return (
    <section className="container mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="relative overflow-hidden rounded-3xl border border-primary/30 bg-gradient-to-br from-card via-card to-primary/5 p-6 sm:p-10 shadow-md">
        {/* Decorative background glow */}
        <div className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-secondary/10 blur-3xl" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Heading, Description & Action */}
          <div className="lg:col-span-7 space-y-4">
            <div className="inline-flex items-center gap-1.5 rounded-md border border-primary/20 bg-primary/10 px-3 py-0.5 text-xs font-semibold text-primary">
              <Sparkles className="h-3.5 w-3.5" /> Weekly Ecosystem Digest
            </div>
            <h2 className="font-heading text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
              Stay ahead with West Bengal Tech Weekly
            </h2>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-xl">
              Join 1,200+ developers, startup founders, and engineering leaders
              receiving our curated Friday newsletter. Zero spam, high signal.
            </p>
            <div className="pt-2">
              <Button
                onClick={() =>
                  window.dispatchEvent(new Event("open-onboarding"))
                }
                className="h-11 rounded-none px-8 font-semibold text-white text-xs sm:text-sm shadow-sm hover:shadow-md transition-all gap-2 group cursor-pointer inline-flex items-center justify-center"
              >
                <span>Join the Community</span>
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
            </div>
          </div>

          {/* Right Column: Key Bullet Pointers */}
          <div className="lg:col-span-5 bg-primary/5 dark:bg-white/5 rounded-2xl border border-primary/10 dark:border-white/5 p-5 md:p-6 backdrop-blur-xs">
            <h4 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-primary" /> What you can expect:
            </h4>
            <ul className="space-y-3 text-xs sm:text-sm">
              <li className="flex items-start gap-3 text-muted-foreground">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary mt-0.5">
                  <Check className="h-3 w-3" />
                </span>
                <span className="text-foreground/90 font-medium">
                  Weekly tech roundups & updates
                </span>
              </li>
              <li className="flex items-start gap-3 text-muted-foreground">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary mt-0.5">
                  <Check className="h-3 w-3" />
                </span>
                <span className="text-foreground/90 font-medium">
                  Bengal startup feature spotlights
                </span>
              </li>
              <li className="flex items-start gap-3 text-muted-foreground">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary mt-0.5">
                  <Check className="h-3 w-3" />
                </span>
                <span className="text-foreground/90 font-medium">
                  Regional open-source project showcases
                </span>
              </li>
              <li className="flex items-start gap-3 text-muted-foreground">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary mt-0.5">
                  <Check className="h-3 w-3" />
                </span>
                <span className="text-foreground/90 font-medium">
                  Curated local tech career opportunities
                </span>
              </li>
              <li className="flex items-start gap-3 text-muted-foreground">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary mt-0.5">
                  <Check className="h-3 w-3" />
                </span>
                <span className="text-foreground/90 font-medium">
                  Kolkata meetup & technical event alerts
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
