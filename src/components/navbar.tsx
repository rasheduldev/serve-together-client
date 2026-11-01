"use client"

import { useState, useSyncExternalStore } from "react"
import Link from "next/link"
import { Calendar, Heart, Menu, Moon, Sun, X } from "lucide-react"
import { Button } from "@/components/ui/button"

const subscribe = (onChange: () => void) => {
  window.addEventListener("theme-change", onChange)
  return () => window.removeEventListener("theme-change", onChange)
}

export function Navbar() {
  const dark = useSyncExternalStore(
    subscribe,
    () => document.documentElement.classList.contains("dark"),
    () => false
  )
  const [menuOpen, setMenuOpen] = useState(false)

  const toggleTheme = () => {
    const next = !document.documentElement.classList.contains("dark")
    document.documentElement.classList.toggle("dark", next)
    try {
      localStorage.setItem("theme", next ? "dark" : "light")
    } catch {}
    window.dispatchEvent(new Event("theme-change"))
  }

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 shadow-[0_2px_8px_-2px_rgba(0,0,0,0.08)] backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-3">
          <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-700 shadow-lg shadow-emerald-500/30 sm:size-10">
            <Heart className="size-4 fill-white text-white sm:size-5" />
          </span>
          <span className="flex flex-col leading-tight">
            <span className="bg-gradient-to-r from-emerald-600 to-emerald-500 bg-clip-text text-lg font-extrabold text-transparent sm:text-xl">
              ServeTogether
            </span>
            <span className="hidden text-[10px] font-medium tracking-[0.18em] text-muted-foreground uppercase sm:block">
              Social Impact Platform
            </span>
          </span>
        </Link>

        <nav className="hidden md:block">
          <Link
            href="/upcoming-events"
            className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-emerald-50 hover:text-emerald-700 dark:hover:bg-emerald-950 dark:hover:text-emerald-300"
          >
            <Calendar className="size-4" />
            Upcoming Events
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon-lg"
            aria-label={
              dark ? "Switch to light mode" : "Switch to dark mode"
            }
            onClick={toggleTheme}
          >
            {dark ? (
              <Sun className="size-4 text-amber-400" />
            ) : (
              <Moon className="size-4" />
            )}
          </Button>
          <Button
            variant="ghost"
            className="hidden px-3 font-semibold md:inline-flex"
          >
            Log In
          </Button>
          <Button className="hidden bg-emerald-600 font-semibold text-white shadow-sm hover:bg-emerald-700 sm:inline-flex">
            Register
          </Button>
          <Button
            variant="outline"
            size="icon-lg"
            className="md:hidden"
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((o) => !o)}
          >
            {menuOpen ? (
              <X className="size-4" />
            ) : (
              <Menu className="size-4" />
            )}
          </Button>
        </div>
      </div>

      {menuOpen && (
        <div className="border-t border-border bg-background p-4 shadow-lg md:hidden">
          <nav className="flex flex-col gap-2">
            <Link
              href="/events"
              onClick={() => setMenuOpen(false)}
              className="inline-flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-emerald-50 hover:text-emerald-700 dark:hover:bg-emerald-950 dark:hover:text-emerald-300"
            >
              <Calendar className="size-4" />
              Upcoming Events
            </Link>
            <Button variant="ghost" className="justify-start px-3 font-semibold">
              Log In
            </Button>
            <Button className="justify-start bg-emerald-600 font-semibold text-white hover:bg-emerald-700">
              Register
            </Button>
          </nav>
        </div>
      )}
    </header>
  )
}
