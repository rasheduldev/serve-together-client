"use client";

import { Inbox } from "lucide-react";
import ManageEventCard from "@/components/ManageEventCard";
import type { UpcomingEvent } from "@/lib/events";

const ManageEventsList = ({
  events,
  isLoading,
  onUpdated,
  onDeleted,
}: {
  events: UpcomingEvent[]
  isLoading: boolean
  onUpdated: (updatedEvent: UpcomingEvent) => void
  onDeleted: (id: string) => void
}) => {
  if (isLoading) {
    return (
      <div className="mt-6 overflow-hidden rounded-2xl border border-border bg-card shadow-[0_2px_12px_-4px_rgba(15,23,42,0.1)]">
        <div className="grid grid-cols-[minmax(0,2fr)_minmax(0,0.8fr)_minmax(0,0.9fr)_minmax(0,1.1fr)_auto] gap-6 border-b bg-muted/50 px-6 py-4">
          <div className="h-4 w-28 animate-pulse rounded bg-muted" />
          <div className="h-4 w-20 animate-pulse rounded bg-muted" />
          <div className="h-4 w-16 animate-pulse rounded bg-muted" />
          <div className="h-4 w-20 animate-pulse rounded bg-muted" />
          <div className="h-4 w-14 animate-pulse rounded bg-muted" />
        </div>

        {[0, 1, 2].map((row) => (
          <div
            key={row}
            className="flex items-center gap-4 border-b px-6 py-5 last:border-b-0"
          >
            <div className="size-14 shrink-0 animate-pulse rounded-lg bg-muted" />
            <div className="flex-1 space-y-2">
              <div className="h-4 w-3/4 max-w-sm animate-pulse rounded bg-muted" />
              <div className="h-3 w-32 animate-pulse rounded bg-muted" />
            </div>
            <div className="hidden w-32 animate-pulse rounded-full bg-muted py-3 md:block" />
            <div className="hidden w-20 animate-pulse rounded bg-muted py-3 md:block" />
            <div className="hidden w-40 animate-pulse rounded bg-muted py-3 md:block" />
            <div className="hidden gap-2 md:flex">
              <div className="size-9 animate-pulse rounded-lg bg-muted" />
              <div className="size-9 animate-pulse rounded-lg bg-muted" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (events.length === 0) {
    return (
      <div className="mt-6 flex flex-col items-center justify-center rounded-2xl border border-dashed border-border py-16 text-center">
        <Inbox className="size-10 text-muted-foreground" />
        <p className="mt-3 font-semibold text-foreground">
          No events hosted yet
        </p>
        <p className="mt-1 text-sm text-muted-foreground">
          Events you create will appear here once you publish them.
        </p>
      </div>
    );
  }

  return (
    <div className="mt-6 overflow-hidden rounded-2xl border border-border bg-card shadow-[0_2px_12px_-4px_rgba(15,23,42,0.1)]">
      {/* Table header (desktop only) */}
      <div className="hidden bg-muted/50 px-6 py-4 text-xs font-semibold tracking-wider text-muted-foreground uppercase md:grid md:grid-cols-[minmax(0,2fr)_minmax(0,0.8fr)_minmax(0,0.9fr)_minmax(0,1.1fr)_auto] md:gap-6">
        <span>Event Details</span>
        <span>Category</span>
        <span>Date</span>
        <span>Location</span>
        <span className="justify-self-end">Actions</span>
      </div>

      {events.map((event) => (
  <ManageEventCard
    key={event._id}
    event={event}
    onUpdated={onUpdated}
    onDeleted={onDeleted}
  />
))}
    </div>
  );
};

export default ManageEventsList;
