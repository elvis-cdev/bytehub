import Link from "next/link";
import { getCompanyProjects } from "@/actions/company";
import { PageHeader } from "@/components/dashboard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { projectStatusConfig } from "@/lib/status";
import { BriefcaseBusiness, Users, Plus } from "lucide-react";

export default async function CompanyProjectsPage() {
  const projects = await getCompanyProjects();

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between gap-4">
        <PageHeader
          title="My Projects"
          description="Projects you've posted for developers to apply to."
        />
        <Button asChild>
          <Link href="/company/projects/create">
            <Plus className="h-4 w-4 mr-2" />
            New Project
          </Link>
        </Button>
      </div>

      {projects.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center text-muted-foreground">
            <BriefcaseBusiness className="mx-auto h-8 w-8 mb-3 opacity-50" />
            <p>You haven&apos;t posted any projects yet.</p>
            <Button asChild className="mt-4">
              <Link href="/company/projects/create">Post your first project</Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {projects.map((project) => {
            const statusConfig = projectStatusConfig[project.status];
            return (
              <Link key={project.id} href={`/company/projects/${project.id}`}>
                <Card className="flex flex-col h-full transition-all duration-200 hover:-translate-y-1 hover:shadow-lg hover:border-primary/40">
                  <CardHeader>
                    <div className="flex items-start justify-between gap-2">
                      <CardTitle className="text-base leading-snug">
                        {project.title}
                      </CardTitle>
                      <Badge className={statusConfig.className}>{statusConfig.label}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-3">
                      {project.description}
                    </p>
                  </CardHeader>
                  <CardContent className="mt-auto space-y-2">
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <span className="font-medium text-foreground">
                        {project.budget ? `KES ${project.budget.toLocaleString()}` : "Budget TBD"}
                      </span>
                      <span className="flex items-center gap-1">
                        <Users className="h-3.5 w-3.5" />
                        {project.applications.length} applicant{project.applications.length !== 1 ? "s" : ""}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
