"use client";

import Link from "next/link";

import {
  ArrowLeft,
  CalendarDays,
  FolderKanban,
  ListTodo,
  Pencil,
} from "lucide-react";

import { Button } from "@/components/ui/button";

import SprintDetailsSkeleton from "@/components/sprint/sprint-details-skeleton";

import SprintStatusBadge from "@/components/sprint/sprint-status-badge";

import SprintStatusControl from "@/components/sprint/sprint-status-control";

import { useSprint } from "@/hooks/use-sprint";

import { useAuth } from "@/hooks/use-auth";

import { canManageProjects } from "@/lib/permissions";

interface SprintDetailsClientProps {
  sprintId: string;
}

function formatDate(date: string | null) {
  if (!date) {
    return "Not set";
  }

  return new Date(date).toLocaleDateString();
}

export default function SprintDetailsClient({
  sprintId,
}: SprintDetailsClientProps) {
  const { data, isLoading, isError, error, refetch } = useSprint(sprintId);

  const { data: authResponse, isLoading: authLoading } = useAuth();

  if (isLoading || authLoading) {
    return <SprintDetailsSkeleton />;
  }

  if (isError || !data?.data) {
    return (
      <div className="space-y-4">
        <Button
          nativeButton={false}
          render={<Link href="/manager/sprints" />}
          variant="outline"
        >
          <ArrowLeft className="size-4" />
          Back to Sprints
        </Button>

        <div className="rounded-lg border border-destructive/30 p-8 text-center">
          <h2 className="font-semibold">Sprint unavailable</h2>

          <p className="mt-2 text-sm text-muted-foreground">
            {error instanceof Error ? error.message : "Unable to load sprint."}
          </p>

          <Button
            type="button"
            variant="outline"
            onClick={() => {
              void refetch();
            }}
            className="mt-5"
          >
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  const sprint = data.data;

  const userRole = authResponse?.data?.role;

  const canManage = canManageProjects(userRole);

  return (
    <section className="space-y-6">
      {/* Navigation */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Button
          nativeButton={false}
          render={<Link href="/manager/sprints" />}
          variant="outline"
        >
          <ArrowLeft className="size-4" />
          Back to Sprints
        </Button>

        {canManage && (
          <Button
            nativeButton={false}
            render={<Link href={`/manager/sprints/${sprint.id}/edit`} />}
          >
            <Pencil className="size-4" />
            Edit Sprint
          </Button>
        )}
      </div>

      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold">{sprint.name}</h1>

          <p className="mt-2 max-w-2xl text-muted-foreground">
            {sprint.description || "No description available."}
          </p>
        </div>

        <SprintStatusBadge status={sprint.status} />
      </div>

      {/* Summary */}
      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-lg border p-5">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <FolderKanban className="size-4" />
            Project
          </div>

          <p className="mt-2 font-medium">
            {sprint.project?.name || "Not available"}
          </p>
        </div>

        <div className="rounded-lg border p-5">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <ListTodo className="size-4" />
            Tasks
          </div>

          <p className="mt-2 text-xl font-semibold">
            {sprint._count?.tasks ?? 0}
          </p>
        </div>

        <div className="rounded-lg border p-5">
          <p className="text-sm text-muted-foreground">Status</p>

          <div className="mt-2">
            <SprintStatusBadge status={sprint.status} />
          </div>
        </div>
      </div>

      {/* Dates */}
      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-lg border p-5">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <CalendarDays className="size-4" />
            Start Date
          </div>

          <p className="mt-2 font-medium">{formatDate(sprint.startDate)}</p>
        </div>

        <div className="rounded-lg border p-5">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <CalendarDays className="size-4" />
            End Date
          </div>

          <p className="mt-2 font-medium">{formatDate(sprint.endDate)}</p>
        </div>
      </div>

      {/* Status Management */}
      {canManage && (
        <SprintStatusControl
          sprintId={sprint.id}
          currentStatus={sprint.status}
        />
      )}

      {/* Read-only */}
      {!canManage && (
        <div className="rounded-lg border bg-muted/30 p-5">
          <p className="font-medium">Read-only access</p>

          <p className="mt-1 text-sm text-muted-foreground">
            You can view this Sprint, but you do not have permission to manage
            it.
          </p>
        </div>
      )}
    </section>
  );
}
