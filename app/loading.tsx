export default function Loading() {
  return (
    <div className="space-y-6">
      {/* Alert Banner Skeleton */}
      <div className="w-full h-16 rounded-2xl bg-zinc-900/40 border border-zinc-900/50 animate-pulse flex items-center justify-between p-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-zinc-800/60" />
          <div className="space-y-1.5">
            <div className="w-32 h-4 rounded-md bg-zinc-800/60" />
            <div className="w-48 h-3 rounded-md bg-zinc-850" />
          </div>
        </div>
        <div className="hidden sm:block w-36 h-7 rounded-lg bg-zinc-850" />
      </div>

      {/* Bento Grid Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 auto-rows-[auto]">
        {/* Hero Card Skeleton */}
        <div className="col-span-1 md:col-span-2 lg:col-span-3 min-h-[220px] rounded-2xl bg-zinc-900/35 border border-zinc-900/50 p-6 flex flex-col justify-between animate-pulse">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="space-y-3 w-full">
              <div className="w-24 h-4 rounded-full bg-zinc-850" />
              <div className="w-2/3 h-8 rounded-lg bg-zinc-800/70" />
              <div className="w-1/2 h-4 rounded-md bg-zinc-850" />
            </div>
            <div className="w-32 h-14 rounded-2xl bg-zinc-850" />
          </div>
          <div className="mt-8 pt-5 border-t border-zinc-900/50 flex flex-col sm:flex-row justify-between gap-6">
            <div className="space-y-2">
              <div className="w-32 h-3 rounded bg-zinc-850" />
              <div className="flex gap-2">
                {Array.from({ length: 7 }).map((_, i) => (
                  <div key={i} className="w-8 h-8 rounded-lg bg-zinc-850" />
                ))}
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-20 h-8 rounded bg-zinc-850" />
              <div className="w-20 h-8 rounded bg-zinc-850" />
            </div>
          </div>
        </div>

        {/* 4 Course Card Skeletons */}
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="col-span-1 min-h-[175px] rounded-2xl bg-zinc-900/35 border border-zinc-900/50 p-5 flex flex-col justify-between animate-pulse"
          >
            <div className="flex items-start justify-between">
              <div className="w-10 h-10 rounded-xl bg-zinc-800/60" />
              <div className="w-14 h-3 rounded bg-zinc-850" />
            </div>
            <div className="space-y-2 my-4">
              <div className="w-full h-4 rounded bg-zinc-800/70" />
              <div className="w-5/6 h-4 rounded bg-zinc-850" />
            </div>
            <div className="space-y-2 mt-auto">
              <div className="flex justify-between">
                <div className="w-10 h-2.5 rounded bg-zinc-850" />
                <div className="w-8 h-2.5 rounded bg-zinc-850" />
              </div>
              <div className="w-full h-1.5 rounded-full bg-zinc-900/80 p-[0.5px]">
                <div className="w-1/3 h-full rounded-full bg-zinc-800" />
              </div>
            </div>
          </div>
        ))}

        {/* Activity Card Skeleton */}
        <div className="col-span-1 md:col-span-2 lg:col-span-2 min-h-[300px] rounded-2xl bg-zinc-900/35 border border-zinc-900/50 p-6 flex flex-col justify-between animate-pulse">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-zinc-800/60" />
              <div className="space-y-1">
                <div className="w-28 h-4 rounded bg-zinc-800/75" />
                <div className="w-40 h-3 rounded bg-zinc-850" />
              </div>
            </div>
            <div className="w-20 h-6 rounded bg-zinc-850" />
          </div>
          <div className="w-48 h-4 rounded bg-zinc-850/60 mx-auto my-6" />
          <div className="p-3 bg-zinc-950/40 rounded-xl border border-zinc-900/50 h-28 flex flex-col justify-between">
            <div className="grid grid-cols-20 gap-1 h-12 w-full">
              {Array.from({ length: 140 }).map((_, i) => (
                <div key={i} className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-[2px] bg-zinc-850" />
              ))}
            </div>
            <div className="flex justify-end gap-1 items-center">
              <div className="w-6 h-2 rounded bg-zinc-850" />
              <div className="w-2 h-2 rounded bg-zinc-800" />
              <div className="w-2 h-2 rounded bg-zinc-850" />
              <span className="w-6 h-2 rounded bg-zinc-850" />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-2 mt-4 text-center">
            <div className="h-10 rounded bg-zinc-900/50 border border-zinc-900/50" />
            <div className="h-10 rounded bg-zinc-900/50 border border-zinc-900/50" />
            <div className="h-10 rounded bg-zinc-900/50 border border-zinc-900/50" />
          </div>
        </div>
      </div>
    </div>
  );
}
