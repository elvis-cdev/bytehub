"use client";

import { UserRound } from "lucide-react";

export default function UserMenu() {
  return (
    <button className="flex w-full items-center gap-3 rounded-lg border p-3 hover:bg-muted transition">
      <UserRound className="h-5 w-5" />

      <div className="text-left">
        <p className="font-medium">Guest User</p>
        <p className="text-xs text-muted-foreground">
          guest@bytehub.dev
        </p>
      </div>
    </button>
  );
}
