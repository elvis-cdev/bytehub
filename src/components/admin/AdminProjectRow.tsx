"use client";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { adminDeleteProject } from "@/actions/admin";
import { projectStatusConfig } from "@/lib/status";
import { toast } from "sonner";
import { Loader2, Trash2 } from "lucide-react";

interface AdminProject {
  id: string;
  title: string;
  status: "OPEN" | "IN_PROGRESS" | "COMPLETED" | "CANCELLED";
  owner: { name: string; email: string };
  _count: { applications: number };
}

export function AdminProjectRow({ project }: { project: AdminProject }) {
  const [loading, setLoading] = useState(false);
  const [deleted, setDeleted] = useState(false);
  const statusConfig = projectStatusConfig[project.status];

  async function handleDelete() {
    if (!confirm(`Permanently delete "${project.title}"? This cannot be undone.`)) return;
    setLoading(true);
    try {
      await adminDeleteProject(project.id);
      setDeleted(true);
      toast.success("Project deleted");
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Failed");
      setLoading(false);
    }
  }

  if (deleted) return null;

  return (
    <div className="flex items-center gap-4 rounded-lg border p-4">
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <p className="font-medium truncate">{project.title}</p>
          <Badge className={statusConfig.className}>{statusConfig.label}</Badge>
        </div>
        <p className="text-sm text-muted-foreground truncate">
          {project.owner.name} · {project.owner.email}
        </p>
      </div>
      <div className="text-xs text-muted-foreground shrink-0">
        {project._count.applications} applicant{project._count.applications !== 1 ? "s" : ""}
      </div>
      <Button size="sm" variant="outline" onClick={handleDelete} disabled={loading} className="shrink-0 text-destructive hover:text-destructive">
        {loading ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Trash2 className="h-3.5 w-3.5" />}
      </Button>
    </div>
  );
}
