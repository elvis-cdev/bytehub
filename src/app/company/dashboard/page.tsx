import Link from "next/link";
import CompanyStatCard from "@/components/company/CompanyStatCard";
import ProjectOverviewCard from "@/components/company/ProjectOverviewCard";
import {
  getCompanyProjects,
  getCompanyDashboardStats,
} from "@/actions/company";
import { Button } from "@/components/ui/button";
import {
  BriefcaseBusiness,
  Users,
  MessageSquare,
  Wallet,
} from "lucide-react";

export default async function CompanyDashboardPage() {
  const projects = await getCompanyProjects();
  const stats = await getCompanyDashboardStats();

  return (
    <main className="space-y-10">
      <section className="flex flex-col gap-2">
        <h1 className="text-4xl font-bold tracking-tight">Welcome back 👋</h1>
        <p className="text-muted-foreground">
          Manage your projects, discover developers, and grow your team.
        </p>
      </section>

      <section className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <CompanyStatCard title="Projects" value={stats.totalProjects} icon={<BriefcaseBusiness className="h-5 w-5 text-muted-foreground" />} />
        <CompanyStatCard title="Applicants" value={stats.totalApplicants} icon={<Users className="h-5 w-5 text-muted-foreground" />} />
        <CompanyStatCard title="Messages" value={0} icon={<MessageSquare className="h-5 w-5 text-muted-foreground" />} />
        <CompanyStatCard title="Hires" value={stats.totalHires} icon={<Wallet className="h-5 w-5 text-muted-foreground" />} />
      </section>

      <section className="grid gap-6 md:grid-cols-2">
        <div className="rounded-xl border bg-card p-6">
          <h3 className="text-lg font-semibold">Create a new project</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Post opportunities and start receiving applications from developers.
          </p>
          <Button asChild className="mt-5">
            <Link href="/company/projects/create">Create Project</Link>
          </Button>
        </div>
        <div className="rounded-xl border bg-card p-6">
          <h3 className="text-lg font-semibold">Find developers</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Explore talented developers and build your team.
          </p>
          <Button asChild variant="outline" className="mt-5">
            <Link href="/company/developers">Explore Developers</Link>
          </Button>
        </div>
      </section>

      <section>
        <h2 className="mb-5 text-2xl font-semibold">Your Projects</h2>
        {projects.length === 0 ? (
          <div className="rounded-xl border bg-card p-10 text-center">
            <h3 className="text-xl font-semibold">No projects yet</h3>
            <p className="mt-2 text-muted-foreground">
              Create your first project and start finding developers.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 lg:grid-cols-2">
            {projects.map((project) => (
              <Link key={project.id} href={`/company/projects/${project.id}`}>
                <ProjectOverviewCard
                  title={project.title}
                  applicants={project.applications.length}
                  status={project.status}
                />
              </Link>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
