"use client";
import {
  BriefcaseBusiness,
  FileText,
  MessageSquare,
  UserCheck,
} from "lucide-react";

import {
  ActivityItem,
  PageHeader,
  SectionCard,
  StatCard,
} from "@/components/dashboard";

export default function DeveloperDashboardPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        title="Welcome back 👋"
        description="Here's what's happening with your developer account."
      />

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Projects Applied"
          value={12}
          icon={BriefcaseBusiness}
        />

        <StatCard
          title="Applications"
          value={4}
          icon={FileText}
        />

        <StatCard
          title="Messages"
          value={8}
          icon={MessageSquare}
        />

        <StatCard
          title="Profile Completion"
          value="65%"
          icon={UserCheck}
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <SectionCard title="Recommended Projects">
            <div className="space-y-4">

              <ProjectCard
                title="AI SaaS Dashboard"
                company="TechCorp"
                salary="$2,000"
                stack="Next.js • Prisma • TypeScript"
              />

              <ProjectCard
                title="Mobile Banking App"
                company="FinFlow"
                salary="$3,500"
                stack="React Native • Node.js"
              />

              <ProjectCard
                title="Cybersecurity Platform"
                company="SecureNet"
                salary="$4,200"
                stack="Next.js • Go • Docker"
              />

            </div>
          </SectionCard>
        </div>

        <SectionCard title="Recent Activity">
          <ActivityItem
            text="Applied to AI SaaS Dashboard"
            time="10 min ago"
          />

          <ActivityItem
            text="TechCorp viewed your profile"
            time="1 hour ago"
          />

          <ActivityItem
            text="Profile reached 65%"
            time="Yesterday"
          />

          <ActivityItem
            text="New message received"
            time="2 days ago"
          />
        </SectionCard>
      </div>
    </div>
  );
}

interface ProjectCardProps {
  title: string;
  company: string;
  salary: string;
  stack: string;
}

function ProjectCard({
  title,
  company,
  salary,
  stack,
}: ProjectCardProps) {
  return (
    <div className="rounded-xl border p-5 transition hover:border-primary hover:shadow-md">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-lg font-semibold">{title}</h3>

          <p className="text-sm text-muted-foreground">
            {company}
          </p>
        </div>

        <span className="rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
          {salary}
        </span>
      </div>

      <p className="mt-4 text-sm text-muted-foreground">
        {stack}
      </p>

      <button className="mt-5 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition hover:opacity-90">
        Apply
      </button>
    </div>
  );
}
