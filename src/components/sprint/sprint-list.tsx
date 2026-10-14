import { TimerReset } from "lucide-react";

import SprintCard from "@/components/sprint/sprint-card";

import type { Sprint } from "@/types/sprint";

interface SprintListProps {
  sprints: Sprint[];
}

export default function SprintList({ sprints }: SprintListProps) {
  if (sprints.length === 0) {
    return (
      <div className="rounded-lg border border-dashed p-10 text-center">
        <TimerReset className="mx-auto size-10 text-muted-foreground" />

        <h3 className="mt-4 font-semibold">No sprints found</h3>

        <p className="mt-2 text-sm text-muted-foreground">
          No sprint data is available for the current selection.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {sprints.map((sprint) => (
        <SprintCard key={sprint.id} sprint={sprint} />
      ))}
    </div>
  );
}
