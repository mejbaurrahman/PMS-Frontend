import EditProjectForm from "@/components/project/edit-project-form";

interface EditProjectPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditProjectPage({
  params,
}: EditProjectPageProps) {
  const { id } = await params;

  return (
    <section className="mx-auto max-w-2xl space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Edit Project</h1>

        <p className="mt-2 text-muted-foreground">
          Update the project information.
        </p>
      </div>

      <div className="rounded-lg border p-6">
        <EditProjectForm projectId={id} />
      </div>
    </section>
  );
}
