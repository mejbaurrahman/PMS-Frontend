import ProjectCard from "@/components/project/project-card";
import type { Project } from "@/types/project";

interface ProjectListProps {
  projects: Project[];
}

export default function ProjectList({ projects }: ProjectListProps) {
  if (projects.length === 0) {
    return (
      <div className="rounded-lg border border-dashed p-10 text-center">
        <h2 className="text-lg font-semibold">No projects found</h2>

        <p className="mt-2 text-sm text-muted-foreground">
          Create your first project to start managing work.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  );
}
