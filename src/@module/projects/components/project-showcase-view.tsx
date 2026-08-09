"use client";

import { useState, useMemo } from "react";
import {
  Search,
  Sparkles,
  Layers,
  Flame,
  Clock,
  Filter,
  Check,
  Rocket,
  Code2,
  Tag as TagIcon,
  LayoutGrid,
  List,
} from "lucide-react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { buttonVariants } from "@/components/ui/button";
import { ProjectCard } from "@/components/custom/project-card";
import { ProjectItem } from "@/base/data/projects-mock-data";
import { cn } from "@/lib/utils";

interface ProjectShowcaseViewProps {
  initialProjects: ProjectItem[];
}

const CATEGORIES = [
  { id: "all", label: "All Projects", count: 4 },
  { id: "Sustainability & Tech", label: "Sustainability", count: 1 },
  { id: "Artificial Intelligence", label: "AI & ML", count: 1 },
  { id: "Smart Mobility", label: "Smart Mobility", count: 1 },
  { id: "Developer Tools", label: "Developer Tools", count: 1 },
];

const POPULAR_TAGS = [
  "React",
  "Indic LLM",
  "PWA",
  "K8s",
  "Rust Core",
  "Eco-Friendly",
];

export function ProjectShowcaseView({
  initialProjects,
}: ProjectShowcaseViewProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<"upvotes" | "latest">("upvotes");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const filteredProjects = useMemo(() => {
    let result = initialProjects.filter((item) => {
      const matchesCategory =
        activeCategory === "all" || item.category === activeCategory;

      const matchesTag =
        !selectedTag ||
        item.tags.some(
          (t) => t.label.toLowerCase() === selectedTag.toLowerCase()
        );

      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !query ||
        item.title.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query) ||
        item.brandBadge.toLowerCase().includes(query) ||
        item.tags.some((t) => t.label.toLowerCase().includes(query));

      return matchesCategory && matchesTag && matchesSearch;
    });

    if (sortBy === "upvotes") {
      result.sort((a, b) => b.upvotes - a.upvotes);
    } else {
      result.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      );
    }

    return result;
  }, [initialProjects, searchQuery, activeCategory, selectedTag, sortBy]);

  const handleTagToggle = (tag: string) => {
    setSelectedTag((prev) => (prev === tag ? null : tag));
  };

  const hasActiveFilters =
    Boolean(searchQuery) || activeCategory !== "all" || Boolean(selectedTag);

  return (
    <div className="space-y-8">
      {/* Minimalistic Header Typography */}
      <div className="space-y-2 max-w-3xl">
        <div className="inline-flex items-center gap-1.5 rounded-md border border-primary/20 bg-primary/10 px-3 py-0.5 text-xs font-semibold text-primary">
          <Sparkles className="h-3.5 w-3.5" /> Bengal Builders Showcase
        </div>
        <h1 className="font-heading text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
          Community Projects Spotlight
        </h1>
        <p className="text-muted-foreground text-sm leading-relaxed">
          Discover, upvote, and explore high-impact web apps, AI engines, and
          developer tools built by software engineers across West Bengal.
        </p>
      </div>

      {/* Main Grid: Left Sidebar Filters + Right Project Grid/List View */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pt-2">
        {/* Left Column Sidebar: Filters, Search, Tags */}
        <aside className="lg:col-span-4 xl:col-span-3 lg:sticky lg:top-24 space-y-6">
          {/* Search Card */}
          <div className="rounded-2xl border border-border/70 bg-card p-4 shadow-xs">
            <label className="text-xs font-bold text-foreground mb-2 flex items-center gap-1.5">
              <Search className="h-3.5 w-3.5 text-primary" /> Search Projects
            </label>
            <div className="relative mt-2">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Type keywords, tools..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 h-9 text-xs rounded-lg bg-muted/40 border-border/60 focus-visible:bg-background transition-all"
              />
            </div>
          </div>

          {/* Categories Navigation Card */}
          <div className="rounded-2xl border border-border/70 bg-card p-4 shadow-xs">
            <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3 flex items-center gap-1.5">
              <Filter className="h-3.5 w-3.5 text-primary" /> Categories
            </h3>
            <nav className="space-y-1" aria-label="Category Filters">
              {CATEGORIES.map((cat) => {
                const isActive = activeCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={cn(
                      "w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all duration-200 cursor-pointer text-left",
                      isActive
                        ? "bg-primary text-primary-foreground font-semibold shadow-xs"
                        : "text-foreground/80 hover:bg-muted/60 hover:text-primary"
                    )}
                  >
                    <span>{cat.label}</span>
                    <span
                      className={cn(
                        "px-2 py-0.5 rounded-md text-[10px] font-mono font-bold",
                        isActive
                          ? "bg-primary-foreground/20 text-primary-foreground"
                          : "bg-muted text-muted-foreground"
                      )}
                    >
                      {cat.count}
                    </span>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Tech Stack Tags Card */}
          <div className="rounded-2xl border border-border/70 bg-card p-4 shadow-xs">
            <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3 flex items-center gap-1.5">
              <TagIcon className="h-3.5 w-3.5 text-primary" /> Popular Tags
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {POPULAR_TAGS.map((tag) => {
                const isSelected = selectedTag === tag;
                return (
                  <button
                    key={tag}
                    onClick={() => handleTagToggle(tag)}
                    className={cn(
                      "inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-medium border transition-all cursor-pointer",
                      isSelected
                        ? "bg-primary text-primary-foreground border-primary font-bold shadow-xs"
                        : "bg-muted/40 text-muted-foreground border-border/60 hover:border-primary/50 hover:text-foreground"
                    )}
                  >
                    {isSelected && <Check className="h-3 w-3" />}
                    <span>#{tag}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Sort Switcher Card */}
          <div className="rounded-2xl border border-border/70 bg-card p-4 shadow-xs">
            <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3 flex items-center gap-1.5">
              <Flame className="h-3.5 w-3.5 text-primary" /> Sort Order
            </h3>
            <div className="flex items-center gap-1.5 bg-muted/40 p-1 rounded-xl border border-border/50">
              <button
                onClick={() => setSortBy("upvotes")}
                className={cn(
                  "flex-1 flex items-center justify-center gap-1 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer",
                  sortBy === "upvotes"
                    ? "bg-background text-primary shadow-xs"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                <Flame className="h-3.5 w-3.5" /> Upvoted
              </button>
              <button
                onClick={() => setSortBy("latest")}
                className={cn(
                  "flex-1 flex items-center justify-center gap-1 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer",
                  sortBy === "latest"
                    ? "bg-background text-primary shadow-xs"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                <Clock className="h-3.5 w-3.5" /> Latest
              </button>
            </div>
          </div>

          {/* Submit Project Callout Card */}
          <div className="rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/5 via-card to-background p-4 shadow-xs space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-foreground">
              <Rocket className="h-4 w-4 text-primary" /> Building Something
              Cool?
            </div>
            <p className="text-[11px] text-muted-foreground leading-relaxed">
              Showcase your project to 1,200+ developers & founders across West
              Bengal.
            </p>
            <Link
              href="/project-submissions"
              className={cn(
                buttonVariants({ variant: "outline", size: "sm" }),
                "w-full rounded-lg text-xs font-semibold border-primary/40 text-primary hover:bg-primary/10 mt-1 cursor-pointer"
              )}
            >
              Submit Project <Code2 className="h-3.5 w-3.5 ml-1" />
            </Link>
          </div>
        </aside>

        {/* Right Column: Projects Listings (Grid Card or List View) */}
        <main className="lg:col-span-8 xl:col-span-9 space-y-6">
          {/* Header Action Bar: Count, Active Badges & View Selecting Action Tab Group Button (Top Right) */}
          <div className="flex items-center justify-between gap-3 pb-3 border-b border-border/40">
            <div className="flex items-center gap-2 flex-wrap text-xs text-muted-foreground font-medium">
              <span>
                Showing{" "}
                <strong className="text-foreground font-bold">
                  {filteredProjects.length}
                </strong>{" "}
                project{filteredProjects.length === 1 ? "" : "s"}
              </span>
              {activeCategory !== "all" && (
                <span className="rounded-md bg-primary/10 text-primary border border-primary/20 px-2 py-0.5 text-[10px] font-semibold">
                  {activeCategory}
                </span>
              )}
              {selectedTag && (
                <span className="rounded-md bg-secondary/10 text-secondary dark:text-primary border border-secondary/20 px-2 py-0.5 text-[10px] font-semibold">
                  #{selectedTag}
                </span>
              )}
              {hasActiveFilters && (
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setActiveCategory("all");
                    setSelectedTag(null);
                  }}
                  className="text-primary hover:underline font-bold cursor-pointer ml-1"
                >
                  Clear filters
                </button>
              )}
            </div>

            {/* View Selecting Action Tab Group Button (Grid Card vs List View - Top Right) */}
            <div className="flex items-center gap-1 bg-muted/40 p-1 rounded-xl border border-border/60 shrink-0">
              <button
                onClick={() => setViewMode("grid")}
                className={cn(
                  "flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium transition-all cursor-pointer",
                  viewMode === "grid"
                    ? "bg-background text-primary shadow-xs font-bold"
                    : "text-muted-foreground hover:text-foreground"
                )}
                title="Grid Card View"
              >
                <LayoutGrid className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">Grid</span>
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={cn(
                  "flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium transition-all cursor-pointer",
                  viewMode === "list"
                    ? "bg-background text-primary shadow-xs font-bold"
                    : "text-muted-foreground hover:text-foreground"
                )}
                title="List View"
              >
                <List className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">List</span>
              </button>
            </div>
          </div>

          {/* Cards Grid vs List View */}
          {filteredProjects.length === 0 ? (
            <div className="rounded-3xl border border-border bg-card p-12 text-center">
              <Layers className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
              <h3 className="text-lg font-bold text-foreground">
                No matching projects found
              </h3>
              <p className="text-sm text-muted-foreground mt-1 max-w-sm mx-auto">
                Try adjusting your search criteria or category filters to
                discover Bengal tech projects.
              </p>
            </div>
          ) : viewMode === "grid" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredProjects.map((project) => (
                <ProjectCard key={project.id} project={project} layout="grid" />
              ))}
            </div>
          ) : (
            <div className="flex flex-col space-y-4">
              {filteredProjects.map((project) => (
                <ProjectCard key={project.id} project={project} layout="list" />
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
