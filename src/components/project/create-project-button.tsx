"use client";

import Link from "next/link";

import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";

import { useAuth } from "@/hooks/use-auth";

import { canCreateProject } from "@/lib/permissions";

export default function CreateProjectButton() {
  const { data, isLoading } = useAuth();

  if (isLoading) {
    return null;
  }

  const role = data?.data?.role;

  if (!canCreateProject(role)) {
    return null;
  }

  return (
    <Button nativeButton={false} render={<Link href="/manager/projects/new" />}>
      <Plus className="size-4" />
      Create Project
    </Button>
  );
}
