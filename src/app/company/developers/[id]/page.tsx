import { getDeveloperProfile } from "@/actions/developer";
import { PageHeader, SectionCard } from "@/components/dashboard";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { applicationStatusConfig } from "@/lib/status";
import { Github, Globe, Linkedin, GraduationCap, ExternalLink } from "lucide-react";

export default async function DeveloperPublicProfilePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const dev = await getDeveloperProfile(id);
  const profile = dev.DeveloperProfile;

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4">
        <Avatar className="h-16 w-16">
          <AvatarImage src={dev.image ?? undefined} />
          <AvatarFallback className="text-lg">
            {dev.name.slice(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div>
          <h1 className="text-2xl font-bold">{dev.name}</h1>
          {profile?.university && (
            <p className="text-muted-foreground flex items-center gap-1.5">
              <GraduationCap className="h-4 w-4" />
              {profile.university} {profile.course ? `— ${profile.course}` : ""}
            </p>
          )}
        </div>
      </div>

      {dev.bio && <p className="text-muted-foreground max-w-2xl">{dev.bio}</p>}

      <div className="flex flex-wrap gap-2">
        {profile?.github && (
          <a href={profile.github} target="_blank" rel="noopener noreferrer">
            <Badge variant="secondary" className="gap-1.5">
              <Github className="h-3.5 w-3.5" /> GitHub
            </Badge>
          </a>
        )}
        {profile?.linkedin && (
          <a href={profile.linkedin} target="_blank" rel="noopener noreferrer">
            <Badge variant="secondary" className="gap-1.5">
              <Linkedin className="h-3.5 w-3.5" /> LinkedIn
            </Badge>
          </a>
        )}
        {profile?.portfolio && (
          <a href={profile.portfolio} target="_blank" rel="noopener noreferrer">
            <Badge variant="secondary" className="gap-1.5">
              <Globe className="h-3.5 w-3.5" /> Portfolio
            </Badge>
          </a>
        )}
      </div>

      {profile?.Skill && profile.Skill.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {profile.Skill.map((skill) => (
            <Badge key={skill.id}>{skill.name}</Badge>
          ))}
        </div>
      )}

      <SectionCard title="Showcase Projects">
        {!profile?.showcases || profile.showcases.length === 0 ? (
          <p className="text-muted-foreground py-4">No showcase projects yet.</p>
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {profile.showcases.map((project) => (
              <Card key={project.id}>
                <CardContent className="p-4 space-y-2">
                  <div className="flex items-start justify-between">
                    <p className="font-medium">{project.title}</p>
                    {project.link && (
                      <a href={project.link} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-4 w-4 text-muted-foreground hover:text-foreground" />
                      </a>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {project.description}
                  </p>
                  {project.techStack.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {project.techStack.map((tech) => (
                        <Badge key={tech} variant="outline" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </SectionCard>

      <SectionCard title="Application History">
        {dev.applications.length === 0 ? (
          <p className="text-muted-foreground py-4">No applications yet.</p>
        ) : (
          <div className="space-y-2">
            {dev.applications.map((app) => {
              const config = applicationStatusConfig[app.status];
              return (
                <div
                  key={app.id}
                  className="flex items-center justify-between rounded-lg border p-3"
                >
                  <span className="text-sm">{app.project.title}</span>
                  <Badge className={config.className}>{config.label}</Badge>
                </div>
              );
            })}
          </div>
        )}
      </SectionCard>
    </div>
  );
}
