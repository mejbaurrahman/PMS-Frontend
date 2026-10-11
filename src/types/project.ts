export type ProjectStatus =
  | "PLANNING"
  | "ACTIVE"
  | "ON_HOLD"
  | "COMPLETED"
  | "ARCHIVED";

export interface ProjectOrganization {
  id: string;
  name: string;
}

export interface ProjectTeam {
  id: string;
  name: string;
}

export interface ProjectCount {
  tasks: number;
  sprints?: number;
}

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

  organization?: ProjectOrganization;
  team?: ProjectTeam;

  _count?: ProjectCount;
}

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface ProjectListResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: Project[];
  meta: PaginationMeta;
}
