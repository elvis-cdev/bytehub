"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toggleLike } from "@/actions/posts";
import { getComments, createComment } from "@/actions/comments";
import { formatDistanceToNow } from "@/lib/format-time";
import { Heart, MessageCircle, Send, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface Post {
  id: string;
  content: string;
  imageUrl: string | null;
  createdAt: Date;
  author: { id: string; name: string; image: string | null; role: string };
  likedByMe: boolean;
  _count: { likes: number; comments: number };
}

interface Comment {
  id: string;
  content: string;
  createdAt: Date;
  author: { id: string; name: string; image: string | null; role: string };
}

export function PostCard({
  post,
  currentUserId,
}: {
  post: Post;
  currentUserId: string;
}) {
  const [liked, setLiked] = useState(post.likedByMe);
  const [count, setCount] = useState(post._count.likes);

  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState<Comment[]>([]);
  const [commentsLoaded, setCommentsLoaded] = useState(false);
  const [loadingComments, setLoadingComments] = useState(false);
  const [commentCount, setCommentCount] = useState(post._count.comments);
  const [newComment, setNewComment] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleLike() {
    setLiked((prev) => !prev);
    setCount((prev) => (liked ? prev - 1 : prev + 1));
    try {
      await toggleLike(post.id);
    } catch {
      setLiked((prev) => !prev);
      setCount((prev) => (liked ? prev + 1 : prev - 1));
    }
  }

  async function handleToggleComments() {
    const next = !showComments;
    setShowComments(next);
    if (next && !commentsLoaded) {
      setLoadingComments(true);
      try {
        const data = await getComments(post.id);
        setComments(data);
        setCommentsLoaded(true);
      } finally {
        setLoadingComments(false);
      }
    }
  }

  async function handleSubmitComment() {
    if (!newComment.trim()) return;
    setSubmitting(true);
    try {
      const comment = await createComment(post.id, newComment);
      setComments((prev) => [...prev, comment]);
      setCommentCount((prev) => prev + 1);
      setNewComment("");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="rounded-xl border bg-background p-5">
      <div className="flex items-center gap-3 mb-3">
        <Avatar>
          <AvatarImage src={post.author.image ?? undefined} />
          <AvatarFallback>{post.author.name.slice(0, 2).toUpperCase()}</AvatarFallback>
        </Avatar>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <p className="font-medium truncate">{post.author.name}</p>
            <Badge variant="secondary" className="text-xs">
              {post.author.role === "CLIENT" ? "Company" : "Developer"}
            </Badge>
          </div>
          <p className="text-xs text-muted-foreground">
            {formatDistanceToNow(post.createdAt)}
          </p>
        </div>
      </div>

      <p className="text-sm whitespace-pre-wrap mb-4">{post.content}</p>

      {post.imageUrl && (
        <img
          src={post.imageUrl}
          alt=""
          className="rounded-lg mb-4 max-h-96 w-full object-cover border"
        />
      )}

      <div className="flex items-center gap-4">
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={handleLike}
          className={cn(
            "flex items-center gap-1.5 text-sm transition-colors",
            liked ? "text-red-500" : "text-muted-foreground hover:text-red-500"
          )}
        >
          <Heart className={cn("h-4 w-4", liked && "fill-current")} />
          {count > 0 ? count : ""} {count === 1 ? "Like" : "Likes"}
        </motion.button>

        <button
          onClick={handleToggleComments}
          className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <MessageCircle className="h-4 w-4" />
          {commentCount > 0 ? commentCount : ""}{" "}
          {commentCount === 1 ? "Comment" : "Comments"}
        </button>
      </div>

      {showComments && (
        <div className="mt-4 pt-4 border-t space-y-3">
          {loadingComments && (
            <div className="flex justify-center py-2">
              <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
            </div>
          )}

          {!loadingComments &&
            comments.map((comment) => (
              <div key={comment.id} className="flex gap-2.5">
                <Avatar className="h-7 w-7">
                  <AvatarImage src={comment.author.image ?? undefined} />
                  <AvatarFallback className="text-xs">
                    {comment.author.name.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0 bg-muted/50 rounded-lg px-3 py-2">
                  <div className="flex items-center gap-2">
                    <p className="text-xs font-medium">{comment.author.name}</p>
                    <p className="text-[10px] text-muted-foreground">
                      {formatDistanceToNow(comment.createdAt)}
                    </p>
                  </div>
                  <p className="text-sm whitespace-pre-wrap">{comment.content}</p>
                </div>
              </div>
            ))}

          <div className="flex gap-2 pt-1">
            <Input
              placeholder="Write a comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSubmitComment();
                }
              }}
              className="h-9"
            />
            <Button
              size="sm"
              className="h-9"
              onClick={handleSubmitComment}
              disabled={submitting || !newComment.trim()}
            >
              {submitting ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Send className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
