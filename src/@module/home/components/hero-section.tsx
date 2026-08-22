"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
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

  useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    window.addEventListener("open-onboarding", handleOpen);
    return () => window.removeEventListener("open-onboarding", handleOpen);
  }, []);

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
      setIsOpen(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="relative w-full text-sm pt-20 pb-24 sm:pt-24 sm:pb-32 lg:pt-28 lg:pb-36 border-b border-border/40 overflow-hidden">
      {/* Background Vector Image with Gradient Overlay and Horizontal Fade */}
      <div className="absolute inset-y-0 left-0 right-0 w-full pointer-events-none -z-20 overflow-hidden select-none">
        <Image
          src="/images/west-bengal-tech-vector-image.png"
          alt="West Bengal Tech Background"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-20 dark:opacity-[0.18] mix-blend-luminosity"
        />
        {/* Left Side Fade */}
        <div className="absolute top-0 bottom-0 left-0 w-1/4 bg-gradient-to-r from-background via-background/40 to-transparent" />
        {/* Right Side Fade */}
        <div className="absolute top-0 bottom-0 right-0 w-1/4 bg-gradient-to-l from-background via-background/40 to-transparent" />
      </div>

      {/* Ambient Subtle Accent Blur */}
      <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 -z-10 h-72 w-[600px] rounded-full bg-primary/5 blur-[100px]" />

      {/* Bottom Gradient Fade Mask to blend with next section */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none z-10" />

      <div className="container relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 z-20 flex flex-col items-center text-center">
        {/* Monospaced Announcement Tag Pill */}
        <div className="inline-flex items-center gap-2 rounded-none border border-primary/20 bg-card/60 px-4 py-1.5 text-xs font-medium text-foreground backdrop-blur-md transition-all duration-300 hover:scale-[1.02] cursor-pointer shadow-xs select-none">
          <Terminal className="h-3.5 w-3.5 text-primary" />
          <span className="font-mono text-[10px] sm:text-xs text-muted-foreground">
            west-bengal.tech // developer network
          </span>
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse ml-1" />
        </div>

        {/* Centered Large Headline */}
        <h1 className="font-heading text-4xl sm:text-5xl lg:text-[64px] font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-foreground via-foreground/95 to-primary dark:to-[#3de0db] leading-[1.12] max-w-4xl mt-8">
          Bridging Bengal's Engineering Talent & Wisdom
        </h1>

        {/* Subtitle Paragraph */}
        <p className="text-primary-muted text-sm sm:text-base md:text-lg leading-relaxed max-w-2xl mt-6 font-normal">
          An open digital community powered by developers under React Kolkata.
          Discover regional tech updates, spotlight local open-source projects,
          and connect with technical careers across West Bengal.
        </p>

        {/* Action Buttons Centered */}
        <div className="flex flex-wrap items-center justify-center gap-4 mt-8 w-full">
          <Button
            onClick={() => setIsOpen(true)}
            className="h-11 rounded-none px-8 font-semibold text-white text-xs sm:text-sm shadow-sm hover:shadow-md transition-all gap-2 group cursor-pointer inline-flex items-center justify-center"
          >
            <span>Join the Community</span>
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Button>

          {/* <a
            href="#developers"
            className="h-11 flex items-center justify-center gap-2 border border-border bg-card/40 hover:bg-muted/40 backdrop-blur-xs rounded-none px-8 font-semibold text-xs sm:text-sm transition-all duration-200 select-none cursor-pointer"
          >
            <span>Explore Projects</span>
            <Code2 className="h-4 w-4 text-primary" />
          </a> */}
        </div>

        {/* Metrics Grid to Fill Whitespace */}
        {/* <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto mt-16 sm:mt-24 w-full">
          <div className="group rounded-none border border-border/60 bg-card/50 backdrop-blur-md p-5 shadow-xs flex flex-col justify-between items-start text-left hover:border-primary/50 hover:shadow-sm transition-all duration-300">
            <div className="h-10 w-10 rounded-none bg-primary/10 text-primary flex items-center justify-center border border-primary/20 transition-transform group-hover:scale-105">
              <Users className="h-5 w-5" />
            </div>
            <div className="mt-4">
              <p className="text-xl font-extrabold text-foreground tracking-tight">
                1,200+
              </p>
              <p className="text-xs font-bold text-foreground/80 mt-1">
                Regional Builders
              </p>
              <p className="text-[10px] text-muted-foreground mt-0.5 leading-normal">
                Engineers in Salt Lake, New Town & Siliguri
              </p>
            </div>
          </div>

          <div className="group rounded-none border border-border/60 bg-card/50 backdrop-blur-md p-5 shadow-xs flex flex-col justify-between items-start text-left hover:border-coral/50 hover:shadow-sm transition-all duration-300">
            <div className="h-10 w-10 rounded-none bg-coral/10 text-coral flex items-center justify-center border border-coral/20 transition-transform group-hover:scale-105">
              <Code2 className="h-5 w-5" />
            </div>
            <div className="mt-4">
              <p className="text-xl font-extrabold text-foreground tracking-tight">
                35+
              </p>
              <p className="text-xs font-bold text-foreground/80 mt-1">
                Open Source Repos
              </p>
              <p className="text-[10px] text-muted-foreground mt-0.5 leading-normal">
                Libraries built by local developers
              </p>
            </div>
          </div>

          <div className="group rounded-none border border-border/60 bg-card/50 backdrop-blur-md p-5 shadow-xs flex flex-col justify-between items-start text-left hover:border-primary/50 hover:shadow-sm transition-all duration-300">
            <div className="h-10 w-10 rounded-none bg-primary/10 text-primary flex items-center justify-center border border-primary/20 transition-transform group-hover:scale-105">
              <Rocket className="h-5 w-5" />
            </div>
            <div className="mt-4">
              <p className="text-xl font-extrabold text-foreground tracking-tight">
                25+
              </p>
              <p className="text-xs font-bold text-foreground/80 mt-1">
                Bengal Startups
              </p>
              <p className="text-[10px] text-muted-foreground mt-0.5 leading-normal">
                Spotlighting regional tech pioneers
              </p>
            </div>
          </div>

          <div className="group rounded-none border border-border/60 bg-card/50 backdrop-blur-md p-5 shadow-xs flex flex-col justify-between items-start text-left hover:border-coral/50 hover:shadow-sm transition-all duration-300">
            <div className="h-10 w-10 rounded-none bg-coral/10 text-coral flex items-center justify-center border border-coral/20 transition-transform group-hover:scale-105">
              <Briefcase className="h-5 w-5" />
            </div>
            <div className="mt-4">
              <p className="text-xl font-extrabold text-foreground tracking-tight">
                40+
              </p>
              <p className="text-xs font-bold text-foreground/80 mt-1">
                Direct Tech Jobs
              </p>
              <p className="text-[10px] text-muted-foreground mt-0.5 leading-normal">
                Verified frontend, AI & cloud roles
              </p>
            </div>
          </div>
        </div> */}
      </div>

      {/* Profile Onboarding Modal Popup */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent
          showCloseButton={false}
          className="p-0 border-0 bg-transparent ring-0 shadow-none max-w-md rounded-none max-h-[calc(100dvh-2rem)] overflow-y-auto"
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
