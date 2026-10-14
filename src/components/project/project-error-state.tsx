"use client";

import Link from "next/link";
import { ArrowLeft, RefreshCcw } from "lucide-react";

import { Button } from "@/components/ui/button";

interface ProjectErrorStateProps {
  message?: string;
  onRetry?: () => void;
}

export default function ProjectErrorState({
  message = "Unable to load project.",
  onRetry,
}: ProjectErrorStateProps) {
  return (
    <div className="space-y-4">
      <Button
        nativeButton={false}
        render={<Link href="/manager/projects" />}
        variant="outline"
      >
        <ArrowLeft className="size-4" />
        Back to Projects
      </Button>

      <div className="rounded-lg border border-destructive/30 p-8 text-center">
        <h2 className="text-lg font-semibold">Project unavailable</h2>

        <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
          {message}
        </p>

        {onRetry && (
          <Button
            type="button"
            variant="outline"
            onClick={onRetry}
            className="mt-5"
          >
            <RefreshCcw className="size-4" />
            Try Again
          </Button>
        )}
      </div>
    </div>
  );
}
