"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);


  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    setError("");
    setLoading(true);


    const result = await authClient.signIn.email({
      email,
      password,
    });


    if (result.error) {
      setError(
        result.error.message || "Invalid email or password"
      );

      setLoading(false);
      return;
    }


    router.push("/company/dashboard");
  }



  return (
    <form
      onSubmit={handleSubmit}
      className="w-full space-y-6"
    >

      <div className="space-y-2">

        <label className="text-sm font-medium">
          Email address
        </label>


        <input
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="
            h-11
            w-full
            rounded-lg
            border
            bg-background
            px-4
            outline-none
            transition
            focus:ring-2
            focus:ring-primary
          "
          required
        />

      </div>




      <div className="space-y-2">

        <label className="text-sm font-medium">
          Password
        </label>


        <input
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="
            h-11
            w-full
            rounded-lg
            border
            bg-background
            px-4
            outline-none
            transition
            focus:ring-2
            focus:ring-primary
          "
          required
        />

      </div>




      {error && (
        <p className="rounded-lg bg-red-500/10 p-3 text-sm text-red-500">
          {error}
        </p>
      )}




      <button
        type="submit"
        disabled={loading}
        className="
          h-11
          w-full
          rounded-lg
          bg-primary
          font-medium
          text-primary-foreground
          transition
          hover:opacity-90
          disabled:cursor-not-allowed
          disabled:opacity-50
        "
      >

        {loading ? "Signing in..." : "Sign in"}

      </button>


    </form>
  );
}
