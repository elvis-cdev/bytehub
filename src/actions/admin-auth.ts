"use server";
import { auth } from "@/lib/auth";
import { headers, cookies } from "next/headers";
import { isAdminEmail } from "@/lib/admin";

export async function grantAdminAccess() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user) throw new Error("Unauthorized");
  if (!isAdminEmail(session.user.email)) throw new Error("Not an admin account");
  if (!session.user.emailVerified) throw new Error("Verification required");

  const cookieStore = await cookies();
  cookieStore.set("admin_verified", session.user.id, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    maxAge: 60 * 60,
    path: "/",
  });
}

export async function checkAdminAccess() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user) return { allowed: false, reason: "no-session" as const, email: null };
  if (!isAdminEmail(session.user.email)) {
    return { allowed: false, reason: "not-allowlisted" as const, email: session.user.email };
  }
  const cookieStore = await cookies();
  const verified = cookieStore.get("admin_verified");
  if (!verified || verified.value !== session.user.id) {
    return { allowed: false, reason: "needs-verification" as const, email: session.user.email };
  }
  return { allowed: true, reason: null, email: session.user.email };
}
