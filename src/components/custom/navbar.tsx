"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
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

const NAV_ITEMS = [
  { label: "Home", href: "/" },
  { label: "Updates", href: "#updates" },
  { label: "Startups", href: "#startups" },
  { label: "Open Source", href: "#opensource" },
  { label: "Jobs", href: "#jobs" },
];

export function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo Section */}
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center">
            <img
              src="/brand-logo/west-bengal-tech-logo-dark.svg"
              alt="west-bengal.tech"
              className="h-8 w-auto dark:hidden block transition-transform hover:scale-[1.02]"
            />
            <img
              src="/brand-logo/west-bengal-tech-logo-light.svg"
              alt="west-bengal.tech"
              className="h-8 w-auto hidden dark:block transition-transform hover:scale-[1.02]"
            />
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="transition-colors hover:text-primary text-muted-foreground font-semibold"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Action Buttons (Right) */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:block">
            <ThemeToggleDropdown />
          </div>

          <Link
            href="/project-submissions"
            className={cn(
              buttonVariants({ size: "sm" }),
              "hidden sm:inline-flex px-4 font-medium shadow-sm transition-all hover:shadow-md p-5",
            )}
          >
            Submit Project
          </Link>

          {/* Mobile Navigation Trigger */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger
              render={
                <Button variant="ghost" className="md:hidden h-9 w-9 p-0" />
              }
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle Menu</span>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[350px]">
              <SheetHeader className="text-left border-b pb-4 mb-6">
                <SheetTitle>
                  <img
                    src="/brand-logo/west-bengal-tech-logo-dark.svg"
                    alt="west-bengal.tech"
                    className="h-7 w-auto dark:hidden block"
                  />
                  <img
                    src="/brand-logo/west-bengal-tech-logo-light.svg"
                    alt="west-bengal.tech"
                    className="h-7 w-auto hidden dark:block"
                  />
                </SheetTitle>
              </SheetHeader>
              <div className="flex flex-col space-y-4">
                {NAV_ITEMS.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className="text-lg font-semibold text-muted-foreground hover:text-primary transition-colors py-2 border-b border-border/10"
                  >
                    {item.label}
                  </Link>
                ))}
                <div className="pt-4 flex items-center justify-between">
                  <span className="text-sm font-medium text-muted-foreground">
                    Appearance
                  </span>
                  <ThemeToggleDropdown />
                </div>
                <Link
                  href="/project-submissions"
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    buttonVariants(),
                    "w-full mt-6 font-medium flex items-center justify-center",
                  )}
                >
                  Submit Project
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
