"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import {
  Bell,
  Moon,
  Search,
  Sun,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import MobileNav from "./MobileNav";

interface TopbarProps {
  role: "developer" | "company" | "admin";
  portalLabel: string;
  user: {
    name: string;
    email: string;
    image?: string;
  };
}

export default function Topbar({
  role,
  portalLabel,
  user,
}: TopbarProps) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  const initials =
    user.name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() || "BH";

  return (
    <header className="sticky top-0 z-30 flex h-[72px] items-center justify-between border-b bg-background/95 px-4 backdrop-blur sm:px-6 lg:px-8">
      <div className="flex min-w-0 items-center gap-3">
        <MobileNav
          role={role}
          portalLabel={portalLabel}
          user={user}
        />

        <div className="hidden min-w-0 md:block">
          <p className="truncate text-sm font-medium">
            {portalLabel}
          </p>
        </div>

        <div className="relative hidden w-[280px] lg:block xl:w-[360px]">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

          <input
            type="search"
            placeholder="Search projects, applications..."
            className="h-10 w-full rounded-xl border bg-muted/40 pl-9 pr-4 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-2">
        {mounted && (
          <button
            type="button"
            onClick={() =>
              setTheme(theme === "dark" ? "light" : "dark")
            }
            className="flex h-10 w-10 items-center justify-center rounded-xl border bg-background transition hover:bg-muted"
            title="Toggle theme"
          >
            {theme === "dark" ? (
              <Sun className="h-[18px] w-[18px]" />
            ) : (
              <Moon className="h-[18px] w-[18px]" />
            )}
          </button>
        )}

        <button
          type="button"
          className="relative flex h-10 w-10 items-center justify-center rounded-xl border bg-background transition hover:bg-muted"
          title="Notifications"
        >
          <Bell className="h-[18px] w-[18px]" />

          <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-primary" />
        </button>

        <div className="ml-1 hidden h-8 w-px bg-border sm:block" />

        <div className="flex items-center gap-3 pl-1">
          <Avatar className="h-10 w-10 border">
            <AvatarImage src={user.image} alt={user.name} />

            <AvatarFallback className="bg-primary/10 font-semibold text-primary">
              {initials}
            </AvatarFallback>
          </Avatar>

          <div className="hidden max-w-[150px] md:block">
            <p className="truncate text-sm font-semibold">
              {user.name}
            </p>

            <p className="truncate text-xs text-muted-foreground">
              {user.email}
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}
