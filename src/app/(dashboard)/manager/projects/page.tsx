import { Button } from "@/components/ui/button";

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

        <Button>Create Project</Button>
      </div>

      <div className="rounded-lg border p-6">
        <p className="text-sm text-muted-foreground">
          Project data will appear here.
        </p>
      </div>
    </section>
  );
}
