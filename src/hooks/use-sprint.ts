"use client";

import { useQuery } from "@tanstack/react-query";

import { getSprintById } from "@/lib/sprint-api";

export function useSprint(sprintId: string) {
  return useQuery({
    queryKey: ["sprints", sprintId],

    queryFn: () => getSprintById(sprintId),

    enabled: Boolean(sprintId),
  });
}
