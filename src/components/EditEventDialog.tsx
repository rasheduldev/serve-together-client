
"use client";

import { useState, type FormEvent } from "react";
import { Pencil, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import type { UpcomingEvent } from "@/lib/events";
import { getTokenFromClient } from "@/lib/getTokenFromClient";

const categories = [
  { value: "winter-relief", label: "Winter Relief" },
  { value: "environment", label: "Environment" },
  { value: "education", label: "Education" },
  { value: "health", label: "Health" },
  { value: "emergency-relief", label: "Emergency Relief" },
  { value: "plantation", label: "Plantation" },
  { value: "donation", label: "Donation" },
];

type EventForm = {
  title: string;
  description: string;
  category: string;
  location: string;
  date: string;
  time: string;
  thumbnail: string;
};

const convertTo24Hour = (time: string): string => {
  if (!time) return "";

  // Replace semicolon with colon
  time = time.replace(";", ":").trim();

  if (!time.includes("AM") && !time.includes("PM")) {
    return time.slice(0, 5);
  }

  const [timePart, modifier] = time.split(/\s+/);
  const [hourString, minuteString] = timePart.split(":");

  let hours = Number(hourString);
  const minutes = Number(minuteString);

  if (modifier === "PM" && hours !== 12) {
    hours += 12;
  }

  if (modifier === "AM" && hours === 12) {
    hours = 0;
  }

  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
};
// Convert 24-hour time (14:30) to 12-hour time (02:30 PM)
const convertTo12Hour = (time: string) => {
  const [hours, minutes] = time.split(":").map(Number);

  const modifier = hours >= 12 ? "PM" : "AM";
  const formattedHours = hours % 12 || 12;

  return `${String(formattedHours).padStart(2, "0")}:${String(minutes).padStart(2, "0")} ${modifier}`;
};

export function EditEventDialog({
  event,
  onUpdated,
}: {
  event: UpcomingEvent;
  onUpdated: (updatedEvent: UpcomingEvent) => void;
}) {
  const [open, setOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");
  console.log("Event time from database:", event.time);
  const [form, setForm] = useState<EventForm>({
    title: event.title,
    description: event.description,
    category: event.category,
    location: event.location,
    date: event.date,
    time: event.time ? convertTo24Hour(event.time) : "",
    thumbnail: event.thumbnail || "",
  });

  const update = (key: keyof EventForm, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setError("");
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsSaving(true);
    setError("");

    try {
      const formattedTime = convertTo12Hour(form.time);
      const token = await getTokenFromClient()
      const res = await fetch(
        `http://localhost:8000/update-event/${event._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`
          },
          body: JSON.stringify({
            ...form,
            time: formattedTime,
          }),
        },
      );

      if (!res.ok) {
        throw new Error("Failed to update event");
      }

      const data = await res.json();

      if (data.modifiedCount > 0 || data.matchedCount > 0) {
        onUpdated({
          ...event,
          ...form,
          time: formattedTime,
        });

        setOpen(false);
      }
    } catch (error) {
      console.error(error);
      setError("Something went wrong. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          <Button
            variant="outline"
            size="icon"
            className="size-9 rounded-lg text-muted-foreground hover:text-emerald-600"
            aria-label={`Edit ${event.title}`}
          >
            <Pencil />
          </Button>
        }
      />

      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>Edit Event</DialogTitle>
          <DialogDescription>
            Update the information about your event.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="event-title">Event Title</Label>
            <Input
              id="event-title"
              value={form.title}
              onChange={(e) => update("title", e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="event-category">Event Category</Label>
            <Select
              value={form.category}
              onValueChange={(value) => {
                if (value) {
                  update("category", value);
                }
              }}
            >
              <SelectTrigger id="event-category" className="w-full">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>

              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category.value} value={category.value}>
                    {category.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="event-location">Location</Label>
            <Input
              id="event-location"
              value={form.location}
              onChange={(e) => update("location", e.target.value)}
              required
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="event-date">Event Date</Label>
              <Input
                id="event-date"
                type="date"
                value={form.date}
                onChange={(e) => update("date", e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="event-time">Event Time</Label>
              <Input
                id="event-time"
                type="time"
                value={form.time}
                onChange={(e) => update("time", e.target.value)}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="event-thumbnail">Thumbnail URL</Label>
            <Input
              id="event-thumbnail"
              type="url"
              value={form.thumbnail}
              onChange={(e) => update("thumbnail", e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="event-description">Description</Label>
            <Textarea
              id="event-description"
              value={form.description}
              onChange={(e) => update("description", e.target.value)}
              className="min-h-28"
              required
            />
          </div>

          {error && (
            <p className="text-sm text-destructive">{error}</p>
          )}

          <div className="flex justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>

            <Button
  type="submit"
  className="h-9 rounded-lg border border-border bg-transparent px-4 text-muted-foreground hover:bg-transparent hover:text-emerald-600"
  disabled={isSaving}
>
  <Save />
  {isSaving ? "Saving..." : "Save Changes"}
</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
