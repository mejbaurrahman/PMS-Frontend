"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Loader2, Search, SlidersHorizontal, X } from "lucide-react";
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

  const { data, isLoading, isFetching, isError, error } = useProjects({
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

    const cleanSearch = debouncedSearch.trim();

    if (cleanSearch) {
      params.set("search", cleanSearch);
    } else {
      params.delete("search");
    }

    params.set("page", "1");

    router.replace(`/manager/projects?${params.toString()}`);
  }, [debouncedSearch, router, searchFromUrl, searchParams]);

  useEffect(() => {
    if (!isError) {
      return;
    }

    toast.error(
      error instanceof Error ? error.message : "Unable to load projects.",
    );
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
      {/* Toolbar */}
      <div className="rounded-lg border p-4">
        <div className="mb-4 flex items-center gap-2">
          <SlidersHorizontal className="size-4 text-muted-foreground" />

          <h2 className="text-sm font-semibold">Search & Filters</h2>
        </div>

        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-[minmax(0,1fr)_180px_200px_auto]">
          {/* Search */}
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

            <Input
              type="search"
              placeholder="Search projects..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              className="pl-9"
            />
          </div>

          {/* Status */}
          <select
            value={statusFromUrl ?? ""}
            onChange={handleStatusChange}
            disabled={isFetching}
            className="h-10 w-full rounded-md border bg-background px-3 text-sm disabled:cursor-not-allowed disabled:opacity-50"
          >
            <option value="">All Statuses</option>

            <option value="PLANNING">Planning</option>

            <option value="ACTIVE">Active</option>

            <option value="ON_HOLD">On Hold</option>

            <option value="COMPLETED">Completed</option>

            <option value="ARCHIVED">Archived</option>
          </select>

          {/* Sort */}
          <select
            value={`${sortByFromUrl}:${sortOrderFromUrl}`}
            onChange={handleSortChange}
            disabled={isFetching}
            className="h-10 w-full rounded-md border bg-background px-3 text-sm disabled:cursor-not-allowed disabled:opacity-50"
          >
            <option value="createdAt:desc">Newest First</option>

            <option value="createdAt:asc">Oldest First</option>

            <option value="name:asc">Name A-Z</option>

            <option value="name:desc">Name Z-A</option>

            <option value="updatedAt:desc">Recently Updated</option>

            <option value="startDate:asc">Start Date</option>

            <option value="endDate:asc">End Date</option>
          </select>

          {/* Clear */}
          <Button
            type="button"
            variant="outline"
            disabled={!hasActiveFilters || isFetching}
            onClick={handleClearFilters}
            className="w-full xl:w-auto"
          >
            <X className="size-4" />
            Clear
          </Button>
        </div>
      </div>

      {/* Result Summary */}
      <div className="flex flex-col gap-3 rounded-lg border bg-muted/20 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-muted-foreground">
          <span className="font-semibold text-foreground">{totalProjects}</span>{" "}
          {totalProjects === 1 ? "project" : "projects"} found
        </p>

        {isFetching && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Loader2 className="size-4 animate-spin" />
            Updating results...
          </div>
        )}
      </div>

      {/* Results */}
      <div
        className={
          isFetching ? "opacity-60 transition-opacity" : "transition-opacity"
        }
      >
        <ProjectList projects={data?.data ?? []} />
      </div>

      {/* Pagination */}
      {data && data.meta.totalPages > 1 && (
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <Button
            type="button"
            variant="outline"
            disabled={page <= 1 || isFetching}
            onClick={() => handlePageChange(page - 1)}
          >
            Previous
          </Button>

          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              Page{" "}
              <span className="font-medium text-foreground">
                {data.meta.page}
              </span>{" "}
              of{" "}
              <span className="font-medium text-foreground">
                {data.meta.totalPages}
              </span>
            </p>
          </div>

          <Button
            type="button"
            variant="outline"
            disabled={page >= data.meta.totalPages || isFetching}
            onClick={() => handlePageChange(page + 1)}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
}
