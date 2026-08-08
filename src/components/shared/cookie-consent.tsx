"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { X, ShieldCheck, Cookie, Settings2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

export interface CookiePreferences {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
  updatedAt: string;
}

export interface CookieConsentProps {
  storageKey?: string;
  policyUrl?: string;
  onConsentChange?: (preferences: CookiePreferences) => void;
}

const DEFAULT_KEY = "wb_cookie_consent";

export function CookieConsent({
  storageKey = DEFAULT_KEY,
  policyUrl = "/cookie-policy",
  onConsentChange,
}: CookieConsentProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>({
    necessary: true,
    analytics: true,
    marketing: true,
    updatedAt: new Date().toISOString(),
  });

  useEffect(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        setPreferences(JSON.parse(saved));
      } else {
        // Show banner if no saved preferences exist
        const timer = setTimeout(() => setIsOpen(true), 800);
        return () => clearTimeout(timer);
      }
    } catch {
      setIsOpen(true);
    }
  }, [storageKey]);

  // Listen for custom event to reopen preferences from anywhere (e.g. Footer)
  useEffect(() => {
    const handleReopen = () => {
      setIsModalOpen(true);
    };
    window.addEventListener("open-cookie-settings", handleReopen);
    return () =>
      window.removeEventListener("open-cookie-settings", handleReopen);
  }, []);

  const saveConsent = (newPrefs: CookiePreferences) => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(newPrefs));
    } catch (e) {
      console.error("Failed to save cookie preferences:", e);
    }
    setPreferences(newPrefs);
    onConsentChange?.(newPrefs);
    setIsOpen(false);
    setIsModalOpen(false);
  };

  const handleAcceptAll = () => {
    const updated: CookiePreferences = {
      necessary: true,
      analytics: true,
      marketing: true,
      updatedAt: new Date().toISOString(),
    };
    saveConsent(updated);
  };

  const handleSaveModal = () => {
    const updated: CookiePreferences = {
      ...preferences,
      necessary: true,
      updatedAt: new Date().toISOString(),
    };
    saveConsent(updated);
  };

  const handleDismiss = () => {
    setIsOpen(false);
  };

  return (
    <>
      {/* Floating Modern Cookie Banner (Matching Reference Image) */}
      {isOpen && (
        <div
          role="region"
          aria-label="Cookie consent prompt"
          className="fixed bottom-4 left-4 right-4 sm:right-auto sm:left-6 z-50 max-w-xl transition-all duration-300 animate-in fade-in slide-in-from-bottom-5"
        >
          <div className="relative rounded-2xl border border-border/80 bg-card p-5 sm:p-6 shadow-2xl backdrop-blur-md dark:bg-card/95">
            {/* Dismiss Close Button */}
            <button
              onClick={handleDismiss}
              className="absolute top-4 right-4 text-muted-foreground hover:text-foreground p-1 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
              title="Dismiss cookie banner"
            >
              <X className="h-4 w-4" />
            </button>

            {/* Banner Header */}
            <h3 className="font-heading text-base sm:text-lg font-bold text-foreground pr-8 mb-2">
              Accept the use of cookies.
            </h3>

            {/* Main Description */}
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed mb-3">
              We use cookies to improve your browsing experience, serve
              personalized content, and analyze our traffic. By clicking Accept
              all Cookies, you agree to the storing of cookies on your device.
            </p>

            {/* Policy & Preferences Line */}
            <p className="text-xs text-muted-foreground leading-relaxed mb-5">
              You can customize your settings by clicking Manage Preferences.
              For more details, see our{" "}
              <Link
                href={policyUrl}
                className="text-foreground font-semibold underline underline-offset-2 hover:text-primary transition-colors"
              >
                Cookie Policy.
              </Link>
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3">
              <Button
                onClick={handleAcceptAll}
                size="sm"
                className="rounded-xl px-5 font-semibold text-xs sm:text-sm shadow-sm transition-all hover:shadow-md"
              >
                Accept all Cookies
              </Button>

              <Button
                onClick={() => setIsModalOpen(true)}
                variant="outline"
                size="sm"
                className="rounded-xl px-5 font-semibold text-xs sm:text-sm border-border/80"
              >
                Manage Preferences
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Preference Settings Modal Dialog */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-md rounded-2xl p-6">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 font-heading text-lg font-bold">
              <Settings2 className="h-5 w-5 text-primary" /> Cookie Preferences
            </DialogTitle>
            <DialogDescription className="text-xs text-muted-foreground pt-1">
              Customize your privacy options below. Essential cookies are
              required for basic site functions.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-3">
            {/* Necessary Cookies */}
            <div className="flex items-center justify-between gap-4 p-3.5 rounded-xl border border-border/60 bg-muted/40">
              <div className="space-y-0.5">
                <p className="text-xs font-bold text-foreground flex items-center gap-1.5">
                  <ShieldCheck className="h-3.5 w-3.5 text-emerald-500" />{" "}
                  Essential Cookies
                </p>
                <p className="text-[11px] text-muted-foreground">
                  Required for site security, navigation, and authentication.
                </p>
              </div>
              <Switch
                checked
                disabled
                aria-label="Essential cookies always active"
              />
            </div>

            {/* Analytics Cookies */}
            <div className="flex items-center justify-between gap-4 p-3.5 rounded-xl border border-border/60 bg-card">
              <div className="space-y-0.5">
                <p className="text-xs font-bold text-foreground">
                  Analytics & Performance
                </p>
                <p className="text-[11px] text-muted-foreground">
                  Helps us measure traffic and article popularity.
                </p>
              </div>
              <Switch
                checked={preferences.analytics}
                onCheckedChange={(checked) =>
                  setPreferences((prev) => ({ ...prev, analytics: checked }))
                }
                aria-label="Toggle analytics cookies"
              />
            </div>

            {/* Marketing Cookies */}
            <div className="flex items-center justify-between gap-4 p-3.5 rounded-xl border border-border/60 bg-card">
              <div className="space-y-0.5">
                <p className="text-xs font-bold text-foreground">
                  Personalization
                </p>
                <p className="text-[11px] text-muted-foreground">
                  Remembers your topic preferences and recommendations.
                </p>
              </div>
              <Switch
                checked={preferences.marketing}
                onCheckedChange={(checked) =>
                  setPreferences((prev) => ({ ...prev, marketing: checked }))
                }
                aria-label="Toggle personalization cookies"
              />
            </div>
          </div>

          <DialogFooter className="flex flex-row justify-end gap-2 pt-2">
            <Button
              variant="outline"
              onClick={() => setIsModalOpen(false)}
              size="sm"
              className="rounded-xl text-xs"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSaveModal}
              size="sm"
              className="rounded-xl text-xs font-semibold"
            >
              Save Preferences
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

/** Helper function to reopen cookie settings from anywhere in the app */
export function openCookiePreferences() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event("open-cookie-settings"));
  }
}
