import type { UserRole } from "@/types/user";

export function canManageProjects(role: UserRole | undefined) {
  if (!role) {
    return false;
  }

  return role === "ADMIN" || role === "MANAGER";
}

export function canCreateProject(role: UserRole | undefined) {
  return canManageProjects(role);
}

export function canEditProject(role: UserRole | undefined) {
  return canManageProjects(role);
}

export function canDeleteProject(role: UserRole | undefined) {
  return canManageProjects(role);
}

export function canUpdateProjectStatus(role: UserRole | undefined) {
  return canManageProjects(role);
}
