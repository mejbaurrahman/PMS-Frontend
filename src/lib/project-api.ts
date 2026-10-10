import { apiFetch } from "@/lib/api";
import type { ApiResponse } from "@/types/auth";
import type { Project } from "@/types/project";

export function getProjects() {
  return apiFetch<ApiResponse<Project[]>>("/projects");
}
