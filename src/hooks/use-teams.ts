"use client";

import { useQuery } from "@tanstack/react-query";

import { getTeams } from "@/lib/team-api";

export function useTeams() {
  return useQuery({
    queryKey: ["teams"],
    queryFn: getTeams,
  });
}
