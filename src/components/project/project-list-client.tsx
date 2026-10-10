"use client";

import { toast } from "sonner";

import ProjectList from "@/components/project/project-list";
import ProjectListSkeleton from "@/components/project/project-list-skeleton";
import { useProjects } from "@/hooks/use-projects";

export default function ProjectListClient() {
  const { data, isLoading, isError, error } = useProjects({
    page: 1,
    limit: 10,
  });

  if (isLoading) {
    return <ProjectListSkeleton />;
  }

  if (isError) {
    toast.error(error.message);

    return (
      <div className="rounded-lg border border-destructive/30 p-6 text-center">
        <p className="text-sm text-destructive">Unable to load projects.</p>
      </div>
    );
  }

  return <ProjectList projects={data?.data ?? []} />;
}
