import { getAllProjectsAdmin } from "@/actions/admin";
import PageHeader from "@/components/dashboard/components/PageHeader";
import { AdminProjectRow } from "@/components/admin/AdminProjectRow";
export default async function AdminProjectsPage() {
  const projects = await getAllProjectsAdmin();
  return (
    <div className="space-y-8">
      <PageHeader title="Projects" description={`${projects.length} total projects`} />
      <div className="space-y-3">
        {projects.map((project) => (
          <AdminProjectRow key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
}
