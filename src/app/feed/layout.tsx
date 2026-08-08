import type { ReactNode } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export default async function FeedLayout({ children }: { children: ReactNode }) {
  const session = await auth.api.getSession({ headers: await headers() });
  const isCompany = (session?.user as { role?: string })?.role === "CLIENT";

  return (
    <DashboardLayout
      role={isCompany ? "company" : "developer"}
      portalLabel={isCompany ? "Company Portal" : "Developer Portal"}
    >
      {children}
    </DashboardLayout>
  );
}
