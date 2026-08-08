import { getMyActiveProject, getProjectUpdates, getMessages } from "@/actions/collaboration";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { PageHeader } from "@/components/dashboard";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { projectStatusConfig } from "@/lib/status";
import { UpdatesPanel } from "@/components/collaboration/updates-panel";
import { MessagesPanel } from "@/components/collaboration/messages-panel";

export default async function DeveloperActiveProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const session = await auth.api.getSession({ headers: await headers() });
  const project = await getMyActiveProject(id);
  const statusConfig = projectStatusConfig[project.status];

  const [updates, messages] = await Promise.all([
    getProjectUpdates(id),
    getMessages(id),
  ]);

  return (
    <div className="space-y-8">
      <PageHeader title={project.title} description={project.description} />

      <div className="flex items-center gap-3">
        <Badge className={statusConfig.className}>{statusConfig.label}</Badge>
        <span className="text-sm text-muted-foreground">
          {project.budget ? `$${project.budget.toLocaleString()}` : "Budget TBD"}
        </span>
      </div>

      <Tabs defaultValue="progress">
        <TabsList>
          <TabsTrigger value="progress">Progress</TabsTrigger>
          <TabsTrigger value="messages">Messages</TabsTrigger>
        </TabsList>

        <TabsContent value="progress" className="mt-6">
          <UpdatesPanel projectId={id} canPost={true} initialUpdates={updates} />
        </TabsContent>

        {session?.user && (
          <TabsContent value="messages" className="mt-6">
            <MessagesPanel projectId={id} currentUserId={session.user.id} initialMessages={messages} />
          </TabsContent>
        )}
      </Tabs>
    </div>
  );
}
