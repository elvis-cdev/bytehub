interface ActivityItemProps {
  text: string;
  time: string;
}

export default function ActivityItem({
  text,
  time,
}: ActivityItemProps) {
  return (
    <div className="flex items-center justify-between border-b py-4 last:border-none">
      <p>{text}</p>

      <span className="text-sm text-muted-foreground">
        {time}
      </span>
    </div>
  );
}
