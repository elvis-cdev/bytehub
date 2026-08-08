"use client";
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MessagesPanel } from "@/components/collaboration/messages-panel";
import { MessageSquare } from "lucide-react";
import { cn } from "@/lib/utils";

interface Conversation {
  projectId: string;
  projectTitle: string;
  otherParty: { id: string; name: string; image: string | null };
  lastMessage: string | null;
  lastMessageAt: Date;
}

export function MessagesInbox({
  conversations,
  currentUserId,
}: {
  conversations: Conversation[];
  currentUserId: string;
}) {
  const [selected, setSelected] = useState<Conversation | null>(conversations[0] ?? null);

  if (conversations.length === 0) {
    return (
      <div className="rounded-xl border border-dashed p-12 text-center text-muted-foreground">
        <MessageSquare className="mx-auto h-8 w-8 mb-3 opacity-50" />
        <p>No conversations yet.</p>
        <p className="text-sm mt-1">
          Messages appear here once a project has an accepted developer.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-[280px_1fr]">
      <div className="space-y-1">
        {conversations.map((conv) => (
          <button
            key={conv.projectId}
            onClick={() => setSelected(conv)}
            className={cn(
              "w-full flex items-center gap-3 rounded-lg p-3 text-left transition",
              selected?.projectId === conv.projectId ? "bg-accent" : "hover:bg-muted"
            )}
          >
            <Avatar className="h-9 w-9 shrink-0">
              <AvatarImage src={conv.otherParty.image ?? undefined} />
              <AvatarFallback className="text-xs">
                {conv.otherParty.name.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium truncate">{conv.otherParty.name}</p>
              <p className="text-xs text-muted-foreground truncate">{conv.projectTitle}</p>
              {conv.lastMessage && (
                <p className="text-xs text-muted-foreground truncate mt-0.5">{conv.lastMessage}</p>
              )}
            </div>
          </button>
        ))}
      </div>

      <div>
        {selected && (
          <>
            <p className="text-sm font-medium mb-2">{selected.projectTitle}</p>
            <MessagesPanel
              key={selected.projectId}
              projectId={selected.projectId}
              currentUserId={currentUserId}
              initialMessages={[]}
            />
          </>
        )}
      </div>
    </div>
  );
}
