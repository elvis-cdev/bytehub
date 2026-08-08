import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface ProfileHeaderProps {
  name: string;
  role: string;
  image?: string;
}

export default function ProfileHeader({ name, role, image }: ProfileHeaderProps) {
  return (
    <div className="rounded-xl border bg-background p-6">
      <div className="flex items-center gap-5">
        <Avatar className="h-20 w-20">
          <AvatarImage src={image} />
          <AvatarFallback className="text-3xl font-bold bg-primary text-primary-foreground">
            {name.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div>
          <h1 className="text-3xl font-bold">{name}</h1>
          <p className="text-muted-foreground">{role}</p>
        </div>
      </div>
    </div>
  );
}
