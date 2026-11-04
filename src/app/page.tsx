import { Banner } from "@/components/banner"
import Feature from "@/components/Feature";
import { Newsletter } from "@/components/newsletter"

export default function Home() {
  return (
    <>
      <main className="flex-1">
        <Banner />
        <Feature/>
        <Newsletter />
      </main>
    </>
  );
}
