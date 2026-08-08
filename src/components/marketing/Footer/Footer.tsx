import Link from "next/link";
import Logo from "@/components/Logo";
import { FaInstagram, FaWhatsapp } from "react-icons/fa";
import { Mail } from "lucide-react";

const WHATSAPP_NUMBER = "";

export default function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex flex-col items-center gap-3 sm:items-start">
            <Logo size={36} />
            <p className="text-sm text-muted-foreground text-center sm:text-left">
              Connecting Kenyan student developers with real-world projects.
            </p>
          </div>

          <div className="flex flex-col items-center gap-3 sm:items-end">
            <p className="text-sm font-medium text-foreground">Get in touch</p>
            <div className="flex items-center gap-4">
              <a href="https://instagram.com/bytehubkenya" target="_blank" rel="noopener noreferrer" aria-label="ByteHub Kenya on Instagram" className="text-muted-foreground transition-colors hover:text-primary">
                <FaInstagram size={22} />
              </a>
              <a href="mailto:bytehubkenya@gmail.com" aria-label="Email ByteHub Kenya" className="text-muted-foreground transition-colors hover:text-primary">
                <Mail size={22} />
              </a>
              {WHATSAPP_NUMBER ? (
                <a href={"https://wa.me/" + WHATSAPP_NUMBER} target="_blank" rel="noopener noreferrer" aria-label="Message ByteHub Kenya on WhatsApp" className="text-muted-foreground transition-colors hover:text-primary">
                  <FaWhatsapp size={22} />
                </a>
              ) : (
                <span aria-hidden="true" title="WhatsApp number coming soon" className="text-muted-foreground/30">
                  <FaWhatsapp size={22} />
                </span>
              )}
            </div>
            <p className="text-xs text-muted-foreground">@bytehubkenya</p>
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t pt-6 sm:flex-row">
          <p className="text-xs text-muted-foreground">All rights reserved.</p>
          <div className="flex gap-6 text-xs text-muted-foreground">
            <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
            <Link href="/projects" className="hover:text-foreground transition-colors">Projects</Link>
            <Link href="/developers" className="hover:text-foreground transition-colors">Developers</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
