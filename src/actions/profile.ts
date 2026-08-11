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

function slugify(name: string) {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

async function generateUniqueSlug(name: string) {
  const base = slugify(name) || "developer";
  let candidate = base;
  let counter = 1;
  while (await prisma.developerProfile.findUnique({ where: { slug: candidate } })) {
    counter += 1;
    candidate = `${base}-${counter}`;
  }
  return candidate;
}

export async function getMyDeveloperProfile() {
  const session = await requireSession();
  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    include: {
      DeveloperProfile: { include: { Skill: true, showcases: true, events: true, certifications: true, testimonials: true } },
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
  available?: boolean;
  videoIntroUrl?: string;
  languages?: string[];
}) {
  const session = await requireSession();
  await prisma.user.update({
    where: { id: session.user.id },
    data: {
      bio: data.bio,
      image: data.image,
    },
  });

  const existing = await prisma.developerProfile.findUnique({
    where: { userId: session.user.id },
  });

  const slug = existing?.slug ?? (await generateUniqueSlug(session.user.name));

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
      slug,
      available: data.available ?? true,
      videoIntroUrl: data.videoIntroUrl,
      languages: data.languages ?? [],
    },
    update: {
      university: data.university,
      course: data.course,
      graduation: data.graduation,
      hourlyRate: data.hourlyRate,
      github: data.github,
      linkedin: data.linkedin,
      portfolio: data.portfolio,
      available: data.available,
      videoIntroUrl: data.videoIntroUrl,
      languages: data.languages,
    },
  });
  revalidatePath("/developer/profile");
}

export async function getPublicDeveloperProfile(slug: string) {
  const profile = await prisma.developerProfile.findUnique({
    where: { slug },
    include: {
      Skill: true,
      showcases: { orderBy: { createdAt: "desc" } },
      events: { orderBy: { eventDate: "desc" } },
      certifications: { orderBy: { createdAt: "desc" } },
      testimonials: { where: { approved: true }, orderBy: { createdAt: "desc" } },
      User: {
        select: { name: true, image: true, bio: true, createdAt: true },
      },
    },
  });
  return profile;
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

export async function addEventParticipation(data: { title: string; role?: string; eventDate?: string }) {
  const session = await requireSession();
  const profile = await prisma.developerProfile.findUnique({
    where: { userId: session.user.id },
  });
  if (!profile) throw new Error("Save your profile details first");
  await prisma.eventParticipation.create({
    data: {
      developerId: profile.id,
      title: data.title.trim(),
      role: data.role?.trim() || undefined,
      eventDate: data.eventDate ? new Date(data.eventDate) : undefined,
    },
  });
  revalidatePath("/developer/profile");
}

export async function removeEventParticipation(id: string) {
  const session = await requireSession();
  const event = await prisma.eventParticipation.findUnique({
    where: { id },
    include: { developer: true },
  });
  if (!event || event.developer.userId !== session.user.id) {
    throw new Error("Unauthorized");
  }
  await prisma.eventParticipation.delete({ where: { id } });
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

export async function sendPortfolioInquiry(data: {
  slug: string;
  senderName: string;
  senderEmail: string;
  message: string;
}) {
  const profile = await prisma.developerProfile.findUnique({
    where: { slug: data.slug },
    include: { User: { select: { name: true, email: true } } },
  });
  if (!profile) throw new Error("Profile not found");
  if (!data.senderName.trim() || !data.senderEmail.trim() || !data.message.trim()) {
    throw new Error("All fields are required");
  }

  const { Resend } = await import("resend");
  const resend = new Resend(process.env.RESEND_API_KEY);

  await resend.emails.send({
    from: "ByteHub <noreply@bytehub.co.ke>",
    to: profile.User.email,
    replyTo: data.senderEmail,
    subject: `New inquiry from ${data.senderName} via ByteHub`,
    html: `
      <div style="font-family: sans-serif; max-width: 480px; margin: 0 auto;">
        <h2 style="color: #b8842e;">New portfolio inquiry</h2>
        <p><strong>${data.senderName}</strong> (${data.senderEmail}) sent you a message via your ByteHub profile:</p>
        <p style="background: #f5f5f5; padding: 16px; border-radius: 8px; white-space: pre-wrap;">${data.message}</p>
        <p style="color: #888; font-size: 13px;">Reply directly to this email to respond.</p>
      </div>
    `,
  });
}

function randomToken() {
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}

export async function recordProfileView(slug: string) {
  const profile = await prisma.developerProfile.findUnique({ where: { slug } });
  if (!profile) return;
  await prisma.profileView.create({ data: { developerId: profile.id } });
}

export async function getMyProfileViewStats() {
  const session = await requireSession();
  const profile = await prisma.developerProfile.findUnique({ where: { userId: session.user.id } });
  if (!profile) return { total: 0, last7Days: 0 };
  const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
  const [total, last7Days] = await Promise.all([
    prisma.profileView.count({ where: { developerId: profile.id } }),
    prisma.profileView.count({ where: { developerId: profile.id, createdAt: { gte: sevenDaysAgo } } }),
  ]);
  return { total, last7Days };
}

export async function addCertification(data: { title: string; issuer?: string; url?: string }) {
  const session = await requireSession();
  const profile = await prisma.developerProfile.findUnique({ where: { userId: session.user.id } });
  if (!profile) throw new Error("Save your profile details first");
  await prisma.certification.create({
    data: { developerId: profile.id, title: data.title.trim(), issuer: data.issuer?.trim(), url: data.url?.trim() },
  });
  revalidatePath("/developer/profile");
}

export async function removeCertification(id: string) {
  const session = await requireSession();
  const cert = await prisma.certification.findUnique({ where: { id }, include: { developer: true } });
  if (!cert || cert.developer.userId !== session.user.id) throw new Error("Unauthorized");
  await prisma.certification.delete({ where: { id } });
  revalidatePath("/developer/profile");
}

export async function createTestimonialRequestLink() {
  const session = await requireSession();
  const profile = await prisma.developerProfile.findUnique({ where: { userId: session.user.id } });
  if (!profile) throw new Error("Save your profile details first");
  const requestToken = randomToken();
  const testimonial = await prisma.testimonial.create({
    data: { developerId: profile.id, authorName: "", content: "", requestToken, approved: false },
  });
  return testimonial.requestToken;
}

export async function submitTestimonial(token: string, data: { authorName: string; authorRole?: string; content: string }) {
  const testimonial = await prisma.testimonial.findUnique({ where: { requestToken: token } });
  if (!testimonial) throw new Error("Invalid or expired link");
  await prisma.testimonial.update({
    where: { requestToken: token },
    data: { authorName: data.authorName.trim(), authorRole: data.authorRole?.trim(), content: data.content.trim() },
  });
}

export async function approveTestimonial(id: string) {
  const session = await requireSession();
  const testimonial = await prisma.testimonial.findUnique({ where: { id }, include: { developer: true } });
  if (!testimonial || testimonial.developer.userId !== session.user.id) throw new Error("Unauthorized");
  await prisma.testimonial.update({ where: { id }, data: { approved: true } });
  revalidatePath("/developer/profile");
}

export async function getMyTestimonials() {
  const session = await requireSession();
  const profile = await prisma.developerProfile.findUnique({
    where: { userId: session.user.id },
    include: { testimonials: { orderBy: { createdAt: "desc" } } },
  });
  return profile?.testimonials ?? [];
}


