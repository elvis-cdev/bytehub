"use client";
import { useState } from "react";
import { useParams } from "next/navigation";
import { submitTestimonial } from "@/actions/profile";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, CheckCircle2 } from "lucide-react";

export default function TestimonialSubmitPage() {
  const params = useParams();
  const token = params.token as string;
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [content, setContent] = useState("");
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSending(true);
    setError("");
    try {
      await submitTestimonial(token, { authorName: name, authorRole: role, content });
      setDone(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setSending(false);
    }
  }

  if (done) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-muted/20 px-4">
        <div className="text-center space-y-3">
          <CheckCircle2 className="h-10 w-10 text-green-600 mx-auto" />
          <p className="text-lg font-medium">Thank you!</p>
          <p className="text-sm text-muted-foreground">Your testimonial has been submitted for review.</p>
        </div>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-muted/20 px-4">
      <form onSubmit={handleSubmit} className="w-full max-w-md space-y-5 rounded-2xl border bg-background p-8">
        <div>
          <h1 className="text-xl font-bold">Leave a testimonial</h1>
          <p className="text-sm text-muted-foreground mt-1">Share your experience working with this developer.</p>
        </div>
        <div>
          <Label>Your Name</Label>
          <Input className="mt-2" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div>
          <Label>Your Role / Company</Label>
          <Input className="mt-2" placeholder="e.g. Founder at Acme Ltd" value={role} onChange={(e) => setRole(e.target.value)} />
        </div>
        <div>
          <Label>Your Testimonial</Label>
          <Textarea className="mt-2" rows={5} value={content} onChange={(e) => setContent(e.target.value)} required />
        </div>
        {error && <p className="text-sm text-destructive">{error}</p>}
        <Button type="submit" className="w-full" disabled={sending}>
          {sending ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
          Submit
        </Button>
      </form>
    </main>
  );
}
