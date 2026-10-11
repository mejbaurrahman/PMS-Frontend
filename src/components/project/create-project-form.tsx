"use client";

import Link from "next/link";
import { useMemo } from "react";
import { useRouter } from "next/navigation";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useForm, useWatch } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { createProject } from "@/lib/project-api";

import {
  createProjectSchema,
  type CreateProjectInput,
} from "@/lib/validations/project";

import { useOrganizations } from "@/hooks/use-organizations";

import { useTeams } from "@/hooks/use-teams";

export default function CreateProjectForm() {
  const router = useRouter();

  const queryClient = useQueryClient();

  const {
    data: organizationResponse,
    isLoading: organizationsLoading,
    isError: organizationsError,
  } = useOrganizations();

  const {
    data: teamResponse,
    isLoading: teamsLoading,
    isError: teamsError,
  } = useTeams();

  const {
    register,
    handleSubmit,
    control,
    setValue,

    formState: { errors },
  } = useForm<CreateProjectInput>({
    resolver: zodResolver(createProjectSchema),

    defaultValues: {
      name: "",
      description: "",
      organizationId: "",
      teamId: "",
      startDate: "",
      endDate: "",
    },
  });

  const selectedOrganizationId = useWatch({
    control,
    name: "organizationId",
  });

  const organizations = organizationResponse?.data ?? [];

  const teams = teamResponse?.data ?? [];

  const filteredTeams = useMemo(() => {
    if (!selectedOrganizationId) {
      return [];
    }

    return teams.filter(
      (team) => team.organizationId === selectedOrganizationId,
    );
  }, [teams, selectedOrganizationId]);

  const createMutation = useMutation({
    mutationFn: createProject,

    onSuccess: async (response) => {
      toast.success(response.message || "Project created successfully.");

      await queryClient.invalidateQueries({
        queryKey: ["projects"],
      });

      router.push(`/manager/projects/${response.data.id}`);
    },

    onError: (error) => {
      toast.error(
        error instanceof Error ? error.message : "Unable to create project.",
      );
    },
  });

  const onSubmit = (values: CreateProjectInput) => {
    createMutation.mutate(values);
  };

  const handleOrganizationChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const organizationId = event.target.value;

    setValue("organizationId", organizationId, {
      shouldValidate: true,
    });

    // Reset team whenever organization changes.
    setValue("teamId", "", {
      shouldValidate: true,
    });
  };

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
          placeholder="Write a short project description..."
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
        <label htmlFor="organizationId" className="text-sm font-medium">
          Organization
        </label>

        <select
          id="organizationId"
          {...register("organizationId")}
          onChange={handleOrganizationChange}
          disabled={organizationsLoading}
          className="h-10 w-full rounded-md border bg-background px-3 text-sm disabled:cursor-not-allowed disabled:opacity-50"
        >
          <option value="">
            {organizationsLoading
              ? "Loading organizations..."
              : "Select organization"}
          </option>

          {organizations.map((organization) => (
            <option key={organization.id} value={organization.id}>
              {organization.name}
            </option>
          ))}
        </select>

        {organizationsError && (
          <p className="text-sm text-destructive">
            Unable to load organizations.
          </p>
        )}

        {errors.organizationId && (
          <p className="text-sm text-destructive">
            {errors.organizationId.message}
          </p>
        )}
      </div>

      {/* Team */}
      <div className="space-y-2">
        <label htmlFor="teamId" className="text-sm font-medium">
          Team
        </label>

        <select
          id="teamId"
          {...register("teamId")}
          disabled={!selectedOrganizationId || teamsLoading}
          className="h-10 w-full rounded-md border bg-background px-3 text-sm disabled:cursor-not-allowed disabled:opacity-50"
        >
          <option value="">
            {!selectedOrganizationId
              ? "Select organization first"
              : teamsLoading
                ? "Loading teams..."
                : "Select team"}
          </option>

          {filteredTeams.map((team) => (
            <option key={team.id} value={team.id}>
              {team.name}
            </option>
          ))}
        </select>

        {teamsError && (
          <p className="text-sm text-destructive">Unable to load teams.</p>
        )}

        {selectedOrganizationId &&
          !teamsLoading &&
          filteredTeams.length === 0 && (
            <p className="text-sm text-muted-foreground">
              No teams found for this organization.
            </p>
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
          render={<Link href="/manager/projects" />}
          variant="outline"
        >
          Cancel
        </Button>

        <Button
          type="submit"
          disabled={
            createMutation.isPending || organizationsLoading || teamsLoading
          }
        >
          {createMutation.isPending ? "Creating..." : "Create Project"}
        </Button>
      </div>
    </form>
  );
}
