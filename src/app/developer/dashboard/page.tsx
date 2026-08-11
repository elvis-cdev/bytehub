import {
  PageHeader,
  SectionCard,
  StatCard,
} from "@/components/dashboard";

import QuickActionCard from "@/components/dashboard/components/QuickActionCard";

import { getMyApplications } from "@/actions/application";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

import {
  BriefcaseBusiness,
  FileText,
  Search,
  UserCheck,
} from "lucide-react";

import { applicationStatusConfig } from "@/lib/status";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

export default async function DeveloperDashboardPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const applications = await getMyApplications();

  const accepted = applications.filter(
    (application) => application.status === "ACCEPTED"
  ).length;

  const pending = applications.filter(
    (application) => application.status === "PENDING"
  ).length;

  const firstName = session?.user.name
    ? session.user.name.split(" ")[0]
    : "Developer";

  return (
    <div className="space-y-8">
      <PageHeader
        title={`Welcome back, ${firstName} 👋`}
        description="Track your applications, discover opportunities, and grow your developer profile."
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <StatCard
          title="Projects Applied"
          value={applications.length}
          icon={BriefcaseBusiness}
        />

        <StatCard
          title="Accepted"
          value={accepted}
          icon={UserCheck}
        />

        <StatCard
          title="Pending"
          value={pending}
          icon={FileText}
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.4fr_0.6fr]">
        <SectionCard title="Recent Applications">
          {applications.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <BriefcaseBusiness className="h-6 w-6" />
              </div>

              <h3 className="mt-4 font-semibold">
                No applications yet
              </h3>

              <p className="mt-2 max-w-sm text-sm text-muted-foreground">
                Start exploring projects and apply to opportunities that match your skills.
              </p>

              <Link
                href="/developer/projects"
                className="mt-5 inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
              >
                <Search className="h-4 w-4" />
                Browse Projects
              </Link>
            </div>
          ) : (
            <div className="divide-y">
              {applications.slice(0, 5).map((application) => {
                const config =
                  applicationStatusConfig[application.status];

                return (
                  <div
                    key={application.id}
                    className="flex items-center justify-between gap-4 py-4 first:pt-0 last:pb-0"
                  >
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold">
                        {application.project.title}
                      </p>

                      <p className="mt-1 text-xs text-muted-foreground">
                        Application
                      </p>
                    </div>

                    <Badge className={config.className}>
                      {config.label}
                    </Badge>
                  </div>
                );
              })}
            </div>
          )}
        </SectionCard>

        <SectionCard title="Quick Actions">
          <div className="space-y-3">
            <QuickActionCard
              title="Browse Projects"
              description="Find new opportunities."
              href="/developer/projects"
            />

            <QuickActionCard
              title="Complete Profile"
              description="Improve your chances of getting hired."
              href="/developer/profile"
            />

            <QuickActionCard
              title="My Applications"
              description="Track your submitted applications."
              href="/developer/applications"
            />
          </div>
        </SectionCard>
      </div>

      <SectionCard title="Continue Your Journey">
        <div className="grid gap-4 md:grid-cols-3">
          <QuickActionCard
            title="Developer Profile"
            description="Show companies your skills, experience, and projects."
            href="/developer/profile"
          />

          <QuickActionCard
            title="Projects"
            description="Explore projects posted by companies on ByteHub."
            href="/developer/projects"
          />

          <QuickActionCard
            title="Messages"
            description="Communicate with companies about your opportunities."
            href="/developer/messages"
          />
        </div>
      </SectionCard>
    </div>
  );
}
