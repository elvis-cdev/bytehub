import { getMyApplications } from "@/actions/application";
import { PageHeader, SectionCard } from "@/components/dashboard";
import { Badge } from "@/components/ui/badge";
import { applicationStatusConfig } from "@/lib/status";
import { FileText } from "lucide-react";

export default async function DeveloperApplicationsPage() {
  const applications = await getMyApplications();

  return (
    <div className="space-y-8">
      <PageHeader
        title="My Applications"
        description="Track the status of projects you've applied to."
      />

      <SectionCard title={`${applications.length} Applications`}>
        {applications.length === 0 ? (
          <div className="py-8 text-center text-muted-foreground">
            <FileText className="mx-auto h-8 w-8 mb-3 opacity-50" />
            You haven&apos;t applied to any projects yet.
          </div>
        ) : (
          <div className="space-y-3">
            {applications.map((app) => {
              const config = applicationStatusConfig[app.status];
              return (
                <div
                  key={app.id}
                  className="flex items-center justify-between rounded-lg border p-4"
                >
                  <div>
                    <p className="font-medium">{app.project.title}</p>
                    <p className="text-sm text-muted-foreground">
                      {app.project.budget
                        ? `$${app.project.budget.toLocaleString()}`
                        : "Budget TBD"}
                    </p>
                  </div>
                  <Badge className={config.className}>{config.label}</Badge>
                </div>
              );
            })}
          </div>
        )}
      </SectionCard>
    </div>
  );
}
