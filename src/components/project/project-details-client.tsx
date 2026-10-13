"use client";

import Link from "next/link";

import { ArrowLeft, Pencil } from "lucide-react";

import { Button } from "@/components/ui/button";

import DeleteProjectButton from "@/components/project/delete-project-button";

import ProjectListSkeleton from "@/components/project/project-list-skeleton";

import ProjectStatusBadge from "@/components/project/project-status-badge";

import ProjectStatusControl from "@/components/project/project-status-control";

import { useProject } from "@/hooks/use-project";

import { useAuth } from "@/hooks/use-auth";

import {
  canDeleteProject,
  canEditProject,
  canUpdateProjectStatus,
} from "@/lib/permissions";

interface ProjectDetailsClientProps {
  projectId: string;
}

export default function ProjectDetailsClient({
  projectId,
}: ProjectDetailsClientProps) {
  const { data, isLoading, isError, error } = useProject(projectId);

  const { data: authResponse, isLoading: authLoading } = useAuth();

  if (isLoading || authLoading) {
    return <ProjectListSkeleton />;
  }

  if (isError || !data?.data) {
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

        <div className="rounded-lg border border-destructive/30 p-6 text-center">
          <p className="text-sm text-destructive">
            {error instanceof Error ? error.message : "Unable to load project."}
          </p>
        </div>
      </div>
    );
  }

  const project = data.data;

  const userRole = authResponse?.data?.role;

  const canEdit = canEditProject(userRole);

  const canDelete = canDeleteProject(userRole);

  const canChangeStatus = canUpdateProjectStatus(userRole);

  return (
    <section className="space-y-6">
      {/* Top Actions */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Button
          nativeButton={false}
          render={<Link href="/manager/projects" />}
          variant="outline"
        >
          <ArrowLeft className="size-4" />
          Back to Projects
        </Button>

        {canEdit && (
          <Button
            nativeButton={false}
            render={<Link href={`/manager/projects/${project.id}/edit`} />}
          >
            <Pencil className="size-4" />
            Edit Project
          </Button>
        )}
      </div>

      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold">{project.name}</h1>

          <p className="mt-2 max-w-2xl text-muted-foreground">
            {project.description || "No description available."}
          </p>
        </div>

        <ProjectStatusBadge status={project.status} />
      </div>

      {/* Information */}
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-lg border p-5">
          <p className="text-sm text-muted-foreground">Organization</p>

          <p className="mt-1 font-medium">
            {project.organization?.name || "Not available"}
          </p>
        </div>

        <div className="rounded-lg border p-5">
          <p className="text-sm text-muted-foreground">Team</p>

          <p className="mt-1 font-medium">
            {project.team?.name || "Not available"}
          </p>
        </div>

        <div className="rounded-lg border p-5">
          <p className="text-sm text-muted-foreground">Tasks</p>

          <p className="mt-1 font-medium">{project._count?.tasks ?? 0}</p>
        </div>

        <div className="rounded-lg border p-5">
          <p className="text-sm text-muted-foreground">Status</p>

          <div className="mt-2">
            <ProjectStatusBadge status={project.status} />
          </div>
        </div>
      </div>

      {/* Dates */}
      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-lg border p-5">
          <p className="text-sm text-muted-foreground">Start Date</p>

          <p className="mt-1 font-medium">
            {project.startDate
              ? new Date(project.startDate).toLocaleDateString()
              : "Not set"}
          </p>
        </div>

        <div className="rounded-lg border p-5">
          <p className="text-sm text-muted-foreground">End Date</p>

          <p className="mt-1 font-medium">
            {project.endDate
              ? new Date(project.endDate).toLocaleDateString()
              : "Not set"}
          </p>
        </div>
      </div>

      {/* Status Management */}
      {canChangeStatus && (
        <ProjectStatusControl
          projectId={project.id}
          currentStatus={project.status}
        />
      )}

      {/* Read-only Message */}
      {!canEdit && !canChangeStatus && !canDelete && (
        <div className="rounded-lg border bg-muted/30 p-5">
          <p className="font-medium">Read-only access</p>

          <p className="mt-1 text-sm text-muted-foreground">
            You can view this project, but you do not have permission to manage
            it.
          </p>
        </div>
      )}

      {/* Danger Zone */}
      {canDelete && (
        <div className="space-y-4 rounded-lg border border-destructive/30 p-5">
          <div>
            <h2 className="font-semibold text-destructive">Danger Zone</h2>

            <p className="mt-1 text-sm text-muted-foreground">
              Delete this project from the active project list.
            </p>
          </div>

          <DeleteProjectButton
            projectId={project.id}
            projectName={project.name}
          />
        </div>
      )}
    </section>
  );
}
