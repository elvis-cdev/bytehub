"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { developerNavigation, companyNavigation } from "@/constants/navigation";
import NavItem from "./components/NavItem";
import UserMenu from "./components/UserMenu";

interface SidebarProps {
  role: "developer" | "company";
  portalLabel: string;
  user: { name: string; email: string; image?: string };
}

export default function Sidebar({ role, portalLabel, user }: SidebarProps) {
  const pathname = usePathname();
  const navigation = role === "company" ? companyNavigation : developerNavigation;

  return (
    <aside className="hidden w-72 border-r bg-background lg:flex lg:flex-col">
      <div className="border-b px-6 py-5">
        <Link href="/" className="text-2xl font-bold tracking-tight">
          ByteHub
        </Link>
        <p className="mt-1 text-sm text-muted-foreground">{portalLabel}</p>
      </div>

      <nav className="flex-1 space-y-2 p-4">
        {navigation.map((item) => (
          <NavItem
            key={item.href}
            href={item.href}
            label={item.label}
            icon={item.icon}
            active={pathname === item.href}
          />
        ))}
      </nav>

      <div className="border-t p-4">
        <UserMenu name={user.name} email={user.email} image={user.image} />
      </div>
    </aside>
  );
}
