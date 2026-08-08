"use client";

interface NotificationCardProps {
  title: string;
  time: string;
}

export default function NotificationCard({
  title,
  time,
}: NotificationCardProps) {
  return (
    <div className="flex items-center justify-between rounded-lg border p-4">
      <div>
        <p className="font-medium">
          {title}
        </p>

        <p className="text-xs text-muted-foreground">
          {time}
        </p>
      </div>
    </div>
  );
}
