"use client";

import * as React from "react";
import Link from "next/link";
import { Terminal, Send, CheckCircle2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function Footer() {
  const [email, setEmail] = React.useState("");
  const [status, setStatus] = React.useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");
    // Simulate API registration call
    setTimeout(() => {
      setStatus("success");
      setEmail("");
    }, 1000);
  };

  return (
    <footer className="w-full bg-zinc-950 text-zinc-300 border-t border-zinc-900 mt-16">
      <div className="container mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        
        {/* Main Columns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12 pb-12 border-b border-zinc-900">
          
          {/* Brand & Newsletter Section (Spans 2 columns on desktop) */}
          <div className="lg:col-span-2 flex flex-col justify-between">
            <div>
              <div className="flex items-center space-x-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-800 text-white shadow-md">
                  <Terminal className="h-4.5 w-4.5" />
                </div>
                <span className="font-heading text-lg font-bold tracking-tight text-white">
                  west-bengal.tech
                </span>
              </div>
              <p className="mt-4 text-sm text-zinc-400 leading-relaxed max-w-sm">
                Bringing together the developer ecosystem of Bengal. Discover startups, showcase open-source projects, search jobs, and stay updated with the latest tech news. Sponsored by the React Kolkata team.
              </p>
            </div>

            {/* Newsletter form */}
            <div className="mt-6 sm:max-w-md">
              <p className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-2">
                Subscribe to our Ecosystem Newsletter
              </p>
              {status === "success" ? (
                <div className="flex items-center gap-2 text-emerald-400 text-xs font-medium bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-3">
                  <CheckCircle2 className="h-4.5 w-4.5 shrink-0" />
                  <span>Success! You've been subscribed to the newsletter.</span>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex gap-2">
                  <Input
                    type="email"
                    required
                    placeholder="Enter your email address"
                    value={email}
                    disabled={status === "loading"}
                    className="rounded-full bg-zinc-900 border-zinc-800 text-white placeholder:text-zinc-500 focus-visible:ring-zinc-700 text-xs"
                  />
                  <Button 
                    type="submit" 
                    disabled={status === "loading"} 
                    className="rounded-full px-5 bg-white text-black hover:bg-zinc-200 transition-colors shrink-0 text-xs font-semibold"
                  >
                    {status === "loading" ? (
                      <Loader2 className="h-3.5 w-3.5 animate-spin" />
                    ) : (
                      "Subscribe"
                    )}
                  </Button>
                </form>
              )}
            </div>
          </div>

          {/* Navigation Links Column 1 */}
          <div>
            <h4 className="text-xs font-extrabold uppercase tracking-widest text-white mb-4">Ecosystem</h4>
            <ul className="space-y-2.5 text-xs font-medium text-zinc-400">
              <li>
                <Link href="#updates" className="hover:text-white transition-colors">Latest Updates</Link>
              </li>
              <li>
                <Link href="#startups" className="hover:text-white transition-colors">Startups Showcase</Link>
              </li>
              <li>
                <Link href="#opensource" className="hover:text-white transition-colors">Open Source</Link>
              </li>
              <li>
                <Link href="#jobs" className="hover:text-white transition-colors">Job Openings</Link>
              </li>
            </ul>
          </div>

          {/* Navigation Links Column 2 */}
          <div>
            <h4 className="text-xs font-extrabold uppercase tracking-widest text-white mb-4">Community</h4>
            <ul className="space-y-2.5 text-xs font-medium text-zinc-400">
              <li>
                <Link href="/project-submissions" className="hover:text-white transition-colors">Submit Project</Link>
              </li>
              <li>
                <a href="https://x.com/reactkolkata" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">React Kolkata X</a>
              </li>
              <li>
                <a href="https://github.com/reactkolkata" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">GitHub Org</a>
              </li>
              <li>
                <Link href="#meetups" className="hover:text-white transition-colors">Meetups Info</Link>
              </li>
            </ul>
          </div>

          {/* Navigation Links Column 3 */}
          <div>
            <h4 className="text-xs font-extrabold uppercase tracking-widest text-white mb-4">Legal & Meta</h4>
            <ul className="space-y-2.5 text-xs font-medium text-zinc-400">
              <li>
                <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">Code of Conduct</Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">Contact Us</Link>
              </li>
            </ul>
          </div>

        </div>

        {/* Footer Bottom Metadata */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500 font-medium">
          <p>
            © {new Date().getFullYear()} west-bengal.tech initiative. All rights reserved.
          </p>
          <p className="flex items-center gap-1">
            Made with ❤️ by <a href="https://github.com/reactkolkata" target="_blank" rel="noreferrer" className="text-zinc-400 hover:text-white underline">React Kolkata Team</a>
          </p>
        </div>

      </div>
    </footer>
  );
}
