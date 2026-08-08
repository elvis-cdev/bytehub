"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { createProject } from "@/actions/project";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

type ExperienceLevel = "BEGINNER" | "INTERMEDIATE" | "ADVANCED";

const experienceLevels: { value: ExperienceLevel; label: string }[] = [
  { value: "BEGINNER", label: "Beginner" },
  { value: "INTERMEDIATE", label: "Intermediate" },
  { value: "ADVANCED", label: "Advanced" },
];

const categories = ["Web", "Mobile", "AI/ML", "Design", "Data", "Other"];

export default function CreateProjectForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    title: "",
    description: "",
    budget: "",
    duration: "",
    teamSize: "",
    experienceLevel: "" as ExperienceLevel | "",
    category: "",
    remote: true,
    skillsRequired: "",
  });

  function update<K extends keyof typeof form>(key: K, value: (typeof form)[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      await createProject({
        title: form.title,
        description: form.description,
        budget: form.budget ? Number(form.budget) : undefined,
        duration: form.duration || undefined,
        teamSize: form.teamSize ? Number(form.teamSize) : undefined,
        experienceLevel: form.experienceLevel || undefined,
        category: form.category || undefined,
        remote: form.remote,
        skillsRequired: form.skillsRequired
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean),
      });
      toast.success("Project published");
      router.push("/company/dashboard");
    } catch (error) {
      console.error(error);
      toast.error("Failed to create project");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <Label>Project Title</Label>
        <Input
          className="mt-2"
          value={form.title}
          onChange={(e) => update("title", e.target.value)}
          required
        />
      </div>

      <div>
        <Label>Description</Label>
        <Textarea
          rows={5}
          className="mt-2"
          value={form.description}
          onChange={(e) => update("description", e.target.value)}
          required
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <Label>Budget (KES)</Label>
          <Input
            type="number"
            className="mt-2"
            value={form.budget}
            onChange={(e) => update("budget", e.target.value)}
          />
        </div>
        <div>
          <Label>Duration</Label>
          <Input
            className="mt-2"
            placeholder="e.g. 2-3 weeks"
            value={form.duration}
            onChange={(e) => update("duration", e.target.value)}
          />
        </div>
        <div>
          <Label>Team Size</Label>
          <Input
            type="number"
            min={1}
            className="mt-2"
            placeholder="Number of developers needed"
            value={form.teamSize}
            onChange={(e) => update("teamSize", e.target.value)}
          />
        </div>
        <div>
          <Label>Category</Label>
          <div className="mt-2 flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => update("category", cat)}
                className={`rounded-full border px-3 py-1.5 text-sm transition ${
                  form.category === cat
                    ? "bg-primary text-primary-foreground border-primary"
                    : "hover:bg-muted"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div>
        <Label>Experience Level</Label>
        <div className="mt-2 grid grid-cols-3 gap-3">
          {experienceLevels.map((level) => (
            <Button
              key={level.value}
              type="button"
              variant={form.experienceLevel === level.value ? "default" : "outline"}
              onClick={() => update("experienceLevel", level.value)}
            >
              {level.label}
            </Button>
          ))}
        </div>
      </div>

      <div>
        <Label>Skills Required</Label>
        <Input
          className="mt-2"
          placeholder="React, Node.js, PostgreSQL (comma separated)"
          value={form.skillsRequired}
          onChange={(e) => update("skillsRequired", e.target.value)}
        />
      </div>

      <div>
        <Label>Work Style</Label>
        <div className="mt-2 grid grid-cols-2 gap-3">
          <Button
            type="button"
            variant={form.remote ? "default" : "outline"}
            onClick={() => update("remote", true)}
          >
            Remote
          </Button>
          <Button
            type="button"
            variant={!form.remote ? "default" : "outline"}
            onClick={() => update("remote", false)}
          >
            On-site
          </Button>
        </div>
      </div>

      <Button type="submit" disabled={loading} size="lg">
        {loading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
        Publish Project
      </Button>
    </form>
  );
}
