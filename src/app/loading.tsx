
export default function Loading() {
  return (
    <div className="min-h-screen bg-slate-50 transition-colors duration-300 dark:bg-slate-950">
      {/* Animated Top Loading Bar */}
      <div className="h-1 w-full overflow-hidden bg-slate-200 dark:bg-slate-900">
        <div className="h-full w-full origin-left scale-x-75 animate-pulse bg-emerald-500" />
      </div>

      <div className="mx-auto max-w-7xl space-y-10 px-4 py-8 sm:px-6 lg:px-8">
        {/* Banner / Header Skeleton */}
        <div className="max-w-2xl animate-pulse space-y-4">
          <div className="h-4 w-32 rounded-full bg-emerald-200 dark:bg-emerald-950/60" />
          <div className="h-10 w-3/4 rounded-xl bg-slate-200 dark:bg-slate-900" />
          <div className="h-4 w-full rounded-md bg-slate-200 dark:bg-slate-900" />
          <div className="h-4 w-2/3 rounded-md bg-slate-200 dark:bg-slate-900" />
        </div>

        {/* Category Tabs Skeleton */}
        <div className="flex animate-pulse gap-2 overflow-x-auto pb-2">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <div
              key={item}
              className="h-9 w-24 shrink-0 rounded-full bg-slate-200 dark:bg-slate-900"
            />
          ))}
        </div>

        {/* Event Cards Grid Skeleton */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <div
              key={item}
              className="animate-pulse space-y-4 overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm dark:border-slate-800/80 dark:bg-slate-900"
            >
              {/* Image Skeleton */}
              <div className="h-48 w-full rounded-xl bg-slate-200 dark:bg-slate-800" />

              {/* Title & Metadata Skeleton */}
              <div className="space-y-2">
                <div className="h-4 w-1/3 rounded-md bg-emerald-100 dark:bg-emerald-950/40" />
                <div className="h-6 w-5/6 rounded-md bg-slate-200 dark:bg-slate-800" />
              </div>

              {/* Location & Description Skeleton */}
              <div className="space-y-2 pt-2">
                <div className="h-4 w-1/2 rounded-md bg-slate-200 dark:bg-slate-800" />
                <div className="h-3 w-full rounded-md bg-slate-200 dark:bg-slate-800/60" />
                <div className="h-3 w-4/5 rounded-md bg-slate-200 dark:bg-slate-800/60" />
              </div>

              {/* Footer / Button Skeleton */}
              <div className="flex items-center justify-between border-t border-slate-100 pt-4 dark:border-slate-800/60">
                <div className="h-4 w-24 rounded-md bg-slate-200 dark:bg-slate-800" />
                <div className="h-9 w-28 rounded-xl bg-emerald-200 dark:bg-emerald-950/60" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
