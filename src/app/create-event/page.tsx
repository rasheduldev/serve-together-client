"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

const categories = [
  { value: "winter-relief", label: "Winter Relief" },
  { value: "environment", label: "Environmental Cleanup" },
  { value: "education", label: "Education Support" },
  { value: "health", label: "Health & Nutrition" },
  { value: "emergency-relief", label: "Emergency Relief" },
  { value: "plantation", label: "Plantation" },
  { value: "donation", label: "Donation" },
] as const;

const categoryItems = Object.fromEntries(
  categories.map((category) => [category.value, category.label]),
);

export default function CreateEventPage() {
  const router = useRouter();

  const { data: session, isPending } = authClient.useSession();

  const user = session?.user;

  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setError("");

    if (isPending) {
      return;
    }

    if (!user) {
      toast.error("Please log in before creating an event.");
      router.push("/log-in");
      return;
    }

    try {
      const formData = new FormData(e.currentTarget);
      const eventData = Object.fromEntries(formData.entries());

      const selectedDate = new Date(`${eventData.date}T00:00:00`);

      const today = new Date();
      today.setHours(0, 0, 0, 0);

      if (isNaN(selectedDate.getTime()) || selectedDate <= today) {
        setError("Please select a valid future date.");
        return;
      }

      const data = {
        ...eventData,
        organizerEmail: user.email,
      };

      const res = await fetch("http://localhost:8000/create-event", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message || "Failed to create event.");
      }

      toast.success("Event created successfully!");

      router.push("/upcoming-events");
    } catch (err) {
      console.error("Create event error:", err);

      toast.error(err instanceof Error ? err.message : "Something went wrong!");
    }
  };
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);

  const minDate = [
    tomorrow.getFullYear(),
    String(tomorrow.getMonth() + 1).padStart(2, "0"),
    String(tomorrow.getDate()).padStart(2, "0"),
  ].join("-");

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
                      <SelectItem key={category.value} value={category.value}>
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
                  min={minDate}
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
                required
                placeholder="https://example.com/event-image.jpg"
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
              <p className="text-muted-foreground">Event Organizer</p>

              <p className="mt-1 font-medium text-foreground">
                {user?.name || "Loading..."}
              </p>

              <p className="text-muted-foreground">{user?.email || ""}</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Button
                type="reset"
                variant="outline"
                className="h-10 rounded-lg font-medium"
                onClick={() => {
                  setError("");
                }}
              >
                Cancel
              </Button>

              <Button
                type="submit"
                disabled={isPending}
                className="h-10 rounded-lg bg-emerald-600 font-semibold text-white hover:bg-emerald-700"
              >
                {isPending ? "Checking Session..." : "Publish Event"}
              </Button>
            </div>

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
  );
}
