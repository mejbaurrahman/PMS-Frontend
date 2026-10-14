import CreateSprintForm from "@/components/sprint/create-sprint-form";

export default function CreateSprintPage() {
  return (
    <section className="mx-auto max-w-2xl space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Create Sprint</h1>

        <p className="mt-2 text-muted-foreground">
          Create a new sprint for one of your projects.
        </p>
      </div>

      <div className="rounded-lg border p-6">
        <CreateSprintForm />
      </div>
    </section>
  );
}
