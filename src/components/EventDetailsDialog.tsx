"use client";
import type { UpcomingEvent } from "@/lib/events";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { CalendarDays, Clock, MapPin, Mail, Heart } from "lucide-react";

import { authClient } from "@/lib/auth-client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";

const EventDetailsDialog = ({ event }: { event: UpcomingEvent }) => {
  const router = useRouter();

  const { data: session, isPending } = authClient.useSession();

  const [isJoining, setIsJoining] = useState(false);
  const [isJoined, setIsJoined] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);
 const [checkedEvent, setCheckedEvent] = useState({
  email: "",
  eventId: "",
});

  useEffect(() => {
  const email = session?.user?.email;

  if (isPending || !email) return;

  const checkJoinedEvent = async () => {
    try {
      const res = await fetch(
        `http://localhost:8000/joined-events/${encodeURIComponent(email)}`
      );

      if (!res.ok) {
        throw new Error("Failed to check joined events");
      }

      const joinedEvents = await res.json();

      const alreadyJoined = joinedEvents.some(
        (item: { eventId: string }) => item.eventId === event._id
      );

      setIsJoined(alreadyJoined);
      setCheckedEvent({
        email,
        eventId: event._id,
      });
    } catch (error) {
      console.error(error);
    }
  };

  checkJoinedEvent();
}, [session?.user?.email, isPending, event._id]);

const isCheckingJoined =
  !!session?.user?.email &&
  (checkedEvent.email !== session.user.email ||
    checkedEvent.eventId !== event._id);

  // Format event date
  const formattedDate = new Date(`${event.date}T00:00:00`).toLocaleDateString(
    "en-US",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
    },
  );

  // Format category name
  const category = event.category
    ?.split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  // Handle Join Event
  const handleJoinEvent = async () => {
    // Check login
    if (!session?.user?.email) {
      router.push("/login");
      return;
    }

    setIsJoining(true);
    setMessage("");
    setError(false);

    try {
      const res = await fetch("http://localhost:8000/join-event", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          eventId: event._id,
          userEmail: session.user.email,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to join event");
      }

      const data = await res.json();

      if (data.message === "Already joined") {
        setIsJoined(true);
        setMessage("You have already joined this event.");
      } else {
        setIsJoined(true);
        setMessage("You have successfully joined this event!");
      }
    } catch (error) {
      console.log(error);
      setError(true);
      setMessage("Something went wrong. Please try again.");
    } finally {
      setIsJoining(false);
    }
  };

  return (
    <Dialog
      open={true}
      onOpenChange={(open) => {
        if (!open) router.back();
      }}
    >
      <DialogContent className="flex max-h-[90dvh] w-[calc(100%-2rem)] flex-col gap-0 overflow-hidden rounded-3xl p-0 sm:max-w-3xl">
        {/* Event Thumbnail */}
        <div className="relative h-48 shrink-0 sm:h-64">
          <Image
            src={event.thumbnail || "/images/event-placeholder.png"}
            alt={event.title}
            fill
            unoptimized
            className="object-cover"
          />

          <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />

          <Badge className="absolute bottom-5 left-7 border-none bg-emerald-500 px-4 py-2 text-white hover:bg-emerald-600">
            {category}
          </Badge>
        </div>

        {/* Scrollable Event Information */}
        <div className="min-h-0 flex-1 overflow-y-auto p-6 sm:p-8">
          {/* Title and Description */}
          <div className="space-y-3">
            <DialogTitle className="text-2xl font-bold text-slate-900 sm:text-3xl">
              {event.title}
            </DialogTitle>

            <DialogDescription className="text-base leading-7 text-slate-500">
              {event.description}
            </DialogDescription>
          </div>

          {/* Event Details */}
          <div className="mt-6 grid grid-cols-1 gap-5 rounded-2xl border bg-slate-50 p-5 sm:grid-cols-2">
            {/* Date */}
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-emerald-100 p-3 text-emerald-600">
                <CalendarDays size={22} />
              </div>

              <div>
                <p className="text-sm font-medium text-slate-400">Date</p>
                <p className="font-semibold text-slate-800">{formattedDate}</p>
              </div>
            </div>

            {/* Time */}
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-amber-100 p-3 text-amber-600">
                <Clock size={22} />
              </div>

              <div>
                <p className="text-sm font-medium text-slate-400">Time</p>
                <p className="font-semibold text-slate-800">{event.time}</p>
              </div>
            </div>

            {/* Location */}
            <div className="flex min-w-0 items-center gap-3">
              <div className="rounded-xl bg-indigo-100 p-3 text-indigo-600">
                <MapPin size={22} />
              </div>

              <div className="min-w-0">
                <p className="text-sm font-medium text-slate-400">Location</p>
                <p className="wrap-break-word font-semibold text-slate-800">
                  {event.location}
                </p>
              </div>
            </div>

            {/* Organizer Email */}
            <div className="flex min-w-0 items-center gap-3">
              <div className="rounded-xl bg-teal-100 p-3 text-teal-600">
                <Mail size={22} />
              </div>

              <div className="min-w-0">
                <p className="text-sm font-medium text-slate-400">
                  Organizer Email
                </p>
                <a
                  href={`mailto:${event.organizerEmail}`}
                  className="break-all font-semibold text-slate-800 hover:text-emerald-600"
                >
                  {event.organizerEmail}
                </a>
              </div>
            </div>
          </div>

          <Separator className="my-6" />

          {/* Success / Error Message */}
          {message && (
            <p
              className={`mb-4 rounded-lg p-3 text-sm ${
                error
                  ? "bg-red-50 text-red-600"
                  : "bg-emerald-50 text-emerald-700"
              }`}
            >
              {message}
            </p>
          )}

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-3">
            <Button
              variant="ghost"
              onClick={() => router.back()}
              className="text-slate-600"
            >
              Close
            </Button>

            <Button
              onClick={handleJoinEvent}
              disabled={isJoining || isJoined || isPending || isCheckingJoined}
              className="gap-2 rounded-xl bg-emerald-600 px-6 text-white hover:bg-emerald-700 disabled:opacity-60"
            >
              <Heart size={18} fill="currentColor" />

              {isPending || isCheckingJoined
                ? "Checking..."
                : isJoining
                  ? "Joining..."
                  : isJoined
                    ? "Already Joined"
                    : "Join Event Now"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EventDetailsDialog;
