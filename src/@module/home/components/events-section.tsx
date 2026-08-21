"use client";

import Link from "next/link";
import Image from "next/image";
import { Calendar, MapPin, Clock, Users, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { EVENTS } from "@/base/data/events-mock-data";

export function EventsSection() {
  return (
    <section id="events" className="container mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 border-b border-border/40">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary mb-2">
            <Calendar className="h-3.5 w-3.5" /> Upcoming Gatherings
          </div>
          <h2 className="font-heading text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
            Events & Meetups
          </h2>
          <p className="text-muted-foreground text-sm leading-relaxed mt-1 max-w-2xl">
            Meet 150+ builders at Sector V, New Town and campus venues. Talks, demos and hiring mixers.
          </p>
        </div>

        <Link
          href="#"
          className="inline-flex items-center gap-1 text-xs font-bold text-primary hover:underline self-start sm:self-auto shrink-0"
        >
          View all events <ExternalLink className="h-3.5 w-3.5" />
        </Link>
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {EVENTS.map((event) => (
          <Link
            key={event.id}
            href={event.link}
            className="group flex flex-col overflow-hidden rounded-2xl border border-border/80 bg-gradient-to-br from-card via-card to-primary/5 hover:from-card hover:via-card hover:to-primary/10 transition-all duration-300 hover:border-primary/70 hover:shadow-[0_0_20px_rgba(11,160,156,0.25)]"
          >
            {/* Image Header */}
            <div className="relative h-40 w-full overflow-hidden bg-muted">
              <Image
                src={event.imageUrl}
                alt={event.title}
                fill
                sizes="(max-width: 768px) 100vw, 25vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />

              <div className="absolute top-3 left-3 flex items-center gap-2">
                <Badge className="rounded-md bg-background/90 text-foreground border border-border/60 shadow-xs font-semibold text-[11px] px-2.5 py-0.5 backdrop-blur-md">
                  {event.category}
                </Badge>
              </div>

              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                <span className="text-[11px] font-semibold text-white/90 bg-black/60 backdrop-blur-md px-2.5 py-0.5 rounded-md border border-white/10 flex items-center gap-1">
                  <Calendar className="h-3 w-3 text-amber-300" /> {event.date}
                </span>
                <span className="text-[10px] font-medium text-white/80 bg-black/50 backdrop-blur-md px-2 py-0.5 rounded-md border border-white/10 flex items-center gap-1">
                  <Clock className="h-3 w-3" /> {event.time}
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="p-4 flex flex-col flex-1">
              <h3 className="font-heading text-sm font-bold leading-snug group-hover:text-primary transition-colors line-clamp-2">
                {event.title}
              </h3>
              <p className="mt-2 text-xs text-muted-foreground leading-relaxed line-clamp-2 flex-1">
                {event.excerpt}
              </p>

              <div className="mt-4 pt-3 border-t border-border/50 flex items-center justify-between text-[11px] text-muted-foreground">
                <span className="flex items-center gap-1 font-medium">
                  <MapPin className="h-3 w-3 text-primary/70" /> {event.location}
                </span>
                <span className="flex items-center gap-1 font-semibold text-foreground bg-muted/60 px-2 py-0.5 rounded-md text-[10px]">
                  <Users className="h-3 w-3" /> {event.attendees}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
