import { PropsWithChildren } from "react";
import { AnnouncementBanner } from "@/components/shared/announcement-banner";
import { Navbar } from "@/components/shared/navbar";
import { Footer } from "@/components/shared/footer";
import { CookieConsent } from "@/components/shared/cookie-consent";
import { FloatingSocials } from "@/components/custom/floating-socials";
import { NewsletterCard } from "@/@module/home/components/newsletter-card";

export default function RootPublicLayout({ children }: PropsWithChildren) {
  return (
    <div className="relative min-h-screen bg-background font-sans text-foreground selection:bg-primary selection:text-primary-foreground flex flex-col">
      {/* Community Announcement Top Banner */}
      <AnnouncementBanner />

      {/* Header Navigation */}
      <Navbar />

      {children}

      {/* Weekly Newsletter Sign-Up Card */}
      <NewsletterCard />

      {/* Footer */}
      <Footer />

      {/* Sticky Floating Social Media Sidebar */}
      <FloatingSocials position="left" />

      {/* System Integrated Cookie Consent Notification */}
      <CookieConsent />
    </div>
  );
}
