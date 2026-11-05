import { Calendar, MapPin, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { categoryLabel, type UpcomingEvent } from "@/lib/events";
import Link from "next/link";
import Image from "next/image";

const UpcomingEventsCard = ({ event }: { event: UpcomingEvent }) => {
  return (
    <article className="group overflow-hidden rounded-2xl border border-border bg-card shadow-[0_2px_12px_-4px_rgba(15,23,42,0.1)] transition-shadow duration-300 hover:shadow-[0_10px_30px_-8px_rgba(15,23,42,0.18)]">
      <div className="relative h-48 overflow-hidden">
        {event.thumbnail ? (
          <Image
            src={event.thumbnail}
            alt={event.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-linear-to-br from-emerald-100 to-emerald-200 dark:from-emerald-950 dark:to-emerald-900">
            <Calendar className="size-10 text-emerald-600 dark:text-emerald-400" />
          </div>
        )}

        <span className="absolute top-3 left-3 rounded-lg bg-emerald-600 px-3 py-1 text-xs font-semibold text-white shadow-sm">
          {categoryLabel(event.category)}
        </span>

        <div className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-3 bg-black/60 px-4 py-2 text-xs font-medium text-white backdrop-blur-sm sm:text-sm">
          <span className="flex items-center gap-2">
            <Calendar className="size-4 text-emerald-400" />
            {event.date}
          </span>
          {typeof event.volunteers === "number" && (
            <span className="flex items-center gap-2">
              <Users className="size-4 text-emerald-400" />
              {event.volunteers} Volunteers
            </span>
          )}
        </div>
      </div>

      <div className="p-5">
        <h3 className="truncate text-lg font-bold text-foreground">
          {event.title}
        </h3>
        <p className="mt-2 flex items-center gap-1.5 text-sm text-muted-foreground">
          <MapPin className="size-4 shrink-0 text-emerald-600 dark:text-emerald-400" />
          <span className="truncate">{event.location}</span>
        </p>
        <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
          {event.description}
        </p>
        <Link href={`/upcoming-events/${event._id}`}>
          <Button
            variant="outline"
            className="mt-4 h-10 w-full rounded-lg font-semibold"
          >
            View Event
          </Button>
        </Link>
      </div>
    </article>
  );
};

export default UpcomingEventsCard;
