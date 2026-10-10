"use client";

import { useQuery } from "@tanstack/react-query";

import { getProjects, type ProjectQueryParams } from "@/lib/project-api";

export function useProjects(params: ProjectQueryParams) {
  return useQuery({
    queryKey: ["projects", params],
    queryFn: () => getProjects(params),
  });
}
