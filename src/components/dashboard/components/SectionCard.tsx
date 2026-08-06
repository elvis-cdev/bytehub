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
    <div className="rounded-xl border p-6 space-y-4">
      <h2 className="text-xl font-semibold">
        {title}
      </h2>

      <div>
        {children}
      </div>
    </div>
  );
}
