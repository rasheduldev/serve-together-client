
"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { CirclePlus } from "lucide-react"
import { Button } from "@/components/ui/button"
import ManageEventsList from "@/components/ManageEventsList"
import { authClient } from "@/lib/auth-client"
import type { UpcomingEvent } from "@/lib/events"

const ManageEventsPage = () => {
  const { data: session, isPending } = authClient.useSession()

  const [events, setEvents] = useState<UpcomingEvent[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (isPending) return

    const fetchEvents = async () => {
      if (!session?.user?.email) {
        setIsLoading(false)
        return
      }

      try {
        const res = await fetch(
          `http://localhost:8000/my-events/${encodeURIComponent(session.user.email)}`
        )
        const data = await res.json()
        setEvents(data)
      } catch (error) {
        console.log(error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchEvents()
  }, [session?.user?.email, isPending])
  const handleEventUpdated = (updatedEvent: UpcomingEvent) => {
  setEvents((prev) =>
    prev.map((event) =>
      event._id === updatedEvent._id ? updatedEvent : event
    )
  )
}
const handleEventDeleted = (id: string) => {
  setEvents((prev) => prev.filter((event) => event._id !== id))
}

  return (
    <main className="flex-1">
      <section className="mx-auto max-w-7xl px-4 pt-8 pb-16 sm:px-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
              Manage My Hosted Events
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              View, edit, or remove volunteer initiatives you have published.
            </p>
          </div>

          <Link href="/create-event">
            <Button className="h-11 gap-2 rounded-xl bg-emerald-600 px-5 text-base font-semibold text-white shadow-sm hover:bg-emerald-700">
              <CirclePlus className="size-5" />
              Create Another Event
            </Button>
          </Link>
        </div>

        <ManageEventsList
  events={events}
  isLoading={isLoading}
  onUpdated={handleEventUpdated}
  onDeleted={handleEventDeleted}
/>
      </section>
    </main>
  )
}

export default ManageEventsPage
