import Image from "next/image"
import { CalendarDays, } from "lucide-react"
import { categoryLabel, type UpcomingEvent } from "@/lib/events"
import { DeleteEventDialog } from "@/components/DeleteEventDialog"
import { EditEventDialog } from "@/components/EditEventDialog"

const ManageEventCard = ({
  event,
  onUpdated,
  onDeleted,
}: {
  event: UpcomingEvent
  onUpdated: (updatedEvent: UpcomingEvent) => void
  onDeleted: (id: string) => void
}) => {
  return (
    <article className="flex flex-col gap-4 border-b p-4 last:border-b-0 md:grid md:grid-cols-[minmax(0,2fr)_minmax(0,0.8fr)_minmax(0,0.9fr)_minmax(0,1.1fr)_auto] md:items-center md:gap-6 md:px-6">
      {/* Thumbnail + title + ID */}
      <div className="flex items-center gap-4">
        {event.thumbnail ? (
          <Image
            src={event.thumbnail}
            alt={event.title}
            loading="lazy"
            width={56}
            height={56}
            className="size-14 shrink-0 rounded-lg border border-border object-cover"
          />
        ) : (
          <div className="flex size-14 shrink-0 items-center justify-center rounded-lg border border-border bg-emerald-50 dark:bg-emerald-950">
            <CalendarDays className="size-7 text-emerald-600 dark:text-emerald-400" />
          </div>
        )}

        <div className="min-w-0">
          <h3 className="truncate text-base font-bold text-foreground">
            {event.title}
          </h3>
          <p className="mt-0.5 text-sm text-muted-foreground">ID: {event._id}</p>
        </div>
      </div>

      {/* Category */}
      <div>
        <span className="text-xs font-medium tracking-wide text-muted-foreground uppercase md:hidden">
          Category
        </span>
        <div className="mt-1 md:mt-0">
          <span className="inline-flex w-fit items-center rounded-full bg-emerald-100 px-3 py-1 text-sm font-medium text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
            {categoryLabel(event.category)}
          </span>
        </div>
      </div>

      {/* Date */}
      <div>
        <span className="text-xs font-medium tracking-wide text-muted-foreground uppercase md:hidden">
          Date
        </span>
        <p className="mt-1 text-sm font-medium text-foreground md:mt-0">
          {event.date}
        </p>
      </div>

      {/* Location */}
      <div className="min-w-0">
        <span className="text-xs font-medium tracking-wide text-muted-foreground uppercase md:hidden">
          Location
        </span>
        <p className="mt-1 truncate text-sm text-muted-foreground md:mt-0">
          {event.location}
        </p>
      </div>

      {/* Actions */}
<div className="flex gap-2 md:justify-self-end">
  <EditEventDialog event={event} onUpdated={onUpdated} />

  <DeleteEventDialog
    id={event._id}
    title={event.title}
    onDeleted={onDeleted}
  />
</div>
    </article>
  )
}

export default ManageEventCard
