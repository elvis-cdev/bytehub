"use client";

import { useState } from "react";
import { signUp } from "@/lib/auth-client";

export default function RegisterPage() {
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setLoading(true);

    const form = new FormData(e.currentTarget);

    const name = form.get("name") as string;
    const email = form.get("email") as string;
    const password = form.get("password") as string;

    const result = await signUp.email({
      name,
      email,
      password,
    });

    console.log(result);

    setLoading(false);
  }

  return (
    <main className="flex min-h-screen items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="flex w-full max-w-md flex-col gap-4 rounded-lg border p-8"
      >
        <h1 className="text-3xl font-bold">Create Account</h1>

        <input
          name="name"
          placeholder="Full name"
          className="rounded border p-2"
          required
        />

        <input
          name="email"
          type="email"
          placeholder="Email"
          className="rounded border p-2"
          required
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          className="rounded border p-2"
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="rounded bg-black p-2 text-white"
        >
          {loading ? "Creating account..." : "Register"}
        </button>
      </form>
    </main>
  );
}
