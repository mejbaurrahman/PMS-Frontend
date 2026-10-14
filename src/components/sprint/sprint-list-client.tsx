"use client";

import { useEffect } from "react";

import { useRouter, useSearchParams } from "next/navigation";

import { Filter, X } from "lucide-react";

import { toast } from "sonner";

import { Button } from "@/components/ui/button";

import SprintList from "@/components/sprint/sprint-list";

import SprintListSkeleton from "@/components/sprint/sprint-list-skeleton";

import { useSprints } from "@/hooks/use-sprints";

import { useProjects } from "@/hooks/use-projects";

import type { SprintStatus } from "@/types/sprint";

export default function SprintListClient() {
  const router = useRouter();

  const searchParams = useSearchParams();

  const projectId = searchParams.get("projectId") ?? "";

  const status = (searchParams.get("status") as SprintStatus | null) ?? null;

  const { data, isLoading, isFetching, isError, error } = useSprints({
    projectId: projectId || undefined,

    status: status || undefined,
  });

  const { data: projectResponse, isLoading: projectsLoading } = useProjects({
    page: 1,
    limit: 100,
    sortBy: "name",
    sortOrder: "asc",
  });

  useEffect(() => {
    if (!isError) {
      return;
    }

    toast.error(
      error instanceof Error ? error.message : "Unable to load sprints.",
    );
  }, [isError, error]);

  const handleProjectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;

    const params = new URLSearchParams(searchParams.toString());

    if (value) {
      params.set("projectId", value);
    } else {
      params.delete("projectId");
    }

    router.push(
      `/manager/sprints${params.toString() ? `?${params.toString()}` : ""}`,
    );
  };

  const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;

    const params = new URLSearchParams(searchParams.toString());

    if (value) {
      params.set("status", value);
    } else {
      params.delete("status");
    }

    router.push(
      `/manager/sprints${params.toString() ? `?${params.toString()}` : ""}`,
    );
  };

  const handleClearFilters = () => {
    router.push("/manager/sprints");
  };

  const hasActiveFilters = Boolean(projectId || status);

  if (isLoading || projectsLoading) {
    return <SprintListSkeleton />;
  }

  if (isError) {
    return (
      <div className="rounded-lg border border-destructive/30 p-6 text-center">
        <p className="text-sm text-destructive">Unable to load sprints.</p>
      </div>
    );
  }

  const projects = projectResponse?.data ?? [];

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="rounded-lg border p-4">
        <div className="mb-4 flex items-center gap-2">
          <Filter className="size-4 text-muted-foreground" />

          <h2 className="text-sm font-semibold">Sprint Filters</h2>
        </div>

        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-[minmax(0,1fr)_220px_auto]">
          {/* Project */}
          <select
            value={projectId}
            onChange={handleProjectChange}
            disabled={isFetching}
            className="h-10 w-full rounded-md border bg-background px-3 text-sm disabled:cursor-not-allowed disabled:opacity-50"
          >
            <option value="">All Projects</option>

            {projects.map((project) => (
              <option key={project.id} value={project.id}>
                {project.name}
              </option>
            ))}
          </select>

          {/* Status */}
          <select
            value={status ?? ""}
            onChange={handleStatusChange}
            disabled={isFetching}
            className="h-10 w-full rounded-md border bg-background px-3 text-sm disabled:cursor-not-allowed disabled:opacity-50"
          >
            <option value="">All Statuses</option>

            <option value="PLANNED">Planned</option>

            <option value="ACTIVE">Active</option>

            <option value="COMPLETED">Completed</option>

            <option value="CANCELLED">Cancelled</option>
          </select>

          {/* Clear */}
          <Button
            type="button"
            variant="outline"
            disabled={!hasActiveFilters || isFetching}
            onClick={handleClearFilters}
          >
            <X className="size-4" />
            Clear
          </Button>
        </div>
      </div>

      {/* Result info */}
      <div className="flex items-center justify-between rounded-lg border bg-muted/20 px-4 py-3">
        <p className="text-sm text-muted-foreground">
          <span className="font-semibold text-foreground">
            {data?.data.length ?? 0}
          </span>{" "}
          {(data?.data.length ?? 0) === 1 ? "sprint" : "sprints"} found
        </p>

        {isFetching && (
          <p className="text-sm text-muted-foreground">Updating...</p>
        )}
      </div>

      {/* Sprint List */}
      <div
        className={
          isFetching ? "opacity-60 transition-opacity" : "transition-opacity"
        }
      >
        <SprintList sprints={data?.data ?? []} />
      </div>
    </div>
  );
}
