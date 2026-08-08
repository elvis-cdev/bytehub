import prisma from "@/lib/prisma";

export default async function ProjectsPage() {
  const projects = await prisma.project.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <main className="mx-auto max-w-5xl space-y-8 px-6 py-8">
      <div>
        <h1 className="text-4xl font-bold">Browse Projects</h1>
        <p className="text-muted-foreground">
          Real projects from the database.
        </p>
      </div>

      <div className="grid gap-6">
        {projects.length === 0 ? (
          <div className="rounded-xl border border-dashed p-10 text-center">
            <p className="text-muted-foreground">
              No projects yet. Create the first one.
            </p>
          </div>
        ) : (
          projects.map((project) => (
            <div
              key={project.id}
              className="rounded-xl border bg-background p-6"
            >
              <div className="flex items-start justify-between">
                <h2 className="text-xl font-semibold">
                  {project.title}
                </h2>

                <span className="rounded-full border px-3 py-1 text-sm">
                  {project.budget
                    ? `KES ${project.budget.toLocaleString()}`
                    : "Negotiable"}
                </span>
              </div>

              <p className="mt-4 text-muted-foreground">
                {project.description}
              </p>
            </div>
          ))
        )}
      </div>
    </main>
  );
}
