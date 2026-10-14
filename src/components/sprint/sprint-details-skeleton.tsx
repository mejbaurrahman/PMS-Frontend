import { Skeleton } from "@/components/ui/skeleton";

export default function SprintDetailsSkeleton() {
  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between gap-3">
        <Skeleton className="h-10 w-36" />

        <Skeleton className="h-7 w-24" />
      </div>

      <div className="space-y-3">
        <Skeleton className="h-9 w-64" />

        <Skeleton className="h-4 w-full max-w-xl" />

        <Skeleton className="h-4 w-3/4 max-w-lg" />
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {Array.from({
          length: 3,
        }).map((_, index) => (
          <div key={index} className="rounded-lg border p-5">
            <Skeleton className="h-4 w-24" />

            <Skeleton className="mt-3 h-6 w-32" />
          </div>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-lg border p-5">
          <Skeleton className="h-4 w-24" />

          <Skeleton className="mt-3 h-6 w-32" />
        </div>

        <div className="rounded-lg border p-5">
          <Skeleton className="h-4 w-24" />

          <Skeleton className="mt-3 h-6 w-32" />
        </div>
      </div>
    </section>
  );
}
