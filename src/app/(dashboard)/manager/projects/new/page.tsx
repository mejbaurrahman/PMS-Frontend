import CreateProjectForm from "@/components/project/create-project-form";

export default function CreateProjectPage() {
  return (
    <section className="mx-auto max-w-2xl space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Create Project</h1>

        <p className="mt-2 text-muted-foreground">
          Create a new project for your organization and team.
        </p>
      </div>

      <div className="rounded-lg border p-6">
        <CreateProjectForm />
      </div>
    </section>
  );
}
