"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { developerNavigation, companyNavigation, adminNavigation } from "@/constants/navigation";
import NavItem from "./components/NavItem";
import UserMenu from "./components/UserMenu";

interface SidebarNavProps {
  role: "developer" | "company" | "admin";
  portalLabel: string;
  user: { name: string; email: string; image?: string };
  onNavigate?: () => void;
}

export default function SidebarNav({ role, portalLabel, user, onNavigate }: SidebarNavProps) {
  const pathname = usePathname();
  const navigation = role === "admin" ? adminNavigation : role === "company" ? companyNavigation : developerNavigation;
  return (
    <div className="flex h-full flex-col">
      <div className="border-b px-6 py-5">
        <Link href="/" className="text-2xl font-bold tracking-tight">
          ByteHub
        </Link>
        <p className="mt-1 text-sm text-muted-foreground">{portalLabel}</p>
      </div>
      <nav className="flex-1 space-y-2 p-4">
        {navigation.map((item) => (
          <div key={item.href} onClick={onNavigate}>
            <NavItem
              href={item.href}
              label={item.label}
              icon={item.icon}
              active={pathname === item.href}
            />
          </div>
        ))}
      </nav>
      <div className="border-t p-4">
        <UserMenu name={user.name} email={user.email} image={user.image} />
      </div>
    </div>
  );
}
