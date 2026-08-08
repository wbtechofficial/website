"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";

interface BrandLogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  href?: string;
}

const SIZE_CLASSES = {
  sm: "h-6 sm:h-7",
  md: "h-7 sm:h-8",
  lg: "h-9 sm:h-10",
};

export function BrandLogo({
  className,
  size = "md",
  href = "/",
}: BrandLogoProps) {
  const logoContent = (
    <div className={cn("inline-flex items-center gap-2 group", className)}>
      <img
        src="/brand-logo/west-bengal-tech-logo-dark.svg"
        alt="west-bengal.tech"
        className={cn(
          SIZE_CLASSES[size],
          "w-auto dark:hidden block transition-transform duration-300 group-hover:scale-[1.03]"
        )}
      />
      <img
        src="/brand-logo/west-bengal-tech-logo-light.svg"
        alt="west-bengal.tech"
        className={cn(
          SIZE_CLASSES[size],
          "w-auto hidden dark:block transition-transform duration-300 group-hover:scale-[1.03]"
        )}
      />
    </div>
  );

  if (href) {
    return (
      <Link href={href} aria-label="west-bengal.tech home">
        {logoContent}
      </Link>
    );
  }

  return logoContent;
}
