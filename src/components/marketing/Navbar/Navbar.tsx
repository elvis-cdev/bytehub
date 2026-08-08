"use client";

import Link from "next/link";

import { navigation } from "@/constants/navigation";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  return (
    <nav className="w-full border-b bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <img
            src="/logo.png"
            alt="ByteHub Logo"
            className="h-11 w-11 rounded-lg object-contain"
            loading="eager"
          />

          <span className="text-xl font-bold tracking-tight">
            ByteHub
          </span>
        </Link>


        {/* Navigation Links */}
        <div className="hidden items-center gap-8 md:flex">
          {navigation.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="text-sm font-medium text-gray-600 transition hover:text-black"
            >
              {item.label}
            </Link>
          ))}
        </div>


        {/* Actions */}
        <div className="flex items-center gap-3">
          <Link href="/login">
            <Button variant="ghost">
              Login
            </Button>
          </Link>

          <Link href="/register">
            <Button>
              Get Started
            </Button>
          </Link>
        </div>

      </div>
    </nav>
  );
}
