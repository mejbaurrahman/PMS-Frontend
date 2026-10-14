import SprintListClient from "@/components/sprint/sprint-list-client";

export default function ManagerSprintsPage() {
  return (
    <section className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Sprints</h1>

        <p className="mt-2 text-muted-foreground">
          View and manage project sprints.
        </p>
      </div>

      <SprintListClient />
    </section>
  );
}
