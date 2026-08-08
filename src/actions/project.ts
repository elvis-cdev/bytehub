"use server";
import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export async function createProject(data: {
  title: string;
  description: string;
  budget?: number;
  deadline?: Date;
  duration?: string;
  teamSize?: number;
  experienceLevel?: "BEGINNER" | "INTERMEDIATE" | "ADVANCED";
  category?: string;
  remote?: boolean;
  skillsRequired?: string[];
}) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session?.user) {
    throw new Error("Unauthorized");
  }
  const project = await prisma.project.create({
    data: {
      title: data.title,
      description: data.description,
      budget: data.budget,
      deadline: data.deadline,
      duration: data.duration,
      teamSize: data.teamSize,
      experienceLevel: data.experienceLevel,
      category: data.category,
      remote: data.remote ?? true,
      skillsRequired: data.skillsRequired ?? [],
      owner: {
        connect: {
          id: session.user.id,
        },
      },
    },
  });
  return project;
}
