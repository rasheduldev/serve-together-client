"use client"

import type { FormEvent } from "react"
import { Button } from "@/components/ui/button"

export function Newsletter() {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    e.currentTarget.reset()
  }

  return (
    <section className="bg-gradient-to-b from-transparent to-sky-50 dark:to-sky-950/40">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
        <div className="flex flex-col gap-8 rounded-3xl bg-emerald-600 p-8 shadow-xl sm:p-10 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-xl">
            <h2 className="text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
              Stay Updated on Local Volunteer Drives
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-emerald-50/90 sm:text-base">
              Subscribe to receive instant notifications whenever a new
              distribution or cleanup event is scheduled near you.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="flex w-full flex-col gap-3 sm:flex-row lg:w-auto lg:shrink-0"
          >
            <label htmlFor="newsletter-email" className="sr-only">
              Email address
            </label>
            <input
              id="newsletter-email"
              name="email"
              type="email"
              required
              autoComplete="email"
              placeholder="Enter your email address..."
              className="h-12 w-full rounded-lg bg-white px-4 text-sm text-slate-900 placeholder:text-slate-400 outline-none focus:ring-2 focus:ring-white/70 sm:w-72"
            />
            <Button
              type="submit"
              className="h-12 rounded-lg bg-slate-900 px-6 text-sm font-semibold text-white hover:bg-slate-800"
            >
              Subscribe Now
            </Button>
          </form>
        </div>
      </div>
    </section>
  )
}
