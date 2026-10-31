
"use client"

import { useState, type FormEvent } from "react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
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

const categories = [
  { value: "winter-relief", label: "Winter Relief" },
  { value: "environment", label: "Environmental Cleanup" },
  { value: "education", label: "Education Support" },
  { value: "health", label: "Health & Nutrition" },
  { value: "emergency-relief", label: "Emergency Relief" },
  { value: "plantation", label: "Plantation" },
  { value: "donation", label: "Donation" },
] as const

const categoryItems = Object.fromEntries(
  categories.map((category) => [category.value, category.label])
)

const organizer = {
  name: "Jahidul Islam",
  email: "jahid1@gmail.com",
}

export default function CreateEventPage() {

  const [published, setPublished] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    setPublished(false)
    setError("")

    
    const formData = new FormData(e.currentTarget)

    const eventData = Object.fromEntries(formData.entries())

    // Validate future date
    const selectedDate = new Date(`${eventData.date}T00:00:00`)
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    if (selectedDate <= today) {
      setError("Please select a future date.")
      return
    }

    // Add temporary organizer information
    eventData.organizerEmail = organizer.email


      const res = await fetch("http://localhost:8000/create-event", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(eventData),
      })

      const result = await res.json()
      console.log(result)
      setPublished(true)
      
    
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/40 px-4 py-10 dark:bg-background">
      <Card className="w-full max-w-xl rounded-2xl shadow-[0_10px_40px_-15px_rgba(15,23,42,0.15)] [--card-spacing:2rem]">
        <CardHeader className="gap-1.5">
          <CardTitle className="text-2xl font-bold tracking-tight">
            Host a Social Development Event
          </CardTitle>
          <CardDescription>
            Fill out the form below to organize a volunteer drive in your
            locality.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-1.5">
              <Label htmlFor="title">Event Title *</Label>
              <Input
                id="title"
                name="title"
                required
                placeholder="e.g. Winter Clothes Distribution Drive"
                className="h-10"
              />
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label htmlFor="category">Category *</Label>
                <Select
                  name="category"
                  required
                  defaultValue="winter-relief"
                  items={categoryItems}
                >
                  <SelectTrigger id="category" className="h-10 w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem
                        key={category.value}
                        value={category.value}
                      >
                        {category.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="location">Location (Area, City) *</Label>
                <Input
                  id="location"
                  name="location"
                  required
                  placeholder="e.g. Mirpur 10 Circle, Dhaka"
                  className="h-10"
                />
              </div>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label htmlFor="date">Event Date (Future Date) *</Label>
                <Input
                  id="date"
                  name="date"
                  type="date"
                  required
                  min={new Date().toLocaleDateString("en-CA")}
                  className="h-10"
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="time">Start Time</Label>
                <Input
                  id="time"
                  name="time"
                  placeholder="10:00 AM"
                  className="h-10"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="thumbnail">Thumbnail Banner Image URL</Label>
              <Input
                id="thumbnail"
                name="thumbnail"
                type="url"
                placeholder="https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=1200&q=80"
                className="h-10"
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="description">Event Description *</Label>
              <Textarea
                id="description"
                name="description"
                required
                rows={5}
                placeholder="Provide event details, objectives, and volunteer guidelines..."
                className="min-h-28"
              />
            </div>

            <div className="rounded-lg bg-muted px-4 py-3.5 text-sm dark:bg-muted/50">
              <p className="text-muted-foreground">
                Organizer Contact (Temporary):
              </p>
              <p className="mt-1 text-foreground">
                {organizer.name} ({organizer.email})
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Button
                type="reset"
                variant="outline"
                className="h-10 rounded-lg font-medium"
                onClick={() => {
                  setPublished(false)
                  setError("")
                }}
              >
                Cancel
              </Button>

              <Button
                type="submit"
                className="h-10 rounded-lg bg-emerald-600 font-semibold text-white hover:bg-emerald-700"
              >
                Publish Event
              </Button>
            </div>

            {published && (
              <p
                role="status"
                className="text-center text-sm font-medium text-emerald-600 dark:text-emerald-400"
              >
                Event published successfully! Redirecting...
              </p>
            )}

            {error && (
              <p
                role="alert"
                className="text-center text-sm font-medium text-red-600"
              >
                {error}
              </p>
            )}
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
