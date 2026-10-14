"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { Trash2, X } from "lucide-react";

import { toast } from "sonner";

import { Button } from "@/components/ui/button";

import { deleteSprint } from "@/lib/sprint-api";

interface DeleteSprintButtonProps {
  sprintId: string;

  sprintName: string;
}

export default function DeleteSprintButton({
  sprintId,
  sprintName,
}: DeleteSprintButtonProps) {
  const router = useRouter();

  const queryClient = useQueryClient();

  const [showConfirmation, setShowConfirmation] = useState(false);

  const mutation = useMutation({
    mutationFn: () => deleteSprint(sprintId),

    onSuccess: async (response) => {
      toast.success(response.message || "Sprint deleted successfully.");

      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: ["sprints"],
        }),

        queryClient.invalidateQueries({
          queryKey: ["projects"],
        }),
      ]);

      queryClient.removeQueries({
        queryKey: ["sprints", sprintId],
      });

      router.push("/manager/sprints");
    },

    onError: (error) => {
      toast.error(
        error instanceof Error ? error.message : "Unable to delete sprint.",
      );
    },
  });

  if (!showConfirmation) {
    return (
      <Button
        type="button"
        variant="destructive"
        onClick={() => setShowConfirmation(true)}
      >
        <Trash2 className="size-4" />
        Delete Sprint
      </Button>
    );
  }

  return (
    <div className="rounded-lg border border-destructive/30 bg-destructive/5 p-4">
      <div>
        <h3 className="font-semibold text-destructive">Delete Sprint?</h3>

        <p className="mt-2 text-sm text-muted-foreground">
          Are you sure you want to delete{" "}
          <span className="font-medium text-foreground">{sprintName}</span>?
        </p>

        <p className="mt-2 text-xs text-muted-foreground">
          Make sure this sprint is no longer needed before continuing.
        </p>
      </div>

      <div className="mt-4 flex flex-wrap gap-3">
        <Button
          type="button"
          variant="destructive"
          disabled={mutation.isPending}
          onClick={() => mutation.mutate()}
        >
          <Trash2 className="size-4" />

          {mutation.isPending ? "Deleting..." : "Yes, Delete"}
        </Button>

        <Button
          type="button"
          variant="outline"
          disabled={mutation.isPending}
          onClick={() => setShowConfirmation(false)}
        >
          <X className="size-4" />
          Cancel
        </Button>
      </div>
    </div>
  );
}
