import { getAdminStats } from "@/actions/admin";
import PageHeader from "@/components/dashboard/components/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Code2, Building2, FolderKanban, FileText, CircleDot } from "lucide-react";

export default async function AdminDashboardPage() {
  const stats = await getAdminStats();

  const cards = [
    { label: "Total Users", value: stats.totalUsers, icon: Users },
    { label: "Developers", value: stats.totalDevelopers, icon: Code2 },
    { label: "Companies", value: stats.totalCompanies, icon: Building2 },
    { label: "Total Projects", value: stats.totalProjects, icon: FolderKanban },
    { label: "Open Projects", value: stats.openProjects, icon: CircleDot },
    { label: "Applications", value: stats.totalApplications, icon: FileText },
  ];

  return (
    <div className="space-y-8">
      <PageHeader title="Admin Dashboard" description="Platform-wide overview." />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((card) => (
          <Card key={card.label}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {card.label}
              </CardTitle>
              <card.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{card.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
