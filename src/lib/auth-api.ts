import { apiFetch } from "@/lib/api";
import type { ApiResponse, AuthData, LoginInput } from "@/types/auth";
import type { User } from "@/types/user";
export function loginUser(payload: LoginInput) {
  return apiFetch<ApiResponse<AuthData>>("/auth/login", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}
export function getMe() {
  return apiFetch<ApiResponse<User>>("/auth/me");
}

export function logoutUser() {
  return apiFetch<ApiResponse<null>>("/auth/logout", {
    method: "POST",
  });
}
