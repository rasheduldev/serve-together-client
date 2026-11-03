
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Inbox } from "lucide-react";

import { authClient } from "@/lib/auth-client";
import type { UpcomingEvent } from "@/lib/events";
import UpcomingEventsCard from "@/components/UpcomingEventsCard";

const JoinedEventsPage = () => {
  const router = useRouter();

  const { data: session, isPending } = authClient.useSession();

  const [events, setEvents] = useState<UpcomingEvent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (isPending) return;

    // Check login
    if (!session?.user?.email) {
      router.replace("/login");
      return;
    }

    const fetchJoinedEvents = async () => {
      try {
        // Get joined event records
        const res = await fetch(
          `http://localhost:8000/joined-events/${session.user.email}`
        );

        if (!res.ok) {
          throw new Error("Failed to fetch joined events");
        }

        const joinedEvents = await res.json();

        // Get complete event information
        const eventData = await Promise.all(
          joinedEvents.map(async (item: { eventId: string }) => {
            const eventRes = await fetch(
              `http://localhost:8000/upcoming-event/${item.eventId}`
            );

            if (!eventRes.ok) return null;

            return eventRes.json();
          })
        );

        // Remove missing events and sort by date
        const validEvents = eventData
          .filter((event): event is UpcomingEvent => event !== null)
          .sort(
            (a, b) =>
              new Date(a.date).getTime() - new Date(b.date).getTime()
          );

        setEvents(validEvents);
      } catch (error) {
        console.error(error);
        setError("Unable to load your joined events.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchJoinedEvents();
}, [session?.user?.email, isPending, router]);

  if (isPending || isLoading) {
    return (
      <main className="flex flex-1 items-center justify-center">
        <p className="text-muted-foreground">Loading joined events...</p>
      </main>
    );
  }

  return (
    <main className="flex-1">
      <section className="mx-auto max-w-7xl px-4 pt-8 pb-16 sm:px-6">
        <h1 className="text-3xl font-extrabold tracking-tight text-foreground">
          My Joined Events
        </h1>

        <p className="mt-1 text-sm text-muted-foreground">
          Keep track of the social events you have joined.
        </p>

        {error ? (
          <div className="mt-8 text-center text-red-500">
            {error}
          </div>
        ) : events.length > 0 ? (
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {events.map((event) => (
              <UpcomingEventsCard key={event._id} event={event} />
            ))}
          </div>
        ) : (
          <div className="mt-12 flex flex-col items-center justify-center rounded-2xl border border-dashed border-border py-16 text-center">
            <Inbox className="size-10 text-muted-foreground" />

            <p className="mt-3 font-semibold text-foreground">
              No joined events yet
            </p>

            <p className="mt-1 text-sm text-muted-foreground">
              Explore upcoming events and join an initiative.
            </p>
          </div>
        )}
      </section>
    </main>
  );
};

export default JoinedEventsPage;
