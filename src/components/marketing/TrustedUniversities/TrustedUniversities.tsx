export default function TrustedUniversities() {
  const universities = [
    "JKUAT",
    "University of Nairobi",
    "Kenyatta University",
    "Strathmore",
    "Mount Kenya University",
    "KCA University",
  ];

  return (
    <section className="border-y bg-muted/30 py-16">
      <div className="mx-auto max-w-7xl px-6">
        <p className="mb-10 text-center text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
          Trusted by students from leading universities
        </p>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
          {universities.map((university) => (
            <div
              key={university}
              className="rounded-xl border bg-background p-5 text-center font-semibold shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >
              {university}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
