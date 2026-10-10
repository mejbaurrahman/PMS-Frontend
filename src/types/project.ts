export type ProjectStatus =
  | "PLANNING"
  | "ACTIVE"
  | "ON_HOLD"
  | "COMPLETED"
  | "CANCELLED";

export interface Project {
  id: string;
  name: string;
  description: string | null;
  status: ProjectStatus;

  organizationId: string;
  teamId: string;

  startDate: string | null;
  endDate: string | null;

  createdAt: string;
  updatedAt: string;
}
