import { ProjectStatus, ApplicationStatus } from "@prisma/client";

type StatusConfig = { label: string; className: string };

export const projectStatusConfig: Record<ProjectStatus, StatusConfig> = {
  OPEN: { label: "Open", className: "bg-green-100 text-green-700 border-green-200" },
  IN_PROGRESS: { label: "In Progress", className: "bg-blue-100 text-blue-700 border-blue-200" },
  COMPLETED: { label: "Completed", className: "bg-zinc-100 text-zinc-600 border-zinc-200" },
  CANCELLED: { label: "Cancelled", className: "bg-red-100 text-red-700 border-red-200" },
};

export const applicationStatusConfig: Record<ApplicationStatus, StatusConfig> = {
  PENDING: { label: "Pending", className: "bg-yellow-100 text-yellow-700 border-yellow-200" },
  ACCEPTED: { label: "Accepted", className: "bg-green-100 text-green-700 border-green-200" },
  REJECTED: { label: "Rejected", className: "bg-red-100 text-red-700 border-red-200" },
};
