"use client";

import { Bell } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function Topbar() {
  return (
    <header className="flex h-16 items-center justify-between border-b bg-background px-6">
      <div className="w-full max-w-sm">
        <Input placeholder="Search projects..." />
      </div>

      <button className="rounded-lg border p-2 transition hover:bg-muted">
        <Bell className="h-5 w-5" />
      </button>
    </header>
  );
}
