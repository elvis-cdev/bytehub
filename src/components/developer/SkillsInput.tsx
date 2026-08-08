"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function SkillsInput() {
  const [skill, setSkill] = useState("");
  const [skills, setSkills] = useState<string[]>([
    "React",
    "Next.js",
    "TypeScript",
  ]);

  function addSkill() {
    const value = skill.trim();

    if (!value) return;

    if (skills.includes(value)) {
      setSkill("");
      return;
    }

    setSkills((prev) => [...prev, value]);
    setSkill("");
  }

  function removeSkill(name: string) {
    setSkills((prev) => prev.filter((s) => s !== name));
  }

  return (
    <div className="rounded-xl border bg-background p-6 space-y-5">
      <h2 className="text-xl font-semibold">
        Skills
      </h2>

      <div className="flex gap-3">
        <Input
          placeholder="React, Python, Docker..."
          value={skill}
          onChange={(e) => setSkill(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              addSkill();
            }
          }}
        />

        <Button onClick={addSkill}>
          Add
        </Button>
      </div>

      <div className="flex flex-wrap gap-2">
        {skills.map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => removeSkill(item)}
            className="rounded-full border px-4 py-2 text-sm transition hover:bg-red-500 hover:text-white"
          >
            {item} ✕
          </button>
        ))}
      </div>
    </div>
  );
}
