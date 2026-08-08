"use client";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";

export default function RegisterForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialRole = searchParams.get("role") === "client" ? "CLIENT" : "DEVELOPER";
  const [role, setRole] = useState<"DEVELOPER" | "CLIENT">(initialRole);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [step, setStep] = useState<"form" | "verify">("form");
  const [otp, setOtp] = useState("");
  const [verifying, setVerifying] = useState(false);
  const [resending, setResending] = useState(false);

  async function handleRegister(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const result = await authClient.signUp.email({
        name,
        email,
        password,
        role,
      } as never);
      if (result.error) {
        setError(result.error.message ?? "Something went wrong");
        setLoading(false);
        return;
      }
      const otpResult = await authClient.emailOtp.sendVerificationOtp({
        email,
        type: "email-verification",
      });
      if (otpResult.error) {
        setError(otpResult.error.message ?? "Failed to send verification code");
        setLoading(false);
        return;
      }
      setStep("verify");
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  async function handleVerify(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setVerifying(true);
    try {
      const result = await authClient.emailOtp.verifyEmail({
        email,
        otp,
      });
      if (result.error) {
        setError(result.error.message ?? "Invalid code");
        setVerifying(false);
        return;
      }
      router.push(role === "DEVELOPER" ? "/developer/dashboard" : "/company/dashboard");
      router.refresh();
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again.");
      setVerifying(false);
    }
  }

  async function handleResend() {
    setResending(true);
    setError("");
    try {
      const result = await authClient.emailOtp.sendVerificationOtp({
        email,
        type: "email-verification",
      });
      if (result.error) {
        setError(result.error.message ?? "Failed to resend code");
      }
    } finally {
      setResending(false);
    }
  }

  if (step === "verify") {
    return (
      <form onSubmit={handleVerify} className="space-y-5">
        <div className="text-center space-y-1">
          <p className="text-sm text-muted-foreground">
            We sent a 6-digit code to
          </p>
          <p className="font-medium">{email}</p>
        </div>
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
          />
        </div>
        {error && (
          <p className="rounded-lg bg-destructive/10 p-3 text-sm text-destructive">{error}</p>
        )}
        <Button type="submit" className="w-full" disabled={verifying || otp.length !== 6}>
          {verifying ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
          {verifying ? "Verifying..." : "Verify Email"}
        </Button>
        <button
          type="button"
          onClick={handleResend}
          disabled={resending}
          className="w-full text-center text-sm text-muted-foreground hover:text-foreground underline underline-offset-4"
        >
          {resending ? "Resending..." : "Resend code"}
        </button>
      </form>
    );
  }

  return (
    <form onSubmit={handleRegister} className="space-y-5">
      <div className="space-y-2">
        <Label>Name</Label>
        <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="John Doe" required />
      </div>
      <div className="space-y-2">
        <Label>Email</Label>
        <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="john@example.com" required />
      </div>
      <div className="space-y-2">
        <Label>Password</Label>
        <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" required minLength={8} />
      </div>
      <div className="space-y-3">
        <Label>I am a</Label>
        <div className="grid grid-cols-2 gap-3">
          <Button type="button" variant={role === "DEVELOPER" ? "default" : "outline"} onClick={() => setRole("DEVELOPER")}>
            Developer
          </Button>
          <Button type="button" variant={role === "CLIENT" ? "default" : "outline"} onClick={() => setRole("CLIENT")}>
            Client
          </Button>
        </div>
      </div>
      {error && (
        <p className="rounded-lg bg-destructive/10 p-3 text-sm text-destructive">{error}</p>
      )}
      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
        {loading ? "Creating Account..." : "Create Account"}
      </Button>
      <p className="text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <a href="/login" className="underline underline-offset-4">
          Log in
        </a>
      </p>
    </form>
  );
}
