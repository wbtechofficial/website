"use client";

import Link from "next/link";
import { GraduationCap, Clock, Users, ExternalLink, BookOpen } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { STUDENT_PROGRAMS } from "@/base/data/students-mock-data";

export function StudentsSection() {
  return (
    <section id="students" className="container mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary mb-2">
            <GraduationCap className="h-3.5 w-3.5" /> Campus & Early Career
          </div>
          <h2 className="font-heading text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
            For Students
          </h2>
          <p className="text-muted-foreground text-sm leading-relaxed mt-1 max-w-2xl">
            Fellowships, mentorship circles and campus programs to launch your engineering career in Bengal.
          </p>
        </div>

        <Link
          href="#"
          className="inline-flex items-center gap-1 text-xs font-bold text-primary hover:underline self-start sm:self-auto shrink-0"
        >
          Explore student programs <ExternalLink className="h-3.5 w-3.5" />
        </Link>
      </div>

      {/* Students Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {STUDENT_PROGRAMS.map((program) => (
          <Link
            key={program.id}
            href={program.link}
            className="group flex flex-col justify-between rounded-2xl border border-border/80 bg-gradient-to-br from-card via-card to-primary/5 hover:from-card hover:via-card hover:to-primary/10 p-5 shadow-xs transition-all duration-300 hover:border-primary/70 hover:shadow-[0_0_20px_rgba(11,160,156,0.2)]"
          >
            <div>
              {/* Header */}
              <div className="flex items-center gap-3 mb-4">
                <div className="h-10 w-10 rounded-xl bg-coral/10 text-coral font-bold text-xs flex items-center justify-center border border-coral/20 shrink-0">
                  {program.iconText}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-[11px] font-semibold text-coral flex items-center gap-1">
                    <BookOpen className="h-3 w-3" /> {program.provider}
                  </p>
                  <div className="flex items-center gap-1.5 mt-1">
                    <Badge variant="outline" className="rounded-md px-2 py-0.5 text-[10px] font-medium">
                      {program.level}
                    </Badge>
                    <span className="text-[10px] text-muted-foreground flex items-center gap-1">
                      <Clock className="h-3 w-3" /> {program.duration}
                    </span>
                  </div>
                </div>
              </div>

              {/* Title */}
              <h3 className="font-heading text-sm font-bold leading-snug text-foreground group-hover:text-primary transition-colors line-clamp-2">
                {program.title}
              </h3>

              {/* Description */}
              <p className="mt-2 text-xs text-muted-foreground leading-relaxed line-clamp-3 mb-4">
                {program.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 mb-4">
                {program.tags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="secondary"
                    className="rounded-md px-2 py-0.5 text-[10px] font-medium bg-muted text-muted-foreground"
                  >
                    {tag.trim()}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="pt-3 border-t border-border/50 flex items-center justify-between text-[11px]">
              <span className="flex items-center gap-1 font-semibold text-foreground bg-muted/60 px-2 py-0.5 rounded-md">
                <Users className="h-3 w-3 text-primary" /> {program.learners}
              </span>
              <span className="text-primary font-bold group-hover:underline text-xs">Learn more →</span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
