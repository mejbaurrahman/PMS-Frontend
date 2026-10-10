"use client";

import { Button } from "@/components/ui/button";

export default function GlobalError({
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
          Application Error
        </p>

        <h1 className="mt-2 text-3xl font-bold">Something went wrong</h1>

        <p className="mt-3 text-muted-foreground">
          {error.message || "An unexpected error occurred."}
        </p>

        <Button type="button" className="mt-6" onClick={reset}>
          Try Again
        </Button>
      </div>
    </main>
  );
}
