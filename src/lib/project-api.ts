import { apiFetch } from "@/lib/api";

import type { ApiResponse } from "@/types/auth";

import type {
  Project,
  ProjectListResponse,
  ProjectStatus,
} from "@/types/project";

import type {
  CreateProjectInput,
  UpdateProjectInput,
} from "@/lib/validations/project";

export interface ProjectQueryParams {
  page?: number;
  limit?: number;

  status?: ProjectStatus;

  organizationId?: string;
  teamId?: string;

  search?: string;

  sortBy?: "createdAt" | "updatedAt" | "name" | "startDate" | "endDate";

  sortOrder?: "asc" | "desc";
}

export function getProjects(params: ProjectQueryParams = {}) {
  const searchParams = new URLSearchParams();

  if (params.page) {
    searchParams.set("page", String(params.page));
  }

  if (params.limit) {
    searchParams.set("limit", String(params.limit));
  }

  if (params.status) {
    searchParams.set("status", params.status);
  }

  if (params.organizationId) {
    searchParams.set("organizationId", params.organizationId);
  }

  if (params.teamId) {
    searchParams.set("teamId", params.teamId);
  }

  if (params.search) {
    searchParams.set("search", params.search);
  }

  if (params.sortBy) {
    searchParams.set("sortBy", params.sortBy);
  }

  if (params.sortOrder) {
    searchParams.set("sortOrder", params.sortOrder);
  }

  const query = searchParams.toString();

  return apiFetch<ProjectListResponse>(`/projects${query ? `?${query}` : ""}`);
}

export function getProjectById(projectId: string) {
  return apiFetch<ApiResponse<Project>>(`/projects/${projectId}`);
}

export function createProject(payload: CreateProjectInput) {
  const body = {
    name: payload.name,

    description: payload.description || undefined,

    organizationId: payload.organizationId,

    teamId: payload.teamId,

    startDate: payload.startDate
      ? new Date(`${payload.startDate}T00:00:00.000Z`).toISOString()
      : undefined,

    endDate: payload.endDate
      ? new Date(`${payload.endDate}T00:00:00.000Z`).toISOString()
      : undefined,
  };

  return apiFetch<ApiResponse<Project>>("/projects", {
    method: "POST",
    body: JSON.stringify(body),
  });
}

export function updateProject(projectId: string, payload: UpdateProjectInput) {
  const body = {
    name: payload.name,

    description: payload.description || undefined,

    teamId: payload.teamId,

    startDate: payload.startDate
      ? new Date(`${payload.startDate}T00:00:00.000Z`).toISOString()
      : undefined,

    endDate: payload.endDate
      ? new Date(`${payload.endDate}T00:00:00.000Z`).toISOString()
      : undefined,
  };

  return apiFetch<ApiResponse<Project>>(`/projects/${projectId}`, {
    method: "PATCH",
    body: JSON.stringify(body),
  });
}

export function updateProjectStatus(projectId: string, status: ProjectStatus) {
  return apiFetch<ApiResponse<Project>>(`/projects/${projectId}/status`, {
    method: "PATCH",

    body: JSON.stringify({
      status,
    }),
  });
}

export function deleteProject(projectId: string) {
  return apiFetch<ApiResponse<Project>>(`/projects/${projectId}`, {
    method: "DELETE",
  });
}
