import type { UserRole } from "@/types/user";

export const DEMO_CREDENTIALS = {
  ADMIN: {
    email: "testeradmin@gmail.com",
    password: "Tester@admin12345",
  },
  MANAGER: {
    email: "userb@example.com",
    password: "Password123",
  },
  MEMBER: {
    email: "mejba02@gmail.com",
    password: "Password123",
  },
};

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
