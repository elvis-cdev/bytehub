"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

interface EmptyStateProps {
  title: string;
  description: string;
  buttonText?: string;
  buttonHref?: string;
}

export default function EmptyState({
  title,
  description,
  buttonText,
  buttonHref,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-dashed p-10 text-center">
      <h2 className="text-2xl font-semibold">{title}</h2>

      <p className="mt-2 max-w-md text-sm text-muted-foreground">
        {description}
      </p>

      {buttonText && buttonHref && (
        <Button asChild className="mt-6">
          <Link href={buttonHref}>{buttonText}</Link>
        </Button>
      )}
    </div>
  );
}
