import { ArrowRight, CirclePlus, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"

const stats = [
  { value: "120+", label: "Drives Organized", accent: false },
  { value: "4,500+", label: "Active Volunteers", accent: false },
  { value: "15", label: "Dhaka Neighborhoods", accent: false },
  { value: "100%", label: "Community Driven", accent: true },
] as const

export function Banner() {
  return (
    <section className="mx-auto max-w-7xl px-4 pt-8 sm:px-6">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-800 via-emerald-900 to-teal-950 shadow-2xl shadow-emerald-900/20 dark:from-emerald-900 dark:via-emerald-950 dark:to-teal-950">
        <div className="relative p-6 sm:p-9 lg:p-12">
          <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-10">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-4 py-2 text-sm font-medium text-emerald-100">
                <Sparkles className="size-4 text-emerald-300" />
                Uniting Communities For Local Social Action
              </span>

              <h1 className="mt-6 text-3xl font-extrabold tracking-tight text-white sm:text-4xl md:text-5xl xl:text-6xl">
                Empower Lives Through{" "}
                <span className="block bg-gradient-to-r from-emerald-300 to-emerald-400 bg-clip-text text-transparent">
                  Direct Local Action
                </span>
              </h1>

              <p className="mt-5 max-w-2xl text-base leading-relaxed text-emerald-50/80 sm:text-lg">
                Connect with volunteer drives across Mirpur, Mohammadpur,
                Dhanmondi, and Old Dhaka. Create, manage, and participate in
                social development projects that create real-world impact.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <Button
                  size="lg"
                  className="h-11 rounded-xl bg-emerald-500 px-6 text-base font-semibold text-white shadow-lg shadow-emerald-500/30 hover:bg-emerald-400"
                >
                  Explore Upcoming Events
                  <ArrowRight className="size-4" data-icon="inline-end" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="h-11 rounded-xl border-white/20 bg-white/5 px-6 text-base font-semibold text-white hover:border-white/30 hover:bg-white/10 hover:text-white dark:border-white/20 dark:bg-white/5 dark:hover:bg-white/10"
                >
                  <CirclePlus className="size-4" data-icon="inline-start" />
                  Host a Social Drive
                </Button>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-2xl border border-white/10 shadow-2xl ring-1 ring-black/20">
              <div className="aspect-[3/2] bg-[url(/images/banner.png)] bg-cover bg-center" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              <div className="absolute right-3 bottom-3 left-3 flex items-center gap-2.5 rounded-xl border border-white/10 bg-black/60 p-2.5 backdrop-blur-md sm:right-4 sm:bottom-4 sm:left-4 sm:gap-3 sm:p-3">
                <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-teal-500 text-sm font-bold text-white sm:size-10">
                  6+
                </span>
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-white">
                    Active Local Drives
                  </p>
                  <p className="truncate text-xs text-white/60">
                    Dhaka North &amp; South Zones
                  </p>
                </div>
                <span className="ml-auto shrink-0 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-2.5 py-1 text-xs font-medium text-emerald-300 sm:px-3">
                  Verified
                </span>
              </div>
            </div>
          </div>

          <div className="mt-10 grid grid-cols-2 gap-6 border-t border-white/10 pt-8 sm:mt-12 sm:grid-cols-4 sm:gap-8">
            {stats.map((stat) => (
              <div key={stat.label}>
                <div
                  className={`text-2xl font-extrabold sm:text-3xl ${
                    stat.accent ? "text-amber-400" : "text-emerald-400"
                  }`}
                >
                  {stat.value}
                </div>
                <div className="mt-1 text-sm text-emerald-50/60">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
