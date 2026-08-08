"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { addSkill, removeSkill } from "@/actions/profile";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

interface Skill {
  id: string;
  name: string;
}

export default function SkillsInput({ skills }: { skills: Skill[] }) {
  const [value, setValue] = useState("");
  const [pending, setPending] = useState(false);

  async function handleAdd() {
    const trimmed = value.trim();
    if (!trimmed) return;
    setPending(true);
    try {
      await addSkill(trimmed);
      setValue("");
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Failed to add skill");
    } finally {
      setPending(false);
    }
  }

  async function handleRemove(id: string) {
    try {
      await removeSkill(id);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Failed to remove skill");
    }
  }

  return (
    <div className="rounded-xl border bg-background p-6 space-y-5">
      <h2 className="text-xl font-semibold">Skills</h2>

      <div className="flex gap-3">
        <Input
          placeholder="React, Python, Docker..."
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleAdd();
            }
          }}
        />
        <Button onClick={handleAdd} disabled={pending}>
          {pending ? <Loader2 className="h-4 w-4 animate-spin" /> : "Add"}
        </Button>
      </div>

      <div className="flex flex-wrap gap-2">
        {skills.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => handleRemove(item.id)}
            className="rounded-full border px-4 py-2 text-sm transition hover:bg-red-500 hover:text-white"
          >
            {item.name} ✕
          </button>
        ))}
      </div>
    </div>
  );
}
