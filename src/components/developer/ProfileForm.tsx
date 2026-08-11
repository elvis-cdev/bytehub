"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { updateDeveloperProfile } from "@/actions/profile";
import { toast } from "sonner";
import { Loader2, ExternalLink, Copy } from "lucide-react";

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
    available: boolean;
    videoIntroUrl: string;
    languages: string;
  };
  slug?: string | null;
}
export default function ProfileForm({ initial, slug }: ProfileFormProps) {
  const [form, setForm] = useState(initial);
  const [saving, setSaving] = useState(false);
  function update(key: keyof typeof form, value: string | boolean) {
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
        available: form.available,
        videoIntroUrl: form.videoIntroUrl || undefined,
        languages: form.languages
          .split(",")
          .map((l) => l.trim())
          .filter(Boolean),
      });
      toast.success("Profile saved");
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Failed to save");
    } finally {
      setSaving(false);
    }
  }

  function copyLink() {
    if (!slug) return;
    const url = `${window.location.origin}/u/${slug}`;
    navigator.clipboard.writeText(url);
    toast.success("Link copied");
  }

  return (
    <div className="space-y-6">
      {slug && (
        <div className="rounded-xl border bg-accent/50 p-4 flex items-center justify-between gap-3 flex-wrap">
          <div>
            <p className="text-sm font-medium">Your public profile</p>
            <p className="text-xs text-muted-foreground">/u/{slug}</p>
          </div>
          <div className="flex gap-2">
            <Button size="sm" variant="outline" onClick={copyLink}>
              <Copy className="h-3.5 w-3.5 mr-1.5" />
              Copy link
            </Button>
            <Button size="sm" variant="outline" asChild>
              <a href={`/u/${slug}`} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-3.5 w-3.5 mr-1.5" />
                View
              </a>
            </Button>
          </div>
        </div>
      )}

      <div className="rounded-xl border bg-background p-6 space-y-6">
        <div className="flex items-center justify-between rounded-lg border p-3">
          <div>
            <Label>Available for projects</Label>
            <p className="text-xs text-muted-foreground mt-0.5">
              Show companies whether you're open to new work.
            </p>
          </div>
          <div className="flex gap-2">
            <Button
              type="button"
              size="sm"
              variant={form.available ? "default" : "outline"}
              onClick={() => update("available", true)}
            >
              Available
            </Button>
            <Button
              type="button"
              size="sm"
              variant={!form.available ? "default" : "outline"}
              onClick={() => update("available", false)}
            >
              Busy
            </Button>
          </div>
        </div>

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
        <div>
          <Label>Video Introduction Link</Label>
          <Input
            className="mt-2"
            placeholder="https://youtube.com/... or Loom link"
            value={form.videoIntroUrl}
            onChange={(e) => update("videoIntroUrl", e.target.value)}
          />
        </div>
        <div>
          <Label>Languages</Label>
          <Input
            className="mt-2"
            placeholder="English, Swahili, Sheng (comma separated)"
            value={form.languages}
            onChange={(e) => update("languages", e.target.value)}
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
    </div>
  );
}
