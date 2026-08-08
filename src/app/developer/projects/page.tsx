"use client";
import { useEffect, useState } from "react";
import { getOpenProjects, getMyApplications } from "@/actions/application";
import PageHeader from "@/components/dashboard/components/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ApplyButton } from "@/components/application/apply-button";
import { ProjectDetailSheet } from "@/components/application/project-detail-sheet";
import { AnimatedGrid, AnimatedItem } from "@/components/motion/animated-grid";
import { BriefcaseBusiness, Users, MapPin, Clock, Loader2 } from "lucide-react";

type Project = Awaited<ReturnType<typeof getOpenProjects>>[number];

export default function BrowseProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [appliedProjectIds, setAppliedProjectIds] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Project | null>(null);
  const [sheetOpen, setSheetOpen] = useState(false);

  useEffect(() => {
    Promise.all([getOpenProjects(), getMyApplications()]).then(([p, apps]) => {
      setProjects(p);
      setAppliedProjectIds(new Set(apps.map((a) => a.project.id)));
      setLoading(false);
    });
  }, []);

  function openDetail(project: Project) {
    setSelected(project);
    setSheetOpen(true);
  }

  if (loading) {
    return (
      <div className="flex justify-center py-24">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <PageHeader
        title="Browse Projects"
        description="Find real-world projects to build your portfolio."
      />

      {projects.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center text-muted-foreground">
            <BriefcaseBusiness className="mx-auto h-8 w-8 mb-3 opacity-50" />
            No open projects right now. Check back soon.
          </CardContent>
        </Card>
      ) : (
        <AnimatedGrid className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {projects.map((project) => (
            <AnimatedItem key={project.id}>
              <Card
                onClick={() => openDetail(project)}
                className="flex flex-col h-full cursor-pointer transition-all duration-200 hover:-translate-y-1 hover:shadow-lg hover:border-primary/40"
              >
                <CardHeader>
                  <div className="flex items-start justify-between gap-2">
                    <CardTitle className="text-base leading-snug">
                      {project.title}
                    </CardTitle>
                    <Badge className="bg-green-100 text-green-700 border-green-200 shrink-0">
                      Open
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-3">
                    {project.description}
                  </p>
                </CardHeader>
                <CardContent className="mt-auto space-y-4">
                  <div className="flex flex-wrap gap-1.5">
                    {project.category && (
                      <Badge variant="secondary" className="text-xs">{project.category}</Badge>
                    )}
                    <Badge variant="secondary" className="text-xs gap-1">
                      <MapPin className="h-3 w-3" />
                      {project.remote ? "Remote" : "On-site"}
                    </Badge>
                    {project.duration && (
                      <Badge variant="secondary" className="text-xs gap-1">
                        <Clock className="h-3 w-3" />
                        {project.duration}
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span className="font-medium text-foreground">
                      {project.budget ? `KES ${project.budget.toLocaleString()}` : "Budget TBD"}
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="h-3.5 w-3.5" />
                      {project._count.applications}
                    </span>
                  </div>
                  <div
                    onClick={(e) => e.stopPropagation()}
                  >
                    <ApplyButton
                      projectId={project.id}
                      alreadyApplied={appliedProjectIds.has(project.id)}
                    />
                  </div>
                </CardContent>
              </Card>
            </AnimatedItem>
          ))}
        </AnimatedGrid>
      )}

      <ProjectDetailSheet
        project={selected}
        open={sheetOpen}
        onOpenChange={setSheetOpen}
        alreadyApplied={selected ? appliedProjectIds.has(selected.id) : false}
      />
    </div>
  );
}
