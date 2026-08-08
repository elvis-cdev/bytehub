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
      router.push(role === "DEVELOPER" ? "/developer/dashboard" : "/company/dashboard");
      router.refresh();
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
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
