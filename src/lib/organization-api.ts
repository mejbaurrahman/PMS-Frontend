import { apiFetch } from "@/lib/api";

import type { OrganizationListResponse } from "@/types/organization";

export function getOrganizations() {
  return apiFetch<OrganizationListResponse>("/organizations");
}
