import UpcomingEventsList from "@/components/UpcomingEventsList"
import type { UpcomingEvent } from "@/lib/events"

const UpcomingEventsPage = async () => {
  let events: UpcomingEvent[] = []

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/upcoming-events`)

    if (res.ok) {
      const data = await res.json()

      if (Array.isArray(data)) {
        const today = new Date().toLocaleDateString("en-CA", {
          timeZone: "Asia/Dhaka",
        })

        events = data
          .filter((event: UpcomingEvent) => event.date >= today)
          .sort(
            (a: UpcomingEvent, b: UpcomingEvent) =>
              new Date(a.date).getTime() - new Date(b.date).getTime()
          )
      }
    }
  } catch {
    events = []
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