"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { postProjectUpdate } from "@/actions/collaboration";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { formatDistanceToNow } from "@/lib/format-time";

interface Update {
  id: string;
  content: string;
  progress: number | null;
  createdAt: Date;
  author: { name: string; image: string | null };
}

export function UpdatesPanel({
  projectId,
  canPost,
  initialUpdates,
}: {
  projectId: string;
  canPost: boolean;
  initialUpdates: Update[];
}) {
  const [updates, setUpdates] = useState(initialUpdates);
  const [content, setContent] = useState("");
  const [progress, setProgress] = useState("");
  const [posting, setPosting] = useState(false);

  async function handlePost() {
    if (!content.trim()) return;
    setPosting(true);
    try {
      await postProjectUpdate(
        projectId,
        content,
        progress ? Number(progress) : undefined
      );
      setUpdates([
        {
          id: crypto.randomUUID(),
          content,
          progress: progress ? Number(progress) : null,
          createdAt: new Date(),
          author: { name: "You", image: null },
        },
        ...updates,
      ]);
      setContent("");
      setProgress("");
      toast.success("Update posted");
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Failed to post update");
    } finally {
      setPosting(false);
    }
  }

  return (
    <div className="space-y-4">
      {canPost && (
        <div className="rounded-xl border bg-background p-4 space-y-3">
          <Textarea
            placeholder="What did you work on?"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={3}
          />
          <div className="flex items-center gap-3">
            <Input
              type="number"
              min={0}
              max={100}
              placeholder="Progress % (optional)"
              value={progress}
              onChange={(e) => setProgress(e.target.value)}
              className="w-48"
            />
            <Button onClick={handlePost} disabled={posting} className="ml-auto">
              {posting ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
              Post Update
            </Button>
          </div>
        </div>
      )}

      <div className="space-y-3">
        {updates.length === 0 ? (
          <p className="text-center text-sm text-muted-foreground py-8">
            No updates posted yet.
          </p>
        ) : (
          updates.map((update) => (
            <div key={update.id} className="rounded-xl border bg-background p-4">
              <div className="flex items-center gap-2 mb-2">
                <Avatar className="h-6 w-6">
                  <AvatarFallback className="text-xs">
                    {update.author.name.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <span className="text-sm font-medium">{update.author.name}</span>
                <span className="text-xs text-muted-foreground ml-auto">
                  {formatDistanceToNow(update.createdAt)}
                </span>
              </div>
              <p className="text-sm">{update.content}</p>
              {update.progress !== null && (
                <div className="mt-3">
                  <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
                    <span>Progress</span>
                    <span>{update.progress}%</span>
                  </div>
                  <div className="h-2 rounded-full bg-muted overflow-hidden">
                    <div
                      className="h-full bg-primary transition-all"
                      style={{ width: `${update.progress}%` }}
                    />
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
