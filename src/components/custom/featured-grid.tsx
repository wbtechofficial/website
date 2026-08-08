"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Clock, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { MOCK_ARTICLES } from "@/base/constants/mock-data";

export function FeaturedGrid() {
  const mainArticle = MOCK_ARTICLES[0]; // Primary Featured Article
  const sideArticles = MOCK_ARTICLES.slice(1, 4); // 3 Stacked Articles for Right Column

  return (
    <section
      id="featured-feed"
      className="container mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8"
    >
      {/* Title & Description */}
      <div className="mb-8">
        <h2 className="font-heading text-2xl sm:text-3xl font-extrabold tracking-tight mb-2">
          Featured Articles
        </h2>
        <p className="text-muted-foreground text-sm max-w-2xl leading-relaxed">
          A collection of the most insightful and widely-read articles in our
          community.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch">
        {/* Main Featured Card - Left (Spans 7 columns on desktop) */}
        <Link
          href={`/article/${mainArticle.id}`}
          className="group relative overflow-hidden rounded-3xl border border-border/80 bg-card p-6 sm:p-8 flex flex-col justify-between min-h-[460px] sm:min-h-[520px] transition-all duration-300 hover:border-primary/80 hover:shadow-[0_0_30px_rgba(222,53,76,0.3)] dark:hover:shadow-[0_0_35px_rgba(222,53,76,0.45)] lg:col-span-7"
        >
          {/* High Quality Unsplash Background Image */}
          <div className="absolute inset-0 z-0 overflow-hidden">
            <Image
              src={mainArticle.imageUrl}
              alt={mainArticle.title}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 58vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
            {/* Dark Gradient Overlay for Maximum Readability */}
            <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/95 via-black/60 to-black/30" />
            <div className="absolute inset-0 z-10 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
          </div>

          {/* Top Header Badges */}
          <div className="relative z-20 flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <Badge
                variant="secondary"
                className="rounded-full bg-primary text-primary-foreground border border-primary/30 font-semibold px-3 py-1 text-xs backdrop-blur-md shadow-xs"
              >
                {mainArticle.categoryLabel}
              </Badge>
              <Badge
                variant="outline"
                className="rounded-full font-semibold px-3 py-1 text-xs bg-white/10 text-white border-white/20 backdrop-blur-md"
              >
                <Sparkles className="h-3 w-3 mr-1 text-amber-300 inline" />
                Featured
              </Badge>
            </div>
            <span className="text-xs font-semibold text-white/90 bg-black/50 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 flex items-center gap-1">
              <Clock className="h-3 w-3 text-amber-300" />
              {mainArticle.readingTime}
            </span>
          </div>

          {/* Bottom Article Content Area */}
          <div className="relative z-20 mt-24 pt-6">
            <div className="max-w-2xl">
              <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight mb-3 group-hover:text-primary transition-colors drop-shadow-sm">
                {mainArticle.title}
              </h2>
              <p className="text-white/80 text-sm sm:text-base leading-relaxed line-clamp-3 mb-6">
                {mainArticle.excerpt}
              </p>
            </div>

            {/* Author & Read Link Footer */}
            <div className="pt-4 border-t border-white/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-primary text-primary-foreground font-extrabold text-xs flex items-center justify-center border border-white/30 shadow-md">
                  {mainArticle.authorAvatarText}
                </div>
                <div>
                  <p className="text-xs font-bold text-white leading-none">
                    {mainArticle.authorName}
                  </p>
                  <p className="text-[11px] text-white/70 mt-1">
                    Published {mainArticle.date}
                  </p>
                </div>
              </div>

              <span className="inline-flex items-center gap-1.5 text-xs font-bold text-white group-hover:text-amber-200 transition-colors bg-white/15 hover:bg-white/25 px-4 py-2 rounded-full backdrop-blur-md border border-white/20 self-start sm:self-auto">
                Read Article
                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
            </div>
          </div>
        </Link>

        {/* Stacked Side Articles List - Right Column (Spans 5 columns on desktop - Matching Image 1 Reference) */}
        <div className="lg:col-span-5 flex flex-col gap-3 justify-between">
          {sideArticles.map((article) => (
            <Link
              key={article.id}
              href={`/article/${article.id}`}
              className="group relative flex flex-1 flex-row items-center gap-4 rounded-2xl border border-border/80 bg-card p-4 transition-all duration-300 hover:border-primary/70 hover:bg-muted/40 dark:hover:bg-card/90 hover:shadow-[0_0_18px_rgba(222,53,76,0.2)] dark:hover:shadow-[0_0_20px_rgba(222,53,76,0.35)]"
            >
              {/* Left Thumbnail Image */}
              <div className="relative h-24 w-28 sm:w-32 shrink-0 overflow-hidden rounded-xl bg-muted border border-border/50">
                <Image
                  src={article.imageUrl}
                  alt={article.title}
                  fill
                  sizes="128px"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              {/* Right Article Details */}
              <div className="flex flex-col justify-between flex-1 min-w-0 py-0.5">
                <div>
                  {/* Author & Date Line */}
                  <div className="flex items-center gap-2 text-[11px] text-muted-foreground font-medium mb-1">
                    <span className="font-semibold text-foreground truncate max-w-[120px]">
                      {article.authorName}
                    </span>
                    <span>•</span>
                    <span>{article.date}</span>
                  </div>

                  {/* Article Title */}
                  <h3 className="font-heading text-sm sm:text-base font-bold leading-snug text-foreground group-hover:text-primary transition-colors line-clamp-2">
                    {article.title}
                  </h3>
                </div>

                {/* Category Tags */}
                <div className="mt-3 flex items-center justify-between gap-2">
                  <Badge
                    variant="secondary"
                    className="rounded-full px-2.5 py-0.5 text-[10px] font-semibold bg-muted text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary transition-colors"
                  >
                    {article.categoryLabel}
                  </Badge>
                  <span className="text-[10px] text-muted-foreground font-medium flex items-center gap-1">
                    <Clock className="h-3 w-3" /> {article.readingTime}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
