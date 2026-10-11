export type OrganizationRole = "OWNER" | "MANAGER" | "MEMBER";

export interface Organization {
  id: string;
  name: string;
  description?: string | null;

  createdAt?: string;
  updatedAt?: string;
}

export interface OrganizationListResponse {
  success: boolean;
  statusCode?: number;
  message: string;
  data: Organization[];
}
