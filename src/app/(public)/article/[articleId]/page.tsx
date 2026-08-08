import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  Clock,
  Calendar,
  Share2,
  Copy,
  Sparkles,
  ArrowUpRight,
  CheckCircle2,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { getArticleByIdOrSlug, MOCK_ARTICLES } from "@/base/data/mock-data";

interface ArticlePageProps {
  params: Promise<{
    articleId: string;
  }>;
}

export async function generateStaticParams() {
  return MOCK_ARTICLES.map((article) => ({
    articleId: article.id,
  }));
}

export default async function ArticleDetailPage({ params }: ArticlePageProps) {
  const { articleId } = await params;
  const article = getArticleByIdOrSlug(articleId);

  if (!article) {
    notFound();
  }

  // Get 3 recommended articles excluding current
  const recommendedArticles = MOCK_ARTICLES.filter(
    (a) => a.id !== article.id,
  ).slice(0, 3);

  return (
    <main className="flex-1 py-8 sm:py-12 lg:py-16">
      <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors group px-3 py-1.5 rounded-full border border-border/50 bg-card hover:bg-muted"
          >
            <ArrowLeft className="h-4 w-4 transition-transform duration-200 group-hover:-translate-x-1" />
            <span>Back to Articles</span>
          </Link>
        </div>

        {/* Article Header (Inspired by Image 2 - Snappy Reference) */}
        <header className="text-center max-w-3xl mx-auto mb-10">
          {/* Category Tag Badge */}
          <div className="mb-4">
            <Badge
              variant="secondary"
              className="rounded-full bg-primary/10 text-primary border border-primary/20 font-bold px-4 py-1 text-xs tracking-wide uppercase"
            >
              {article.categoryLabel}
            </Badge>
          </div>

          {/* Main Headline */}
          <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight mb-6 text-foreground">
            {article.title}
          </h1>

          {/* Date & Reading Time Metadata */}
          <div className="flex items-center justify-center gap-4 text-xs sm:text-sm font-medium text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <Calendar className="h-4 w-4 text-primary" />
              {article.date}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <Clock className="h-4 w-4 text-primary" />
              {article.readingTime}
            </span>
          </div>
        </header>

        {/* Large Hero Featured Image */}
        <div className="relative h-[300px] sm:h-[450px] lg:h-[520px] w-full overflow-hidden rounded-2xl sm:rounded-3xl border border-border bg-muted shadow-lg mb-12 sm:mb-16">
          <Image
            src={article.imageUrl}
            alt={article.title}
            fill
            priority
            sizes="(max-width: 1200px) 100vw, 1200px"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60" />
        </div>

        {/* Main 2-Column Layout: Sidebar Navigation (Left) + Content Body (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Sidebar: Table of Contents & Social Share (Spans 4 cols on desktop) */}
          <aside className="lg:col-span-4 lg:sticky lg:top-24 space-y-8">
            {/* Table of Contents Box */}
            {article.toc && article.toc.length > 0 && (
              <div className="rounded-2xl border border-border/70 bg-card/60 p-6 backdrop-blur-sm shadow-xs">
                <h3 className="font-heading text-xs font-extrabold tracking-wider uppercase text-muted-foreground mb-4 flex items-center gap-2">
                  <Sparkles className="h-3.5 w-3.5 text-primary" />
                  Table of Contents
                </h3>
                <nav className="space-y-2 text-xs sm:text-sm">
                  {article.toc.map((item) => (
                    <a
                      key={item.id}
                      href={`#${item.id}`}
                      className="block text-muted-foreground hover:text-primary font-medium py-1 transition-colors hover:translate-x-0.5"
                    >
                      {item.title}
                    </a>
                  ))}
                </nav>
              </div>
            )}

            {/* Author Info Card */}
            <div className="rounded-2xl border border-border/70 bg-card/60 p-6 backdrop-blur-sm shadow-xs flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-primary/10 text-primary font-extrabold text-sm flex items-center justify-center shrink-0 border border-primary/20">
                {article.authorAvatarText}
              </div>
              <div>
                <p className="text-sm font-bold text-foreground leading-tight">
                  {article.authorName}
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {article.authorRole}
                </p>
              </div>
            </div>

            {/* Share Article Section */}
            <div className="rounded-2xl border border-border/70 bg-card/60 p-6 backdrop-blur-sm shadow-xs">
              <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3 flex items-center gap-1.5">
                <Share2 className="h-3.5 w-3.5" /> Share Article
              </p>
              <div className="flex items-center gap-2">
                <a
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(article.title)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2.5 rounded-full border border-border bg-background hover:bg-muted text-muted-foreground hover:text-foreground transition-all"
                  title="Share on X (Twitter)"
                >
                  <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>
                <a
                  href={`https://www.linkedin.com/sharing/share-offsite/`}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2.5 rounded-full border border-border bg-background hover:bg-muted text-muted-foreground hover:text-foreground transition-all"
                  title="Share on LinkedIn"
                >
                  <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.25V10.9H6.46M7.86 6.74a1.62 1.62 0 1 0 0 3.24 1.62 1.62 0 0 0 0-3.24z" />
                  </svg>
                </a>
                <button
                  className="p-2.5 rounded-full border border-border bg-background hover:bg-muted text-muted-foreground hover:text-foreground transition-all"
                  title="Copy Article Link"
                >
                  <Copy className="h-4 w-4" />
                </button>
              </div>
            </div>
          </aside>

          {/* Right Main Column: Rich Article Body (Spans 8 cols on desktop) */}
          <article className="lg:col-span-8 space-y-10 text-foreground leading-relaxed">
            {/* Excerpt Lead Paragraph */}
            <p className="text-lg sm:text-xl font-medium text-foreground/90 leading-relaxed border-l-4 border-primary pl-4 py-1 italic bg-primary/5 rounded-r-xl">
              {article.excerpt}
            </p>

            {/* Dynamic Content Sections */}
            {article.sections.map((section) => (
              <section
                key={section.id}
                id={section.id}
                className="space-y-4 scroll-mt-24"
              >
                <h2 className="font-heading text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground border-b border-border/40 pb-3">
                  {section.title}
                </h2>
                {section.content.map((paragraph, idx) => (
                  <p
                    key={idx}
                    className="text-base sm:text-lg text-muted-foreground leading-relaxed"
                  >
                    {paragraph}
                  </p>
                ))}
              </section>
            ))}

            {/* Tags Footer */}
            {article.tags && article.tags.length > 0 && (
              <div className="pt-6 border-t border-border flex flex-wrap items-center gap-2">
                <span className="text-xs font-bold text-muted-foreground mr-2">
                  Tags:
                </span>
                {article.tags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="outline"
                    className="rounded-full px-3 py-1 text-xs font-medium bg-muted/40"
                  >
                    #{tag}
                  </Badge>
                ))}
              </div>
            )}

            {/* Author Community Signature */}
            <div className="mt-12 rounded-3xl border border-primary/20 bg-gradient-to-br from-primary/5 via-card to-background p-6 sm:p-8 flex items-start gap-4">
              <CheckCircle2 className="h-6 w-6 text-primary shrink-0 mt-1" />
              <div>
                <h4 className="font-heading text-base sm:text-lg font-bold text-foreground">
                  Written by {article.authorName}
                </h4>
                <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                  Core contributor to the West Bengal Tech ecosystem. Interested
                  in contributing articles or spotlighting your tech startup?
                  Get in touch with our editorial team.
                </p>
              </div>
            </div>
          </article>
        </div>

        {/* Recommended Articles Section (Inspired by Image 2 - Snappy Reference) */}
        <section className="mt-20 pt-12 border-t border-border">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="font-heading text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
                Recommended Articles
              </h2>
              <p className="text-sm text-muted-foreground mt-1">
                Discover more stories, meetups, and developer highlights from
                West Bengal.
              </p>
            </div>
            <Link
              href="/"
              className="inline-flex items-center gap-1 text-xs sm:text-sm font-bold text-primary hover:underline"
            >
              View all articles <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>

          {/* 3-Column Card Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {recommendedArticles.map((rec) => (
              <Link
                key={rec.id}
                href={`/article/${rec.id}`}
                className="group flex flex-col justify-between overflow-hidden rounded-3xl border border-border/80 bg-card hover:bg-muted/40 dark:hover:bg-card/90 transition-all duration-300 hover:border-primary/70 hover:shadow-[0_0_20px_rgba(84,0,0,0.18)] dark:hover:shadow-[0_0_25px_rgba(84,0,0,0.35)] p-5"
              >
                <div className="relative h-44 w-full overflow-hidden rounded-2xl bg-muted mb-4">
                  <Image
                    src={rec.imageUrl}
                    alt={rec.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-3 left-3">
                    <Badge className="rounded-full bg-background/90 text-foreground text-[10px] px-2.5 py-0.5 backdrop-blur-md">
                      {rec.categoryLabel}
                    </Badge>
                  </div>
                </div>

                <div>
                  <h3 className="font-heading text-base font-bold leading-snug group-hover:text-primary transition-colors line-clamp-2">
                    {rec.title}
                  </h3>
                  <p className="mt-2 text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                    {rec.excerpt}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-border/50 flex items-center justify-between text-[11px] text-muted-foreground">
                  <span>{rec.date}</span>
                  <span className="font-semibold text-primary group-hover:underline flex items-center gap-0.5">
                    Read <ArrowUpRight className="h-3.5 w-3.5" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
