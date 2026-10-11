"use client";

import { useQuery } from "@tanstack/react-query";

import { getProjectById } from "@/lib/project-api";

export function useProject(projectId: string) {
  return useQuery({
    queryKey: ["projects", projectId],
    queryFn: () => getProjectById(projectId),
    enabled: Boolean(projectId),
  });
}
