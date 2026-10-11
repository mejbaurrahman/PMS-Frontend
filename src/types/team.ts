export interface Team {
  id: string;
  name: string;

  description?: string | null;

  organizationId: string;

  organization?: {
    id: string;
    name: string;
  };

  createdAt?: string;
  updatedAt?: string;
}

export interface TeamListResponse {
  success: boolean;
  statusCode?: number;
  message: string;
  data: Team[];
}
