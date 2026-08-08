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

export async function getAllDevelopers() {
  return prisma.user.findMany({
    where: { role: "DEVELOPER" },
    select: {
      id: true,
      name: true,
      image: true,
      bio: true,
      DeveloperProfile: {
        select: {
          university: true,
          course: true,
          github: true,
          portfolio: true,
          linkedin: true,
          hourlyRate: true,
          Skill: { select: { name: true } },
          showcases: { take: 3, orderBy: { createdAt: "desc" } },
        },
      },
      _count: { select: { applications: true } },
    },
    orderBy: { createdAt: "desc" },
  });
}

export async function getDeveloperProfile(userId: string) {
  const user = await prisma.user.findUnique({
    where: { id: userId, role: "DEVELOPER" },
    include: {
      DeveloperProfile: {
        include: {
          Skill: true,
          showcases: { orderBy: { createdAt: "desc" } },
        },
      },
      applications: {
        include: { project: { select: { title: true, status: true } } },
        orderBy: { createdAt: "desc" },
      },
    },
  });

  if (!user) throw new Error("Developer not found");
  return user;
}

export async function addPortfolioProject(data: {
  title: string;
  description: string;
  link?: string;
  techStack: string[];
}) {
  const session = await requireSession();

  const profile = await prisma.developerProfile.findUnique({
    where: { userId: session.user.id },
  });

  if (!profile) throw new Error("Complete your developer profile first");

  const project = await prisma.portfolioProject.create({
    data: {
      developerId: profile.id,
      title: data.title,
      description: data.description,
      link: data.link,
      techStack: data.techStack,
    },
  });

  revalidatePath("/developer/profile");
  return project;
}

export async function deletePortfolioProject(id: string) {
  const session = await requireSession();

  const project = await prisma.portfolioProject.findUnique({
    where: { id },
    include: { developer: true },
  });

  if (!project || project.developer.userId !== session.user.id) {
    throw new Error("Unauthorized");
  }

  await prisma.portfolioProject.delete({ where: { id } });
  revalidatePath("/developer/profile");
}
