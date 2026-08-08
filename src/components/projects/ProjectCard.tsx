import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface ProjectCardProps {
  title: string;
  company: string;
  budget: string;
  description: string;
  skills: string[];
}

export default function ProjectCard({
  title,
  company,
  budget,
  description,
  skills,
}: ProjectCardProps) {
  return (
    <div className="rounded-xl border bg-background p-6 transition hover:shadow-lg">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-xl font-semibold">{title}</h2>

          <p className="text-sm text-muted-foreground">
            {company}
          </p>
        </div>

        <Badge>
          {budget}
        </Badge>
      </div>

      <p className="mt-5 text-muted-foreground">
        {description}
      </p>

      <div className="mt-5 flex flex-wrap gap-2">
        {skills.map((skill) => (
          <Badge
            key={skill}
            variant="secondary"
          >
            {skill}
          </Badge>
        ))}
      </div>

      <div className="mt-6 flex gap-3">
        <Button>
          Apply
        </Button>

        <Button variant="outline">
          Save
        </Button>
      </div>
    </div>
  );
}
