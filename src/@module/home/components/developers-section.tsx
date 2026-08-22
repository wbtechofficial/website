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
      <div className="pointer-events-none absolute -top-16 right-0 -z-10 h-64 w-[380px] rounded-none bg-primary/5 blur-[80px]" />

      {/* Header - concise */}
      <div className="max-w-2xl mb-8">
        <div className="inline-flex items-center gap-1.5 rounded-none border border-border/60 bg-muted/50 px-3 py-1 text-xs font-medium text-foreground">
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
        <div className="rounded-none border border-border/70 bg-card p-5 shadow-xs flex flex-col justify-between hover:border-primary/25 transition-colors">
          <div>
            <div className="h-9 w-9 rounded-none bg-primary/10 text-primary border border-primary/20 flex items-center justify-center">
              <Users className="h-4 w-4" />
            </div>
            <h3 className="mt-3 font-heading text-[15px] font-bold tracking-tight text-foreground">
              Target Audience
            </h3>
            <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
              Unifying students, self-taught developers, active contributors, and regional builders who build in public.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-border/50 flex items-center text-[10px] text-muted-foreground font-mono uppercase tracking-wider">
            Demographic Focus
          </div>
        </div>

        {/* 2 */}
        <div className="rounded-none border border-border/70 bg-card p-5 shadow-xs flex flex-col justify-between hover:border-primary/25 transition-colors">
          <div>
            <div className="h-9 w-9 rounded-none bg-coral/10 text-coral border border-coral/20 flex items-center justify-center">
              <Lightbulb className="h-4 w-4" />
            </div>
            <h3 className="mt-3 font-heading text-[15px] font-bold tracking-tight text-foreground">
              Core Mission
            </h3>
            <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
              Breaking regional silos to build an open, collaborative ecosystem where local engineering talent gets spotlighted.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-border/50 flex items-center text-[10px] text-muted-foreground font-mono uppercase tracking-wider">
            Community Purpose
          </div>
        </div>

        {/* 3 */}
        <div className="rounded-none border border-border/70 bg-card p-5 shadow-xs flex flex-col justify-between hover:border-primary/25 transition-colors">
          <div>
            <div className="h-9 w-9 rounded-none bg-primary/10 text-primary border border-primary/20 flex items-center justify-center">
              <ShieldCheck className="h-4 w-4" />
            </div>
            <h3 className="mt-3 font-heading text-[15px] font-bold tracking-tight text-foreground">
              Member Value
            </h3>
            <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
              Peer code reviews, verified career roles, curated open-source repositories, and technical mentorship.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-border/50 flex items-center text-[10px] text-muted-foreground font-mono uppercase tracking-wider">
            Member Benefits
          </div>
        </div>

        {/* 4 */}
        <div className="rounded-none border border-border/70 bg-card p-5 shadow-xs flex flex-col justify-between hover:border-primary/25 transition-colors">
          <div>
            <div className="h-9 w-9 rounded-none bg-coral/10 text-coral border border-coral/20 flex items-center justify-center">
              <GitBranch className="h-4 w-4" />
            </div>
            <h3 className="mt-3 font-heading text-[15px] font-bold tracking-tight text-foreground">
              Collaboration Model
            </h3>
            <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
              Contribute to local repositories, participate in technical workgroups, and ship open-source packages.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-border/50 flex items-center text-[10px] text-muted-foreground font-mono uppercase tracking-wider">
            Engagement System
          </div>
        </div>

        {/* 5 */}
        <div className="rounded-none border border-border/70 bg-card p-5 shadow-xs flex flex-col justify-between hover:border-primary/25 transition-colors">
          <div>
            <div className="h-9 w-9 rounded-none bg-primary/10 text-primary border border-primary/20 flex items-center justify-center">
              <MessageCircle className="h-4 w-4" />
            </div>
            <h3 className="mt-3 font-heading text-[15px] font-bold tracking-tight text-foreground">
              Interaction Hub
            </h3>
            <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
              Daily discussions on community chat servers and monthly face-to-face meetups for tech mixers.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-border/50 flex items-center text-[10px] text-muted-foreground font-mono uppercase tracking-wider">
            Meeting Venue
          </div>
        </div>

        {/* 6 - Join the Guild CTA Card */}
        <div className="rounded-none border border-transparent bg-gradient-to-br from-[#0BA09C] via-[#098b88] to-[#072049] p-5 shadow-md flex flex-col justify-between text-white hover:shadow-lg transition-all duration-300">
          <div>
            <div className="h-9 w-9 rounded-none bg-white/10 text-white border border-white/20 flex items-center justify-center">
              <Zap className="h-4 w-4 text-white" />
            </div>
            <h3 className="mt-3 font-heading text-[15px] font-bold tracking-tight text-white">
              Join the Guild
            </h3>
            <p className="mt-1.5 text-xs leading-relaxed text-white/80">
              Create your developer profile today to connect, learn, and collaborate with Bengal&apos;s tech community.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-white/15 flex flex-col gap-2">
            <button
              onClick={() => window.dispatchEvent(new Event("open-onboarding"))}
              className="w-full py-2 bg-white text-[#072049] hover:bg-white/90 font-bold text-xs rounded-none transition-all cursor-pointer shadow-xs"
            >
              Register Now
            </button>
            <span className="text-[10px] text-white/60 text-center font-mono">No entry fee • Zero gatekeeping</span>
          </div>
        </div>
      </div>
    </section>
  );
}
