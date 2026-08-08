import { getProjectWithApplicants } from "@/actions/application";
import { getProjectUpdates, getMessages } from "@/actions/collaboration";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { PageHeader, SectionCard } from "@/components/dashboard";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { projectStatusConfig, applicationStatusConfig } from "@/lib/status";
import { ApplicantActions } from "@/components/application/applicant-actions";
import { CloseProjectButton } from "@/components/application/close-project-button";
import { UpdatesPanel } from "@/components/collaboration/updates-panel";
import { MessagesPanel } from "@/components/collaboration/messages-panel";
import { Users } from "lucide-react";

export default async function CompanyProjectDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const session = await auth.api.getSession({ headers: await headers() });
  const project = await getProjectWithApplicants(id);
  const statusConfig = projectStatusConfig[project.status];

  const hasAcceptedDeveloper = project.applications.some((a) => a.status === "ACCEPTED");

  const [updates, messages] = hasAcceptedDeveloper
    ? await Promise.all([getProjectUpdates(id), getMessages(id)])
    : [[], []];

  return (
    <div className="space-y-8">
      <PageHeader title={project.title} description={project.description} />

      <div className="flex items-center gap-3">
        <Badge className={statusConfig.className}>{statusConfig.label}</Badge>
        <span className="text-sm text-muted-foreground">
          {project.budget ? `$${project.budget.toLocaleString()}` : "Budget TBD"}
        </span>
        {project.status !== "COMPLETED" && (
          <CloseProjectButton projectId={project.id} />
        )}
      </div>

      <Tabs defaultValue="applicants">
        <TabsList>
          <TabsTrigger value="applicants">Applicants ({project.applications.length})</TabsTrigger>
          {hasAcceptedDeveloper && <TabsTrigger value="progress">Progress</TabsTrigger>}
          {hasAcceptedDeveloper && <TabsTrigger value="messages">Messages</TabsTrigger>}
        </TabsList>

        <TabsContent value="applicants" className="mt-6">
          <SectionCard title={`Applicants (${project.applications.length})`}>
            {project.applications.length === 0 ? (
              <div className="py-8 text-center text-muted-foreground">
                <Users className="mx-auto h-8 w-8 mb-3 opacity-50" />
                No applicants yet.
              </div>
            ) : (
              <div className="space-y-3">
                {project.applications.map((app) => {
                  const config = applicationStatusConfig[app.status];
                  return (
                    <div
                      key={app.id}
                      className="flex items-center justify-between rounded-lg border p-4"
                    >
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarFallback>
                            {app.developer.name.slice(0, 2).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{app.developer.name}</p>
                          <p className="text-sm text-muted-foreground">{app.developer.email}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge className={config.className}>{config.label}</Badge>
                        {app.status === "PENDING" && (
                          <ApplicantActions applicationId={app.id} developerId={app.developer.id} />
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </SectionCard>
        </TabsContent>

        {hasAcceptedDeveloper && (
          <TabsContent value="progress" className="mt-6">
            <UpdatesPanel projectId={id} canPost={false} initialUpdates={updates} />
          </TabsContent>
        )}

        {hasAcceptedDeveloper && session?.user && (
          <TabsContent value="messages" className="mt-6">
            <MessagesPanel projectId={id} currentUserId={session.user.id} initialMessages={messages} />
          </TabsContent>
        )}
      </Tabs>
    </div>
  );
}
