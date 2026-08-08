import { getFeed } from "@/actions/posts";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { PageHeader } from "@/components/dashboard";
import { PostComposer } from "@/components/feed/post-composer";
import { PostCard } from "@/components/feed/post-card";

export default async function FeedPage() {
  const session = await auth.api.getSession({ headers: await headers() });
  const posts = await getFeed();

  return (
    <div className="mx-auto max-w-2xl space-y-8">
      <PageHeader
        title="Feed"
        description="See what the ByteHub community is building and sharing."
      />

      <PostComposer />

      <div className="space-y-4">
        {posts.length === 0 ? (
          <p className="text-center text-muted-foreground py-12">
            No posts yet. Be the first to share something!
          </p>
        ) : (
          posts.map((post) => (
            <PostCard key={post.id} post={post} currentUserId={session?.user.id ?? ""} />
          ))
        )}
      </div>
    </div>
  );
}
