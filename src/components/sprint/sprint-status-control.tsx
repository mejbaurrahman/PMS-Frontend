"use client";

import { useEffect, useState } from "react";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { toast } from "sonner";

import { Button } from "@/components/ui/button";

import { updateSprintStatus } from "@/lib/sprint-api";

import type { SprintStatus } from "@/types/sprint";

interface SprintStatusControlProps {
  sprintId: string;

  currentStatus: SprintStatus;
}

const STATUS_OPTIONS: {
  value: SprintStatus;
  label: string;
}[] = [
  {
    value: "PLANNED",
    label: "Planned",
  },

  {
    value: "ACTIVE",
    label: "Active",
  },

  {
    value: "COMPLETED",
    label: "Completed",
  },

  {
    value: "CANCELLED",
    label: "Cancelled",
  },
];

export default function SprintStatusControl({
  sprintId,
  currentStatus,
}: SprintStatusControlProps) {
  const queryClient = useQueryClient();

  const [selectedStatus, setSelectedStatus] =
    useState<SprintStatus>(currentStatus);

  useEffect(() => {
    setSelectedStatus(currentStatus);
  }, [currentStatus]);

  const mutation = useMutation({
    mutationFn: (status: SprintStatus) => updateSprintStatus(sprintId, status),

    onSuccess: async (response) => {
      toast.success(response.message || "Sprint status updated successfully.");

      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: ["sprints"],
        }),

        queryClient.invalidateQueries({
          queryKey: ["sprints", sprintId],
        }),
      ]);
    },

    onError: (error) => {
      setSelectedStatus(currentStatus);

      toast.error(
        error instanceof Error
          ? error.message
          : "Unable to update sprint status.",
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
    <div className="space-y-4 rounded-lg border p-5">
      <div>
        <h2 className="font-semibold">Update Sprint Status</h2>

        <p className="mt-1 text-sm text-muted-foreground">
          Change the current lifecycle status of this sprint.
        </p>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        <select
          value={selectedStatus}
          onChange={(event) =>
            setSelectedStatus(event.target.value as SprintStatus)
          }
          disabled={mutation.isPending}
          className="h-10 flex-1 rounded-md border bg-background px-3 text-sm disabled:cursor-not-allowed disabled:opacity-50"
        >
          {STATUS_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
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
