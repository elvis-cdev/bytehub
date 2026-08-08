"use server";

import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";


export async function getCompanyProjects() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    throw new Error("Unauthorized");
  }


  const projects = await prisma.project.findMany({
    where: {
      ownerId: session.user.id,
    },

    include: {
      applications: true,
    },

    orderBy: {
      createdAt: "desc",
    },
  });


  return projects;
}



export async function getCompanyDashboardStats() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });


  if (!session?.user) {
    throw new Error("Unauthorized");
  }


  const projects = await prisma.project.findMany({
    where: {
      ownerId: session.user.id,
    },

    include: {
      applications: true,
    },
  });



  const totalProjects = projects.length;



  const totalApplicants = projects.reduce(
    (total, project) =>
      total + project.applications.length,
    0
  );



  const totalHires = projects.reduce(
    (total, project) =>
      total +
      project.applications.filter(
        (application) =>
          application.status === "ACCEPTED"
      ).length,
    0
  );



  const activeProjects = projects.filter(
    (project) =>
      project.status === "IN_PROGRESS"
  ).length;



  return {
    totalProjects,
    totalApplicants,
    totalHires,
    activeProjects,
  };
}
