import {
  PageHeader,
  SectionCard,
  StatCard,
} from "@/components/dashboard";

import { getMyApplications } from "@/actions/application";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

import {
  BriefcaseBusiness,
  FileText,
  UserCheck,
} from "lucide-react";

import { applicationStatusConfig } from "@/lib/status";
import { Badge } from "@/components/ui/badge";

export default async function DeveloperDashboardPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const applications = await getMyApplications();

  const accepted = applications.filter(
    (a) => a.status === "ACCEPTED"
  ).length;

  const pending = applications.filter(
    (a) => a.status === "PENDING"
  ).length;

  return (
    <div className="space-y-8">
      <PageHeader
        title={`Welcome back${
          session?.user.name
            ? `, ${session.user.name.split(" ")[0]}`
            : ""
        } 👋`}
        description="Manage your developer journey from one place."
      />

      {/* Statistics */}
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
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

      {/* Recent Applications */}
      <SectionCard title="Recent Applications">
        {applications.length === 0 ? (
          <p className="py-8 text-center text-muted-foreground">
            No applications yet — head to Browse Projects to get started.
          </p>
        ) : (
          <div className="space-y-3">
            {applications.slice(0, 5).map((app) => {
              const config = applicationStatusConfig[app.status];

              return (
                <div
                  key={app.id}
                  className="flex items-center justify-between rounded-lg border p-4 transition-colors hover:bg-muted/50"
                >
                  <p className="font-medium">
                    {app.project.title}
                  </p>

                  <Badge className={config.className}>
                    {config.label}
                  </Badge>
                </div>
              );
            })}
          </div>
        )}
      </SectionCard>
    </div>
  );
}
