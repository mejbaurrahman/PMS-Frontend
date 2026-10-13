import { Skeleton } from "@/components/ui/skeleton";

export default function ProjectListSkeleton() {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {Array.from({
        length: 6,
      }).map((_, index) => (
        <div key={index} className="rounded-lg border p-5">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 space-y-3">
              <Skeleton className="h-6 w-2/3" />

              <Skeleton className="h-4 w-full" />

              <Skeleton className="h-4 w-3/4" />
            </div>

            <Skeleton className="h-6 w-20" />
          </div>

          <div className="mt-5 space-y-3">
            <Skeleton className="h-4 w-4/5" />

            <Skeleton className="h-4 w-3/5" />
          </div>

          <div className="mt-5 grid grid-cols-2 gap-3">
            <Skeleton className="h-16 w-full" />

            <Skeleton className="h-16 w-full" />
          </div>

          <div className="mt-5 border-t pt-4">
            <Skeleton className="h-4 w-2/3" />
          </div>
        </div>
      ))}
    </div>
  );
}
