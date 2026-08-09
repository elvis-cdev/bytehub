import { getAllCompanies } from "@/actions/admin";
import PageHeader from "@/components/dashboard/components/PageHeader";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

export default async function AdminCompaniesPage() {
  const companies = await getAllCompanies();

  return (
    <div className="space-y-8">
      <PageHeader title="Companies" description={`${companies.length} registered companies`} />
      <div className="space-y-3">
        {companies.map((c) => (
          <div key={c.id} className="flex items-center gap-4 rounded-lg border p-4">
            <Avatar>
              <AvatarImage src={c.image ?? undefined} />
              <AvatarFallback>{c.name.slice(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="font-medium truncate">
                {c.ClientProfile?.company || c.name}
              </p>
              <p className="text-sm text-muted-foreground truncate">{c.email}</p>
              {c.ClientProfile?.website && (
                <a
                  href={c.ClientProfile.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-primary hover:underline"
                >
                  {c.ClientProfile.website}
                </a>
              )}
            </div>
            <Badge variant="secondary" className="shrink-0">
              {c._count.Project} project{c._count.Project !== 1 ? "s" : ""}
            </Badge>
          </div>
        ))}
      </div>
    </div>
  );
}
