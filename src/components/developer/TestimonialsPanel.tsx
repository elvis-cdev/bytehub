"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { createTestimonialRequestLink, approveTestimonial } from "@/actions/profile";
import { toast } from "sonner";
import { Loader2, Copy, CheckCircle2 } from "lucide-react";

interface TestimonialItem {
  id: string;
  authorName: string;
  authorRole: string | null;
  content: string;
  approved: boolean;
}

export function TestimonialsPanel({ initialTestimonials }: { initialTestimonials: TestimonialItem[] }) {
  const [testimonials, setTestimonials] = useState(initialTestimonials);
  const [generating, setGenerating] = useState(false);

  async function handleGenerateLink() {
    setGenerating(true);
    try {
      const token = await createTestimonialRequestLink();
      const url = `${window.location.origin}/testimonial/${token}`;
      await navigator.clipboard.writeText(url);
      toast.success("Link copied! Send it to a past client or lecturer.");
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Failed to generate link");
    } finally {
      setGenerating(false);
    }
  }

  async function handleApprove(id: string) {
    try {
      await approveTestimonial(id);
      setTestimonials((prev) => prev.map((t) => (t.id === id ? { ...t, approved: true } : t)));
      toast.success("Approved and now visible on your public profile");
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Failed");
    }
  }

  const submitted = testimonials.filter((t) => t.content);

  return (
    <div className="rounded-xl border bg-background p-6 space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="font-medium">Testimonials</p>
          <p className="text-xs text-muted-foreground mt-0.5">Request quotes from past clients or lecturers.</p>
        </div>
        <Button size="sm" variant="outline" onClick={handleGenerateLink} disabled={generating}>
          {generating ? <Loader2 className="h-3.5 w-3.5 animate-spin mr-1.5" /> : <Copy className="h-3.5 w-3.5 mr-1.5" />}
          Get request link
        </Button>
      </div>
      {submitted.length === 0 ? (
        <p className="text-sm text-muted-foreground py-4 text-center">No testimonials yet.</p>
      ) : (
        <div className="space-y-3">
          {submitted.map((t) => (
            <div key={t.id} className="rounded-lg border p-3 space-y-1.5">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium">{t.authorName}{t.authorRole ? ` · ${t.authorRole}` : ""}</p>
                {t.approved ? (
                  <span className="flex items-center gap-1 text-xs text-green-600"><CheckCircle2 className="h-3.5 w-3.5" /> Live</span>
                ) : (
                  <Button size="sm" onClick={() => handleApprove(t.id)}>Approve & publish</Button>
                )}
              </div>
              <p className="text-sm text-muted-foreground">{t.content}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
