interface ProfileHeaderProps {
  name: string;
  role: string;
}

export default function ProfileHeader({
  name,
  role,
}: ProfileHeaderProps) {
  return (
    <div className="rounded-xl border bg-background p-6">
      <div className="flex items-center gap-5">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary text-3xl font-bold text-primary-foreground">
          {name.charAt(0)}
        </div>

        <div>
          <h1 className="text-3xl font-bold">{name}</h1>

          <p className="text-muted-foreground">{role}</p>
        </div>
      </div>
    </div>
  );
}
