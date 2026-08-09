"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Plus, ChevronRight, Sparkles, MapPin } from "lucide-react";
import { BrandLogo } from "@/components/custom/brand-logo";
import { ThemeToggleDropdown } from "@/components/custom/theme-toggle-dropdown";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { NAVIGATION_ITEMS } from "@/base/constants/navigation-items";

export function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/90 backdrop-blur-md supports-[backdrop-filter]:bg-background/60 transition-colors">
      <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand Logo & Desktop Nav Links */}
        <div className="flex items-center gap-8">
          <BrandLogo size="md" />

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6 text-sm">
            {NAVIGATION_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="transition-colors hover:text-primary text-foreground/80 font-medium text-xs sm:text-sm tracking-tight"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Action Buttons (Right) */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          {/* Theme Toggle (Desktop & Mobile header bar) */}
          <ThemeToggleDropdown />

          {/* Desktop Submit Project CTA */}
          <Link
            href="/project-submissions"
            className={cn(
              buttonVariants({ size: "sm" }),
              "hidden sm:inline-flex rounded-md px-4 text-xs font-semibold shadow-xs hover:shadow-md transition-all gap-1.5",
            )}
          >
            <Plus className="h-3.5 w-3.5" />
            <span>Submit Project</span>
          </Link>

          {/* Mobile Drawer Trigger */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger
              render={
                <Button
                  variant="ghost"
                  size="icon"
                  className="md:hidden h-9 w-9 rounded-xl border border-border/60 bg-muted/30 text-foreground hover:bg-muted"
                  aria-label="Open mobile navigation menu"
                >
                  <Menu className="h-5 w-5" />
                </Button>
              }
            />

            {/* Mobile Navigation Drawer Content */}
            <SheetContent
              side="right"
              className="w-[310px] sm:w-[360px] p-6 bg-background/95 backdrop-blur-xl border-l border-border/80 flex flex-col justify-between"
            >
              {/* Drawer Top Header */}
              <div>
                <SheetHeader className="text-left border-b border-border/50 pb-4 mb-5">
                  <SheetTitle className="flex items-center justify-between">
                    <BrandLogo size="md" />
                    <span className="inline-flex items-center gap-1 rounded-md bg-primary/10 border border-primary/20 px-2.5 py-0.5 text-[10px] font-semibold text-primary">
                      <Sparkles className="h-3 w-3" /> Bengal Tech
                    </span>
                  </SheetTitle>
                </SheetHeader>

                {/* Mobile Navigation Items List */}
                <nav
                  className="flex flex-col space-y-1.5"
                  aria-label="Mobile Navigation"
                >
                  {NAVIGATION_ITEMS.map((item) => {
                    const Icon = item.icon;
                    const isActive = pathname === item.href;

                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setIsOpen(false)}
                        className={cn(
                          "group flex items-center justify-between rounded-xl px-3.5 py-2.5 text-sm font-medium transition-all duration-200",
                          isActive
                            ? "bg-primary text-primary-foreground font-semibold shadow-xs"
                            : "text-foreground/80 hover:bg-muted/60 hover:text-primary",
                        )}
                      >
                        <div className="flex items-center gap-3">
                          <Icon
                            className={cn(
                              "h-4 w-4 shrink-0 transition-colors",
                              isActive
                                ? "text-primary-foreground"
                                : "text-muted-foreground group-hover:text-primary",
                            )}
                          />
                          <span>{item.label}</span>
                        </div>
                        <ChevronRight
                          className={cn(
                            "h-4 w-4 text-muted-foreground/60 transition-transform group-hover:translate-x-0.5 group-hover:text-primary",
                            isActive && "text-primary-foreground/80",
                          )}
                        />
                      </Link>
                    );
                  })}
                </nav>
              </div>

              {/* Drawer Bottom Actions & Community Footer */}
              <div className="space-y-4 pt-6 border-t border-border/50">
                {/* Submit Project CTA */}
                <Link
                  href="/project-submissions"
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    buttonVariants({ size: "default" }),
                    "w-full rounded-xl py-3 font-semibold text-xs shadow-md transition-all gap-2 flex items-center justify-center",
                  )}
                >
                  <Plus className="h-4 w-4" />
                  <span>Submit Project / Story</span>
                </Link>

                {/* Community Metadata Note */}
                <div className="rounded-xl border border-border/60 bg-muted/30 p-3 text-center">
                  <p className="text-[11px] font-mono text-muted-foreground flex items-center justify-center gap-1">
                    <MapPin className="h-3 w-3 text-primary" /> Sector V,
                    Kolkata • React Kolkata
                  </p>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
