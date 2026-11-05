import { ArrowRight } from "lucide-react"
import Link from "next/link"
import UpcomingEventsCard from "@/components/UpcomingEventsCard"
import type { UpcomingEvent } from "@/lib/events"

const RecentUpcomingEvents = async () => {
  let events: UpcomingEvent[] = []

  try {
    const res = await fetch("http://localhost:8000/recent-upcoming-events")
    if (res.ok) {
      const data = await res.json()
      if (Array.isArray(data)) events = data
    }
  } catch {
    events = []
  }

  if (events.length === 0) return null

  return (
    <section className="bg-muted/50 py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <span className="text-xs font-bold tracking-widest text-emerald-600 uppercase">
              Active Drives
            </span>
            <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-foreground">
              Recent Upcoming Events
            </h2>
          </div>

          <Link
            href="/upcoming-events"
            className="flex items-center gap-1.5 text-sm font-semibold text-emerald-600 transition-colors hover:text-emerald-700"
          >
            View All Events 
            <ArrowRight className="size-4" />
          </Link>
        </div>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {events.map((event) => (
            <UpcomingEventsCard key={event._id} event={event} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default RecentUpcomingEvents
