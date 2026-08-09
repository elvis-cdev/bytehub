import { getAdminReports } from "@/actions/admin";
import PageHeader from "@/components/dashboard/components/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { projectStatusConfig, applicationStatusConfig } from "@/lib/status";

export default async function AdminReportsPage() {
  const { projectsByStatus, applicationsByStatus, recentUsers, recentProjects } = await getAdminReports();

  return (
    <div className="space-y-8">
      <PageHeader title="Reports" description="Platform activity breakdown." />

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Projects by Status</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {projectsByStatus.map((row) => (
              <div key={row.status} className="flex items-center justify-between">
                <Badge className={projectStatusConfig[row.status].className}>
                  {projectStatusConfig[row.status].label}
                </Badge>
                <span className="text-sm font-medium">{row._count}</span>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Applications by Status</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {applicationsByStatus.map((row) => (
              <div key={row.status} className="flex items-center justify-between">
                <Badge className={applicationStatusConfig[row.status].className}>
                  {applicationStatusConfig[row.status].label}
                </Badge>
                <span className="text-sm font-medium">{row._count}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Recently Joined</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {recentUsers.map((u) => (
              <div key={u.id} className="flex items-center justify-between text-sm">
                <div className="min-w-0">
                  <p className="font-medium truncate">{u.name}</p>
                  <p className="text-xs text-muted-foreground truncate">{u.email}</p>
                </div>
                <Badge variant="secondary" className="text-xs shrink-0">{u.role}</Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Recent Projects</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {recentProjects.map((p) => (
              <div key={p.id} className="flex items-center justify-between text-sm">
                <div className="min-w-0">
                  <p className="font-medium truncate">{p.title}</p>
                  <p className="text-xs text-muted-foreground truncate">by {p.owner.name}</p>
                </div>
                <Badge className={`${projectStatusConfig[p.status].className} text-xs shrink-0`}>
                  {projectStatusConfig[p.status].label}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
