import { Skeleton } from "@/components/ui/skeleton";

export default function ProjectDetailsSkeleton() {
  return (
    <section className="space-y-6">
      {/* Top Actions */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Skeleton className="h-10 w-36" />

        <Skeleton className="h-10 w-32" />
      </div>

      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="space-y-3">
          <Skeleton className="h-9 w-64" />

          <Skeleton className="h-4 w-full max-w-xl" />

          <Skeleton className="h-4 w-4/5 max-w-lg" />
        </div>

        <Skeleton className="h-7 w-24" />
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {Array.from({
          length: 4,
        }).map((_, index) => (
          <div key={index} className="rounded-lg border p-5">
            <Skeleton className="h-4 w-24" />

            <Skeleton className="mt-3 h-6 w-32" />
          </div>
        ))}
      </div>

      {/* Dates */}
      <div className="grid gap-4 md:grid-cols-2">
        {Array.from({
          length: 2,
        }).map((_, index) => (
          <div key={index} className="rounded-lg border p-5">
            <Skeleton className="h-4 w-24" />

            <Skeleton className="mt-3 h-6 w-32" />
          </div>
        ))}
      </div>

      {/* Status */}
      <div className="rounded-lg border p-5">
        <Skeleton className="h-5 w-32" />

        <Skeleton className="mt-3 h-4 w-48" />

        <div className="mt-4 flex flex-col gap-3 sm:flex-row">
          <Skeleton className="h-10 flex-1" />

          <Skeleton className="h-10 w-32" />
        </div>
      </div>

      {/* Danger Zone */}
      <div className="rounded-lg border p-5">
        <Skeleton className="h-5 w-28" />

        <Skeleton className="mt-3 h-4 w-64" />

        <Skeleton className="mt-4 h-10 w-36" />
      </div>
    </section>
  );
}
