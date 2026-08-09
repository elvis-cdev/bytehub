import type { ReactNode } from "react";
import { redirect } from "next/navigation";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { checkAdminAccess } from "@/actions/admin-auth";

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const access = await checkAdminAccess();

  if (access.reason === "no-session") {
    redirect("/login");
  }
  if (access.reason === "not-allowlisted") {
    redirect("/");
  }
  if (access.reason === "needs-verification") {
    redirect("/admin/verify");
  }

  return (
    <DashboardLayout role="admin" portalLabel="Admin Portal">
      {children}
    </DashboardLayout>
  );
}
