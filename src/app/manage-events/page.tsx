import Link from "next/link"
import { CirclePlus } from "lucide-react"
import { Button } from "@/components/ui/button"
import ManageEventsList from "@/components/ManageEventsList"
import type { UpcomingEvent } from "@/lib/events"

// Sample data — replace with a fetch to the manage-events API later.
const sampleEvents: UpcomingEvent[] = [
  {
    _id: "evt-1793681784902",
    title: "Green Dhaka Initiative – 500 Sapling Plantation Campaign",
    category: "plantation",
    location: "Dhanmondi Lake & Walkway Corridor, Dhaka",
    date: "2026-11-27",
    description: "Plant 500 saplings around Dhanmondi Lake with volunteers.",
  },
  {
    _id: "evt-1793681784903",
    title: "Winter Blanket Distribution Drive",
    category: "winter-relief",
    location: "Mirpur 10 Rotary intersection, Dhaka",
    date: "2026-12-15",
    description: "Hand out blankets and warm clothes before the cold peaks.",
    thumbnail:
      "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=400&q=80",
  },
  {
    _id: "evt-1793681784904",
    title: "Community Food Pack – Ramadan Meal Boxes",
    category: "food-drive",
    location: "Mohammadpur Town Hall, Dhaka",
    date: "2026-11-20",
    description: "Pack and distribute meal boxes to 300 families in need.",
    thumbnail:
      "https://images.unsplash.com/photo-1593134257782-e89567b7718a?w=400&q=80",
  },
  {
    _id: "evt-1793681784905",
    title: "Free Health Check-up Camp",
    category: "health",
    location: "Uttara Sector 7 Community Center, Dhaka",
    date: "2026-12-05",
    description: "Basic health screening and medicine for low-income residents.",
  },
  {
    _id: "evt-1793681784906",
    title: "Weekend Book & Stationery Drive for Kids",
    category: "education",
    location: "Shyamoli Ideal School Ground, Dhaka",
    date: "2026-11-30",
    description: "Collect and hand out books and stationery to students.",
  },
]

const ManageEventsPage = () => {
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

        <ManageEventsList events={sampleEvents} />
      </section>
    </main>
  )
}

export default ManageEventsPage
