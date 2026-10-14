import { apiFetch } from "@/lib/api";

import type {
  SprintListResponse,
  SprintResponse,
  SprintStatus,
} from "@/types/sprint";

import type {
  CreateSprintInput,
  UpdateSprintInput,
} from "@/lib/validations/sprint";

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

export function createSprint(payload: CreateSprintInput) {
  const body = {
    name: payload.name,

    description: payload.description || undefined,

    projectId: payload.projectId,

    startDate: new Date(`${payload.startDate}T00:00:00.000Z`).toISOString(),

    endDate: new Date(`${payload.endDate}T00:00:00.000Z`).toISOString(),
  };

  return apiFetch<SprintResponse>("/sprints", {
    method: "POST",

    body: JSON.stringify(body),
  });
}

export function updateSprint(sprintId: string, payload: UpdateSprintInput) {
  const body = {
    name: payload.name,

    description: payload.description || undefined,

    startDate: payload.startDate
      ? new Date(`${payload.startDate}T00:00:00.000Z`).toISOString()
      : undefined,

    endDate: payload.endDate
      ? new Date(`${payload.endDate}T00:00:00.000Z`).toISOString()
      : undefined,
  };

  return apiFetch<SprintResponse>(`/sprints/${sprintId}`, {
    method: "PATCH",

    body: JSON.stringify(body),
  });
}

export function updateSprintStatus(sprintId: string, status: SprintStatus) {
  return apiFetch<SprintResponse>(`/sprints/${sprintId}`, {
    method: "PATCH",

    body: JSON.stringify({
      status,
    }),
  });
}

export function deleteSprint(sprintId: string) {
  return apiFetch<SprintResponse>(`/sprints/${sprintId}`, {
    method: "DELETE",
  });
}
