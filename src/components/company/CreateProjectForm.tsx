"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createProject } from "@/actions/project";

export default function CreateProjectForm() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    title: "",
    description: "",
    budget: "",
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      setLoading(true);

      await createProject({
        title: form.title,
        description: form.description,
        budget: form.budget
          ? Number(form.budget)
          : undefined,
      });

      router.push("/company/dashboard");
    } catch (error) {
      console.error(error);
      alert("Failed to create project");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="text-sm font-medium">
          Project Title
        </label>

        <input
          className="mt-2 w-full rounded-md border p-3"
          value={form.title}
          onChange={(e) =>
            setForm({
              ...form,
              title: e.target.value,
            })
          }
          required
        />
      </div>

      <div>
        <label className="text-sm font-medium">
          Description
        </label>

        <textarea
          rows={5}
          className="mt-2 w-full rounded-md border p-3"
          value={form.description}
          onChange={(e) =>
            setForm({
              ...form,
              description: e.target.value,
            })
          }
          required
        />
      </div>

      <div>
        <label className="text-sm font-medium">
          Budget (KES)
        </label>

        <input
          type="number"
          className="mt-2 w-full rounded-md border p-3"
          value={form.budget}
          onChange={(e) =>
            setForm({
              ...form,
              budget: e.target.value,
            })
          }
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="rounded-md bg-black px-5 py-3 text-white disabled:opacity-50"
      >
        {loading ? "Publishing..." : "Publish Project"}
      </button>
    </form>
  );
}
