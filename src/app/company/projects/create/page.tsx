import CreateProjectForm from "@/components/company/CreateProjectForm";

export default function CreateProjectPage() {
  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Create Project</h1>
        <p className="text-muted-foreground">
          Post a new opportunity for developers.
        </p>
      </div>

      <CreateProjectForm />
    </div>
  );
}
