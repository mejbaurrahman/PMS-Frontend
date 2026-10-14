import { apiFetch } from "@/lib/api";

import type {
  SprintListResponse,
  SprintResponse,
  SprintStatus,
} from "@/types/sprint";

export interface SprintQueryParams {
  projectId?: string;

  status?: SprintStatus;
}

export function getSprints(params: SprintQueryParams = {}) {
  const searchParams = new URLSearchParams();

  if (params.projectId) {
    searchParams.set("projectId", params.projectId);
  }

  if (params.status) {
    searchParams.set("status", params.status);
  }

  const query = searchParams.toString();

  return apiFetch<SprintListResponse>(`/sprints${query ? `?${query}` : ""}`);
}

export function getSprintById(sprintId: string) {
  return apiFetch<SprintResponse>(`/sprints/${sprintId}`);
}
