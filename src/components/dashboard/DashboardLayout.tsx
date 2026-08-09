import { ReactNode } from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
interface DashboardLayoutProps {
  children: ReactNode;
  role: "developer" | "company" | "admin";
  portalLabel: string;
}
export default async function DashboardLayout({
  children,
  role,
  portalLabel,
}: DashboardLayoutProps) {
  const session = await auth.api.getSession({ headers: await headers() });
  const user = {
    name: session?.user.name ?? "Guest",
    email: session?.user.email ?? "",
    image: session?.user.image ?? undefined,
  };
  return (
    <div className="flex min-h-screen bg-muted/20">
      <Sidebar role={role} portalLabel={portalLabel} user={user} />
      <div className="flex flex-1 flex-col min-w-0">
        <Topbar role={role} portalLabel={portalLabel} user={user} />
        <main className="flex-1 p-4 sm:p-8">{children}</main>
      </div>
    </div>
  );
}
