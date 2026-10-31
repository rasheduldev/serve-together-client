import { Navbar } from "@/components/navbar"
import { Banner } from "@/components/banner"

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <Banner />
      </main>
    </>
  );
}
