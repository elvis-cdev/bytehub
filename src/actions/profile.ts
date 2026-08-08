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

export async function getMyDeveloperProfile() {
  const session = await requireSession();

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    include: {
      DeveloperProfile: { include: { Skill: true, showcases: true } },
    },
  });

  return user;
}

export async function updateDeveloperProfile(data: {
  bio?: string;
  image?: string;
  university?: string;
  course?: string;
  graduation?: number;
  hourlyRate?: number;
  github?: string;
  linkedin?: string;
  portfolio?: string;
}) {
  const session = await requireSession();

  await prisma.user.update({
    where: { id: session.user.id },
    data: {
      bio: data.bio,
      image: data.image,
    },
  });

  await prisma.developerProfile.upsert({
    where: { userId: session.user.id },
    create: {
      id: session.user.id,
      userId: session.user.id,
      university: data.university,
      course: data.course,
      graduation: data.graduation,
      hourlyRate: data.hourlyRate,
      github: data.github,
      linkedin: data.linkedin,
      portfolio: data.portfolio,
    },
    update: {
      university: data.university,
      course: data.course,
      graduation: data.graduation,
      hourlyRate: data.hourlyRate,
      github: data.github,
      linkedin: data.linkedin,
      portfolio: data.portfolio,
    },
  });

  revalidatePath("/developer/profile");
}

export async function addSkill(name: string) {
  const session = await requireSession();

  const profile = await prisma.developerProfile.findUnique({
    where: { userId: session.user.id },
  });
  if (!profile) throw new Error("Save your profile details first");

  await prisma.skill.create({
    data: { name: name.trim(), developerId: profile.id },
  });

  revalidatePath("/developer/profile");
}

export async function removeSkill(id: string) {
  const session = await requireSession();

  const skill = await prisma.skill.findUnique({
    where: { id },
    include: { DeveloperProfile: true },
  });
  if (!skill || skill.DeveloperProfile.userId !== session.user.id) {
    throw new Error("Unauthorized");
  }

  await prisma.skill.delete({ where: { id } });
  revalidatePath("/developer/profile");
}

export async function getMyCompanyProfile() {
  const session = await requireSession();
  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    include: {
      ClientProfile: true,
    },
  });
  return user;
}

export async function updateCompanyProfile(data: {
  bio?: string;
  image?: string;
  company?: string;
  website?: string;
}) {
  const session = await requireSession();
  await prisma.user.update({
    where: { id: session.user.id },
    data: {
      bio: data.bio,
      image: data.image,
    },
  });
  await prisma.clientProfile.upsert({
    where: { userId: session.user.id },
    create: {
      id: session.user.id,
      userId: session.user.id,
      company: data.company,
      website: data.website,
    },
    update: {
      company: data.company,
      website: data.website,
    },
  });
  revalidatePath("/company/profile");
}
