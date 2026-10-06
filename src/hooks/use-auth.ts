"use client";

import { useQuery } from "@tanstack/react-query";

import { getMe } from "@/lib/auth-api";

export function useAuth() {
  return useQuery({
    queryKey: ["auth", "me"],
    queryFn: getMe,
    retry: false,
  });
}
