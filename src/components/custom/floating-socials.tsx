"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { SocialIcon, SocialIconName } from "@/components/custom/social-icon";

export interface SocialItem {
  id: string;
  name: string;
  href: string;
  iconName?: SocialIconName;
  customIcon?: React.ReactNode;
  color?: string; // Custom hover border / glow class
  tooltip?: string;
}

export interface FloatingSocialsProps {
  /** Array of social items to display */
  items?: SocialItem[];
  /** Screen position for the floating bar: "right" or "left" (default: "left") */
  position?: "right" | "left";
  /** Whether to show text labels alongside icons (default: false) */
  showLabels?: boolean;
  /** Hide on mobile devices below sm breakpoint (default: true) */
  hideOnMobile?: boolean;
  /** Additional custom container styling classes */
  className?: string;
}

// Default Social Items list using SVG logos from /public/social-logo/
const DEFAULT_SOCIAL_ITEMS: SocialItem[] = [
  {
    id: "instagram",
    name: "Instagram",
    href: "https://www.instagram.com/reactkolkata/",
    tooltip: "Instagram Page",
    iconName: "instagram",
    color: "hover:border-pink-500/60 hover:shadow-[0_0_18px_rgba(216,45,126,0.5)] dark:hover:shadow-[0_0_20px_rgba(240,60,140,0.6)]",
  },
  {
    id: "x-twitter",
    name: "X (Twitter)",
    href: "https://x.com/reactkolkata",
    tooltip: "Follow on X",
    iconName: "twitter",
    color: "hover:border-foreground/60 hover:shadow-[0_0_18px_rgba(255,255,255,0.35)] dark:hover:shadow-[0_0_20px_rgba(255,255,255,0.45)]",
  },
  {
    id: "github",
    name: "GitHub",
    href: "https://github.com/reactkolkata",
    tooltip: "GitHub Org",
    iconName: "github",
    color: "hover:border-foreground/60 hover:shadow-[0_0_18px_rgba(255,255,255,0.35)] dark:hover:shadow-[0_0_20px_rgba(255,255,255,0.45)]",
  },
  {
    id: "linkedin",
    name: "LinkedIn",
    href: "https://www.linkedin.com/company/reactkolkata",
    tooltip: "LinkedIn Network",
    iconName: "linkedin",
    color: "hover:border-blue-500/60 hover:shadow-[0_0_18px_rgba(10,102,194,0.5)] dark:hover:shadow-[0_0_20px_rgba(30,140,250,0.6)]",
  },
  {
    id: "facebook",
    name: "Facebook",
    href: "https://facebook.com/reactkolkata",
    tooltip: "Facebook Community",
    iconName: "facebook",
    color: "hover:border-blue-600/60 hover:shadow-[0_0_18px_rgba(24,119,242,0.5)] dark:hover:shadow-[0_0_20px_rgba(50,140,255,0.6)]",
  },
];

export function FloatingSocials({
  items = DEFAULT_SOCIAL_ITEMS,
  position = "left",
  showLabels = false,
  hideOnMobile = true,
  className,
}: FloatingSocialsProps) {
  return (
    <aside
      aria-label="Social media floating links"
      className={cn(
        "fixed top-1/2 -translate-y-1/2 z-40 transition-all duration-300",
        position === "right" ? "right-4 sm:right-6" : "left-4 sm:left-6",
        hideOnMobile && "hidden sm:flex",
        className
      )}
    >
      <div className="flex flex-col gap-2.5 p-2 rounded-full border border-border/80 bg-card/90 dark:bg-zinc-950/90 backdrop-blur-md shadow-lg shadow-black/10 dark:shadow-black/60 dark:border-zinc-800">
        {items.map((item) => (
          <a
            key={item.id}
            href={item.href}
            target="_blank"
            rel="noreferrer"
            aria-label={item.tooltip || item.name}
            className={cn(
              "group relative flex items-center justify-center p-2.5 rounded-full border border-transparent bg-muted/40 dark:bg-zinc-900/80 transition-all duration-300 hover:scale-110 hover:bg-background dark:hover:bg-zinc-800 hover:shadow-md",
              item.color
            )}
          >
            {/* SVG Icon with Color Pop & Dark Mode Brightness Boost */}
            {item.customIcon ? (
              item.customIcon
            ) : (
              <SocialIcon name={item.iconName || "github"} size="md" colorPopOnHover />
            )}

            {/* Optional Text Label */}
            {showLabels && (
              <span className="ml-2 text-xs font-semibold pr-1">
                {item.name}
              </span>
            )}

            {/* Micro-Tooltip on Hover */}
            {item.tooltip && !showLabels && (
              <span
                className={cn(
                  "absolute pointer-events-none opacity-0 group-hover:opacity-100 transition-all duration-200 text-[10px] font-semibold tracking-wide whitespace-nowrap bg-foreground text-background px-2.5 py-1 rounded-md shadow-md z-50",
                  position === "right"
                    ? "right-full mr-3 group-hover:-translate-x-1"
                    : "left-full ml-3 group-hover:translate-x-1"
                )}
              >
                {item.tooltip}
              </span>
            )}
          </a>
        ))}
      </div>
    </aside>
  );
}
