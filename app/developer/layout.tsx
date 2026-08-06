import type { ReactNode } from "react";

import DashboardLayout from "@/components/dashboard/DashboardLayout";

interface DeveloperLayoutProps {
  children: ReactNode;
}

export default function DeveloperLayout({
  children,
}: DeveloperLayoutProps) {
  return <DashboardLayout>{children}</DashboardLayout>;
}
