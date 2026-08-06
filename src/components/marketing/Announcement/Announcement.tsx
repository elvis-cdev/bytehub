import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Announcement() {
  return (
    <div className="border-b border-blue-100 bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700">
      <div className="mx-auto flex max-w-7xl items-center justify-center px-6 py-3">
        <Link
          href="/register/developer"
          className="group flex items-center gap-2 text-sm font-medium text-white transition-opacity hover:opacity-90"
        >
          <span className="rounded-full bg-white/20 px-3 py-1 text-xs font-semibold uppercase tracking-wide">
            Early Access
          </span>

          <span>
           Join the next generation of student developers and get discovered by employers across Kenya.
          </span>

          <ArrowRight
            size={16}
            className="transition-transform group-hover:translate-x-1"
          />
        </Link>
      </div>
    </div>
  );
}
