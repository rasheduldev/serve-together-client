"use client"

import { useState } from "react"
import { Inbox, Search } from "lucide-react"
import { cn } from "cn"
import { Input } from "@/components/ui/input"
import UpcomingEventsCard from "@/components/UpcomingEventsCard"
import type { UpcomingEvent } from "@/lib/events"

const filters = [
  { value: "all", label: "All" },
  { value: "donation", label: "Donation" },
  { value: "environment", label: "Cleanup" },
  { value: "plantation", label: "Plantation" },
  { value: "winter-relief", label: "Winter Relief" },
  { value: "food-drive", label: "Food Drive" },
  { value: "health", label: "Health Camp" },
  { value: "education", label: "Education" },
] as const

const UpcomingEventsList = ({ events }: { events: UpcomingEvent[] }) => {
  const [query, setQuery] = useState("")
  const [activeFilter, setActiveFilter] = useState("all")

  const normalizedQuery = query.trim().toLowerCase()

  const filteredEvents = events.filter((event) => {
    const matchesFilter =
      activeFilter === "all" || event.category === activeFilter
    const matchesQuery =
      !normalizedQuery ||
      event.title.toLowerCase().includes(normalizedQuery) ||
      event.location.toLowerCase().includes(normalizedQuery)
    return matchesFilter && matchesQuery
  })

  return (
    <div className="mt-7">
      <div className="relative w-full max-w-md">
        <Search className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search by event title or area (e.g. Mirpur, Clean-up)..."
          aria-label="Search events"
          className="h-11 rounded-xl pl-10 pr-4 shadow-sm"
        />
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {filters.map((filter) => {
          const isActive = activeFilter === filter.value
          return (
            <button
              key={filter.value}
              type="button"
              aria-pressed={isActive}
              onClick={() => setActiveFilter(filter.value)}
              className={cn(
                "rounded-lg border px-4 py-1.5 text-sm font-medium transition-colors",
                isActive
                  ? "border-emerald-600 bg-emerald-600 text-white shadow-sm"
                  : "border-border bg-card text-foreground hover:border-emerald-300 hover:text-emerald-700 dark:hover:border-emerald-800 dark:hover:text-emerald-300"
              )}
            >
              {filter.label}
            </button>
          )
        })}
      </div>

      {filteredEvents.length > 0 ? (
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredEvents.map((event) => (
            <UpcomingEventsCard key={event._id} event={event} />
          ))}
        </div>
      ) : (
        <div className="mt-8 flex flex-col items-center justify-center rounded-2xl border border-dashed border-border py-16 text-center">
          <Inbox className="size-10 text-muted-foreground" />
          <p className="mt-3 font-semibold text-foreground">No events found</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Try a different search term or category filter.
          </p>
        </div>
      )}
    </div>
  )
}

export default UpcomingEventsList
