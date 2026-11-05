import { Banner } from "@/components/banner"
import Feature from "@/components/Feature";
import Gallery from "@/components/Gallery";
import { Newsletter } from "@/components/newsletter"
import RecentUpcomingEvents from "@/components/RecentUpcomingEvents";

export default function Home() {
  return (
    <>
      <main className="flex-1">
        <Banner />
        <Feature/>
        <RecentUpcomingEvents/>
        <Gallery/>
        <Newsletter />
      </main>
    </>
  );
}
