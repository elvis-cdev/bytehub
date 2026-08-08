"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { createPost } from "@/actions/posts";
import { toast } from "sonner";
import { Loader2, Send, ImagePlus } from "lucide-react";
import { useRouter } from "next/navigation";

export function PostComposer() {
  const router = useRouter();
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [showImageInput, setShowImageInput] = useState(false);
  const [posting, setPosting] = useState(false);

  async function handlePost() {
    if (!content.trim()) return;
    setPosting(true);
    try {
      await createPost(content, imageUrl);
      setContent("");
      setImageUrl("");
      setShowImageInput(false);
      toast.success("Posted!");
      router.refresh();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Failed to post");
    } finally {
      setPosting(false);
    }
  }

  return (
    <div className="rounded-xl border bg-background p-4 space-y-3">
      <Textarea
        placeholder="Share a project milestone, an idea, or something you're proud of..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        rows={3}
      />
      {showImageInput && (
        <Input
          placeholder="Paste an image URL..."
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
        />
      )}
      <div className="flex justify-between items-center">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setShowImageInput((v) => !v)}
        >
          <ImagePlus className="h-4 w-4 mr-2" />
          {showImageInput ? "Remove image" : "Add image"}
        </Button>
        <Button onClick={handlePost} disabled={posting || !content.trim()}>
          {posting ? (
            <Loader2 className="h-4 w-4 animate-spin mr-2" />
          ) : (
            <Send className="h-4 w-4 mr-2" />
          )}
          Post
        </Button>
      </div>
    </div>
  );
}
