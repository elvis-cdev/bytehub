"use server";
import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { isAdminEmail } from "@/lib/admin";
import { revalidatePath } from "next/cache";

async function requireAdmin() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user || !isAdminEmail(session.user.email)) {
    throw new Error("Unauthorized");
  }
  return session;
}

export async function getAdminStats() {
  await requireAdmin();
  const [totalUsers, totalDevelopers, totalCompanies, totalProjects, openProjects, totalApplications] =
    await Promise.all([
      prisma.user.count(),
      prisma.user.count({ where: { role: "DEVELOPER" } }),
      prisma.user.count({ where: { role: "CLIENT" } }),
      prisma.project.count(),
      prisma.project.count({ where: { status: "OPEN" } }),
      prisma.application.count(),
    ]);
  return { totalUsers, totalDevelopers, totalCompanies, totalProjects, openProjects, totalApplications };
}

export async function getAllUsers() {
  await requireAdmin();
  return prisma.user.findMany({
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      image: true,
      emailVerified: true,
      createdAt: true,
      _count: { select: { applications: true, Project: true } },
    },
  });
}

export async function getAllCompanies() {
  await requireAdmin();
  return prisma.user.findMany({
    where: { role: "CLIENT" },
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      name: true,
      email: true,
      image: true,
      createdAt: true,
      ClientProfile: { select: { company: true, website: true } },
      _count: { select: { Project: true } },
    },
  });
}

export async function getAllProjectsAdmin() {
  await requireAdmin();
  return prisma.project.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      owner: { select: { name: true, email: true } },
      _count: { select: { applications: true } },
    },
  });
}

export async function adminDeleteProject(projectId: string) {
  await requireAdmin();
  await prisma.project.delete({ where: { id: projectId } });
  revalidatePath("/admin/projects");
}

export async function adminSuspendUser(userId: string) {
  await requireAdmin();
  await prisma.session.deleteMany({ where: { userId } });
  revalidatePath("/admin/users");
}

export async function getAdminReports() {
  await requireAdmin();

  const [projectsByStatus, applicationsByStatus, recentUsers, recentProjects] = await Promise.all([
    prisma.project.groupBy({ by: ["status"], _count: true }),
    prisma.application.groupBy({ by: ["status"], _count: true }),
    prisma.user.findMany({
      orderBy: { createdAt: "desc" },
      take: 5,
      select: { id: true, name: true, email: true, role: true, createdAt: true },
    }),
    prisma.project.findMany({
      orderBy: { createdAt: "desc" },
      take: 5,
      select: { id: true, title: true, status: true, createdAt: true, owner: { select: { name: true } } },
    }),
  ]);

  return { projectsByStatus, applicationsByStatus, recentUsers, recentProjects };
}
