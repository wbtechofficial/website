import { cn } from "@/lib/utils";

interface MainAmbientLayoutProps {
  className?: string;
  children?: React.ReactNode;
}

/**
 * MainAmbientLayout Component
 * Creates an ambient, multi-layered background glow utilizing West Bengal Tech brand palette:
 * - Crimson Red (#DE354C)
 * - Royal Violet (#3C1874)
 * - Deep Burgundy (#932432)
 * - Slate Charcoal (#283747)
 * - Soft Off-White (#F3F3F3) / Dark Slate (#1c2631)
 */
export function MainAmbientLayout({
  className,
  children,
}: MainAmbientLayoutProps) {
  return (
    <div
      className={cn(
        "relative min-h-screen w-full bg-background font-sans text-foreground",
        className,
      )}
    >
      {/* Light Mode Radial Brand Glow Overlay */}
      <div
        className="pointer-events-none fixed inset-0 z-0 opacity-80 dark:opacity-0 transition-opacity duration-500"
        style={{
          background: `
            radial-gradient(ellipse 85% 65% at 8% 8%, rgba(222, 53, 76, 0.12), transparent 60%),
            radial-gradient(ellipse 75% 60% at 75% 35%, rgba(60, 24, 116, 0.14), transparent 62%),
            radial-gradient(ellipse 70% 60% at 15% 80%, rgba(147, 36, 50, 0.08), transparent 62%),
            radial-gradient(ellipse 70% 60% at 92% 92%, rgba(222, 53, 76, 0.10), transparent 62%),
            linear-gradient(180deg, #F3F3F3 0%, #E9ECEF 100%)
          `,
        }}
      />

      {/* Dark Mode Radial Brand Glow Overlay */}
      <div
        className="pointer-events-none fixed inset-0 z-0 opacity-0 dark:opacity-90 transition-opacity duration-500"
        style={{
          background: `
            radial-gradient(ellipse 85% 65% at 8% 8%, rgba(222, 53, 76, 0.20), transparent 60%),
            radial-gradient(ellipse 75% 60% at 75% 35%, rgba(60, 24, 116, 0.32), transparent 62%),
            radial-gradient(ellipse 70% 60% at 15% 80%, rgba(147, 36, 50, 0.20), transparent 62%),
            radial-gradient(ellipse 70% 60% at 92% 92%, rgba(40, 55, 71, 0.45), transparent 62%),
            linear-gradient(180deg, #1c2631 0%, #121921 100%)
          `,
        }}
      />

      {/* Main Page Content Wrapper */}
      <div className="relative z-10 w-full min-h-screen flex flex-col">
        {children}
      </div>
    </div>
  );
}
