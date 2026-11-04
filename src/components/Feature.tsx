import { CalendarDays, CircleCheck, CirclePlus } from "lucide-react"

const features = [
  {
    icon: CalendarDays,
    iconColor: "text-emerald-600",
    iconBg: "bg-emerald-100",
    title: "Discover Verified Drives",
    description:
      "Find upcoming winter clothes distributions, food drives, and environmental campaigns happening near your area.",
  },
  {
    icon: CirclePlus,
    iconColor: "text-emerald-600",
    iconBg: "bg-emerald-100",
    title: "Host Your Initiative",
    description:
      "Easily create social events, specify dates, locations, and volunteer capacity to mobilize citizens instantly.",
  },
  {
    icon: CircleCheck,
    iconColor: "text-indigo-600",
    iconBg: "bg-indigo-100",
    title: "Track & Manage Impact",
    description:
      "Manage event rosters, update schedules, and track joined volunteers through a sleek personalized dashboard.",
  },
] as const

const Feature = () => {
  return (
    <section className="bg-gray-50 py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="text-center">
          <span className="text-sm font-bold tracking-widest text-emerald-600 uppercase">
            How It Works
          </span>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Built for Community Leaders &amp; Volunteers
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-gray-600 sm:text-lg">
            Everything you need to plan, host, and track social welfare drives
            in your neighborhood.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:mt-16 lg:grid-cols-3 lg:gap-8">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="rounded-2xl bg-white p-8 shadow-lg shadow-gray-200/60"
            >
              <span
                className={`flex size-14 items-center justify-center rounded-2xl ${feature.iconBg}`}
              >
                <feature.icon className={`size-6 ${feature.iconColor}`} />
              </span>
              <h3 className="mt-6 text-xl font-bold text-gray-900">
                {feature.title}
              </h3>
              <p className="mt-3 text-base leading-relaxed text-gray-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Feature
