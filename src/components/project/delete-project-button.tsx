"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { Trash2, X } from "lucide-react";

import { toast } from "sonner";

import { Button } from "@/components/ui/button";

import { deleteProject } from "@/lib/project-api";

interface DeleteProjectButtonProps {
  projectId: string;
  projectName: string;
}

export default function DeleteProjectButton({
  projectId,
  projectName,
}: DeleteProjectButtonProps) {
  const router = useRouter();

  const queryClient = useQueryClient();

  const [showConfirm, setShowConfirm] = useState(false);

  const deleteMutation = useMutation({
    mutationFn: () => deleteProject(projectId),

    onSuccess: async (response) => {
      toast.success(response.message || "Project deleted successfully.");

      await queryClient.invalidateQueries({
        queryKey: ["projects"],
      });

      queryClient.removeQueries({
        queryKey: ["projects", projectId],
      });

      router.push("/manager/projects");
    },

    onError: (error) => {
      toast.error(
        error instanceof Error ? error.message : "Unable to delete project.",
      );
    },
  });

  const handleDelete = () => {
    deleteMutation.mutate();
  };

  if (!showConfirm) {
    return (
      <Button
        type="button"
        variant="destructive"
        onClick={() => setShowConfirm(true)}
      >
        <Trash2 className="size-4" />
        Delete Project
      </Button>
    );
  }

  return (
    <div className="rounded-lg border border-destructive/30 bg-destructive/5 p-4">
      <div className="space-y-2">
        <h3 className="font-semibold text-destructive">Delete project?</h3>

        <p className="text-sm text-muted-foreground">
          Are you sure you want to delete{" "}
          <span className="font-medium text-foreground">{projectName}</span>?
        </p>

        <p className="text-xs text-muted-foreground">
          This project will no longer appear in the active project list.
        </p>
      </div>

      <div className="mt-4 flex flex-wrap gap-3">
        <Button
          type="button"
          variant="destructive"
          disabled={deleteMutation.isPending}
          onClick={handleDelete}
        >
          <Trash2 className="size-4" />

          {deleteMutation.isPending ? "Deleting..." : "Yes, Delete"}
        </Button>

        <Button
          type="button"
          variant="outline"
          disabled={deleteMutation.isPending}
          onClick={() => setShowConfirm(false)}
        >
          <X className="size-4" />
          Cancel
        </Button>
      </div>
    </div>
  );
}
