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
        <div className="inline-flex items-center gap-1.5 rounded-full border border-border/60 bg-muted/50 px-3 py-1 text-xs font-medium text-foreground">
          <Terminal className="h-3.5 w-3.5 text-primary" />
          <span className="font-mono text-[11px]">westbengal.tech // for developers & builders</span>
        </div>
        <h2 className="mt-3 font-heading text-2xl sm:text-3xl font-bold tracking-tight text-foreground leading-tight">
          A Home Built for <span className="text-primary">Bengal's Technologists</span>, Developers & Builders.
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          Connecting engineers, self-taught coders, and innovators across Bengal to share knowledge, collaborate on open-source, and grow together.
        </p>
      </div>

      {/* Concise mosaic - 6 equal cards with uplifted layout & copy */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {/* 1: Community Spectrum */}
        <div className="group relative rounded-2xl border border-border/70 bg-card/70 backdrop-blur-xs p-6 shadow-xs flex flex-col justify-between hover:border-primary/40 hover:shadow-md transition-all duration-300">
          <div>
            <div className="flex items-center justify-between">
              <div className="h-10 w-10 rounded-xl bg-primary/10 text-primary border border-primary/20 flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
                <Users className="h-5 w-5" />
              </div>
              <span className="text-[10px] text-primary/80 dark:text-teal font-mono uppercase tracking-wider bg-primary/5 dark:bg-primary/10 border border-primary/10 px-2.5 py-0.5 rounded-full font-semibold">
                Builders
              </span>
            </div>
            <h3 className="mt-4 font-heading text-base font-bold tracking-tight text-foreground group-hover:text-primary transition-colors">
              For Every Developer
            </h3>
            <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
              Unifying students, self-taught coders, open-source contributors, and senior engineering leaders across West Bengal.
            </p>
          </div>
          <div className="mt-5 pt-3.5 border-t border-border/40 flex items-center justify-between text-[11px] text-muted-foreground font-mono">
            <span className="uppercase tracking-wider text-[10px]">Community Spectrum</span>
            <span className="text-primary font-semibold">01</span>
          </div>
        </div>

        {/* 2: Community Vision */}
        <div className="group relative rounded-2xl border border-border/70 bg-card/70 backdrop-blur-xs p-6 shadow-xs flex flex-col justify-between hover:border-coral/40 hover:shadow-md transition-all duration-300">
          <div>
            <div className="flex items-center justify-between">
              <div className="h-10 w-10 rounded-xl bg-coral/10 text-coral border border-coral/20 flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
                <Lightbulb className="h-5 w-5" />
              </div>
              <span className="text-[10px] text-coral font-mono uppercase tracking-wider bg-coral/5 dark:bg-coral/10 border border-coral/10 px-2.5 py-0.5 rounded-full font-semibold">
                Vision
              </span>
            </div>
            <h3 className="mt-4 font-heading text-base font-bold tracking-tight text-foreground group-hover:text-coral transition-colors">
              Unifying Bengal's Tech Scene
            </h3>
            <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
              Breaking regional silos to build an open, collaborative ecosystem where local software engineering talent gets spotlighted.
            </p>
          </div>
          <div className="mt-5 pt-3.5 border-t border-border/40 flex items-center justify-between text-[11px] text-muted-foreground font-mono">
            <span className="uppercase tracking-wider text-[10px]">Community Mission</span>
            <span className="text-coral font-semibold">02</span>
          </div>
        </div>

        {/* 3: Member Value */}
        <div className="group relative rounded-2xl border border-border/70 bg-card/70 backdrop-blur-xs p-6 shadow-xs flex flex-col justify-between hover:border-emerald-500/40 hover:shadow-md transition-all duration-300">
          <div>
            <div className="flex items-center justify-between">
              <div className="h-10 w-10 rounded-xl bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <span className="text-[10px] text-emerald-500 font-mono uppercase tracking-wider bg-emerald-500/5 dark:bg-emerald-500/10 border border-emerald-500/10 px-2.5 py-0.5 rounded-full font-semibold">
                Value
              </span>
            </div>
            <h3 className="mt-4 font-heading text-base font-bold tracking-tight text-foreground group-hover:text-emerald-500 transition-colors">
              Mentorship & Career Growth
            </h3>
            <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
              Direct peer code reviews, verified regional career opportunities, open-source repositories, and tech mentorship circles.
            </p>
          </div>
          <div className="mt-5 pt-3.5 border-t border-border/40 flex items-center justify-between text-[11px] text-muted-foreground font-mono">
            <span className="uppercase tracking-wider text-[10px]">Member Benefits</span>
            <span className="text-emerald-500 font-semibold">03</span>
          </div>
        </div>

        {/* 4: Open Source First */}
        <div className="group relative rounded-2xl border border-border/70 bg-card/70 backdrop-blur-xs p-6 shadow-xs flex flex-col justify-between hover:border-coral/40 hover:shadow-md transition-all duration-300">
          <div>
            <div className="flex items-center justify-between">
              <div className="h-10 w-10 rounded-xl bg-coral/10 text-coral border border-coral/20 flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
                <GitBranch className="h-5 w-5" />
              </div>
              <span className="text-[10px] text-coral font-mono uppercase tracking-wider bg-coral/5 dark:bg-coral/10 border border-coral/10 px-2.5 py-0.5 rounded-full font-semibold">
                Code
              </span>
            </div>
            <h3 className="mt-4 font-heading text-base font-bold tracking-tight text-foreground group-hover:text-coral transition-colors">
              Open-Source & Collaboration
            </h3>
            <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
              Contribute to local software repositories, participate in specialized workgroups, and ship impactful open-source tools.
            </p>
          </div>
          <div className="mt-5 pt-3.5 border-t border-border/40 flex items-center justify-between text-[11px] text-muted-foreground font-mono">
            <span className="uppercase tracking-wider text-[10px]">How We Build</span>
            <span className="text-coral font-semibold">04</span>
          </div>
        </div>

        {/* 5: Meetups & Discussion */}
        <div className="group relative rounded-2xl border border-border/70 bg-card/70 backdrop-blur-xs p-6 shadow-xs flex flex-col justify-between hover:border-primary/40 hover:shadow-md transition-all duration-300">
          <div>
            <div className="flex items-center justify-between">
              <div className="h-10 w-10 rounded-xl bg-primary/10 text-primary border border-primary/20 flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
                <MessageCircle className="h-5 w-5" />
              </div>
              <span className="text-[10px] text-primary/80 dark:text-teal font-mono uppercase tracking-wider bg-primary/5 dark:bg-primary/10 border border-primary/10 px-2.5 py-0.5 rounded-full font-semibold">
                Connect
              </span>
            </div>
            <h3 className="mt-4 font-heading text-base font-bold tracking-tight text-foreground group-hover:text-primary transition-colors">
              Meetups & Technical Hubs
            </h3>
            <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
              Active daily discussions on community chats, monthly in-person tech meetups, and regional engineering mixers.
            </p>
          </div>
          <div className="mt-5 pt-3.5 border-t border-border/40 flex items-center justify-between text-[11px] text-muted-foreground font-mono">
            <span className="uppercase tracking-wider text-[10px]">Where We Meet</span>
            <span className="text-primary font-semibold">05</span>
          </div>
        </div>

        {/* 6: Join the Community Guild CTA Card */}
        <div className="group relative rounded-2xl border border-transparent bg-gradient-to-br from-[#0BA09C] via-[#098b88] to-[#072049] p-6 shadow-md flex flex-col justify-between text-white hover:shadow-xl transition-all duration-300">
          <div>
            <div className="flex items-center justify-between">
              <div className="h-10 w-10 rounded-xl bg-white/15 text-white border border-white/25 flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
                <Zap className="h-5 w-5 text-white" />
              </div>
              <span className="text-[10px] text-white/90 font-mono uppercase tracking-wider bg-white/10 border border-white/20 px-2.5 py-0.5 rounded-full font-semibold">
                Join Us
              </span>
            </div>
            <h3 className="mt-4 font-heading text-base font-bold tracking-tight text-white">
              Join the Tech Guild
            </h3>
            <p className="mt-2 text-xs leading-relaxed text-white/85">
              Build your developer profile today to showcase your projects, connect with peers, and unlock opportunities.
            </p>
          </div>
          <div className="mt-5 pt-3.5 border-t border-white/15 flex flex-col gap-2.5">
            <button
              onClick={() => window.dispatchEvent(new Event("open-onboarding"))}
              className="w-full py-2.5 bg-white text-[#072049] hover:bg-white/90 font-bold text-xs rounded-xl transition-all cursor-pointer shadow-sm hover:shadow-md"
            >
              Create Profile
            </button>
            <span className="text-[10px] text-white/70 text-center font-mono">No entry fee • Zero gatekeeping</span>
          </div>
        </div>
      </div>
    </section>
  );
}
