import { Navbar } from "@/components/navbar"
import { Banner } from "@/components/banner"
import { Newsletter } from "@/components/newsletter"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <Banner />
        <Newsletter />
      </main>
      <Footer />
    </>
  );
}
