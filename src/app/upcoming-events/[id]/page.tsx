
import EventDetailsDialog from "@/components/EventDetailsDialog";
import { notFound } from "next/navigation";

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

const UpcomingEventsDetailsPage = async ({ params }: PageProps) => {
  const { id } = await params;

  let res: Response;

  try {
    res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/upcoming-event/${id}`,
      { cache: "no-store" }
    );
  } catch (error) {
    console.error("Failed to fetch event:", error);
    throw error;
  }

  // If the event doesn't exist, show your global 404 page.
  if (res.status === 404) {
    notFound();
  }

  if (!res.ok) {
    throw new Error("Failed to load event details");
  }

  const event = await res.json();

  if (!event) {
    notFound();
  }

  return <EventDetailsDialog event={event} />;
};

export default UpcomingEventsDetailsPage;
