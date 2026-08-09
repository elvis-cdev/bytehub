import PageHeader from "@/components/dashboard/components/PageHeader";
import { Card, CardContent } from "@/components/ui/card";

export default function AdminSystemPage() {
  return (
    <div className="space-y-8">
      <PageHeader title="Administration" description="System-level configuration." />
      <Card>
        <CardContent className="py-12 text-center text-muted-foreground">
          More system administration tools coming soon.
        </CardContent>
      </Card>
    </div>
  );
}
