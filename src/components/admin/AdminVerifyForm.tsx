"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { grantAdminAccess } from "@/actions/admin-auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

export function AdminVerifyForm({ email }: { email: string }) {
  const router = useRouter();
  const [otp, setOtp] = useState("");
  const [sending, setSending] = useState(true);
  const [verifying, setVerifying] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    authClient.emailOtp
      .sendVerificationOtp({ email, type: "sign-in" })
      .then((result) => {
        if (result.error) {
          setError(result.error.message ?? "Failed to send code");
        }
      })
      .finally(() => setSending(false));
  }, [email]);

  async function handleVerify(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setVerifying(true);
    try {
      const result = await authClient.emailOtp.verifyEmail({ email, otp });
      if (result.error) {
        setError(result.error.message ?? "Invalid code");
        setVerifying(false);
        return;
      }
      await grantAdminAccess();
      toast.success("Verified");
      router.push("/admin/dashboard");
      router.refresh();
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again.");
      setVerifying(false);
    }
  }

  async function handleResend() {
    setSending(true);
    setError("");
    const result = await authClient.emailOtp.sendVerificationOtp({ email, type: "sign-in" });
    if (result.error) {
      setError(result.error.message ?? "Failed to resend code");
    }
    setSending(false);
  }

  return (
    <form onSubmit={handleVerify} className="space-y-5">
      <div className="space-y-2">
        <Label>Verification Code</Label>
        <Input
          value={otp}
          onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
          placeholder="123456"
          inputMode="numeric"
          maxLength={6}
          required
          className="text-center text-lg tracking-[0.5em]"
          disabled={sending}
        />
      </div>
      {error && (
        <p className="rounded-lg bg-destructive/10 p-3 text-sm text-destructive">{error}</p>
      )}
      <Button type="submit" className="w-full" disabled={verifying || sending || otp.length !== 6}>
        {verifying ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
        {sending ? "Sending code..." : verifying ? "Verifying..." : "Verify"}
      </Button>
      <button
        type="button"
        onClick={handleResend}
        disabled={sending}
        className="w-full text-center text-sm text-muted-foreground hover:text-foreground underline underline-offset-4"
      >
        Resend code
      </button>
    </form>
  );
}
