import { PropsWithChildren } from "react";
import { AnnouncementBanner } from "@/components/shared/announcement-banner";
import { Navbar } from "@/components/shared/navbar";
import { Footer } from "@/components/shared/footer";
import { CookieConsent } from "@/components/shared/cookie-consent";
import { FloatingSocials } from "@/components/custom/floating-socials";
import { NewsletterCard } from "@/@module/home/components/newsletter-card";
import { MainAmbientLayout } from "@/components/custom/main-ambient-layout";

export default function RootPublicLayout({ children }: PropsWithChildren) {
  return (
    <MainAmbientLayout>
      {/* Community Announcement Top Banner */}
      <AnnouncementBanner />

      {/* Header Navigation */}
      <Navbar />

      <main className="flex-1">{children}</main>

      {/* Weekly Newsletter Sign-Up Card */}
      <NewsletterCard />

      {/* Footer */}
      <Footer />

      {/* Sticky Floating Social Media Sidebar */}
      <FloatingSocials position="left" />

      {/* System Integrated Cookie Consent Notification */}
      <CookieConsent />
    </MainAmbientLayout>
  );
}
