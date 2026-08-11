"use client";

interface SectionCardProps {
  title: string;
  children: React.ReactNode;
}

export default function SectionCard({
  title,
  children,
}: SectionCardProps) {
  return (
    <section className="rounded-2xl border bg-background shadow-sm">
      <div className="border-b px-5 py-4 sm:px-6">
        <h2 className="text-base font-semibold">
          {title}
        </h2>
      </div>

      <div className="p-5 sm:p-6">
        {children}
      </div>
    </section>
  );
}
