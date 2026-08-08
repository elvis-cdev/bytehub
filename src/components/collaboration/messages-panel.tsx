"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { sendMessage, getMessages } from "@/actions/collaboration";
import { Send } from "lucide-react";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  content: string;
  createdAt: Date;
  sender: { id: string; name: string; image: string | null };
}

export function MessagesPanel({
  projectId,
  currentUserId,
  initialMessages,
}: {
  projectId: string;
  currentUserId: string;
  initialMessages: Message[];
}) {
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState("");
  const [isPending, startTransition] = useTransition();
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(async () => {
      const fresh = await getMessages(projectId);
      setMessages(fresh);
    }, 5000);
    return () => clearInterval(interval);
  }, [projectId]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  function handleSend() {
    const trimmed = input.trim();
    if (!trimmed) return;
    setInput("");
    startTransition(async () => {
      await sendMessage(projectId, trimmed);
      const fresh = await getMessages(projectId);
      setMessages(fresh);
    });
  }

  return (
    <div className="flex flex-col h-[500px] rounded-xl border bg-background">
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.length === 0 ? (
          <p className="text-center text-sm text-muted-foreground py-8">
            No messages yet. Say hello 👋
          </p>
        ) : (
          messages.map((msg) => {
            const mine = msg.sender.id === currentUserId;
            return (
              <div
                key={msg.id}
                className={cn("flex items-end gap-2", mine && "flex-row-reverse")}
              >
                <Avatar className="h-7 w-7 shrink-0">
                  <AvatarFallback className="text-xs">
                    {msg.sender.name.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div
                  className={cn(
                    "max-w-[75%] rounded-2xl px-4 py-2 text-sm",
                    mine
                      ? "bg-primary text-primary-foreground rounded-br-sm"
                      : "bg-muted rounded-bl-sm"
                  )}
                >
                  {msg.content}
                </div>
              </div>
            );
          })
        )}
        <div ref={bottomRef} />
      </div>
      <div className="flex gap-2 border-t p-3">
        <Input
          placeholder="Type a message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleSend();
            }
          }}
        />
        <Button size="icon" onClick={handleSend} disabled={isPending}>
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
