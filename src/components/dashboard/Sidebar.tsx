import SidebarNav from "./SidebarNav";

interface SidebarProps {
  role: "developer" | "company" | "admin";
  portalLabel: string;
  user: {
    name: string;
    email: string;
    image?: string;
  };
}

export default function Sidebar({
  role,
  portalLabel,
  user,
}: SidebarProps) {
  return (
    <aside className="sticky top-0 hidden h-screen w-72 shrink-0 border-r bg-background lg:flex lg:flex-col">
      <SidebarNav
        role={role}
        portalLabel={portalLabel}
        user={user}
      />
    </aside>
  );
}
