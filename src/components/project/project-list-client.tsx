"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { X } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import ProjectList from "@/components/project/project-list";
import ProjectListSkeleton from "@/components/project/project-list-skeleton";

import { useProjects } from "@/hooks/use-projects";
import { useDebounce } from "@/hooks/use-debounce";

import type { ProjectStatus } from "@/types/project";

import type { ProjectQueryParams } from "@/lib/project-api";

export default function ProjectListClient() {
  const router = useRouter();

  const searchParams = useSearchParams();

  const page = Number(searchParams.get("page")) || 1;

  const searchFromUrl = searchParams.get("search") ?? "";

  const statusFromUrl =
    (searchParams.get("status") as ProjectStatus | null) ?? null;

  const sortByFromUrl =
    (searchParams.get("sortBy") as ProjectQueryParams["sortBy"]) ?? "createdAt";

  const sortOrderFromUrl =
    (searchParams.get("sortOrder") as ProjectQueryParams["sortOrder"]) ??
    "desc";

  const [search, setSearch] = useState(searchFromUrl);

  const debouncedSearch = useDebounce(search, 500);

  const { data, isLoading, isError, error } = useProjects({
    page,
    limit: 10,

    search: searchFromUrl || undefined,

    status: statusFromUrl || undefined,

    sortBy: sortByFromUrl,

    sortOrder: sortOrderFromUrl,
  });

  useEffect(() => {
    setSearch(searchFromUrl);
  }, [searchFromUrl]);

  useEffect(() => {
    if (debouncedSearch === searchFromUrl) {
      return;
    }

    const params = new URLSearchParams(searchParams.toString());

    if (debouncedSearch.trim()) {
      params.set("search", debouncedSearch.trim());
    } else {
      params.delete("search");
    }

    params.set("page", "1");

    router.replace(`/manager/projects?${params.toString()}`);
  }, [debouncedSearch, router, searchFromUrl, searchParams]);

  useEffect(() => {
    if (isError) {
      toast.error(
        error instanceof Error ? error.message : "Unable to load projects.",
      );
    }
  }, [isError, error]);

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

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const [sortBy, sortOrder] = event.target.value.split(":");

    const params = new URLSearchParams(searchParams.toString());

    params.set("sortBy", sortBy);

    params.set("sortOrder", sortOrder);

    params.set("page", "1");

    router.push(`/manager/projects?${params.toString()}`);
  };

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());

    params.set("page", String(newPage));

    router.push(`/manager/projects?${params.toString()}`);
  };

  const handleClearFilters = () => {
    setSearch("");

    router.push("/manager/projects?page=1");
  };

  const hasActiveFilters = Boolean(
    searchFromUrl ||
    statusFromUrl ||
    searchParams.get("sortBy") ||
    searchParams.get("sortOrder"),
  );

  if (isLoading) {
    return <ProjectListSkeleton />;
  }

  if (isError) {
    return (
      <div className="rounded-lg border border-destructive/30 p-6 text-center">
        <p className="text-sm text-destructive">Unable to load projects.</p>
      </div>
    );
  }

  const totalProjects = data?.meta.total ?? 0;

  return (
    <div className="space-y-6">
      {/* Search + Filters */}
      <div className="flex flex-col gap-3 lg:flex-row">
        {/* Search */}
        <div className="w-full lg:max-w-sm">
          <Input
            type="search"
            placeholder="Search projects..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
        </div>

        {/* Status */}
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

        {/* Sorting */}
        <select
          value={`${sortByFromUrl}:${sortOrderFromUrl}`}
          onChange={handleSortChange}
          className="h-10 rounded-md border bg-background px-3 text-sm"
        >
          <option value="createdAt:desc">Newest First</option>

          <option value="createdAt:asc">Oldest First</option>

          <option value="name:asc">Name A-Z</option>

          <option value="name:desc">Name Z-A</option>

          <option value="updatedAt:desc">Recently Updated</option>

          <option value="startDate:asc">Start Date</option>

          <option value="endDate:asc">End Date</option>
        </select>
      </div>

      {/* Result Summary */}
      <div className="flex flex-col gap-3 rounded-lg border bg-muted/20 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-muted-foreground">
          <span className="font-semibold text-foreground">{totalProjects}</span>{" "}
          {totalProjects === 1 ? "project" : "projects"} found
        </p>

        {hasActiveFilters && (
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleClearFilters}
          >
            <X className="size-4" />
            Clear Filters
          </Button>
        )}
      </div>

      {/* Project List */}
      <ProjectList projects={data?.data ?? []} />

      {/* Pagination */}
      {data && data.meta.totalPages > 1 && (
        <div className="flex items-center justify-between gap-4">
          <Button
            type="button"
            variant="outline"
            disabled={page <= 1}
            onClick={() => handlePageChange(page - 1)}
          >
            Previous
          </Button>

          <p className="text-sm text-muted-foreground">
            Page {data.meta.page} of {data.meta.totalPages}
          </p>

          <Button
            type="button"
            variant="outline"
            disabled={page >= data.meta.totalPages}
            onClick={() => handlePageChange(page + 1)}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
}
