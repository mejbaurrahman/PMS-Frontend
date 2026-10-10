import type { Project } from "@/types/project";
import ProjectStatusBadge from "@/components/project/project-status-badge";
interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article className="rounded-lg border p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold">{project.name}</h2>

          <p className="mt-2 text-sm text-muted-foreground">
            {project.description || "No description available."}
          </p>
        </div>

        <ProjectStatusBadge status={project.status} />
      </div>

      <div className="mt-5 grid gap-2 text-sm text-muted-foreground">
        <p>
          Start:{" "}
          {project.startDate
            ? new Date(project.startDate).toLocaleDateString()
            : "Not set"}
        </p>

        <p>
          End:{" "}
          {project.endDate
            ? new Date(project.endDate).toLocaleDateString()
            : "Not set"}
        </p>
      </div>
    </article>
  );
}
