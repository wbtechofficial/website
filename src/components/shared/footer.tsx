"use client";

import Link from "next/link";
import { openCookiePreferences } from "@/components/shared/cookie-consent";
import { MapPin, Heart, Sparkles } from "lucide-react";

export function Footer() {
  return (
    <footer className="w-full bg-gradient-to-b from-zinc-950 via-black to-zinc-950 border-t border-zinc-900/90 text-zinc-300 mt-16 transition-colors">
      <div className="container mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12 pb-12 border-b border-zinc-900/80">
          {/* Brand & Community Details (Spans 2 columns on desktop) */}
          <div className="lg:col-span-2 flex flex-col justify-between space-y-4">
            <div>
              {/* Always Light Logo for Dark Footer */}
              <Link href="/" className="inline-block group">
                <img
                  src="/brand-logo/west-bengal-tech-logo-light.svg"
                  alt="west-bengal.tech"
                  className="h-8 sm:h-9 w-auto transition-transform duration-300 group-hover:scale-[1.02]"
                />
              </Link>

              <p className="mt-4 text-xs sm:text-sm text-zinc-400 leading-relaxed max-w-sm font-normal">
                An open digital community unifying West Bengal's engineering
                talent. Discover deep-tech startups, explore regional
                open-source projects, and connect with technology opportunities.
              </p>

              {/* Community Location & Sponsorship Pill */}
              <div className="mt-4 flex flex-wrap items-center gap-2 text-[11px] font-medium">
                <span className="inline-flex items-center gap-1 bg-zinc-900 text-zinc-300 px-2.5 py-1 rounded-md border border-zinc-800">
                  <MapPin className="h-3 w-3 text-red-500" /> Sector V, Kolkata
                </span>
                <span className="inline-flex items-center gap-1 bg-zinc-900 text-zinc-300 px-2.5 py-1 rounded-md border border-zinc-800">
                  <Sparkles className="h-3 w-3 text-purple-400" /> React Kolkata
                  Guild
                </span>
              </div>
            </div>
          </div>

          {/* Navigation Links Column 1 */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-white mb-4">
              Ecosystem
            </h4>
            <ul className="space-y-2.5 text-xs font-medium text-zinc-400">
              <li>
                <Link
                  href="#featured-feed"
                  className="hover:text-white transition-colors"
                >
                  Featured Articles
                </Link>
              </li>
              <li>
                <Link
                  href="#startups"
                  className="hover:text-white transition-colors"
                >
                  Bengal Startups
                </Link>
              </li>
              <li>
                <Link
                  href="#opensource"
                  className="hover:text-white transition-colors"
                >
                  Open Source Repos
                </Link>
              </li>
              <li>
                <Link
                  href="#updates"
                  className="hover:text-white transition-colors"
                >
                  Job Directory
                </Link>
              </li>
            </ul>
          </div>

          {/* Navigation Links Column 2 */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-white mb-4">
              Community
            </h4>
            <ul className="space-y-2.5 text-xs font-medium text-zinc-400">
              <li>
                <Link
                  href="/project-submissions"
                  className="hover:text-white transition-colors"
                >
                  Submit Project / Story
                </Link>
              </li>
              <li>
                <a
                  href="https://x.com/reactkolkata"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white transition-colors"
                >
                  React Kolkata on X
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/reactkolkata"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white transition-colors"
                >
                  GitHub Organization
                </a>
              </li>
              <li>
                <Link
                  href="/article/meetup-1"
                  className="hover:text-white transition-colors"
                >
                  Monthly Meetup Schedule
                </Link>
              </li>
            </ul>
          </div>

          {/* Navigation Links Column 3 */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-white mb-4">
              Legal & Meta
            </h4>
            <ul className="space-y-2.5 text-xs font-medium text-zinc-400">
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Community Code of Conduct
                </Link>
              </li>
              <li>
                <button
                  onClick={() => openCookiePreferences()}
                  className="hover:text-white transition-colors text-left"
                >
                  Cookie Preferences
                </button>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Editorial Guidelines
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom Metadata */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500 font-normal">
          <p>
            © {new Date().getFullYear()} west-bengal.tech initiative. Built for
            the developer community.
          </p>
          <p className="flex items-center gap-1">
            Crafted with{" "}
            <Heart className="h-3.5 w-3.5 fill-red-500 text-red-500 inline" />{" "}
            by{" "}
            <a
              href="https://github.com/reactkolkata"
              target="_blank"
              rel="noreferrer"
              className="text-zinc-300 font-medium hover:text-white underline"
            >
              React Kolkata Team
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
