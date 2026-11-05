import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[80vh] items-center justify-center bg-slate-50 px-4 py-16 transition-colors duration-300 dark:bg-slate-950">
      <div className="w-full max-w-md text-center">
        {/* Decorative Badge & Icon */}
        <div className="relative mb-6 inline-block">
          <div className="mx-auto flex h-28 w-28 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 shadow-inner dark:bg-emerald-950/60 dark:text-emerald-400">
            <svg
              className="h-14 w-14"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          </div>

          <span className="absolute -right-1 -bottom-2 rounded-full bg-emerald-600 px-3 py-1 text-xs font-black text-white shadow-md">
            404
          </span>
        </div>

        {/* Text Content */}
        <h1 className="mb-3 text-3xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100">
          Oops! Page Not Found
        </h1>

        <p className="mb-8 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
          The event or page you&apos;re looking for may have been moved,
          removed, or no longer exists. Let&apos;s get you back to making a
          positive impact!
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            href="/"
            className="rounded-xl bg-emerald-600 px-6 py-2.5 text-center text-sm font-medium text-white shadow-lg shadow-emerald-600/20 transition-all hover:bg-emerald-700 active:scale-95"
          >
            Back to Home
          </Link>

          <Link
            href="/upcoming-events"
            className="rounded-xl border border-slate-300 px-6 py-2.5 text-center text-sm font-medium text-slate-700 transition-all hover:bg-slate-100 dark:border-slate-800 dark:text-slate-300 dark:hover:bg-slate-900"
          >
            Explore Events
          </Link>
        </div>
      </div>
    </div>
  );
}
