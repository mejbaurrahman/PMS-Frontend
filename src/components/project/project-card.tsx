import Link from "next/link";

import { CalendarDays, FolderKanban, ListTodo, Users } from "lucide-react";

import ProjectStatusBadge from "@/components/project/project-status-badge";

import type { Project } from "@/types/project";

interface ProjectCardProps {
  project: Project;
}

function formatDate(date: string | null) {
  if (!date) {
    return "Not set";
  }

  return new Date(date).toLocaleDateString();
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article className="group rounded-lg border bg-card p-5 transition-all hover:-translate-y-0.5 hover:shadow-md">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <Link
            href={`/manager/projects/${project.id}`}
            className="hover:underline"
          >
            <h2 className="truncate text-lg font-semibold">{project.name}</h2>
          </Link>

          <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
            {project.description || "No description available."}
          </p>
        </div>

        <ProjectStatusBadge status={project.status} />
      </div>

      {/* Organization + Team */}
      <div className="mt-5 space-y-3">
        <div className="flex items-center gap-2 text-sm">
          <FolderKanban className="size-4 shrink-0 text-muted-foreground" />

          <span className="text-muted-foreground">Organization:</span>

          <span className="truncate font-medium">
            {project.organization?.name || "Not available"}
          </span>
        </div>

        <div className="flex items-center gap-2 text-sm">
          <Users className="size-4 shrink-0 text-muted-foreground" />

          <span className="text-muted-foreground">Team:</span>

          <span className="truncate font-medium">
            {project.team?.name || "Not available"}
          </span>
        </div>
      </div>

      {/* Counts */}
      <div className="mt-5 grid grid-cols-2 gap-3">
        <div className="rounded-md bg-muted/50 p-3">
          <div className="flex items-center gap-2">
            <ListTodo className="size-4 text-muted-foreground" />

            <span className="text-xs text-muted-foreground">Tasks</span>
          </div>

          <p className="mt-1 text-lg font-semibold">
            {project._count?.tasks ?? 0}
          </p>
        </div>

        <div className="rounded-md bg-muted/50 p-3">
          <div className="flex items-center gap-2">
            <FolderKanban className="size-4 text-muted-foreground" />

            <span className="text-xs text-muted-foreground">Sprints</span>
          </div>

          <p className="mt-1 text-lg font-semibold">
            {project._count?.sprints ?? 0}
          </p>
        </div>
      </div>

      {/* Dates */}
      <div className="mt-5 border-t pt-4">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <CalendarDays className="size-4 shrink-0" />

          <span>{formatDate(project.startDate)}</span>

          <span>→</span>

          <span>{formatDate(project.endDate)}</span>
        </div>
      </div>
    </article>
  );
}
