import Link from "next/link";
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";

import ProjectListClient from "@/components/project/project-list-client";

export default function ManagerProjectsPage() {
  return (
    <section className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold">Projects</h1>

          <p className="mt-2 text-muted-foreground">
            Manage and monitor all projects in your organization.
          </p>
        </div>

        <Button
          nativeButton={false}
          render={<Link href="/manager/projects/new" />}
        >
          <Plus className="size-4" />
          Create Project
        </Button>
      </div>

      <ProjectListClient />
    </section>
  );
}
