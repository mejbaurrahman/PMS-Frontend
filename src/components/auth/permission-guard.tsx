"use client";

import type { ReactNode } from "react";

import { useAuth } from "@/hooks/use-auth";

import type { UserRole } from "@/types/user";

interface PermissionGuardProps {
  allowedRoles: UserRole[];
  children: ReactNode;
  fallback?: ReactNode;
}

export default function PermissionGuard({
  allowedRoles,
  children,
  fallback = null,
}: PermissionGuardProps) {
  const { data, isLoading } = useAuth();

  if (isLoading) {
    return null;
  }

  const role = data?.data?.role;

  if (!role || !allowedRoles.includes(role)) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
}
