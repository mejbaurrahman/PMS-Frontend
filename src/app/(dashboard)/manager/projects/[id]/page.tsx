import ProjectDetailsClient from "@/components/project/project-details-client";

interface ProjectDetailsPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function ProjectDetailsPage({
  params,
}: ProjectDetailsPageProps) {
  const { id } = await params;

  return <ProjectDetailsClient projectId={id} />;
}
