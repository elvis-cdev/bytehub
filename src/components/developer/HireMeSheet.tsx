"use client";
import { useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { sendPortfolioInquiry } from "@/actions/profile";
import { toast } from "sonner";
import { Loader2, Mail } from "lucide-react";

export function HireMeSheet({ slug, developerName }: { slug: string; developerName: string }) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);

  async function handleSend() {
    setSending(true);
    try {
      await sendPortfolioInquiry({ slug, senderName: name, senderEmail: email, message });
      toast.success("Message sent!");
      setName("");
      setEmail("");
      setMessage("");
      setOpen(false);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Failed to send");
    } finally {
      setSending(false);
    }
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:opacity-90 transition">
        <Mail className="h-4 w-4" />
        Hire {developerName.split(" ")[0]}
      </SheetTrigger>
      <SheetContent side="right" className="w-full sm:max-w-md">
        <SheetHeader>
          <SheetTitle>Send a message to {developerName}</SheetTitle>
        </SheetHeader>
        <div className="mt-6 space-y-4 px-4 pb-6">
          <div>
            <Label>Your Name</Label>
            <Input className="mt-2" value={name} onChange={(e) => setName(e.target.value)} required />
          </div>
          <div>
            <Label>Your Email</Label>
            <Input type="email" className="mt-2" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div>
            <Label>Message</Label>
            <Textarea
              className="mt-2"
              rows={5}
              placeholder="Tell them about the opportunity..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            />
          </div>
          <Button onClick={handleSend} disabled={sending || !name || !email || !message} className="w-full">
            {sending ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
            Send Message
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
