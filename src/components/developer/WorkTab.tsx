"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { addPortfolioProject, deletePortfolioProject } from "@/actions/developer";
import { toast } from "sonner";
import { Loader2, Plus, Trash2, ExternalLink, X } from "lucide-react";

interface PortfolioProject {
  id: string;
  title: string;
  description: string;
  link: string | null;
  imageUrl: string | null;
  techStack: string[];
  createdAt: Date;
}

export default function WorkTab({
  initialProjects,
}: {
  initialProjects: PortfolioProject[];
}) {
  const [projects, setProjects] = useState(initialProjects);
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [link, setLink] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [techStack, setTechStack] = useState("");

  function resetForm() {
    setTitle("");
    setDescription("");
    setLink("");
    setImageUrl("");
    setTechStack("");
    setShowForm(false);
  }

  async function handleAdd() {
    if (!title.trim() || !description.trim()) {
      toast.error("Title and description are required");
      return;
    }
    setSaving(true);
    try {
      const project = await addPortfolioProject({
        title: title.trim(),
        description: description.trim(),
        link: link.trim() || undefined,
        imageUrl: imageUrl.trim() || undefined,
        techStack: techStack
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean),
      });
      setProjects((prev) => [project, ...prev]);
      toast.success("Work added");
      resetForm();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Failed to add work");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: string) {
    const prev = projects;
    setProjects((p) => p.filter((proj) => proj.id !== id));
    try {
      await deletePortfolioProject(id);
      toast.success("Removed");
    } catch (e) {
      setProjects(prev);
      toast.error(e instanceof Error ? e.message : "Failed to remove");
    }
  }

  return (
    <div className="space-y-6">
      {!showForm ? (
        <Button variant="outline" onClick={() => setShowForm(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add Work
        </Button>
      ) : (
        <div className="rounded-xl border bg-background p-6 space-y-4">
          <div className="flex items-center justify-between">
            <p className="font-medium">New work sample</p>
            <button onClick={resetForm} className="text-muted-foreground hover:text-foreground">
              <X className="h-4 w-4" />
            </button>
          </div>
          <div>
            <Label>Title</Label>
            <Input
              className="mt-2"
              placeholder="e.g. Bytehub Marketplace"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div>
            <Label>Description</Label>
            <Textarea
              className="mt-2"
              rows={4}
              placeholder="What did you build, and what was your role?"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div>
            <Label>Image URL</Label>
            <Input
              className="mt-2"
              placeholder="https://..."
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
            />
            <p className="mt-1 text-xs text-muted-foreground">
              Paste a link to a screenshot or preview image.
            </p>
          </div>
          <div>
            <Label>Project Link</Label>
            <Input
              className="mt-2"
              placeholder="https://github.com/you/project"
              value={link}
              onChange={(e) => setLink(e.target.value)}
            />
          </div>
          <div>
            <Label>Tech Stack</Label>
            <Input
              className="mt-2"
              placeholder="Next.js, Prisma, PostgreSQL (comma separated)"
              value={techStack}
              onChange={(e) => setTechStack(e.target.value)}
            />
          </div>
          <Button onClick={handleAdd} disabled={saving}>
            {saving ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
            Add Work
          </Button>
        </div>
      )}

      {projects.length === 0 ? (
        <div className="rounded-xl border border-dashed p-10 text-center text-sm text-muted-foreground">
          No work added yet. Showcase a project to strengthen your profile.
        </div>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2">
          {projects.map((project) => (
            <div key={project.id} className="group relative rounded-xl border bg-background overflow-hidden">
              {project.imageUrl && (
                <img
                  src={project.imageUrl}
                  alt={project.title}
                  className="h-40 w-full object-cover border-b"
                />
              )}
              <div className="p-4 space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <p className="font-medium">{project.title}</p>
                  <button
                    onClick={() => handleDelete(project.id)}
                    className="text-muted-foreground hover:text-destructive shrink-0"
                    aria-label="Remove"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
                <p className="text-sm text-muted-foreground line-clamp-3">
                  {project.description}
                </p>
                {project.techStack.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {project.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-full bg-accent px-2 py-0.5 text-xs text-accent-foreground"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs text-primary pt-1 hover:underline"
                  >
                    View project <ExternalLink className="h-3 w-3" />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
