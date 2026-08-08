"use server";

import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export async function createProject(data: {
  title: string;
  description: string;
  budget?: number;
  deadline?: Date;
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

      owner: {
        connect: {
          id: session.user.id,
        },
      },
    },
  });

  return project;
}
