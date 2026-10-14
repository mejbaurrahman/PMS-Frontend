export type SprintStatus = "PLANNED" | "ACTIVE" | "COMPLETED" | "CANCELLED";

export interface SprintProject {
  id: string;

  name: string;

  status: string;

  organizationId: string;

  teamId: string;
}

export interface SprintCount {
  tasks: number;
}

export interface Sprint {
  id: string;

  name: string;

  description: string | null;

  status: SprintStatus;

  projectId: string;

  startDate: string | null;

  endDate: string | null;

  createdAt: string;

  updatedAt: string;

  project?: SprintProject;

  _count?: SprintCount;
}

export interface SprintListResponse {
  success: boolean;

  statusCode: number;

  message: string;

  data: Sprint[];
}

export interface SprintResponse {
  success: boolean;

  statusCode: number;

  message: string;

  data: Sprint;
}
