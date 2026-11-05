
import UpcomingEventsList from "@/components/UpcomingEventsList"
import type { UpcomingEvent } from "@/lib/events"

const UpcomingEventsPage = async () => {
  let events: UpcomingEvent[] = []

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/upcoming-events`,
      {
        cache: "no-store",
      }
    )

    if (!res.ok) {
      throw new Error("Failed to fetch upcoming events")
    }

    const data = await res.json()

    if (Array.isArray(data)) {
      const today = new Date().toLocaleDateString("en-CA", {
        timeZone: "Asia/Dhaka",
      })

      events = data
        .filter((event: UpcomingEvent) => {
          const eventDate = String(event.date).slice(0, 10)
          return eventDate >= today
        })
        .sort((a: UpcomingEvent, b: UpcomingEvent) => {
          const dateA = String(a.date).slice(0, 10)
          const dateB = String(b.date).slice(0, 10)

          return dateA.localeCompare(dateB)
        })
    }
  } catch (error) {
    console.error("Failed to load upcoming events:", error)
  }

  return (
    <main className="flex-1">
      <section className="mx-auto max-w-7xl px-4 pt-8 pb-16 sm:px-6">
        <h1 className="text-3xl font-extrabold tracking-tight text-foreground">
          Upcoming Social Events
        </h1>

        <p className="mt-1 text-sm text-muted-foreground">
          Browse and join active volunteer initiatives across Dhaka.
        </p>

        <UpcomingEventsList events={events} />
      </section>
    </main>
  )
}

export default UpcomingEventsPage
