import { FolderOpen } from "lucide-react";

import ProjectCard from "@/components/project/project-card";

import type { Project } from "@/types/project";

interface ProjectListProps {
  projects: Project[];
}

export default function ProjectList({ projects }: ProjectListProps) {
  if (projects.length === 0) {
    return (
      <div className="rounded-lg border border-dashed p-10 text-center">
        <FolderOpen className="mx-auto size-10 text-muted-foreground" />

        <h3 className="mt-4 font-semibold">No projects found</h3>

        <p className="mt-2 text-sm text-muted-foreground">
          Try changing your search, filter, or pagination.
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
