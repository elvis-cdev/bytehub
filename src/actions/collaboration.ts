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

async function assertProjectAccess(projectId: string, userId: string) {
  const project = await prisma.project.findUnique({
    where: { id: projectId },
    include: {
      applications: {
        where: { status: "ACCEPTED" },
        select: { developerId: true },
      },
    },
  });

  if (!project) throw new Error("Project not found");

  const isOwner = project.ownerId === userId;
  const isAcceptedDeveloper = project.applications.some(
    (a) => a.developerId === userId
  );

  if (!isOwner && !isAcceptedDeveloper) throw new Error("Unauthorized");

  return { project, isOwner, isAcceptedDeveloper };
}

export async function postProjectUpdate(
  projectId: string,
  content: string,
  progress?: number
) {
  const session = await requireSession();
  const { isAcceptedDeveloper } = await assertProjectAccess(projectId, session.user.id);

  if (!isAcceptedDeveloper) {
    throw new Error("Only the assigned developer can post updates");
  }

  const update = await prisma.projectUpdate.create({
    data: {
      projectId,
      authorId: session.user.id,
      content: content.trim(),
      progress,
    },
  });

  if (progress !== undefined) {
    await prisma.project.update({
      where: { id: projectId },
      data: { status: progress >= 100 ? "COMPLETED" : "IN_PROGRESS" },
    });
  }

  revalidatePath(`/company/projects/${projectId}`);
  revalidatePath(`/developer/projects/${projectId}`);
  return update;
}

export async function getProjectUpdates(projectId: string) {
  const session = await requireSession();
  await assertProjectAccess(projectId, session.user.id);

  return prisma.projectUpdate.findMany({
    where: { projectId },
    orderBy: { createdAt: "desc" },
    include: { author: { select: { name: true, image: true } } },
  });
}

export async function sendMessage(projectId: string, content: string) {
  const session = await requireSession();
  await assertProjectAccess(projectId, session.user.id);

  if (!content.trim()) throw new Error("Message can't be empty");

  const message = await prisma.message.create({
    data: {
      projectId,
      senderId: session.user.id,
      content: content.trim(),
    },
  });

  revalidatePath(`/company/projects/${projectId}`);
  revalidatePath(`/developer/projects/${projectId}`);
  return message;
}

export async function getMessages(projectId: string) {
  const session = await requireSession();
  await assertProjectAccess(projectId, session.user.id);

  return prisma.message.findMany({
    where: { projectId },
    orderBy: { createdAt: "asc" },
    include: { sender: { select: { id: true, name: true, image: true } } },
  });
}

export async function getMyActiveProject(projectId: string) {
  const session = await requireSession();
  const { project, isAcceptedDeveloper } = await assertProjectAccess(projectId, session.user.id);

  if (!isAcceptedDeveloper) throw new Error("Unauthorized");

  return project;
}

export async function getMyConversations() {
  const session = await requireSession();

  const ownedProjects = await prisma.project.findMany({
    where: {
      ownerId: session.user.id,
      applications: { some: { status: "ACCEPTED" } },
    },
    include: {
      applications: {
        where: { status: "ACCEPTED" },
        include: { developer: { select: { id: true, name: true, image: true } } },
      },
      messages: { orderBy: { createdAt: "desc" }, take: 1 },
    },
  });

  const developerProjects = await prisma.project.findMany({
    where: {
      applications: { some: { developerId: session.user.id, status: "ACCEPTED" } },
    },
    include: {
      owner: { select: { id: true, name: true, image: true } },
      messages: { orderBy: { createdAt: "desc" }, take: 1 },
    },
  });

  const owned = ownedProjects.map((p) => ({
    projectId: p.id,
    projectTitle: p.title,
    otherParty: p.applications[0]?.developer ?? { id: "", name: "Unknown", image: null },
    lastMessage: p.messages[0]?.content ?? null,
    lastMessageAt: p.messages[0]?.createdAt ?? p.createdAt,
  }));

  const asDeveloper = developerProjects.map((p) => ({
    projectId: p.id,
    projectTitle: p.title,
    otherParty: p.owner,
    lastMessage: p.messages[0]?.content ?? null,
    lastMessageAt: p.messages[0]?.createdAt ?? p.createdAt,
  }));

  return [...owned, ...asDeveloper].sort(
    (a, b) => new Date(b.lastMessageAt).getTime() - new Date(a.lastMessageAt).getTime()
  );
}
