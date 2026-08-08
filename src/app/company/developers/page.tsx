import { getAllDevelopers } from "@/actions/developer";
import { PageHeader } from "@/components/dashboard";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { AnimatedGrid, AnimatedItem } from "@/components/motion/animated-grid";
import { GraduationCap, Link2, Users } from "lucide-react";
import Link from "next/link";

export default async function DiscoverDevelopersPage() {
  const developers = await getAllDevelopers();

  return (
    <div className="space-y-8">
      <PageHeader
        title="Discover Developers"
        description="Browse student developers ready to work on your projects."
      />

      {developers.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center text-muted-foreground">
            <Users className="mx-auto h-8 w-8 mb-3 opacity-50" />
            No developers registered yet.
          </CardContent>
        </Card>
      ) : (
        <AnimatedGrid className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {developers.map((dev) => (
            <AnimatedItem key={dev.id}>
              <Link href={`/company/developers/${dev.id}`}>
                <Card className="h-full transition-all duration-200 hover:-translate-y-1 hover:shadow-lg hover:border-primary/40 cursor-pointer">
                  <CardHeader className="flex-row items-center gap-3 space-y-0">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={dev.image ?? undefined} />
                      <AvatarFallback>
                        {dev.name.slice(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="min-w-0">
                      <p className="font-semibold truncate">{dev.name}</p>
                      {dev.DeveloperProfile?.university && (
                        <p className="text-xs text-muted-foreground flex items-center gap-1 truncate">
                          <GraduationCap className="h-3 w-3 shrink-0" />
                          {dev.DeveloperProfile.university}
                        </p>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {dev.bio && (
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {dev.bio}
                      </p>
                    )}
                    {dev.DeveloperProfile?.Skill && dev.DeveloperProfile.Skill.length > 0 && (
                      <div className="flex flex-wrap gap-1.5">
                        {dev.DeveloperProfile.Skill.slice(0, 4).map((skill) => (
                          <Badge key={skill.name} variant="secondary" className="text-xs">
                            {skill.name}
                          </Badge>
                        ))}
                      </div>
                    )}
                    <div className="flex items-center justify-between text-xs text-muted-foreground pt-1">
                      <span>{dev._count.applications} applications</span>
                      {dev.DeveloperProfile?.github && (
                        <Link2 className="h-3.5 w-3.5" />
                      )}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </AnimatedItem>
          ))}
        </AnimatedGrid>
      )}
    </div>
  );
}
