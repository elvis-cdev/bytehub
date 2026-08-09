"use client";
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { adminSuspendUser } from "@/actions/admin";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

interface UserRowData {
  id: string;
  name: string;
  email: string;
  role: string;
  image: string | null;
  emailVerified: boolean;
  createdAt: Date;
  _count: { applications: number; Project: number };
}

export function UserRow({ user }: { user: UserRowData }) {
  const [loading, setLoading] = useState(false);

  async function handleSuspend() {
    if (!confirm(`Log ${user.name} out of all active sessions?`)) return;
    setLoading(true);
    try {
      await adminSuspendUser(user.id);
      toast.success("Sessions revoked");
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex items-center gap-4 rounded-lg border p-4">
      <Avatar>
        <AvatarImage src={user.image ?? undefined} />
        <AvatarFallback>{user.name.slice(0, 2).toUpperCase()}</AvatarFallback>
      </Avatar>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <p className="font-medium truncate">{user.name}</p>
          <Badge variant="secondary" className="text-xs">{user.role}</Badge>
          {!user.emailVerified && (
            <Badge variant="outline" className="text-xs text-muted-foreground">Unverified</Badge>
          )}
        </div>
        <p className="text-sm text-muted-foreground truncate">{user.email}</p>
      </div>
      <div className="text-xs text-muted-foreground text-right shrink-0">
        {user.role === "DEVELOPER" ? `${user._count.applications} applications` : `${user._count.Project} projects`}
      </div>
      <Button size="sm" variant="outline" onClick={handleSuspend} disabled={loading}>
        {loading ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : "Revoke sessions"}
      </Button>
    </div>
  );
}
