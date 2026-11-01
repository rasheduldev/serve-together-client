
import EventDetailsDialog from "@/components/EventDetailsDialog";
import { notFound } from "next/navigation";

const UpcomingEventsDetailsPage = async ({ params }) => {
  const { id } = await params;

  let event;

  try {
    const res = await fetch(
      `http://localhost:8000/upcoming-event/${id}`,
      { cache: "no-store" }
    );

    if (!res.ok) {
      notFound();
    }

    event = await res.json();
  } catch (error) {
    console.error("Failed to fetch event:", error);
    notFound();
  }

  if (!event) {
    notFound();
  }

  return <EventDetailsDialog event={event} />;
};

export default UpcomingEventsDetailsPage;
