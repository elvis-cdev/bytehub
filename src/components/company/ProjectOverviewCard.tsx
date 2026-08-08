"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Users } from "lucide-react";
import { projectStatusConfig } from "@/lib/status";
import type { ProjectStatus } from "@prisma/client";

interface Props {
  title: string;
  applicants: number;
  status: ProjectStatus;
}

export default function ProjectOverviewCard({ title, applicants, status }: Props) {
  const config = projectStatusConfig[status];

  return (
    <motion.div
      whileHover={{ y: -3 }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
      className="rounded-xl border bg-background p-6 transition-shadow hover:shadow-lg cursor-pointer group"
    >
      <div className="flex items-center justify-between">
        <h2 className="font-semibold text-lg">{title}</h2>
        <Badge className={config.className}>{config.label}</Badge>
      </div>
      <p className="mt-3 flex items-center gap-1.5 text-muted-foreground">
        <Users className="h-4 w-4" />
        {applicants} {applicants === 1 ? "Applicant" : "Applicants"}
      </p>
      <div className="mt-6 flex w-full items-center justify-center gap-1.5 rounded-md bg-primary py-2 text-sm font-medium text-primary-foreground transition-all group-hover:gap-2.5">
        View Applicants
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
      </div>
    </motion.div>
  );
}
