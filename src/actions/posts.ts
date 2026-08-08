"use server";

import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";

async function requireSession() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user) throw new Error("Unauthorized");
  return session;
}

export async function createPost(content: string) {
  const session = await requireSession();

  if (!content.trim()) throw new Error("Post can't be empty");

  const post = await prisma.post.create({
    data: {
      authorId: session.user.id,
      content: content.trim(),
    },
  });

  revalidatePath("/feed");
  return post;
}

export async function getFeed() {
  const session = await requireSession();

  const posts = await prisma.post.findMany({
    orderBy: { createdAt: "desc" },
    take: 50,
    include: {
      author: { select: { id: true, name: true, image: true, role: true } },
      likes: { select: { userId: true } },
      _count: { select: { likes: true } },
    },
  });

  return posts.map((post) => ({
    ...post,
    likedByMe: post.likes.some((l) => l.userId === session.user.id),
  }));
}

export async function toggleLike(postId: string) {
  const session = await requireSession();

  const existing = await prisma.postLike.findUnique({
    where: { postId_userId: { postId, userId: session.user.id } },
  });

  if (existing) {
    await prisma.postLike.delete({ where: { id: existing.id } });
  } else {
    await prisma.postLike.create({
      data: { postId, userId: session.user.id },
    });
  }

  revalidatePath("/feed");
}
