"use client";

import Link from "next/link";
import { useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import { toast } from "sonner";

import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";

import { useProject } from "@/hooks/use-project";

import { useTeams } from "@/hooks/use-teams";

import { updateProject } from "@/lib/project-api";

import {
  updateProjectSchema,
  type UpdateProjectInput,
} from "@/lib/validations/project";

interface EditProjectFormProps {
  projectId: string;
}

function formatDateForInput(value: string | null) {
  if (!value) {
    return "";
  }

  return value.slice(0, 10);
}

export default function EditProjectForm({ projectId }: EditProjectFormProps) {
  const router = useRouter();

  const queryClient = useQueryClient();

  const {
    data: projectResponse,
    isLoading: projectLoading,
    isError: projectError,
    error: projectErrorData,
  } = useProject(projectId);

  const {
    data: teamResponse,
    isLoading: teamsLoading,
    isError: teamsError,
  } = useTeams();

  const {
    register,
    handleSubmit,
    reset,

    formState: { errors },
  } = useForm<UpdateProjectInput>({
    resolver: zodResolver(updateProjectSchema),

    defaultValues: {
      name: "",
      description: "",
      teamId: "",
      startDate: "",
      endDate: "",
    },
  });

  const project = projectResponse?.data;

  const teams = teamResponse?.data ?? [];

  const filteredTeams = useMemo(() => {
    if (!project) {
      return [];
    }

    return teams.filter(
      (team) => team.organizationId === project.organizationId,
    );
  }, [teams, project]);

  useEffect(() => {
    if (!project) {
      return;
    }

    reset({
      name: project.name,

      description: project.description ?? "",

      teamId: project.teamId,

      startDate: formatDateForInput(project.startDate),

      endDate: formatDateForInput(project.endDate),
    });
  }, [project, reset]);

  const updateMutation = useMutation({
    mutationFn: (values: UpdateProjectInput) =>
      updateProject(projectId, values),

    onSuccess: async (response) => {
      toast.success(response.message || "Project updated successfully.");

      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: ["projects"],
        }),

        queryClient.invalidateQueries({
          queryKey: ["projects", projectId],
        }),
      ]);

      router.push(`/manager/projects/${projectId}`);
    },

    onError: (error) => {
      toast.error(
        error instanceof Error ? error.message : "Unable to update project.",
      );
    },
  });

  const onSubmit = (values: UpdateProjectInput) => {
    updateMutation.mutate(values);
  };

  if (projectLoading || teamsLoading) {
    return (
      <div className="rounded-lg border p-6">
        <p className="text-sm text-muted-foreground">Loading project...</p>
      </div>
    );
  }

  if (projectError || !project) {
    return (
      <div className="rounded-lg border border-destructive/30 p-6">
        <p className="text-sm text-destructive">
          {projectErrorData instanceof Error
            ? projectErrorData.message
            : "Unable to load project."}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Project Name */}
      <div className="space-y-2">
        <label htmlFor="name" className="text-sm font-medium">
          Project Name
        </label>

        <Input
          id="name"
          placeholder="Enter project name"
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
          placeholder="Project description"
          {...register("description")}
          className="flex w-full rounded-md border bg-background px-3 py-2 text-sm outline-none placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring"
        />

        {errors.description && (
          <p className="text-sm text-destructive">
            {errors.description.message}
          </p>
        )}
      </div>

      {/* Organization */}
      <div className="space-y-2">
        <label className="text-sm font-medium">Organization</label>

        <div className="rounded-md border bg-muted/40 px-3 py-2 text-sm">
          {project.organization?.name || project.organizationId}
        </div>

        <p className="text-xs text-muted-foreground">
          Organization cannot be changed from this form.
        </p>
      </div>

      {/* Team */}
      <div className="space-y-2">
        <label htmlFor="teamId" className="text-sm font-medium">
          Team
        </label>

        <select
          id="teamId"
          {...register("teamId")}
          className="h-10 w-full rounded-md border bg-background px-3 text-sm"
        >
          <option value="">Select team</option>

          {filteredTeams.map((team) => (
            <option key={team.id} value={team.id}>
              {team.name}
            </option>
          ))}
        </select>

        {teamsError && (
          <p className="text-sm text-destructive">Unable to load teams.</p>
        )}

        {errors.teamId && (
          <p className="text-sm text-destructive">{errors.teamId.message}</p>
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
          render={<Link href={`/manager/projects/${projectId}`} />}
          variant="outline"
        >
          Cancel
        </Button>

        <Button type="submit" disabled={updateMutation.isPending}>
          {updateMutation.isPending ? "Saving..." : "Save Changes"}
        </Button>
      </div>
    </form>
  );
}
