"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu } from "lucide-react";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { Button } from "@/components/ui/button";
import SidebarNav from "./SidebarNav";

interface MobileNavProps {
  role: "developer" | "company" | "admin";
  portalLabel: string;
  user: {
    name: string;
    email: string;
    image?: string;
  };
}

export default function MobileNav({
  role,
  portalLabel,
  user,
}: MobileNavProps) {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger>
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden"
          aria-label="Open navigation"
        >
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>

      <SheetContent
        side="left"
        className="w-[280px] p-0 sm:w-[320px]"
      >
        <SheetHeader className="border-b px-6 py-5 text-left">
          <SheetTitle className="text-left">
            <Link
              href="/"
              onClick={() => setOpen(false)}
              className="flex items-center gap-2"
            >
              <span className="text-lg font-bold">
                ByteHub
              </span>
            </Link>
          </SheetTitle>
        </SheetHeader>

        <div
          className="h-[calc(100vh-81px)] overflow-y-auto"
          onClick={(event) => {
            const target = event.target as HTMLElement;

            if (target.closest("a")) {
              setOpen(false);
            }
          }}
        >
          <SidebarNav
            role={role}
            portalLabel={portalLabel}
            user={user}
          />
        </div>
      </SheetContent>
    </Sheet>
  );
}
