import Link from "next/link";

import ProjectStatusBadge from "@/components/project/project-status-badge";
import type { Project } from "@/types/project";

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article className="rounded-lg border p-5 transition-shadow hover:shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <Link
            href={`/manager/projects/${project.id}`}
            className="hover:underline"
          >
            <h2 className="text-lg font-semibold">{project.name}</h2>
          </Link>

          <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
            {project.description || "No description available."}
          </p>
        </div>

        <ProjectStatusBadge status={project.status} />
      </div>

      <div className="mt-5 space-y-2 text-sm text-muted-foreground">
        <p>
          Organization:{" "}
          <span className="text-foreground">
            {project.organization?.name || "Not available"}
          </span>
        </p>

        <p>
          Team:{" "}
          <span className="text-foreground">
            {project.team?.name || "Not available"}
          </span>
        </p>

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
