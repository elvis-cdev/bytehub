"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function ProfileForm() {
  const [form, setForm] = useState({
    university: "",
    course: "",
    graduation: "",
    github: "",
    linkedin: "",
    portfolio: "",
    hourlyRate: "",
    bio: "",
  });

  function update(key: string, value: string) {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  }

  return (
    <div className="rounded-xl border bg-background p-6 space-y-6">

      <div>
        <Label>Bio</Label>

        <textarea
          className="mt-2 w-full rounded-md border p-3"
          rows={5}
          value={form.bio}
          onChange={(e) => update("bio", e.target.value)}
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2">

        <div>
          <Label>University</Label>

          <Input
            value={form.university}
            onChange={(e) => update("university", e.target.value)}
          />
        </div>

        <div>
          <Label>Course</Label>

          <Input
            value={form.course}
            onChange={(e) => update("course", e.target.value)}
          />
        </div>

        <div>
          <Label>Graduation Year</Label>

          <Input
            value={form.graduation}
            onChange={(e) => update("graduation", e.target.value)}
          />
        </div>

        <div>
          <Label>Hourly Rate ($)</Label>

          <Input
            value={form.hourlyRate}
            onChange={(e) => update("hourlyRate", e.target.value)}
          />
        </div>

        <div>
          <Label>GitHub</Label>

          <Input
            value={form.github}
            onChange={(e) => update("github", e.target.value)}
          />
        </div>

        <div>
          <Label>LinkedIn</Label>

          <Input
            value={form.linkedin}
            onChange={(e) => update("linkedin", e.target.value)}
          />
        </div>

      </div>

      <div>
        <Label>Portfolio Website</Label>

        <Input
          value={form.portfolio}
          onChange={(e) => update("portfolio", e.target.value)}
        />
      </div>

      <Button>
        Save Profile
      </Button>

    </div>
  );
}
