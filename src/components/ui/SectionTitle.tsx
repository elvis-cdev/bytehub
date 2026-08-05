interface SectionTitleProps {
  eyebrow?: string;
  title: string;
  description?: string;
}

export default function SectionTitle({
  eyebrow,
  title,
  description,
}: SectionTitleProps) {
  return (
    <div className="mx-auto mb-16 max-w-3xl text-center">
      {eyebrow && (
        <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">
          {eyebrow}
        </p>
      )}

      <h2 className="text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
        {title}
      </h2>

      {description && (
        <p className="mt-6 text-lg leading-8 text-slate-600">
          {description}
        </p>
      )}
    </div>
  );
}
