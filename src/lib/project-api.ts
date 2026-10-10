import { apiFetch } from "@/lib/api";
import type { ProjectListResponse, ProjectStatus } from "@/types/project";

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
