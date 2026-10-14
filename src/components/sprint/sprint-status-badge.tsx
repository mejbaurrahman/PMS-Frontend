import type { SprintStatus } from "@/types/sprint";

interface SprintStatusBadgeProps {
  status: SprintStatus;
}

const STATUS_STYLES: Record<SprintStatus, string> = {
  PLANNED: "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200",

  ACTIVE: "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-300",

  COMPLETED: "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300",

  CANCELLED: "bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300",
};

const STATUS_LABELS: Record<SprintStatus, string> = {
  PLANNED: "Planned",
  ACTIVE: "Active",
  COMPLETED: "Completed",
  CANCELLED: "Cancelled",
};

export default function SprintStatusBadge({ status }: SprintStatusBadgeProps) {
  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${STATUS_STYLES[status]}`}
    >
      {STATUS_LABELS[status]}
    </span>
  );
}
