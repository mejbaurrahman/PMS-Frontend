"use client";

import { useState } from "react";
import { toast } from "sonner";
import type { ProjectStatus } from "@/types/project";
import ProjectList from "@/components/project/project-list";
import ProjectListSkeleton from "@/components/project/project-list-skeleton";
import { useProjects } from "@/hooks/use-projects";
import { useRouter, useSearchParams } from "next/navigation";
import { Input } from "@base-ui/react";

export default function ProjectListClient() {
  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;

    const [sortBy, sortOrder] = value.split(":");

    const params = new URLSearchParams(searchParams.toString());

    params.set("sortBy", sortBy);
    params.set("sortOrder", sortOrder);
    params.set("page", "1");

    router.push(`/manager/projects?${params.toString()}`);
  };
  const router = useRouter();
  const searchParams = useSearchParams();
  const [search, setSearch] = useState("");
  const statusFromUrl = searchParams.get("status") as ProjectStatus | null;
  const page = Number(searchParams.get("page")) || 1;
  const { data, isLoading, isError, error } = useProjects({
    page,
    limit: 10,
    status: statusFromUrl || undefined,
  });
  const sortByFromUrl = searchParams.get("sortBy") ?? "createdAt";

  const sortOrderFromUrl = searchParams.get("sortOrder") ?? "desc";
  const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;

    const params = new URLSearchParams(searchParams.toString());

    if (value) {
      params.set("status", value);
    } else {
      params.delete("status");
    }

    params.set("page", "1");

    router.push(`/manager/projects?${params.toString()}`);
  };
  if (isLoading) {
    return <ProjectListSkeleton />;
  }

  if (isError) {
    toast.error(error.message);

    return (
      <div className="rounded-lg border border-destructive/30 p-6 text-center">
        <p className="text-sm text-destructive">Unable to load projects.</p>
        <div className="flex flex-col gap-3 sm:flex-row">
          <div className="w-full sm:max-w-sm">
            <Input
              type="search"
              placeholder="Search projects..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
          </div>

          <select
            value={statusFromUrl ?? ""}
            onChange={handleStatusChange}
            className="h-10 rounded-md border bg-background px-3 text-sm"
          >
            <option value="">All Statuses</option>
            <option value="PLANNING">Planning</option>
            <option value="ACTIVE">Active</option>
            <option value="ON_HOLD">On Hold</option>
            <option value="COMPLETED">Completed</option>
            <option value="ARCHIVED">Archived</option>
          </select>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <ProjectList projects={data?.data ?? []} />

      {data && data.meta.totalPages > 1 && (
        <div className="flex items-center justify-between">
          <button
            type="button"
            disabled={page <= 1}
            onClick={() => {
              router.push(`/manager/projects?page=${page - 1}`);
            }}
            className="rounded-md border px-4 py-2 text-sm disabled:opacity-50"
          >
            Previous
          </button>

          <p className="text-sm text-muted-foreground">
            Page {data.meta.page} of {data.meta.totalPages}
          </p>

          <button
            type="button"
            disabled={page >= data.meta.totalPages}
            onClick={() => {
              router.push(`/manager/projects?page=${page + 1}`);
            }}
            className="rounded-md border px-4 py-2 text-sm disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
