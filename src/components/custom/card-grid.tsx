"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowUpRight, Inbox, Loader2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export interface CardItem {
  id: string;
  category: "news" | "startups" | "opensource" | "meetups" | "jobs";
  categoryLabel: string;
  title: string;
  excerpt: string;
  authorName: string;
  authorAvatarText: string;
  date: string;
  link: string;
  gradient: string;
}

interface CardGridProps {
  items: CardItem[];
}

export function CardGrid({ items }: CardGridProps) {
  const [visibleCount, setVisibleCount] = React.useState(6);
  const [isLoadingMore, setIsLoadingMore] = React.useState(false);

  // Reset pagination when items change (e.g., when changing category or search query)
  React.useEffect(() => {
    setVisibleCount(6);
  }, [items]);

  const handleLoadMore = () => {
    setIsLoadingMore(true);
    // Simulate short network delay for premium experience
    setTimeout(() => {
      setVisibleCount((prev) => prev + 6);
      setIsLoadingMore(false);
    }, 600);
  };

  const visibleItems = items.slice(0, visibleCount);
  const hasMore = items.length > visibleCount;

  if (items.length === 0) {
    return (
      <div className="container mx-auto max-w-7xl px-4 py-16 text-center sm:px-6 lg:px-8">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-muted">
          <Inbox className="h-8 w-8 text-muted-foreground" />
        </div>
        <h3 className="mt-4 text-lg font-bold">No updates found</h3>
        <p className="mt-2 text-sm text-muted-foreground max-w-xs mx-auto">
          We couldn't find any results matching your search or filter. Try checking another category.
        </p>
      </div>
    );
  }

  return (
    <section className="container mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {visibleItems.map((item) => (
          <article 
            key={item.id}
            className="group flex flex-col justify-between overflow-hidden rounded-3xl border border-border bg-card shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-1 hover:border-muted-foreground/30"
          >
            {/* Top Premium Card Header (Visual Placeholder) */}
            <div className={`relative h-48 w-full overflow-hidden bg-gradient-to-tr ${item.gradient}`}>
              <div className="absolute inset-0 bg-black/5 dark:bg-black/25" />
              {/* Abstract decorative layout overlay */}
              <div className="absolute inset-0 opacity-[0.08] bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]" />
              <div className="absolute -bottom-10 -right-10 h-32 w-32 rounded-full bg-white/10 blur-xl" />

              {/* Tag Overlay */}
              <div className="absolute top-4 left-4">
                <Badge className="rounded-full bg-white/90 text-zinc-900 border-none shadow-sm font-bold text-[10px] tracking-wider uppercase dark:bg-zinc-950 dark:text-zinc-100 px-3 py-1">
                  {item.categoryLabel}
                </Badge>
              </div>
            </div>

            {/* Content Area */}
            <div className="p-6 flex flex-col justify-between flex-1">
              <div>
                <div className="flex items-start justify-between gap-4">
                  <h3 className="font-heading text-lg font-bold leading-tight group-hover:text-primary transition-colors line-clamp-2">
                    {item.title}
                  </h3>
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-border bg-muted/30 opacity-70 transition-all duration-300 group-hover:opacity-100 group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary">
                    <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </div>
                <p className="mt-3 text-muted-foreground text-sm leading-relaxed line-clamp-3">
                  {item.excerpt}
                </p>
              </div>

              {/* Author & Date Footer */}
              <div className="mt-6 pt-4 border-t border-border/40 flex items-center gap-3">
                <div className="h-8 w-8 rounded-full bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center text-[11px] font-extrabold text-zinc-700 dark:text-zinc-300 shadow-inner">
                  {item.authorAvatarText}
                </div>
                <div>
                  <p className="text-xs font-bold leading-none">{item.authorName}</p>
                  <p className="text-[10px] text-muted-foreground mt-1">{item.date}</p>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Load More Trigger */}
      {hasMore && (
        <div className="mt-12 flex justify-center">
          <Button
            onClick={handleLoadMore}
            disabled={isLoadingMore}
            className="rounded-full px-8 font-semibold shadow-sm hover:shadow-md transition-all min-w-[150px]"
            variant="outline"
          >
            {isLoadingMore ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Loading...
              </>
            ) : (
              "Load More"
            )}
          </Button>
        </div>
      )}
    </section>
  );
}
