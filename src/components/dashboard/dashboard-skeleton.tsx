import { Skeleton } from "@/components/ui/skeleton";

export default function DashboardSkeleton() {
  return (
    <div className="flex min-h-screen">
      <aside className="hidden w-64 border-r p-4 md:block">
        <Skeleton className="mb-6 h-8 w-24" />

        <div className="space-y-3">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
        </div>
      </aside>

      <div className="flex flex-1 flex-col">
        <header className="flex h-16 items-center justify-between border-b px-6">
          <Skeleton className="h-6 w-40" />
          <Skeleton className="h-9 w-28" />
        </header>

        <main className="grid gap-4 p-6 md:grid-cols-2 lg:grid-cols-4">
          <Skeleton className="h-28 w-full" />
          <Skeleton className="h-28 w-full" />
          <Skeleton className="h-28 w-full" />
          <Skeleton className="h-28 w-full" />
        </main>
      </div>
    </div>
  );
}
