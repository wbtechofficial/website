"use client";

import { useEffect, useState } from "react";
import { Moon, Sun, Laptop, Check } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

export function ThemeToggleDropdown() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button
          variant="outline"
          size="icon"
          className="relative h-9 w-9 rounded-full border-border/80 bg-background/80 backdrop-blur-md shadow-xs hover:border-primary/60 hover:bg-muted transition-all"
        >
          <Sun className="h-4 w-4 rotate-0 scale-100 transition-transform duration-300 text-foreground dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-transform duration-300 text-foreground dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-40 rounded-2xl border-border/80 bg-card/95 p-1.5 shadow-xl backdrop-blur-md dark:bg-card/95"
      >
        <DropdownMenuItem
          onClick={() => setTheme("light")}
          className={cn(
            "flex items-center justify-between rounded-xl px-3 py-2 text-xs cursor-pointer transition-colors",
            mounted && theme === "light"
              ? "font-bold text-primary bg-primary/10"
              : "font-medium text-muted-foreground hover:text-foreground hover:bg-muted",
          )}
        >
          <div className="flex items-center gap-2">
            <Sun
              className={cn(
                "h-4 w-4",
                mounted && theme === "light"
                  ? "text-primary"
                  : "text-muted-foreground",
              )}
            />
            <span>Light</span>
          </div>
          {mounted && theme === "light" && (
            <Check className="h-3.5 w-3.5 text-primary" />
          )}
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => setTheme("dark")}
          className={cn(
            "flex items-center justify-between rounded-xl px-3 py-2 text-xs cursor-pointer transition-colors",
            mounted && theme === "dark"
              ? "font-bold text-primary bg-primary/10"
              : "font-medium text-muted-foreground hover:text-foreground hover:bg-muted",
          )}
        >
          <div className="flex items-center gap-2">
            <Moon
              className={cn(
                "h-4 w-4",
                mounted && theme === "dark"
                  ? "text-primary"
                  : "text-muted-foreground",
              )}
            />
            <span>Dark</span>
          </div>
          {mounted && theme === "dark" && (
            <Check className="h-3.5 w-3.5 text-primary" />
          )}
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => setTheme("system")}
          className={cn(
            "flex items-center justify-between rounded-xl px-3 py-2 text-xs cursor-pointer transition-colors",
            mounted && theme === "system"
              ? "font-bold text-primary bg-primary/10"
              : "font-medium text-muted-foreground hover:text-foreground hover:bg-muted",
          )}
        >
          <div className="flex items-center gap-2">
            <Laptop
              className={cn(
                "h-4 w-4",
                mounted && theme === "system"
                  ? "text-primary"
                  : "text-muted-foreground",
              )}
            />
            <span>System</span>
          </div>
          {mounted && theme === "system" && (
            <Check className="h-3.5 w-3.5 text-primary" />
          )}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
