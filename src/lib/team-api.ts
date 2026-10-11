import { apiFetch } from "@/lib/api";

import type { TeamListResponse } from "@/types/team";

export function getTeams() {
  return apiFetch<TeamListResponse>("/teams");
}
