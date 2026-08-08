"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { updateCompanyProfile } from "@/actions/profile";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

interface CompanyProfileFormProps {
  initial: {
    bio: string;
    image: string;
    company: string;
    website: string;
  };
}

export default function CompanyProfileForm({ initial }: CompanyProfileFormProps) {
  const [form, setForm] = useState(initial);
  const [saving, setSaving] = useState(false);

  function update(key: keyof typeof form, value: string) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSave() {
    setSaving(true);
    try {
      await updateCompanyProfile({
        bio: form.bio,
        image: form.image || undefined,
        company: form.company || undefined,
        website: form.website || undefined,
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
        <Label>Logo / Photo URL</Label>
        <Input
          className="mt-2"
          placeholder="https://..."
          value={form.image}
          onChange={(e) => update("image", e.target.value)}
        />
        <p className="mt-1 text-xs text-muted-foreground">
          Paste a link to your company logo or profile photo.
        </p>
      </div>
      <div>
        <Label>Company Name</Label>
        <Input
          className="mt-2"
          value={form.company}
          onChange={(e) => update("company", e.target.value)}
        />
      </div>
      <div>
        <Label>About</Label>
        <Textarea
          className="mt-2"
          rows={5}
          placeholder="What does your company do? What kind of projects do you post?"
          value={form.bio}
          onChange={(e) => update("bio", e.target.value)}
        />
      </div>
      <div>
        <Label>Website</Label>
        <Input
          className="mt-2"
          placeholder="https://..."
          value={form.website}
          onChange={(e) => update("website", e.target.value)}
        />
      </div>
      <Button onClick={handleSave} disabled={saving}>
        {saving ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
        Save Profile
      </Button>
    </div>
  );
}
