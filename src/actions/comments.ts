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

export async function getComments(postId: string) {
  await requireSession();

  const comments = await prisma.comment.findMany({
    where: { postId },
    orderBy: { createdAt: "asc" },
    include: {
      author: { select: { id: true, name: true, image: true, role: true } },
    },
  });

  return comments;
}

export async function createComment(postId: string, content: string) {
  const session = await requireSession();

  if (!content.trim()) throw new Error("Comment can't be empty");

  const comment = await prisma.comment.create({
    data: {
      postId,
      authorId: session.user.id,
      content: content.trim(),
    },
    include: {
      author: { select: { id: true, name: true, image: true, role: true } },
    },
  });

  revalidatePath("/feed");
  return comment;
}

export async function deleteComment(commentId: string) {
  const session = await requireSession();

  const comment = await prisma.comment.findUnique({
    where: { id: commentId },
  });

  if (!comment) throw new Error("Comment not found");
  if (comment.authorId !== session.user.id) throw new Error("Unauthorized");

  await prisma.comment.delete({ where: { id: commentId } });

  revalidatePath("/feed");
}
