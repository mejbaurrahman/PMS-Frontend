"use client";

import { useQuery } from "@tanstack/react-query";

import { getSprints, type SprintQueryParams } from "@/lib/sprint-api";

export function useSprints(params: SprintQueryParams = {}) {
  return useQuery({
    queryKey: ["sprints", params],

    queryFn: () => getSprints(params),
  });
}
