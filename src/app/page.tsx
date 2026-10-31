import { Banner } from "@/components/banner"
import { Newsletter } from "@/components/newsletter"

export default function Home() {
  return (
    <>
      <main className="flex-1">
        <Banner />
        <Newsletter />
      </main>
    </>
  );
}
