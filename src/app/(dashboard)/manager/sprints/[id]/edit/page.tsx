import EditSprintForm from "@/components/sprint/edit-sprint-form";

interface EditSprintPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditSprintPage({ params }: EditSprintPageProps) {
  const { id } = await params;

  return (
    <section className="mx-auto max-w-2xl space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Edit Sprint</h1>

        <p className="mt-2 text-muted-foreground">
          Update the Sprint information.
        </p>
      </div>

      <div className="rounded-lg border p-6">
        <EditSprintForm sprintId={id} />
      </div>
    </section>
  );
}
