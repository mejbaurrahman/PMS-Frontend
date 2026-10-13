import type { ProjectStatus } from "@/types/project";

export const PROJECT_STATUS_LABELS: Record<ProjectStatus, string> = {
  PLANNING: "Planning",
  ACTIVE: "Active",
  ON_HOLD: "On Hold",
  COMPLETED: "Completed",
  ARCHIVED: "Archived",
};

export const PROJECT_STATUS_TRANSITIONS: Record<
  ProjectStatus,
  ProjectStatus[]
> = {
  PLANNING: ["ACTIVE", "ARCHIVED"],

  ACTIVE: ["ON_HOLD", "COMPLETED", "ARCHIVED"],

  ON_HOLD: ["ACTIVE", "ARCHIVED"],

  COMPLETED: ["ARCHIVED"],

  ARCHIVED: [],
};

export function getNextProjectStatuses(currentStatus: ProjectStatus) {
  return PROJECT_STATUS_TRANSITIONS[currentStatus];
}
