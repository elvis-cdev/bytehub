import { notFound } from "next/navigation";
import { getPublicDeveloperProfile } from "@/actions/profile";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Github, Linkedin, Globe, Calendar, CircleDot } from "lucide-react";

export default async function PublicDeveloperProfilePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const profile = await getPublicDeveloperProfile(slug);

  if (!profile) notFound();

  return (
    <main className="min-h-screen bg-muted/20">
      <div className="mx-auto max-w-3xl px-6 py-12 space-y-8">
        <div className="rounded-2xl border bg-background p-8">
          <div className="flex items-start gap-5">
            <img
              src={profile.User.image || "https://api.dicebear.com/7.x/initials/svg?seed=" + profile.User.name}
              alt={profile.User.name}
              className="h-20 w-20 rounded-full object-cover border"
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-2xl font-bold">{profile.User.name}</h1>
                <Badge variant="secondary" className={profile.available ? "bg-green-100 text-green-700 border-green-200" : ""}>
                  <CircleDot className="h-3 w-3 mr-1" />
                  {profile.available ? "Available for projects" : "Currently busy"}
                </Badge>
              </div>
              {profile.university && (
                <p className="text-muted-foreground mt-1">
                  {profile.course ? profile.course + " \u00b7 " : ""}
                  {profile.university}
                </p>
              )}
              {profile.User.bio && (
                <p className="mt-4 text-sm whitespace-pre-wrap">{profile.User.bio}</p>
              )}
              <div className="flex items-center gap-3 mt-4">
                {profile.github && <a href={profile.github} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground"><Github className="h-4 w-4" /></a>}
                {profile.linkedin && <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground"><Linkedin className="h-4 w-4" /></a>}
                {profile.portfolio && <a href={profile.portfolio} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground"><Globe className="h-4 w-4" /></a>}
              </div>
            </div>
          </div>
        </div>

        {profile.videoIntroUrl && (
          <div className="rounded-2xl border bg-background p-6">
            <h2 className="font-medium mb-3">Introduction</h2>
            <a href={profile.videoIntroUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-sm text-primary hover:underline">
              Watch intro video <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </div>
        )}

        {profile.Skill.length > 0 && (
          <div className="rounded-2xl border bg-background p-6">
            <h2 className="font-medium mb-3">Skills</h2>
            <div className="flex flex-wrap gap-2">
              {profile.Skill.map((s) => (
                <Badge key={s.id} variant="secondary">{s.name}</Badge>
              ))}
            </div>
          </div>
        )}

        {profile.languages.length > 0 && (
          <div className="rounded-2xl border bg-background p-6">
            <h2 className="font-medium mb-3">Languages</h2>
            <div className="flex flex-wrap gap-2">
              {profile.languages.map((lang) => (
                <Badge key={lang} variant="outline">{lang}</Badge>
              ))}
            </div>
          </div>
        )}

        {profile.showcases.length > 0 && (
          <div className="rounded-2xl border bg-background p-6">
            <h2 className="font-medium mb-4">Work</h2>
            <div className="grid gap-5 sm:grid-cols-2">
              {profile.showcases.map((project) => (
                <div key={project.id} className="rounded-xl border overflow-hidden">
                  {project.imageUrl && (
                    <img src={project.imageUrl} alt={project.title} className="h-36 w-full object-cover border-b" />
                  )}
                  <div className="p-4 space-y-2">
                    <p className="font-medium">{project.title}</p>
                    <p className="text-sm text-muted-foreground line-clamp-3">{project.description}</p>
                    {project.techStack.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {project.techStack.map((t) => (
                          <span key={t} className="rounded-full bg-accent px-2 py-0.5 text-xs text-accent-foreground">{t}</span>
                        ))}
                      </div>
                    )}
                    {project.link && (
                      <a href={project.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-xs text-primary hover:underline">
                        View project <ExternalLink className="h-3 w-3" />
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {profile.events.length > 0 && (
          <div className="rounded-2xl border bg-background p-6">
            <h2 className="font-medium mb-3">Events & Hackathons</h2>
            <div className="space-y-3">
              {profile.events.map((event) => (
                <div key={event.id} className="flex items-start gap-2.5">
                  <Calendar className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
                  <div>
                    <p className="text-sm font-medium">{event.title}</p>
                    {event.role && <p className="text-xs text-muted-foreground">{event.role}</p>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <p className="text-center text-xs text-muted-foreground pt-4">Powered by ByteHub</p>
      </div>
    </main>
  );
}
