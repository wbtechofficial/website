"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Sparkles, MapPin, ChevronDown, ChevronRight } from "lucide-react";
import { BrandLogo } from "@/components/custom/brand-logo";
import { ThemeToggleDropdown } from "@/components/custom/theme-toggle-dropdown";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { NAVIGATION_ITEMS } from "@/base/constants/navigation-items";

export function Navbar() {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);

    // Filter main desktop links vs dropdown items
    const mainDesktopLinks = NAVIGATION_ITEMS.filter(
        (item) => item.label === "Home" || item.label === "Showcase"
    );
    const dropdownDesktopLinks = NAVIGATION_ITEMS.filter(
        (item) => item.label !== "Home" && item.label !== "Showcase"
    );

    return (
        <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/90 backdrop-blur-md supports-backdrop-filter:bg-background/60 transition-colors">
            <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
                {/* Brand Logo & Desktop Nav Links */}
                <div className="flex items-center gap-8">
                    <BrandLogo size="md" />

                    {/* Desktop Navigation */}
                    {/* <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
                        <Link
                            href="/"
                            className={cn(
                                "transition-colors hover:text-primary font-medium text-xs sm:text-sm tracking-tight",
                                pathname === "/" ? "text-primary font-semibold" : "text-foreground/80"
                            )}
                        >
                            Home
                        </Link>

                        <div className="relative group flex items-center gap-1.5 cursor-pointer text-foreground/80 hover:text-primary transition-colors py-2 text-xs sm:text-sm font-medium tracking-tight">
                            <span>Explore</span>
                            <ChevronDown className="h-3.5 w-3.5 transition-transform duration-300 group-hover:rotate-180" />
                            <div className="absolute bg-card/95 border border-border/80 backdrop-blur-md font-normal flex flex-col gap-1 w-44 rounded-none p-3 top-[100%] left-0 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-300 shadow-lg translate-y-2 group-hover:translate-y-0 z-50">
                                {dropdownDesktopLinks.map((item) => (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        className="flex items-center gap-2 px-3 py-1.5 rounded-none hover:bg-muted/60 hover:text-primary transition-all text-xs font-semibold text-foreground/80"
                                    >
                                        <item.icon className="h-3.5 w-3.5 text-muted-foreground" />
                                        <span>{item.label}</span>
                                    </Link>
                                ))}
                            </div>
                        </div>

                        <Link
                            href="/project-showcase"
                            className={cn(
                                "transition-colors hover:text-primary font-medium text-xs sm:text-sm tracking-tight",
                                pathname === "/project-showcase" ? "text-primary font-semibold" : "text-foreground/80"
                            )}
                        >
                            Showcase
                        </Link>
                    </nav> */}
                </div>

                {/* Action Buttons (Right) */}
                <div className="flex items-center gap-2.5 sm:gap-3">
                    {/* Contact Us CTA (Desktop) */}
                    {/* <a
                        href="mailto:hello@west-bengal.tech"
                        className="hidden md:inline-flex items-center justify-center bg-secondary text-secondary-foreground hover:bg-secondary/90 px-4 py-2 rounded-none text-xs font-semibold shadow-xs hover:shadow-md transition-all cursor-pointer select-none"
                    >
                        Contact Us
                    </a> */}

                    {/* Theme Toggle */}
                    <ThemeToggleDropdown />

                    {/* Mobile Drawer Trigger */}
                    <Sheet open={isOpen} onOpenChange={setIsOpen}>
                        <SheetTrigger
                            render={
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="md:hidden h-9 w-9 rounded-none border border-border/60 bg-muted/30 text-foreground hover:bg-muted"
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
                                        <span className="inline-flex items-center gap-1 rounded-none bg-primary/10 border border-primary/20 px-2.5 py-0.5 text-[10px] font-semibold text-primary">
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
                                                    "group flex items-center justify-between rounded-none px-3.5 py-2.5 text-sm font-medium transition-all duration-200",
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
                                {/* Mobile Contact Button */}
                                {/* <a
                                    href="mailto:hello@west-bengal.tech"
                                    onClick={() => setIsOpen(false)}
                                    className="flex w-full items-center justify-center bg-secondary text-secondary-foreground hover:bg-secondary/90 py-2.5 rounded-none text-xs font-semibold shadow-xs transition-all cursor-pointer"
                                >
                                    Contact Us
                                </a> */}

                                {/* Community Metadata Note */}
                                <div className="rounded-none border border-border/60 bg-muted/30 p-3 text-center">
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
