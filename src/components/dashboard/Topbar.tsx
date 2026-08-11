"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Bell, Moon, Sun } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface TopbarProps {
  role: "developer" | "company" | "admin";
  portalLabel: string;
  user: { name: string; email: string; image?: string };
}

export default function Topbar({ portalLabel, user }: TopbarProps) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- standard next-themes hydration guard
    setMounted(true);
  }, []);

  return (
    <header className="flex h-16 items-center justify-between border-b bg-background px-4 sm:px-6">
      <div className="flex items-center gap-4 min-w-0">
        <span className="hidden sm:block text-sm font-medium text-muted-foreground truncate">
          {portalLabel}
        </span>
        <div className="w-full max-w-sm hidden md:block">
          <Input placeholder="Search projects..." />
        </div>
      </div>

      <div className="flex items-center gap-2 shrink-0">
        {mounted && (
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="rounded-lg border p-2 transition hover:bg-muted"
            title="Toggle theme"
          >
            {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>
        )}

        <button className="rounded-lg border p-2 transition hover:bg-muted">
          <Bell className="h-5 w-5" />
        </button>

        <Avatar className="h-9 w-9">
          <AvatarImage src={user.image} />
          <AvatarFallback>{user.name.slice(0, 2).toUpperCase()}</AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}
