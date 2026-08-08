"use client";

interface ProfileCompletionProps {
  value: number;
}

export default function ProfileCompletion({
  value,
}: ProfileCompletionProps) {
  return (
    <div className="rounded-xl border p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="font-semibold">
          Profile Completion
        </h2>

        <span className="text-sm font-medium">
          {value}%
        </span>
      </div>

      <div className="h-3 rounded-full bg-muted overflow-hidden">
        <div
          className="h-full rounded-full bg-primary transition-all"
          style={{ width: `${value}%` }}
        />
      </div>

      <p className="text-sm text-muted-foreground">
        Complete your profile to appear higher in search results.
      </p>
    </div>
  );
}
