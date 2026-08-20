"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Heart,
  MessageSquare,
  Bookmark,
  Calendar,
  Tag as TagIcon,
  ExternalLink,
  Sparkles,
  Leaf,
  Cpu,
  Layers,
  Globe,
  Smartphone,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ProjectItem, ProjectTag } from "@/base/data/projects-mock-data";
import { cn } from "@/lib/utils";

interface ProjectCardProps {
  project: ProjectItem;
  layout?: "grid" | "list";
  className?: string;
}

export function ProjectCard({
  project,
  layout = "grid",
  className,
}: ProjectCardProps) {
  const [upvotes, setUpvotes] = useState(project.upvotes);
  const [hasUpvoted, setHasUpvoted] = useState(false);
  const [saves, setSaves] = useState(project.savesCount);
  const [hasSaved, setHasSaved] = useState(false);

  const handleUpvote = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (hasUpvoted) {
      setUpvotes((prev) => prev - 1);
      setHasUpvoted(false);
    } else {
      setUpvotes((prev) => prev + 1);
      setHasUpvoted(true);
    }
  };

  const handleSave = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (hasSaved) {
      setSaves((prev) => prev - 1);
      setHasSaved(false);
    } else {
      setSaves((prev) => prev + 1);
      setHasSaved(true);
    }
  };

  const renderTagIcon = (tag: ProjectTag) => {
    switch (tag.category) {
      case "eco":
        return <Leaf className="h-3 w-3 text-emerald-500 shrink-0" />;
      case "ai":
        return <Cpu className="h-3 w-3 text-purple-500 shrink-0" />;
      case "web":
        return <Globe className="h-3 w-3 text-blue-500 shrink-0" />;
      case "mobile":
        return <Smartphone className="h-3 w-3 text-amber-500 shrink-0" />;
      default:
        return <Layers className="h-3 w-3 text-primary shrink-0" />;
    }
  };

  const getTagStyle = (category: ProjectTag["category"]) => {
    switch (category) {
      case "eco":
        return "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-500/20";
      case "ai":
        return "bg-purple-500/10 text-purple-700 dark:text-purple-300 border-purple-500/20";
      case "web":
        return "bg-blue-500/10 text-blue-700 dark:text-blue-300 border-blue-500/20";
      case "mobile":
        return "bg-amber-500/10 text-amber-700 dark:text-amber-300 border-amber-500/20";
      default:
        return "bg-primary/10 text-primary border-primary/20";
    }
  };

  if (layout === "list") {
    return (
      <article
        className={cn(
          "group relative flex flex-col sm:flex-row items-stretch overflow-hidden rounded-2xl border border-border/70 bg-card p-3.5 sm:p-4 shadow-xs hover:shadow-lg hover:border-primary/50 transition-all duration-300 gap-4 sm:gap-5 dark:hover:shadow-[0_0_25px_rgba(11,160,156,0.2)]",
          className
        )}
      >
        {/* Cover Image Banner (Left Column) */}
        <div className="relative h-44 sm:h-auto sm:w-56 shrink-0 overflow-hidden rounded-xl bg-muted border border-border/50">
          <Image
            src={project.imageUrl}
            alt={project.title}
            fill
            sizes="(max-width: 768px) 100vw, 300px"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-80" />

          {/* Brand Badge */}
          <div className="absolute bottom-2.5 left-2.5 z-10">
            <span className="inline-flex items-center gap-1.5 rounded-lg bg-black/80 dark:bg-zinc-950/90 backdrop-blur-md px-2.5 py-1 text-[11px] font-mono font-bold text-white border border-white/20 shadow-md">
              <span className="h-1.5 w-1.5 rounded-md bg-primary animate-pulse" />
              {project.brandBadge}
            </span>
          </div>
        </div>

        {/* Single Unified Content Section (Title, Excerpt, Metadata, Tags & Action Bar) */}
        <div className="flex-1 flex flex-col justify-between space-y-3 min-w-0">
          {/* Header Row: Title & Featured Badge */}
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Link href={`#${project.id}`} className="group/title">
                <h2 className="font-heading text-base sm:text-lg font-bold text-foreground tracking-tight leading-snug group-hover/title:text-primary transition-colors line-clamp-1">
                  {project.title}
                </h2>
              </Link>
              {project.isFeatured && (
                <Badge className="rounded-md bg-primary/10 text-primary border border-primary/20 text-[10px] px-2 py-0 shrink-0">
                  Featured
                </Badge>
              )}
            </div>

            {/* Description */}
            <p className="text-muted-foreground text-xs leading-relaxed line-clamp-2">
              {project.description}
            </p>
          </div>

          {/* Metadata & Tag Badges Row */}
          <div className="space-y-2">
            {/* Metadata Line */}
            <div className="flex flex-wrap items-center gap-x-3.5 gap-y-1 text-[11px] text-muted-foreground font-medium">
              <div className="flex items-center gap-1.5">
                <div className="h-4.5 w-4.5 rounded-md bg-primary/10 text-primary font-extrabold text-[8px] flex items-center justify-center border border-primary/20 shrink-0">
                  {project.authorAvatar}
                </div>
                <span className="font-semibold text-foreground truncate max-w-[120px]">
                  {project.authorName}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="h-3 w-3 text-primary/70" />
                <span>{project.date}</span>
              </div>
              <div className="flex items-center gap-1">
                <TagIcon className="h-3 w-3 text-primary/70" />
                <span className="font-semibold text-foreground/90">{project.category}</span>
              </div>
            </div>

            {/* Tags Row */}
            <div className="flex flex-wrap items-center gap-1.5">
              {project.tags.map((tag) => (
                <span
                  key={tag.label}
                  className={cn(
                    "inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-[10px] font-semibold border transition-colors",
                    getTagStyle(tag.category)
                  )}
                >
                  {renderTagIcon(tag)}
                  <span>{tag.label}</span>
                </span>
              ))}
            </div>
          </div>

          {/* Unified Action Footer (Integrated inside single section!) */}
          <div className="pt-2.5 border-t border-border/60 flex items-center justify-between gap-3 mt-auto">
            {/* Left Counters & Labels */}
            <div className="flex items-center gap-4 text-xs font-semibold text-muted-foreground">
              <button
                className="flex items-center gap-1.5 hover:text-foreground transition-colors cursor-pointer"
                title="View Comments"
              >
                <MessageSquare className="h-3.5 w-3.5 text-muted-foreground/80" />
                <span>{project.commentsCount} Comments</span>
              </button>

              <button
                onClick={handleSave}
                className={cn(
                  "flex items-center gap-1.5 transition-colors cursor-pointer",
                  hasSaved ? "text-primary font-bold" : "hover:text-foreground"
                )}
                title="Bookmark Project"
              >
                <Bookmark className={cn("h-3.5 w-3.5", hasSaved && "fill-primary text-primary")} />
                <span>{saves} Saves</span>
              </button>

              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="hidden sm:flex items-center gap-1 text-primary hover:underline"
                  title="Visit Live Site"
                >
                  <ExternalLink className="h-3.5 w-3.5" />
                  <span>Live Demo</span>
                </a>
              )}
            </div>

            {/* Right Upvote Button */}
            <Button
              onClick={handleUpvote}
              variant={hasUpvoted ? "default" : "outline"}
              size="sm"
              className={cn(
                "rounded-lg px-3.5 py-1 h-8 font-bold text-xs transition-all gap-1.5 cursor-pointer shadow-xs",
                hasUpvoted
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "border-primary/40 text-primary hover:bg-primary/10 hover:border-primary"
              )}
            >
              <Heart className={cn("h-3.5 w-3.5", hasUpvoted && "fill-current")} />
              <span>{upvotes.toLocaleString()} Upvotes</span>
            </Button>
          </div>
        </div>
      </article>
    );
  }

  return (
    <article
      className={cn(
        "group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-border/70 bg-card p-4 shadow-xs hover:shadow-lg hover:border-primary/50 transition-all duration-300 dark:hover:shadow-[0_0_25px_rgba(11,160,156,0.2)]",
        className
      )}
    >
      <div>
        {/* Condensed Cover Image Banner with Brand Badge */}
        <div className="relative h-44 sm:h-48 w-full overflow-hidden rounded-xl bg-muted mb-3.5 border border-border/50">
          <Image
            src={project.imageUrl}
            alt={project.title}
            fill
            priority={project.isFeatured}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-80" />

          {/* Top Featured Badge */}
          {project.isFeatured && (
            <div className="absolute top-2.5 right-2.5 z-10">
              <Badge className="rounded-md bg-primary text-primary-foreground font-semibold text-[10px] px-2.5 py-0.5 shadow-md backdrop-blur-md flex items-center gap-1 border border-primary/30">
                <Sparkles className="h-2.5 w-2.5 text-amber-300" /> Featured
              </Badge>
            </div>
          )}

          {/* Brand Badge (Bottom-Left) */}
          <div className="absolute bottom-2.5 left-2.5 z-10">
            <span className="inline-flex items-center gap-1.5 rounded-lg bg-black/80 dark:bg-zinc-950/90 backdrop-blur-md px-2.5 py-1 text-[11px] font-mono font-bold text-white border border-white/20 shadow-md tracking-wide">
              <span className="h-1.5 w-1.5 rounded-md bg-primary animate-pulse" />
              {project.brandBadge}
            </span>
          </div>
        </div>

        {/* Title */}
        <div className="mb-1.5">
          <Link href={`#${project.id}`} className="group/title">
            <h2 className="font-heading text-base sm:text-lg font-bold text-foreground tracking-tight leading-snug group-hover/title:text-primary transition-colors line-clamp-1">
              {project.title}
            </h2>
          </Link>
        </div>

        {/* Description Paragraph */}
        <p className="text-muted-foreground text-xs leading-relaxed mb-3 line-clamp-2">
          {project.description}
        </p>

        {/* Metadata Line */}
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-muted-foreground font-medium mb-3 pb-3 border-b border-border/40">
          <div className="flex items-center gap-1.5">
            <div className="h-5 w-5 rounded-md bg-primary/10 text-primary font-extrabold text-[9px] flex items-center justify-center border border-primary/20 shrink-0">
              {project.authorAvatar}
            </div>
            <span className="font-semibold text-foreground truncate max-w-[100px]">{project.authorName}</span>
          </div>

          <div className="flex items-center gap-1">
            <Calendar className="h-3 w-3 text-primary/70" />
            <span>{project.date}</span>
          </div>

          <div className="flex items-center gap-1">
            <TagIcon className="h-3 w-3 text-primary/70" />
            <span className="font-semibold text-foreground/90">{project.category}</span>
          </div>
        </div>

        {/* Tag Chips */}
        <div className="flex flex-wrap items-center gap-1.5 mb-4">
          {project.tags.map((tag) => (
            <span
              key={tag.label}
              className={cn(
                "inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-[10px] font-semibold border transition-colors",
                getTagStyle(tag.category)
              )}
            >
              {renderTagIcon(tag)}
              <span>{tag.label}</span>
            </span>
          ))}
        </div>
      </div>

      {/* Action Footer */}
      <div className="pt-3 border-t border-border/60 flex items-center justify-between gap-2 mt-auto">
        <div className="flex items-center gap-3 text-[11px] font-medium text-muted-foreground">
          <button
            className="flex items-center gap-1 hover:text-foreground transition-colors cursor-pointer"
            title="View Comments"
          >
            <MessageSquare className="h-3.5 w-3.5 text-muted-foreground/80" />
            <span>{project.commentsCount}</span>
          </button>

          <button
            onClick={handleSave}
            className={cn(
              "flex items-center gap-1 transition-colors cursor-pointer",
              hasSaved ? "text-primary font-bold" : "hover:text-foreground"
            )}
            title="Bookmark Project"
          >
            <Bookmark className={cn("h-3.5 w-3.5", hasSaved && "fill-primary text-primary")} />
            <span>{saves}</span>
          </button>

          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-0.5 text-primary hover:underline"
              title="Visit Live Site"
            >
              <ExternalLink className="h-3 w-3" />
              <span>Live</span>
            </a>
          )}
        </div>

        {/* Condensed Upvote Button */}
        <Button
          onClick={handleUpvote}
          variant={hasUpvoted ? "default" : "outline"}
          size="sm"
          className={cn(
            "rounded-lg px-3 py-1 h-8 font-bold text-xs transition-all gap-1.5 cursor-pointer shadow-xs",
            hasUpvoted
              ? "bg-primary text-primary-foreground shadow-sm"
              : "border-primary/40 text-primary hover:bg-primary/10 hover:border-primary"
          )}
        >
          <Heart className={cn("h-3.5 w-3.5", hasUpvoted && "fill-current")} />
          <span>{upvotes.toLocaleString()}</span>
        </Button>
      </div>
    </article>
  );
}
