"use client";

import { useState } from "react";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { toast } from "sonner";

import { Button } from "@/components/ui/button";

import { updateProjectStatus } from "@/lib/project-api";

import type { ProjectStatus } from "@/types/project";

interface ProjectStatusControlProps {
  projectId: string;
  currentStatus: ProjectStatus;
}

const STATUS_OPTIONS: {
  value: ProjectStatus;
  label: string;
}[] = [
  {
    value: "PLANNING",
    label: "Planning",
  },
  {
    value: "ACTIVE",
    label: "Active",
  },
  {
    value: "ON_HOLD",
    label: "On Hold",
  },
  {
    value: "COMPLETED",
    label: "Completed",
  },
  {
    value: "ARCHIVED",
    label: "Archived",
  },
];

export default function ProjectStatusControl({
  projectId,
  currentStatus,
}: ProjectStatusControlProps) {
  const queryClient = useQueryClient();

  const [selectedStatus, setSelectedStatus] =
    useState<ProjectStatus>(currentStatus);

  const mutation = useMutation({
    mutationFn: (status: ProjectStatus) =>
      updateProjectStatus(projectId, status),

    onSuccess: async (response) => {
      toast.success(response.message || "Project status updated.");

      await queryClient.invalidateQueries({
        queryKey: ["projects"],
      });

      await queryClient.invalidateQueries({
        queryKey: ["projects", projectId],
      });
    },

    onError: (error) => {
      setSelectedStatus(currentStatus);

      toast.error(
        error instanceof Error
          ? error.message
          : "Unable to update project status.",
      );
    },
  });

  const handleUpdate = () => {
    if (selectedStatus === currentStatus) {
      toast.info("Select a different status first.");

      return;
    }

    mutation.mutate(selectedStatus);
  };

  return (
    <div className="space-y-3 rounded-lg border p-5">
      <div>
        <h2 className="font-semibold">Update Status</h2>

        <p className="mt-1 text-sm text-muted-foreground">
          Change the current project status.
        </p>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        <select
          value={selectedStatus}
          onChange={(event) =>
            setSelectedStatus(event.target.value as ProjectStatus)
          }
          disabled={mutation.isPending}
          className="h-10 flex-1 rounded-md border bg-background px-3 text-sm disabled:cursor-not-allowed disabled:opacity-50"
        >
          {STATUS_OPTIONS.map((status) => (
            <option key={status.value} value={status.value}>
              {status.label}
            </option>
          ))}
        </select>

        <Button
          type="button"
          onClick={handleUpdate}
          disabled={mutation.isPending || selectedStatus === currentStatus}
        >
          {mutation.isPending ? "Updating..." : "Update Status"}
        </Button>
      </div>
    </div>
  );
}
