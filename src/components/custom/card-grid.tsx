"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Clock, Inbox, Loader2 } from "lucide-react";
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
  imageUrl?: string;
  readingTime?: string;
}

interface CardGridProps {
  items: CardItem[];
}

export function CardGrid({ items }: CardGridProps) {
  const [visibleCount, setVisibleCount] = React.useState(6);
  const [isLoadingMore, setIsLoadingMore] = React.useState(false);

  // Reset pagination when items change
  React.useEffect(() => {
    setVisibleCount(6);
  }, [items]);

  const handleLoadMore = () => {
    setIsLoadingMore(true);
    setTimeout(() => {
      setVisibleCount((prev) => prev + 6);
      setIsLoadingMore(false);
    }, 500);
  };

  const visibleItems = items.slice(0, visibleCount);
  const hasMore = items.length > visibleCount;

  if (items.length === 0) {
    return (
      <div className="container mx-auto max-w-7xl px-4 py-16 text-center sm:px-6 lg:px-8">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-muted">
          <Inbox className="h-8 w-8 text-muted-foreground" />
        </div>
        <h3 className="mt-4 text-lg font-bold">No articles found</h3>
        <p className="mt-2 text-sm text-muted-foreground max-w-xs mx-auto">
          We couldn't find any results matching your search or category filter. Try clearing your search.
        </p>
      </div>
    );
  }

  return (
    <section className="container mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {visibleItems.map((item) => (
          <Link
            key={item.id}
            href={item.link.startsWith("/article") ? item.link : `/article/${item.id}`}
            className="group flex flex-col justify-between overflow-hidden rounded-3xl border border-border/80 bg-card hover:bg-muted/40 dark:hover:bg-card/90 transition-all duration-300 hover:border-primary/70 hover:shadow-[0_0_20px_rgba(222,53,76,0.25)] dark:hover:shadow-[0_0_25px_rgba(222,53,76,0.4)]"
          >
            {/* Top Unsplash Image Header */}
            <div className="relative h-52 w-full overflow-hidden bg-muted">
              {item.imageUrl ? (
                <Image
                  src={item.imageUrl}
                  alt={item.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                />
              ) : (
                <div className={`h-full w-full bg-gradient-to-tr ${item.gradient}`} />
              )}
              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />

              {/* Tag Overlay */}
              <div className="absolute top-4 left-4 flex items-center gap-2">
                <Badge className="rounded-full bg-background/90 text-foreground border border-border/60 shadow-xs font-semibold text-[11px] px-3 py-0.5 backdrop-blur-md">
                  {item.categoryLabel}
                </Badge>
              </div>

              {item.readingTime && (
                <div className="absolute bottom-3 right-3 text-[10px] font-semibold text-white/90 bg-black/60 backdrop-blur-md px-2.5 py-0.5 rounded-full flex items-center gap-1 border border-white/10">
                  <Clock className="h-3 w-3" />
                  {item.readingTime}
                </div>
              )}
            </div>

            {/* Content Area */}
            <div className="p-6 flex flex-col justify-between flex-1">
              <div>
                <div className="flex items-start justify-between gap-3">
                  <h3 className="font-heading text-lg font-bold leading-snug group-hover:text-primary transition-colors line-clamp-2">
                    {item.title}
                  </h3>
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-border bg-muted/40 transition-all duration-300 group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary">
                    <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </div>
                <p className="mt-3 text-muted-foreground text-sm leading-relaxed line-clamp-3">
                  {item.excerpt}
                </p>
              </div>

              {/* Author & Date Footer */}
              <div className="mt-6 pt-4 border-t border-border/50 flex items-center justify-between text-xs text-muted-foreground">
                <div className="flex items-center gap-2.5">
                  <div className="h-7 w-7 rounded-full bg-primary/10 text-primary flex items-center justify-center text-[10px] font-extrabold border border-primary/20">
                    {item.authorAvatarText}
                  </div>
                  <span className="font-semibold text-foreground text-xs">{item.authorName}</span>
                </div>
                <span>{item.date}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Load More Trigger */}
      {hasMore && (
        <div className="mt-12 flex justify-center">
          <Button
            onClick={handleLoadMore}
            disabled={isLoadingMore}
            className="rounded-full px-8 font-semibold shadow-xs hover:shadow-md transition-all min-w-[150px]"
            variant="outline"
          >
            {isLoadingMore ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Loading...
              </>
            ) : (
              "Load More Articles"
            )}
          </Button>
        </div>
      )}
    </section>
  );
}
