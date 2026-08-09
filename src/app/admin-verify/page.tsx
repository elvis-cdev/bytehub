import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { isAdminEmail } from "@/lib/admin";
import { AdminVerifyForm } from "@/components/admin/AdminVerifyForm";

export default async function AdminVerifyPage() {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session?.user) redirect("/login");
  if (!isAdminEmail(session.user.email)) redirect("/");

  return (
    <main className="flex min-h-screen items-center justify-center bg-muted/40 px-4">
      <div className="w-full max-w-sm space-y-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Admin Verification</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Enter the code sent to {session.user.email}
          </p>
        </div>
        <div className="rounded-2xl border bg-background p-8 shadow-xl">
          <AdminVerifyForm email={session.user.email} />
        </div>
      </div>
    </main>
  );
}
