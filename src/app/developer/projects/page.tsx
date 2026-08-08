import { getOpenProjects, getMyApplications } from "@/actions/application";
import { PageHeader } from "@/components/dashboard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ApplyButton } from "@/components/application/apply-button";
import { AnimatedGrid, AnimatedItem } from "@/components/motion/animated-grid";
import { BriefcaseBusiness, Calendar, Users } from "lucide-react";

export default async function BrowseProjectsPage() {
  const [projects, myApplications] = await Promise.all([
    getOpenProjects(),
    getMyApplications(),
  ]);

  const appliedProjectIds = new Set(myApplications.map((a) => a.project.id));

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
              <Card className="flex flex-col h-full transition-all duration-200 hover:-translate-y-1 hover:shadow-lg hover:border-primary/40">
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
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span className="font-medium text-foreground">
                      {project.budget ? `$${project.budget.toLocaleString()}` : "Budget TBD"}
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="h-3.5 w-3.5" />
                      {project._count.applications}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Calendar className="h-3.5 w-3.5" />
                    Posted by {project.owner.name}
                  </div>
                  <ApplyButton
                    projectId={project.id}
                    alreadyApplied={appliedProjectIds.has(project.id)}
                  />
                </CardContent>
              </Card>
            </AnimatedItem>
          ))}
        </AnimatedGrid>
      )}
    </div>
  );
}
