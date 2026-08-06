"use client";

interface ActivityItemProps {
  text: string;
  time: string;
}

export default function ActivityItem({
  text,
  time,
}: ActivityItemProps) {
  return (
    <div className="flex items-center justify-between rounded-lg border p-4">
      <p className="text-sm">
        {text}
      </p>

      <span className="text-xs text-muted-foreground">
        {time}
      </span>
    </div>
  );
}
