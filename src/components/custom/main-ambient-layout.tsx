import { cn } from "@/lib/utils";

interface MainAmbientLayoutProps {
  className?: string;
  children?: React.ReactNode;
}

/**
 * Ambient multi-layer glow using the west-bengal.tech brand palette:
 * Navy #072049 · Teal #0BA09C · Coral #FF6B4A · Ice #F4F7FB
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
      <div
        className="pointer-events-none fixed inset-0 z-0 opacity-80 dark:opacity-0 transition-opacity duration-500"
        style={{
          background: `
            radial-gradient(ellipse 85% 65% at 8% 8%, rgba(11, 160, 156, 0.14), transparent 60%),
            radial-gradient(ellipse 75% 60% at 75% 35%, rgba(7, 32, 73, 0.10), transparent 62%),
            radial-gradient(ellipse 70% 60% at 15% 80%, rgba(255, 107, 74, 0.08), transparent 62%),
            radial-gradient(ellipse 70% 60% at 92% 92%, rgba(11, 160, 156, 0.10), transparent 62%),
            linear-gradient(180deg, #F4F7FB 0%, #E8EEF6 100%)
          `,
        }}
      />

      <div
        className="pointer-events-none fixed inset-0 z-0 opacity-0 dark:opacity-90 transition-opacity duration-500"
        style={{
          background: `
            radial-gradient(ellipse 85% 65% at 8% 8%, rgba(11, 160, 156, 0.22), transparent 60%),
            radial-gradient(ellipse 75% 60% at 75% 35%, rgba(255, 107, 74, 0.12), transparent 62%),
            radial-gradient(ellipse 70% 60% at 15% 80%, rgba(11, 160, 156, 0.16), transparent 62%),
            radial-gradient(ellipse 70% 60% at 92% 92%, rgba(12, 45, 92, 0.55), transparent 62%),
            linear-gradient(180deg, #072049 0%, #051633 100%)
          `,
        }}
      />

      {/* Global grid background pattern */}
      <div 
        className="pointer-events-none fixed inset-0 z-0 bg-[url('https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/hero/gridBackground.png')] bg-repeat bg-center opacity-60 dark:opacity-[0.08] transition-opacity duration-500"
      />

      <div className="relative z-10 w-full min-h-screen flex flex-col">
        {children}
      </div>
    </div>
  );
}
