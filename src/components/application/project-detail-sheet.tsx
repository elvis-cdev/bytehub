"use client";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { ApplyButton } from "@/components/application/apply-button";
import { Users, Clock, Layers, MapPin, Calendar } from "lucide-react";

interface ProjectDetailProps {
  project: {
    id: string;
    title: string;
    description: string;
    budget: number | null;
    duration: string | null;
    teamSize: number | null;
    experienceLevel: "BEGINNER" | "INTERMEDIATE" | "ADVANCED" | null;
    category: string | null;
    remote: boolean;
    skillsRequired: string[];
    owner: { name: string };
    _count: { applications: number };
  } | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  alreadyApplied: boolean;
}

const experienceLabels: Record<string, string> = {
  BEGINNER: "Beginner friendly",
  INTERMEDIATE: "Intermediate",
  ADVANCED: "Advanced",
};

export function ProjectDetailSheet({
  project,
  open,
  onOpenChange,
  alreadyApplied,
}: ProjectDetailProps) {
  if (!project) return null;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full sm:max-w-lg overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="text-xl">{project.title}</SheetTitle>
        </SheetHeader>

        <div className="mt-6 space-y-6 px-4 pb-6">
          <div className="flex flex-wrap gap-2">
            {project.category && <Badge variant="secondary">{project.category}</Badge>}
            {project.experienceLevel && (
              <Badge variant="secondary">{experienceLabels[project.experienceLevel]}</Badge>
            )}
            <Badge variant="secondary" className="gap-1">
              <MapPin className="h-3 w-3" />
              {project.remote ? "Remote" : "On-site"}
            </Badge>
          </div>

          <p className="text-sm text-muted-foreground whitespace-pre-wrap">
            {project.description}
          </p>

          <div className="grid grid-cols-2 gap-4 rounded-xl border p-4">
            <div className="space-y-1">
              <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <Calendar className="h-3.5 w-3.5" />
                Budget
              </p>
              <p className="font-medium">
                {project.budget ? `KES ${project.budget.toLocaleString()}` : "Negotiable"}
              </p>
            </div>
            <div className="space-y-1">
              <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <Clock className="h-3.5 w-3.5" />
                Duration
              </p>
              <p className="font-medium">{project.duration || "Flexible"}</p>
            </div>
            <div className="space-y-1">
              <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <Users className="h-3.5 w-3.5" />
                Team size
              </p>
              <p className="font-medium">
                {project.teamSize ? `${project.teamSize} developer${project.teamSize > 1 ? "s" : ""}` : "Not specified"}
              </p>
            </div>
            <div className="space-y-1">
              <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <Layers className="h-3.5 w-3.5" />
                Applicants
              </p>
              <p className="font-medium">{project._count.applications}</p>
            </div>
          </div>

          {project.skillsRequired.length > 0 && (
            <div>
              <p className="text-sm font-medium mb-2">Skills required</p>
              <div className="flex flex-wrap gap-1.5">
                {project.skillsRequired.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full bg-accent px-2.5 py-1 text-xs text-accent-foreground"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          <p className="text-xs text-muted-foreground">Posted by {project.owner.name}</p>

          <ApplyButton projectId={project.id} alreadyApplied={alreadyApplied} />
        </div>
      </SheetContent>
    </Sheet>
  );
}
