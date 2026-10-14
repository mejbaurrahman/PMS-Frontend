import SprintDetailsClient from "@/components/sprint/sprint-details-client";

interface SprintDetailsPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function SprintDetailsPage({
  params,
}: SprintDetailsPageProps) {
  const { id } = await params;

  return <SprintDetailsClient sprintId={id} />;
}
