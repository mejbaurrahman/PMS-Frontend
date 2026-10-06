import type { UserRole } from "@/types/user";

export const ROLE_LABELS: Record<UserRole, string> = {
  ADMIN: "Admin",
  MANAGER: "Manager",
  MEMBER: "Member",
};

export const ROLE_DASHBOARD_PATHS: Record<UserRole, string> = {
  ADMIN: "/admin",
  MANAGER: "/manager",
  MEMBER: "/member",
};
