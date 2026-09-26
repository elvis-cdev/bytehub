import {
  PageHeader,
  SectionCard,
  StatCard,
} from "@/components/dashboard";

import { getMyApplications } from "@/actions/application";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { calculateByteScore } from "@/lib/bytescore";
import { headers } from "next/headers";

import {
  Award,
  BriefcaseBusiness,
  FileText,
  UserCheck,
} from "lucide-react";

import { applicationStatusConfig } from "@/lib/status";
import { Badge } from "@/components/ui/badge";

export default async function DeveloperDashboardPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const applications = await getMyApplications();

  const accepted = applications.filter(
    (a) => a.status === "ACCEPTED"
  ).length;

  const pending = applications.filter(
    (a) => a.status === "PENDING"
  ).length;

  const user = session?.user;

  const developerData = user
    ? await prisma.user.findUnique({
        where: {
          id: user.id,
        },
        include: {
          DeveloperProfile: {
            include: {
              Skill: true,
              showcases: true,
              certifications: true,
              testimonials: true,
              views: true,
            },
          },
          applications: true,
        },
      })
    : null;

  const byteScore = developerData
    ? calculateByteScore(developerData)
    : null;

  return (
    <div className="space-y-8">
      <PageHeader
        title={`Welcome back${
          session?.user.name
            ? `, ${session.user.name.split(" ")[0]}`
            : ""
        } 👋`}
        description="Manage your developer journey from one place."
      />

      {/* Statistics */}
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        <StatCard
          title="Projects Applied"
          value={applications.length}
          icon={BriefcaseBusiness}
        />

        <StatCard
          title="Accepted"
          value={accepted}
          icon={UserCheck}
        />

        <StatCard
          title="Pending"
          value={pending}
          icon={FileText}
        />
      </div>

      {/* ByteScore */}
      {byteScore && (
        <SectionCard title="Your ByteScore">
          <div className="space-y-6">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-4">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-primary/10">
                  <Award className="h-8 w-8 text-primary" />
                </div>

                <div>
                  <p className="text-3xl font-bold">
                    {byteScore.total}
                    <span className="text-base font-normal text-muted-foreground">
                      /1000
                    </span>
                  </p>

                  <p className="text-sm text-muted-foreground">
                    Based on your activity and profile
                  </p>
                </div>
              </div>

              <div className="h-3 w-full overflow-hidden rounded-full bg-muted sm:w-64">
                <div
                  className="h-full rounded-full bg-primary transition-all"
                  style={{
                    width: `${(byteScore.total / 1000) * 100}%`,
                  }}
                />
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              <ScoreItem
                label="Profile"
                score={byteScore.profile}
                max={250}
              />

              <ScoreItem
                label="Skills"
                score={byteScore.skills}
                max={150}
              />

              <ScoreItem
                label="Projects"
                score={byteScore.projects}
                max={200}
              />

              <ScoreItem
                label="Applications"
                score={byteScore.applications}
                max={150}
              />

              <ScoreItem
                label="Certifications"
                score={byteScore.certifications}
                max={100}
              />

              <ScoreItem
                label="Testimonials"
                score={byteScore.testimonials}
                max={75}
              />

              <ScoreItem
                label="Profile Views"
                score={byteScore.profileViews}
                max={75}
              />
            </div>
          </div>
        </SectionCard>
      )}

      {/* Recent Applications */}
      <SectionCard title="Recent Applications">
        {applications.length === 0 ? (
          <p className="py-8 text-center text-muted-foreground">
            No applications yet — head to Browse Projects to get started.
          </p>
        ) : (
          <div className="space-y-3">
            {applications.slice(0, 5).map((app) => {
              const config = applicationStatusConfig[app.status];

              return (
                <div
                  key={app.id}
                  className="flex items-center justify-between rounded-lg border p-4 transition-colors hover:bg-muted/50"
                >
                  <p className="font-medium">
                    {app.project.title}
                  </p>

                  <Badge className={config.className}>
                    {config.label}
                  </Badge>
                </div>
              );
            })}
          </div>
        )}
      </SectionCard>
    </div>
  );
}

function ScoreItem({
  label,
  score,
  max,
}: {
  label: string;
  score: number;
  max: number;
}) {
  const percentage = Math.round((score / max) * 100);

  return (
    <div className="rounded-xl border p-4">
      <div className="mb-2 flex items-center justify-between gap-3">
        <span className="text-sm font-medium">{label}</span>

        <span className="text-sm text-muted-foreground">
          {score}/{max}
        </span>
      </div>

      <div className="h-2 overflow-hidden rounded-full bg-muted">
        <div
          className="h-full rounded-full bg-primary"
          style={{
            width: `${percentage}%`,
          }}
        />
      </div>
    </div>
  );
}
