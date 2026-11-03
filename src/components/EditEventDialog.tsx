"use client"

import { useState, type FormEvent } from "react"
import { Pencil, Save } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import type { UpcomingEvent } from "@/lib/events"

const categories = [
  { value: "winter-relief", label: "Winter Relief" },
  { value: "environment", label: "Environment" },
  { value: "education", label: "Education" },
  { value: "health", label: "Health" },
  { value: "emergency-relief", label: "Emergency Relief" },
  { value: "plantation", label: "Plantation" },
  { value: "donation", label: "Donation" },
]

type EventForm = {
  title: string
  description: string
  category: string
  location: string
  date: string
  time: string
  thumbnail: string
}

export function EditEventDialog({
  event,
  onUpdated,
}: {
  event: UpcomingEvent
  onUpdated: (updatedEvent: UpcomingEvent) => void
}) {
  const [open, setOpen] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState("")

  const [form, setForm] = useState<EventForm>({
  title: event.title,
  description: event.description,
  category: event.category,
  location: event.location,
  date: event.date,
  time: event.time || "",
  thumbnail: event.thumbnail || "",
})

  const update = (key: keyof EventForm, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }))
    setError("")
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSaving(true)
    setError("")

    try {
      const res = await fetch(
        `http://localhost:8000/update-event/${event._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        }
      )

      if (!res.ok) {
        throw new Error("Failed to update event")
      }

      const data = await res.json()

if (data.modifiedCount > 0 || data.matchedCount > 0) {
  onUpdated({ ...event, ...form })
  setOpen(false)
}
    } catch (error) {
      console.log(error)
      setError("Something went wrong. Please try again.")
    } finally {
      setIsSaving(false)
    }
  }

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
              onValueChange={(value) => update("category", value)}
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

            <Button type="submit" disabled={isSaving}>
              <Save className="size-4" />
              {isSaving ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}