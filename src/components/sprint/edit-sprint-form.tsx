"use client";

import Link from "next/link";

import { useEffect } from "react";

import { useRouter } from "next/navigation";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import { toast } from "sonner";

import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";

import { useSprint } from "@/hooks/use-sprint";

import { updateSprint } from "@/lib/sprint-api";

import {
  updateSprintSchema,
  type UpdateSprintInput,
} from "@/lib/validations/sprint";

interface EditSprintFormProps {
  sprintId: string;
}

function formatDateForInput(value: string | null) {
  if (!value) {
    return "";
  }

  return value.slice(0, 10);
}

export default function EditSprintForm({ sprintId }: EditSprintFormProps) {
  const router = useRouter();

  const queryClient = useQueryClient();

  const { data, isLoading, isError, error } = useSprint(sprintId);

  const {
    register,
    handleSubmit,
    reset,

    formState: { errors },
  } = useForm<UpdateSprintInput>({
    resolver: zodResolver(updateSprintSchema),

    defaultValues: {
      name: "",
      description: "",
      startDate: "",
      endDate: "",
    },
  });

  const sprint = data?.data;

  useEffect(() => {
    if (!sprint) {
      return;
    }

    reset({
      name: sprint.name,

      description: sprint.description ?? "",

      startDate: formatDateForInput(sprint.startDate),

      endDate: formatDateForInput(sprint.endDate),
    });
  }, [sprint, reset]);

  const mutation = useMutation({
    mutationFn: (values: UpdateSprintInput) => updateSprint(sprintId, values),

    onSuccess: async (response) => {
      toast.success(response.message || "Sprint updated successfully.");

      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: ["sprints"],
        }),

        queryClient.invalidateQueries({
          queryKey: ["sprints", sprintId],
        }),
      ]);

      router.push(`/manager/sprints/${sprintId}`);
    },

    onError: (mutationError) => {
      toast.error(
        mutationError instanceof Error
          ? mutationError.message
          : "Unable to update sprint.",
      );
    },
  });

  const onSubmit = (values: UpdateSprintInput) => {
    mutation.mutate(values);
  };

  if (isLoading) {
    return (
      <div className="rounded-lg border p-6">
        <p className="text-sm text-muted-foreground">Loading sprint...</p>
      </div>
    );
  }

  if (isError || !sprint) {
    return (
      <div className="rounded-lg border border-destructive/30 p-6">
        <p className="text-sm text-destructive">
          {error instanceof Error ? error.message : "Unable to load sprint."}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Name */}
      <div className="space-y-2">
        <label htmlFor="name" className="text-sm font-medium">
          Sprint Name
        </label>

        <Input
          id="name"
          placeholder="Enter sprint name"
          {...register("name")}
        />

        {errors.name && (
          <p className="text-sm text-destructive">{errors.name.message}</p>
        )}
      </div>

      {/* Description */}
      <div className="space-y-2">
        <label htmlFor="description" className="text-sm font-medium">
          Description
        </label>

        <textarea
          id="description"
          rows={5}
          placeholder="Sprint description"
          {...register("description")}
          className="flex w-full rounded-md border bg-background px-3 py-2 text-sm outline-none placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring"
        />

        {errors.description && (
          <p className="text-sm text-destructive">
            {errors.description.message}
          </p>
        )}
      </div>

      {/* Project */}
      <div className="space-y-2">
        <label className="text-sm font-medium">Project</label>

        <div className="rounded-md border bg-muted/40 px-3 py-2 text-sm">
          {sprint.project?.name || sprint.projectId}
        </div>

        <p className="text-xs text-muted-foreground">
          The Sprint remains attached to its current project.
        </p>
      </div>

      {/* Dates */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <label htmlFor="startDate" className="text-sm font-medium">
            Start Date
          </label>

          <Input id="startDate" type="date" {...register("startDate")} />

          {errors.startDate && (
            <p className="text-sm text-destructive">
              {errors.startDate.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <label htmlFor="endDate" className="text-sm font-medium">
            End Date
          </label>

          <Input id="endDate" type="date" {...register("endDate")} />

          {errors.endDate && (
            <p className="text-sm text-destructive">{errors.endDate.message}</p>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
        <Button
          nativeButton={false}
          render={<Link href={`/manager/sprints/${sprintId}`} />}
          variant="outline"
        >
          Cancel
        </Button>

        <Button type="submit" disabled={mutation.isPending}>
          {mutation.isPending ? "Saving..." : "Save Changes"}
        </Button>
      </div>
    </form>
  );
}
