import Link from "next/link"
import { Heart } from "lucide-react"

const quickLinks = [
  { label: "Home Overview", href: "/" },
  { label: "Upcoming Volunteer Events", href: "/events" },
  { label: "Host an Event", href: "/host" },
  { label: "My Participation", href: "/participation" },
] as const

const communityHubs = [
  "Mirpur Youth Circle — Mirpur 10",
  "Dhanmondi Eco Warriors — Sector 4",
  "Mohammadpur Care Brigade",
  "Old Dhaka Relief Network",
] as const

const legalLinks = ["Privacy Policy", "Terms of Service", "Volunteer Guidelines"] as const

export function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-7xl px-4 pt-14 pb-8 sm:px-6">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link href="/" className="flex items-center gap-2.5">
              <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-500 to-emerald-700">
                <Heart className="size-4 fill-white text-white" />
              </span>
              <span className="text-lg font-extrabold text-foreground">
                ServeTogether
              </span>
            </Link>
            <p className="mt-4 max-w-[260px] text-sm leading-relaxed text-muted-foreground">
              Empowering communities across Dhaka and beyond through organized
              volunteer drives, winter distributions, environmental cleanups,
              and local support drives.
            </p>
          </div>

          <div>
            <h3 className="mb-4 text-base font-semibold text-foreground">
              Quick Navigation
            </h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-base font-semibold text-foreground">
              Community Hubs
            </h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              {communityHubs.map((hub) => (
                <li key={hub}>
                  <Link
                    href="/events"
                    className="transition-colors hover:text-foreground"
                  >
                    {hub}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-base font-semibold text-foreground">
              Platform Impact
            </h3>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Over 1,200+ warm winter blankets distributed and 45+ local park
              cleanups executed in 2026.
            </p>
            <div className="mt-4 flex gap-2">
              {["X", "FB", "IG"].map((social) => (
                <Link
                  key={social}
                  href="#"
                  aria-label={social}
                  className="flex size-9 items-center justify-center rounded-lg bg-muted text-xs font-bold text-foreground transition-colors hover:bg-accent"
                >
                  {social}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col-reverse gap-4 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-muted-foreground sm:text-sm">
            © 2026 ServeTogether Platform. Built for Social Good.
          </p>
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs text-muted-foreground sm:text-sm">
            {legalLinks.map((label) => (
              <Link
                key={label}
                href="#"
                className="transition-colors hover:text-foreground"
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
