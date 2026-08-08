"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

import { signUp } from "@/lib/auth-client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function RegisterForm() {
  const router = useRouter();

  const [role, setRole] = useState<"DEVELOPER" | "CLIENT">("DEVELOPER");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  async function handleRegister(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setLoading(true);

    try {
      const result = await signUp.email({
        name,
        email,
        password,
      });

      console.log(result);

      if (result.error) {
        alert(result.error.message);
        return;
      }

      if (role === "DEVELOPER") {
        router.push("/developer/dashboard");
      } else {
        router.push("/company/dashboard");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/30 p-6">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-4 text-center">
          <Image
            src="/logo.png"
            alt="ByteHub"
            width={80}
            height={80}
            className="mx-auto"
          />

          <CardTitle className="text-3xl font-bold">
            Join ByteHub
          </CardTitle>

          <p className="text-sm text-muted-foreground">
            Create your account and start collaborating.
          </p>
        </CardHeader>

        <CardContent>
          <form
            onSubmit={handleRegister}
            className="space-y-5"
          >
            <div className="space-y-2">
              <Label>Name</Label>

              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="John Doe"
                required
              />
            </div>

            <div className="space-y-2">
              <Label>Email</Label>

              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="john@example.com"
                required
              />
            </div>

            <div className="space-y-2">
              <Label>Password</Label>

              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
              />
            </div>

            <div className="space-y-3">
              <Label>I am a</Label>

              <div className="grid grid-cols-2 gap-3">
                <Button
                  type="button"
                  variant={
                    role === "DEVELOPER"
                      ? "default"
                      : "outline"
                  }
                  onClick={() =>
                    setRole("DEVELOPER")
                  }
                >
                  Developer
                </Button>

                <Button
                  type="button"
                  variant={
                    role === "CLIENT"
                      ? "default"
                      : "outline"
                  }
                  onClick={() =>
                    setRole("CLIENT")
                  }
                >
                  Client
                </Button>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={loading}
            >
              {loading
                ? "Creating Account..."
                : "Create Account"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
