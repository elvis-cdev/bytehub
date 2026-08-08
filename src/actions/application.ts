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

export async function applyToProject(projectId: string, coverNote?: string) {
  const session = await requireSession();

  const existing = await prisma.application.findUnique({
    where: {
      developerId_projectId: {
        developerId: session.user.id,
        projectId,
      },
    },
  });

  if (existing) {
    throw new Error("You already applied to this project");
  }

  const application = await prisma.application.create({
    data: {
      developerId: session.user.id,
      projectId,
    },
  });

  revalidatePath("/developer/projects");
  revalidatePath("/developer/applications");
  revalidatePath(`/company/projects/${projectId}`);

  return application;
}

export async function getOpenProjects() {
  return prisma.project.findMany({
    where: { status: "OPEN" },
    orderBy: { createdAt: "desc" },
    include: {
      owner: { select: { name: true } },
      _count: { select: { applications: true } },
    },
  });
}

export async function getMyApplications() {
  const session = await requireSession();

  return prisma.application.findMany({
    where: { developerId: session.user.id },
    orderBy: { createdAt: "desc" },
    include: {
      project: {
        select: { id: true, title: true, budget: true, status: true },
      },
    },
  });
}

export async function getProjectWithApplicants(projectId: string) {
  const session = await requireSession();

  const project = await prisma.project.findUnique({
    where: { id: projectId },
    include: {
      applications: {
        orderBy: { createdAt: "desc" },
        include: {
          developer: {
            select: { id: true, name: true, email: true, image: true },
          },
        },
      },
    },
  });

  if (!project || project.ownerId !== session.user.id) {
    throw new Error("Not found");
  }

  return project;
}

export async function updateApplicationStatus(
  applicationId: string,
  status: "ACCEPTED" | "REJECTED"
) {
  const session = await requireSession();

  const application = await prisma.application.findUnique({
    where: { id: applicationId },
    include: { project: true },
  });

  if (!application || application.project.ownerId !== session.user.id) {
    throw new Error("Unauthorized");
  }

  const updated = await prisma.application.update({
    where: { id: applicationId },
    data: { status },
  });

  revalidatePath(`/company/projects/${application.projectId}`);

  return updated;
}

export async function closeProject(projectId: string) {
  const session = await requireSession();

  const project = await prisma.project.findUnique({ where: { id: projectId } });
  if (!project || project.ownerId !== session.user.id) {
    throw new Error("Unauthorized");
  }

  await prisma.project.update({
    where: { id: projectId },
    data: { status: "COMPLETED" },
  });

  revalidatePath(`/company/projects/${projectId}`);
  revalidatePath("/company/dashboard");
}
