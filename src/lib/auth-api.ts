import { apiFetch } from "@/lib/api";
import type { ApiResponse, AuthData, LoginInput } from "@/types/auth";

export function loginUser(payload: LoginInput) {
  return apiFetch<ApiResponse<AuthData>>("/auth/login", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}
