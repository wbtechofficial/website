"use client";

import { cn } from "@/lib/utils";

export type SocialIconName =
  | "facebook"
  | "github"
  | "instagram"
  | "linkedin"
  | "twitter"
  | "x"
  | "whatsapp";

export interface SocialIconProps {
  /** Known social icon name or custom SVG path */
  name?: SocialIconName | string;
  /** Custom image source URL if not using pre-configured SVGs */
  src?: string;
  /** Icon size preset or custom px string */
  size?: "sm" | "md" | "lg" | number;
  /** Additional custom classes */
  className?: string;
  /** Enable color pop on hover (default: true) */
  colorPopOnHover?: boolean;
}

const ICON_MAP: Record<string, string> = {
  facebook: "/social-logo/facebook-logo.svg",
  github: "/social-logo/github-logo.svg",
  instagram: "/social-logo/instagram-logo.svg",
  linkedin: "/social-logo/linkedin-logo.svg",
  twitter: "/social-logo/twitter-x-logo.svg",
  x: "/social-logo/twitter-x-logo.svg",
};

// Icons that have black SVG fills and need inversion in dark mode to stay bright
const MONOCHROME_ICONS = new Set(["github", "twitter", "x"]);

const SIZE_MAP = {
  sm: "h-4 w-4",
  md: "h-5 w-5",
  lg: "h-6 w-6",
};

export function SocialIcon({
  name = "github",
  src,
  size = "md",
  className,
  colorPopOnHover = true,
}: SocialIconProps) {
  const iconKey = name.toLowerCase();
  const iconSrc = src || ICON_MAP[iconKey] || ICON_MAP.github;

  const isMonochrome = MONOCHROME_ICONS.has(iconKey);
  const sizeClass =
    typeof size === "number" ? "" : SIZE_MAP[size] || SIZE_MAP.md;
  const customDimension =
    typeof size === "number" ? { width: size, height: size } : {};

  return (
    <div
      className={cn(
        "relative inline-flex items-center justify-center shrink-0 transition-all duration-300",
        colorPopOnHover &&
          "grayscale opacity-75 hover:grayscale-0 hover:opacity-100 group-hover:grayscale-0 group-hover:opacity-100 hover:scale-110 group-hover:scale-110",
        className,
      )}
      style={customDimension}
    >
      <img
        src={iconSrc}
        alt={`${name} icon`}
        className={cn(
          sizeClass,
          "object-contain transition-all duration-300",
          // Flips dark monochrome paths (GitHub, X) to white in dark mode
          isMonochrome && "dark:invert dark:brightness-200",
          // Enhances color luminosity in dark mode for all icons
          !isMonochrome && "dark:brightness-125 dark:contrast-110",
        )}
      />
    </div>
  );
}
