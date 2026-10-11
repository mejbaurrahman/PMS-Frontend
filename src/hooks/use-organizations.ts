"use client";

import { useQuery } from "@tanstack/react-query";

import { getOrganizations } from "@/lib/organization-api";

export function useOrganizations() {
  return useQuery({
    queryKey: ["organizations"],
    queryFn: getOrganizations,
  });
}
