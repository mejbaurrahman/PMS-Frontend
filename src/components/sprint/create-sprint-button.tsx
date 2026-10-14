"use client";

import Link from "next/link";

import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";

import { useAuth } from "@/hooks/use-auth";

import { canManageProjects } from "@/lib/permissions";

export default function CreateSprintButton() {
  const { data, isLoading } = useAuth();

  if (isLoading) {
    return null;
  }

  const role = data?.data?.role;

  if (!canManageProjects(role)) {
    return null;
  }

  return (
    <Button nativeButton={false} render={<Link href="/manager/sprints/new" />}>
      <Plus className="size-4" />
      Create Sprint
    </Button>
  );
}
