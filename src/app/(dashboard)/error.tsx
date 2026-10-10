"use client";

import { Button } from "@/components/ui/button";

export default function DashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="flex min-h-screen items-center justify-center px-6">
      <div className="max-w-md text-center">
        <p className="text-sm font-medium text-destructive">
          Something went wrong
        </p>

        <h1 className="mt-2 text-3xl font-bold">Dashboard error</h1>

        <p className="mt-3 text-muted-foreground">
          {error.message || "Unable to load this page."}
        </p>

        <Button type="button" className="mt-6" onClick={reset}>
          Try again
        </Button>
      </div>
    </main>
  );
}
