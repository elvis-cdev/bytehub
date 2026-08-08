"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { updateDeveloperProfile } from "@/actions/profile";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

interface ProfileFormProps {
  initial: {
    bio: string;
    image: string;
    university: string;
    course: string;
    graduation: string;
    hourlyRate: string;
    github: string;
    linkedin: string;
    portfolio: string;
  };
}

export default function ProfileForm({ initial }: ProfileFormProps) {
  const [form, setForm] = useState(initial);
  const [saving, setSaving] = useState(false);

  function update(key: keyof typeof form, value: string) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSave() {
    setSaving(true);
    try {
      await updateDeveloperProfile({
        bio: form.bio,
        image: form.image || undefined,
        university: form.university || undefined,
        course: form.course || undefined,
        graduation: form.graduation ? Number(form.graduation) : undefined,
        hourlyRate: form.hourlyRate ? Number(form.hourlyRate) : undefined,
        github: form.github || undefined,
        linkedin: form.linkedin || undefined,
        portfolio: form.portfolio || undefined,
      });
      toast.success("Profile saved");
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Failed to save");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="rounded-xl border bg-background p-6 space-y-6">
      <div>
        <Label>Profile Picture URL</Label>
        <Input
          className="mt-2"
          placeholder="https://..."
          value={form.image}
          onChange={(e) => update("image", e.target.value)}
        />
        <p className="mt-1 text-xs text-muted-foreground">
          Paste a link to your image (e.g. your GitHub avatar).
        </p>
      </div>

      <div>
        <Label>Bio</Label>
        <Textarea
          className="mt-2"
          rows={5}
          value={form.bio}
          onChange={(e) => update("bio", e.target.value)}
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <Label>University</Label>
          <Input className="mt-2" value={form.university} onChange={(e) => update("university", e.target.value)} />
        </div>
        <div>
          <Label>Course</Label>
          <Input className="mt-2" value={form.course} onChange={(e) => update("course", e.target.value)} />
        </div>
        <div>
          <Label>Graduation Year</Label>
          <Input className="mt-2" value={form.graduation} onChange={(e) => update("graduation", e.target.value)} />
        </div>
        <div>
          <Label>Hourly Rate ($)</Label>
          <Input className="mt-2" value={form.hourlyRate} onChange={(e) => update("hourlyRate", e.target.value)} />
        </div>
        <div>
          <Label>GitHub</Label>
          <Input className="mt-2" value={form.github} onChange={(e) => update("github", e.target.value)} />
        </div>
        <div>
          <Label>LinkedIn</Label>
          <Input className="mt-2" value={form.linkedin} onChange={(e) => update("linkedin", e.target.value)} />
        </div>
      </div>

      <div>
        <Label>Portfolio Website</Label>
        <Input className="mt-2" value={form.portfolio} onChange={(e) => update("portfolio", e.target.value)} />
      </div>

      <Button onClick={handleSave} disabled={saving}>
        {saving ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
        Save Profile
      </Button>
    </div>
  );
}
