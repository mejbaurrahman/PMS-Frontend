"use client";

import { useEffect, useMemo, useState } from "react";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { CheckCircle2 } from "lucide-react";

import { toast } from "sonner";

import { Button } from "@/components/ui/button";

import { updateProjectStatus } from "@/lib/project-api";

import {
  getNextProjectStatuses,
  PROJECT_STATUS_LABELS,
} from "@/lib/project-status";

import type { ProjectStatus } from "@/types/project";

interface ProjectStatusControlProps {
  projectId: string;
  currentStatus: ProjectStatus;
}

export default function ProjectStatusControl({
  projectId,
  currentStatus,
}: ProjectStatusControlProps) {
  const queryClient = useQueryClient();

  const allowedStatuses = useMemo(
    () => getNextProjectStatuses(currentStatus),
    [currentStatus],
  );

  const [selectedStatus, setSelectedStatus] = useState<ProjectStatus | "">("");

  useEffect(() => {
    setSelectedStatus("");
  }, [currentStatus]);

  const mutation = useMutation({
    mutationFn: (status: ProjectStatus) =>
      updateProjectStatus(projectId, status),

    onSuccess: async (response) => {
      toast.success(response.message || "Project status updated successfully.");

      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: ["projects"],
        }),

        queryClient.invalidateQueries({
          queryKey: ["projects", projectId],
        }),
      ]);

      setSelectedStatus("");
    },

    onError: (error) => {
      toast.error(
        error instanceof Error
          ? error.message
          : "Unable to update project status.",
      );
    },
  });

  const handleUpdate = () => {
    if (!selectedStatus) {
      toast.info("Select a status first.");

      return;
    }

    mutation.mutate(selectedStatus);
  };

  if (allowedStatuses.length === 0) {
    return (
      <div className="rounded-lg border p-5">
        <div className="flex items-start gap-3">
          <CheckCircle2 className="mt-0.5 size-5 text-muted-foreground" />

          <div>
            <h2 className="font-semibold">Project Status</h2>

            <p className="mt-1 text-sm text-muted-foreground">
              This project is {PROJECT_STATUS_LABELS[currentStatus]}. No further
              status changes are available.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4 rounded-lg border p-5">
      <div>
        <h2 className="font-semibold">Update Status</h2>

        <p className="mt-1 text-sm text-muted-foreground">
          Current status:{" "}
          <span className="font-medium text-foreground">
            {PROJECT_STATUS_LABELS[currentStatus]}
          </span>
        </p>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        <select
          value={selectedStatus}
          onChange={(event) =>
            setSelectedStatus(event.target.value as ProjectStatus | "")
          }
          disabled={mutation.isPending}
          className="h-10 flex-1 rounded-md border bg-background px-3 text-sm disabled:cursor-not-allowed disabled:opacity-50"
        >
          <option value="">Select next status</option>

          {allowedStatuses.map((status) => (
            <option key={status} value={status}>
              {PROJECT_STATUS_LABELS[status]}
            </option>
          ))}
        </select>

        <Button
          type="button"
          onClick={handleUpdate}
          disabled={mutation.isPending || !selectedStatus}
        >
          {mutation.isPending ? "Updating..." : "Update Status"}
        </Button>
      </div>
    </div>
  );
}
