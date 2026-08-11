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
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const user = {
    name: session?.user.name ?? "Guest",
    email: session?.user.email ?? "",
    image: session?.user.image ?? undefined,
  };

  return (
    <div className="flex min-h-screen bg-muted/30">
      <Sidebar
        role={role}
        portalLabel={portalLabel}
        user={user}
      />

      <div className="flex min-w-0 flex-1 flex-col">
        <Topbar
          role={role}
          portalLabel={portalLabel}
          user={user}
        />

        <main className="flex-1">
          <div className="mx-auto w-full max-w-[1600px] px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
