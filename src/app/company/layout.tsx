import type { ReactNode } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";

export default function CompanyLayout({ children }: { children: ReactNode }) {
  return (
    <DashboardLayout role="company" portalLabel="Company Portal">
      {children}
    </DashboardLayout>
  );
}
