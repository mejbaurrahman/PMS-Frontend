import CreateSprintButton from "@/components/sprint/create-sprint-button";

import SprintListClient from "@/components/sprint/sprint-list-client";

export default function ManagerSprintsPage() {
  return (
    <section className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold">Sprints</h1>

          <p className="mt-2 text-muted-foreground">
            View and manage project sprints.
          </p>
        </div>

        <CreateSprintButton />
      </div>

      <SprintListClient />
    </section>
  );
}
