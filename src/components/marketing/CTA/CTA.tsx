import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function CTA() {
  return (
    <section className="mx-auto max-w-4xl px-6 py-24 text-center">
      <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
        Ready to get started?
      </h2>
      <p className="mt-4 text-lg text-muted-foreground">
        Join ByteHub today — whether you're building your portfolio or hiring your next developer.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-4">
        <Link
          href="/register"
          className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition hover:opacity-90"
        >
          Get Started
          <ArrowRight size={18} />
        </Link>
      </div>
    </section>
  );
}
