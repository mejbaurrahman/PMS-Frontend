"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import { toast } from "sonner";

import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";

import { useProjects } from "@/hooks/use-projects";

import { createSprint } from "@/lib/sprint-api";

import {
  createSprintSchema,
  type CreateSprintInput,
} from "@/lib/validations/sprint";

export default function CreateSprintForm() {
  const router = useRouter();

  const queryClient = useQueryClient();

  const {
    data: projectResponse,
    isLoading: projectsLoading,
    isError: projectsError,
  } = useProjects({
    page: 1,
    limit: 100,
    sortBy: "name",
    sortOrder: "asc",
  });

  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm<CreateSprintInput>({
    resolver: zodResolver(createSprintSchema),

    defaultValues: {
      name: "",
      description: "",
      projectId: "",
      startDate: "",
      endDate: "",
    },
  });

  const createMutation = useMutation({
    mutationFn: createSprint,

    onSuccess: async (response) => {
      toast.success(response.message || "Sprint created successfully.");

      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: ["sprints"],
        }),

        queryClient.invalidateQueries({
          queryKey: ["projects"],
        }),
      ]);

      router.push(`/manager/sprints/${response.data.id}`);
    },

    onError: (error) => {
      toast.error(
        error instanceof Error ? error.message : "Unable to create sprint.",
      );
    },
  });

  const projects = projectResponse?.data ?? [];

  const onSubmit = (values: CreateSprintInput) => {
    createMutation.mutate(values);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Sprint Name */}
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
          placeholder="Write a short sprint description..."
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
        <label htmlFor="projectId" className="text-sm font-medium">
          Project
        </label>

        <select
          id="projectId"
          {...register("projectId")}
          disabled={projectsLoading}
          className="h-10 w-full rounded-md border bg-background px-3 text-sm disabled:cursor-not-allowed disabled:opacity-50"
        >
          <option value="">
            {projectsLoading ? "Loading projects..." : "Select project"}
          </option>

          {projects.map((project) => (
            <option key={project.id} value={project.id}>
              {project.name}
            </option>
          ))}
        </select>

        {projectsError && (
          <p className="text-sm text-destructive">Unable to load projects.</p>
        )}

        {errors.projectId && (
          <p className="text-sm text-destructive">{errors.projectId.message}</p>
        )}
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
          render={<Link href="/manager/sprints" />}
          variant="outline"
        >
          Cancel
        </Button>

        <Button
          type="submit"
          disabled={createMutation.isPending || projectsLoading}
        >
          {createMutation.isPending ? "Creating..." : "Create Sprint"}
        </Button>
      </div>
    </form>
  );
}
