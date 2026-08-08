"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Plus } from "lucide-react";
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

const NAV_ITEMS = [
  { label: "Home", href: "/" },
  { label: "Articles", href: "#featured-feed" },
  { label: "Startups", href: "#startups" },
  { label: "Open Source", href: "#opensource" },
  { label: "Jobs", href: "#updates" },
];

export function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Logo Section */}
        <div className="flex items-center gap-8">
          <BrandLogo size="md" />

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-6 text-sm">
            {NAV_ITEMS.map((item) => (
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
        <div className="flex items-center gap-3">
          <div className="hidden sm:block">
            <ThemeToggleDropdown />
          </div>

          <Link
            href="/project-submissions"
            className={cn(
              buttonVariants({ size: "sm" }),
              "hidden sm:inline-flex rounded-full px-4 text-xs font-semibold shadow-xs hover:shadow-md transition-all gap-1.5",
            )}
          >
            <Plus className="h-3.5 w-3.5" />
            <span>Submit Project</span>
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
                  <BrandLogo size="sm" />
                </SheetTitle>
              </SheetHeader>
              <div className="flex flex-col space-y-4">
                {NAV_ITEMS.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className="text-base font-medium text-foreground/80 hover:text-primary transition-colors py-2 border-b border-border/10"
                  >
                    {item.label}
                  </Link>
                ))}
                <div className="pt-4 flex items-center justify-between">
                  <span className="text-xs font-medium text-muted-foreground">
                    Appearance
                  </span>
                  <ThemeToggleDropdown />
                </div>
                <Link
                  href="/project-submissions"
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    buttonVariants(),
                    "w-full mt-6 rounded-full font-semibold text-xs flex items-center justify-center gap-1.5",
                  )}
                >
                  <Plus className="h-3.5 w-3.5" />
                  <span>Submit Project</span>
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
