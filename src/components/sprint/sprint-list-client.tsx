"use client";

import { useEffect } from "react";

import { toast } from "sonner";

import SprintList from "@/components/sprint/sprint-list";

import SprintListSkeleton from "@/components/sprint/sprint-list-skeleton";

import { useSprints } from "@/hooks/use-sprints";

export default function SprintListClient() {
  const { data, isLoading, isError, error } = useSprints();

  useEffect(() => {
    if (!isError) {
      return;
    }

    toast.error(
      error instanceof Error ? error.message : "Unable to load sprints.",
    );
  }, [isError, error]);

  if (isLoading) {
    return <SprintListSkeleton />;
  }

  if (isError) {
    return (
      <div className="rounded-lg border border-destructive/30 p-6 text-center">
        <p className="text-sm text-destructive">Unable to load sprints.</p>
      </div>
    );
  }

  return <SprintList sprints={data?.data ?? []} />;
}
