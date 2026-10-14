import { CalendarDays, FolderKanban, ListTodo } from "lucide-react";

import SprintStatusBadge from "@/components/sprint/sprint-status-badge";

import type { Sprint } from "@/types/sprint";

interface SprintCardProps {
  sprint: Sprint;
}

function formatDate(date: string | null) {
  if (!date) {
    return "Not set";
  }

  return new Date(date).toLocaleDateString();
}

export default function SprintCard({ sprint }: SprintCardProps) {
  return (
    <article className="rounded-lg border bg-card p-5 transition-shadow hover:shadow-md">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <h2 className="truncate text-lg font-semibold">{sprint.name}</h2>

          <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
            {sprint.description || "No description available."}
          </p>
        </div>

        <SprintStatusBadge status={sprint.status} />
      </div>

      {/* Project */}
      <div className="mt-5 flex items-center gap-2 text-sm">
        <FolderKanban className="size-4 shrink-0 text-muted-foreground" />

        <span className="text-muted-foreground">Project:</span>

        <span className="truncate font-medium">
          {sprint.project?.name || "Not available"}
        </span>
      </div>

      {/* Task Count */}
      <div className="mt-4 rounded-md bg-muted/50 p-3">
        <div className="flex items-center gap-2">
          <ListTodo className="size-4 text-muted-foreground" />

          <span className="text-xs text-muted-foreground">Tasks</span>
        </div>

        <p className="mt-1 text-lg font-semibold">
          {sprint._count?.tasks ?? 0}
        </p>
      </div>

      {/* Dates */}
      <div className="mt-5 border-t pt-4">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <CalendarDays className="size-4 shrink-0" />

          <span>{formatDate(sprint.startDate)}</span>

          <span>→</span>

          <span>{formatDate(sprint.endDate)}</span>
        </div>
      </div>
    </article>
  );
}
