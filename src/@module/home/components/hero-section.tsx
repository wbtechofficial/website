"use client";

import { useState } from "react";
import {
  ArrowRight,
  Code2,
  Users,
  Rocket,
  Briefcase,
  Terminal,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { OnboardingForm } from "@/@module/home/components/onboarding-form";
import { onboardingService } from "@/@module/home/services/onboarding";
import { toast } from "@/components/ui/toast";

export function HeroSection() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleJoinCommunity = async (data: any) => {
    setIsSubmitting(true);
    try {
      await onboardingService.submit(data);
      toast.add({
        title: "Profile Created!",
        description: `Welcome to the community, ${data.name}!`,
        type: "success",
      });
      setIsOpen(false);
    } catch (error: any) {
      toast.add({
        title: "Registration Failed",
        description: error.message || "Please check your inputs and try again.",
        type: "error",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="relative pt-10 pb-12 sm:pt-14 sm:pb-16 lg:pt-16 lg:pb-16 border-b border-border/40 overflow-hidden">
      {/* Ambient Subtle Accent Blur */}
      <div className="pointer-events-none absolute top-0 left-1/4 -z-10 h-72 w-[500px] rounded-full bg-primary/5 blur-[100px]" />

      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-10 sm:mb-12">
          {/* Left Column: Refactored Headline & Intro (Spans 8 cols) */}
          <div className="lg:col-span-8 space-y-5">
            {/* Monospaced Guild Tag */}
            <div className="inline-flex items-center gap-2 rounded-md border border-border/60 bg-muted/50 px-3.5 py-1 text-xs font-medium text-foreground backdrop-blur-md">
              <Terminal className="h-3.5 w-3.5 text-primary" />
              <span className="font-mono text-[11px] sm:text-xs">
                west-bengal.tech // developer network
              </span>
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse ml-1" />
            </div>

            {/* Human-Centric Balanced Headline */}
            <h1 className="font-heading text-3xl sm:text-4xl lg:text-[44px] font-bold tracking-tight text-foreground leading-[1.18] max-w-3xl">
              Bridging Bengal's engineering talent, open-source projects, and
              technical wisdom.
            </h1>

            {/* Subtitle Paragraph */}
            <p className="text-primary-muted text-sm sm:text-base leading-relaxed max-w-2xl font-normal">
              An open digital community powered by developers under React
              Kolkata. Discover regional technology news, spotlight local
              deep-tech startups, and connect with technical careers across West
              Bengal.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <Button
                onClick={() => setIsOpen(true)}
                size="lg"
                className="rounded-xl px-6 py-2.5 font-semibold text-white text-xs sm:text-sm shadow-sm hover:shadow-md transition-all gap-2 group cursor-pointer"
              >
                <span>Join the Community</span>
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
            </div>
          </div>

          {/* Right Column: Live Community Pulse Cards to Fill Whitespace (Spans 4 cols) */}
          <div className="lg:col-span-4 flex flex-col gap-3">
            <div className="rounded-2xl border border-border/70 bg-gradient-to-br from-card via-card to-primary/5 p-4 shadow-xs flex items-center gap-3.5 hover:border-primary/50 transition-colors">
              <div className="h-10 w-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0 border border-primary/20">
                <Users className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs font-bold text-foreground">
                  1,200+ Regional Builders
                </p>
                <p className="text-[11px] text-muted-foreground">
                  Engineers in Salt Lake, New Town & Siliguri
                </p>
              </div>
            </div>

            <div className="rounded-2xl border border-border/70 bg-card p-4 shadow-xs flex items-center gap-3.5 hover:border-coral/50 transition-colors">
              <div className="h-10 w-10 rounded-xl bg-coral/10 text-coral flex items-center justify-center shrink-0 border border-coral/20">
                <Code2 className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs font-bold text-foreground">
                  35+ Open Source Repos
                </p>
                <p className="text-[11px] text-muted-foreground">
                  Libraries built by local developers
                </p>
              </div>
            </div>

            <div className="rounded-2xl border border-border/70 bg-gradient-to-br from-card via-card to-primary/5 p-4 shadow-xs flex items-center gap-3.5 hover:border-primary/50 transition-colors">
              <div className="h-10 w-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0 border border-primary/20">
                <Rocket className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs font-bold text-foreground">
                  25+ Bengal Startups
                </p>
                <p className="text-[11px] text-muted-foreground">
                  Spotlighting regional tech pioneers
                </p>
              </div>
            </div>

            <div className="rounded-2xl border border-border/70 bg-card p-4 shadow-xs flex items-center gap-3.5 hover:border-coral/50 transition-colors">
              <div className="h-10 w-10 rounded-xl bg-coral/10 text-coral flex items-center justify-center shrink-0 border border-coral/20">
                <Briefcase className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs font-bold text-foreground">
                  40+ Direct Tech Jobs
                </p>
                <p className="text-[11px] text-muted-foreground">
                  Verified frontend, AI & cloud roles
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Profile Onboarding Modal Popup */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent
          showCloseButton={false}
          className="p-0 border-0 bg-transparent ring-0 shadow-none max-w-md rounded-3xl overflow-hidden"
        >
          <OnboardingForm
            title="Join the west-bengal.tech Network"
            description="Create your profile to connect with regional engineers, startups, and career roles."
            buttonText="Submit Profile"
            onSubmit={handleJoinCommunity}
            isSubmitting={isSubmitting}
          />
        </DialogContent>
      </Dialog>
    </section>
  );
}
