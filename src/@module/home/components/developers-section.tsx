"use client";

import { Badge } from "@/components/ui/badge";
import {
  Calendar,
  Code2,
  GitBranch,
  Heart,
  Lightbulb,
  MapPin,
  MessageCircle,
  ShieldCheck,
  Target,
  Terminal,
  Users,
  Zap,
} from "lucide-react";

export function DevelopersSection() {
  return (
    <section
      id="developers"
      className="relative container mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 border-b border-border/40 overflow-hidden"
    >
      <div className="pointer-events-none absolute -top-16 right-0 -z-10 h-64 w-[380px] rounded-full bg-primary/5 blur-[80px]" />

      {/* Header - concise */}
      <div className="max-w-2xl mb-8">
        <div className="inline-flex items-center gap-1.5 rounded-md border border-border/60 bg-muted/50 px-3 py-1 text-xs font-medium text-foreground">
          <Terminal className="h-3.5 w-3.5 text-primary" />
          <span className="font-mono text-[11px]">west-bengal.tech // for technical geeks</span>
        </div>
        <h2 className="mt-3 font-heading text-2xl sm:text-3xl font-bold tracking-tight text-foreground leading-tight">
          Built for <span className="text-primary">technical geeks</span> who want to belong.
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          For students, self-taught devs and builders across Bengal looking for a real community — not just a feed.
        </p>
      </div>

      {/* Simple concise mosaic - 6 equal cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* 1 */}
        <div className="rounded-2xl border border-border/70 bg-gradient-to-br from-card via-card to-primary/[0.04] p-5 shadow-xs flex flex-col justify-between hover:border-primary/25 transition-colors">
          <div>
            <div className="h-9 w-9 rounded-xl bg-primary/10 text-primary border border-primary/20 flex items-center justify-center">
              <Users className="h-4 w-4" />
            </div>
            <h3 className="mt-3 font-heading text-[15px] font-bold tracking-tight text-foreground">
              Who it&apos;s for
            </h3>
            <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
              Students, freshers, self-taught devs and maintainers who tinker after hours and learn in public.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-border/50 flex items-center justify-between text-[11px]">
            <span className="font-mono text-muted-foreground">1,200+ builders</span>
            <Badge variant="outline" className="rounded-md text-[10px] px-2 py-0">
              Since 2024
            </Badge>
          </div>
        </div>

        {/* 2 */}
        <div className="rounded-2xl border border-border/70 bg-card p-5 shadow-xs flex flex-col justify-between hover:border-primary/25 transition-colors">
          <div>
            <div className="h-9 w-9 rounded-xl bg-coral/10 text-coral border border-coral/20 flex items-center justify-center">
              <Lightbulb className="h-4 w-4" />
            </div>
            <h3 className="mt-3 font-heading text-[15px] font-bold tracking-tight text-foreground">
              Why this exists
            </h3>
            <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
              Bengal has talent but fragmented groups. We unify it — one open home to share, build and get discovered.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-border/50 flex items-center gap-2 text-[11px] text-muted-foreground">
            <Heart className="h-3 w-3 text-coral" /> Community-led • Free forever
          </div>
        </div>

        {/* 3 */}
        <div className="rounded-2xl border border-border/70 bg-card p-5 shadow-xs flex flex-col justify-between hover:border-primary/25 transition-colors">
          <div>
            <div className="h-9 w-9 rounded-xl bg-primary/10 text-primary border border-primary/20 flex items-center justify-center">
              <ShieldCheck className="h-4 w-4" />
            </div>
            <h3 className="mt-3 font-heading text-[15px] font-bold tracking-tight text-foreground">
              What you get
            </h3>
            <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
              Peer reviews, verified roles, curated repos — curated by builders, not algorithms. No recruiter spam.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-border/50 flex flex-wrap gap-1.5">
            <Badge variant="outline" className="rounded-md text-[10px] bg-muted/40">
              Mentorship
            </Badge>
            <Badge variant="outline" className="rounded-md text-[10px] bg-muted/40">
              Open Source
            </Badge>
            <Badge variant="outline" className="rounded-md text-[10px] bg-muted/40">
              Jobs
            </Badge>
          </div>
        </div>

        {/* 4 */}
        <div className="rounded-2xl border border-border/70 bg-card p-5 shadow-xs flex flex-col justify-between hover:border-primary/25 transition-colors">
          <div>
            <div className="h-9 w-9 rounded-xl bg-navy text-ice border border-border/60 flex items-center justify-center">
              <GitBranch className="h-4 w-4" />
            </div>
            <h3 className="mt-3 font-heading text-[15px] font-bold tracking-tight text-foreground">
              How it works
            </h3>
            <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
              Lurk → Learn → Ship. Star repos, ask doubts, pick a #good-first-issue and get featured.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-border/50 flex items-center gap-1.5 text-[11px] font-mono text-muted-foreground">
            <Code2 className="h-3 w-3 text-primary" /> First PR in ~7 days
          </div>
        </div>

        {/* 5 */}
        <div className="rounded-2xl border border-border/70 bg-gradient-to-br from-card via-card to-primary/[0.04] p-5 shadow-xs flex flex-col justify-between hover:border-primary/25 transition-colors">
          <div>
            <div className="h-9 w-9 rounded-xl bg-primary/10 text-primary border border-primary/20 flex items-center justify-center">
              <MessageCircle className="h-4 w-4" />
            </div>
            <h3 className="mt-3 font-heading text-[15px] font-bold tracking-tight text-foreground">
              Where we meet
            </h3>
            <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
              Daily on Discord. Monthly offline at Sector V, Kolkata for demos and hiring mixers.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-border/50 flex items-center justify-between text-[11px] text-muted-foreground">
            <span className="inline-flex items-center gap-1">
              <Calendar className="h-3 w-3" /> Monthly
            </span>
            <span className="inline-flex items-center gap-1 font-medium text-foreground">
              <MapPin className="h-3 w-3 text-primary" /> Sector V
            </span>
          </div>
        </div>

        {/* 6 */}
        <div className="rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/[0.07] via-card to-card p-5 shadow-xs flex flex-col justify-between hover:border-primary/30 transition-colors">
          <div>
            <div className="h-9 w-9 rounded-xl bg-primary text-primary-foreground flex items-center justify-center">
              <Target className="h-4 w-4" />
            </div>
            <h3 className="mt-3 font-heading text-[15px] font-bold tracking-tight text-foreground">
              Start this week
            </h3>
            <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
              2-min onboarding. Say hi in #intro, grab a task, ship and get your first shout-out.
            </p>
          </div>
          <div className="mt-4 flex items-center gap-2 text-[11px]">
            <span className="inline-flex items-center gap-1 rounded-md bg-primary text-primary-foreground px-2.5 py-1 font-semibold">
              <Zap className="h-3 w-3" /> I&apos;m in
            </span>
            <span className="text-muted-foreground font-mono">No spam. No gatekeeping.</span>
          </div>
        </div>
      </div>
    </section>
  );
}
