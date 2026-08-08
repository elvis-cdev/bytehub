import SidebarNav from "./SidebarNav";

interface SidebarProps {
  role: "developer" | "company";
  portalLabel: string;
  user: { name: string; email: string; image?: string };
}
export default function Sidebar({ role, portalLabel, user }: SidebarProps) {
  return (
    <aside className="hidden w-72 border-r bg-background lg:flex lg:flex-col">
      <SidebarNav role={role} portalLabel={portalLabel} user={user} />
    </aside>
  );
}
