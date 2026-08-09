"use client";

import { useState } from "react";
import { Mail, CheckCircle2, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export function NewsletterCard() {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setIsSubscribed(true);
      setEmail("");
    }
  };

  return (
    <section className="container mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="relative overflow-hidden rounded-3xl border border-primary/30 bg-gradient-to-br from-card via-card to-primary/5 p-6 sm:p-10 shadow-md">
        
        {/* Decorative background glow */}
        <div className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-secondary/10 blur-3xl" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Heading & Description */}
          <div className="lg:col-span-7 space-y-3">
            <div className="inline-flex items-center gap-1.5 rounded-md border border-primary/20 bg-primary/10 px-3 py-0.5 text-xs font-semibold text-primary">
              <Sparkles className="h-3.5 w-3.5" /> Weekly Ecosystem Digest
            </div>
            <h2 className="font-heading text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
              Stay ahead with West Bengal Tech Weekly
            </h2>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-xl">
              Join 1,200+ developers, startup founders, and engineering leaders receiving our curated Friday newsletter. Zero spam, high signal.
            </p>
          </div>

          {/* Right Column: Interactive Subscription Form */}
          <div className="lg:col-span-5">
            {isSubscribed ? (
              <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-5 flex items-center gap-3 text-emerald-600 dark:text-emerald-400">
                <CheckCircle2 className="h-6 w-6 shrink-0" />
                <div>
                  <p className="text-sm font-bold">You're subscribed!</p>
                  <p className="text-xs opacity-90 mt-0.5">Check your inbox this Friday for the latest issue.</p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-center gap-3">
                <div className="relative w-full flex-1">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your work email..."
                    className="w-full rounded-xl border border-border bg-background pl-10 pr-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all shadow-xs"
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full sm:w-auto rounded-xl px-6 py-3 font-semibold text-xs sm:text-sm shadow-sm hover:shadow-md transition-all gap-1.5 shrink-0"
                >
                  <span>Subscribe</span>
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </form>
            )}
          </div>

        </div>

      </div>
    </section>
  );
}
