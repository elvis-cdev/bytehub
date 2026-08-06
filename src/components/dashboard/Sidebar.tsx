"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { developerNavigation } from "@/constants/navigation";
import NavItem from "./components/NavItem";
import UserMenu from "./components/UserMenu";

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden w-72 border-r bg-background lg:flex lg:flex-col">
      {/* Logo */}
      <div className="border-b px-6 py-5">
        <Link href="/" className="text-2xl font-bold tracking-tight">
          ByteHub
        </Link>

        <p className="mt-1 text-sm text-muted-foreground">
          Developer Portal
        </p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-2 p-4">
        {developerNavigation.map((item) => (
          <NavItem
            key={item.href}
            href={item.href}
            label={item.label}
            icon={item.icon}
            active={pathname === item.href}
          />
        ))}
      </nav>

      {/* User */}
      <div className="border-t p-4">
        <UserMenu />
      </div>
    </aside>
  );
}
