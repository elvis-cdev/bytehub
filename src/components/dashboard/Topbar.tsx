"use client";
import { useState } from "react";
import { Bell, Menu } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import SidebarNav from "./SidebarNav";

interface TopbarProps {
  role: "developer" | "company" | "admin";
  portalLabel: string;
  user: { name: string; email: string; image?: string };
}

export default function Topbar({ role, portalLabel, user }: TopbarProps) {
  const [open, setOpen] = useState(false);
  return (
    <header className="flex h-16 items-center justify-between gap-3 border-b bg-background px-4 sm:px-6">
      <div className="flex items-center gap-3 flex-1 min-w-0">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger
            className="rounded-lg border p-2 transition hover:bg-muted lg:hidden shrink-0"
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </SheetTrigger>
          <SheetContent side="left" className="w-72 p-0">
            <SidebarNav
              role={role}
              portalLabel={portalLabel}
              user={user}
              onNavigate={() => setOpen(false)}
            />
          </SheetContent>
        </Sheet>
        <div className="w-full max-w-sm hidden sm:block">
          <Input placeholder="Search projects..." />
        </div>
      </div>
      <button className="rounded-lg border p-2 transition hover:bg-muted shrink-0" aria-label="Notifications">
        <Bell className="h-5 w-5" />
      </button>
    </header>
  );
}
