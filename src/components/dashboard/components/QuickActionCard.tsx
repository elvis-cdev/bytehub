"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface QuickActionCardProps {
  title: string;
  description: string;
  href: string;
}

export default function QuickActionCard({
  title,
  description,
  href,
}: QuickActionCardProps) {
  return (
    <Link
      href={href}
      className="group rounded-xl border bg-background p-5 transition-all hover:border-primary hover:shadow-md"
    >
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-lg">
          {title}
        </h3>

        <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
      </div>

      <p className="mt-2 text-sm text-muted-foreground">
        {description}
      </p>
    </Link>
  );
}
