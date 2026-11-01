
"use client";

import { useRouter } from "next/navigation";
import {
  CalendarDays,
  Clock,
  MapPin,
  Mail,
  Heart,
  UserRound,
} from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

const EventDetailsDialog = ({ event }) => {
  const router = useRouter();

  // Format event date
  const formattedDate = new Date(
    `${event.date}T00:00:00`
  ).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // Format category name
  const category = event.category
    ?.split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return (
    <Dialog
      open={true}
      onOpenChange={(open) => {
        if (!open) router.back();
      }}
    >
      <DialogContent className="sm:max-w-3xl max-h-[90vh] overflow-y-auto p-0 gap-0 rounded-3xl">

        {/* Event Thumbnail */}
        <div className="relative h-56 sm:h-72">
          <img
            src={event.thumbnail}
            alt={event.title}
            className="w-full h-full object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

          <Badge className="absolute bottom-5 left-7 bg-emerald-500 hover:bg-emerald-600 text-white border-none px-4 py-2">
            {category}
          </Badge>
        </div>

        {/* Event Information */}
        <div className="p-6 sm:p-8 space-y-6">

          {/* Title and Description */}
          <div className="space-y-3">
            <DialogTitle className="text-2xl sm:text-3xl font-bold text-slate-900">
              {event.title}
            </DialogTitle>

            <DialogDescription className="text-base text-slate-500 leading-7">
              {event.description}
            </DialogDescription>
          </div>

          {/* Event Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 rounded-2xl bg-slate-50 border p-5">

            {/* Date */}
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-xl bg-emerald-100 text-emerald-600">
                <CalendarDays size={22} />
              </div>

              <div>
                <p className="text-sm text-slate-400 font-medium">
                  Date
                </p>
                <p className="font-semibold text-slate-800">
                  {formattedDate}
                </p>
              </div>
            </div>

            {/* Time */}
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-xl bg-amber-100 text-amber-600">
                <Clock size={22} />
              </div>

              <div>
                <p className="text-sm text-slate-400 font-medium">
                  Time
                </p>
                <p className="font-semibold text-slate-800">
                  {event.time}
                </p>
              </div>
            </div>

            {/* Location */}
            <div className="flex items-center gap-3 min-w-0">
              <div className="p-3 rounded-xl bg-indigo-100 text-indigo-600">
                <MapPin size={22} />
              </div>

              <div className="min-w-0">
                <p className="text-sm text-slate-400 font-medium">
                  Location
                </p>
                <p className="font-semibold text-slate-800 break-words">
                  {event.location}
                </p>
              </div>
            </div>

            {/* Organizer Email */}
            <div className="flex items-center gap-3 min-w-0">
              <div className="p-3 rounded-xl bg-teal-100 text-teal-600">
                <Mail size={22} />
              </div>

              <div className="min-w-0">
                <p className="text-sm text-slate-400 font-medium">
                  Organizer Email
                </p>
                <a
                  href={`mailto:${event.organizerEmail}`}
                  className="font-semibold text-slate-800 hover:text-emerald-600 break-all"
                >
                  {event.organizerEmail}
                </a>
              </div>
            </div>

          </div>

          <Separator />

          {/* Action Buttons */}
          <div className="flex justify-end items-center gap-4">
            <Button
              variant="ghost"
              onClick={() => router.back()}
              className="text-slate-600"
            >
              Close
            </Button>

            <Button
              disabled
              className="bg-emerald-600 text-white gap-2 rounded-xl px-6"
              title="Event joining will be available after authentication is implemented"
            >
              <Heart size={18} fill="currentColor" />
              Join Event Now
            </Button>
          </div>

        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EventDetailsDialog;
