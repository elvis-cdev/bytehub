import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function HeroButtons() {
  return (
    <div className="flex flex-wrap gap-4">
      <Link
        href="/contact"
        className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition hover:opacity-90"
      >
        Get Started
        <ArrowRight size={18} />
      </Link>

      <Link
        href="/projects"
        className="inline-flex items-center rounded-lg border px-6 py-3 text-sm font-medium transition hover:bg-muted"
      >
        View Projects
      </Link>
    </div>
  );
}
