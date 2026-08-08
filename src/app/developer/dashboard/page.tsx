import {
  ActivityItem,
  NotificationCard,
  PageHeader,
  ProfileCompletion,
  QuickActionCard,
  SectionCard,
  StatCard,
} from "@/components/dashboard";

import {
  BriefcaseBusiness,
  FileText,
  MessageSquare,
  UserCheck,
} from "lucide-react";

export default function DeveloperDashboardPage() {
  return (
    <div className="space-y-8">

      <PageHeader
        title="Welcome back 👋"
        description="Manage your developer journey from one place."
      />

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

        <StatCard
          title="Projects Applied"
          value={12}
          icon={BriefcaseBusiness}
        />

        <StatCard
          title="Accepted"
          value={4}
          icon={UserCheck}
        />

        <StatCard
          title="Messages"
          value={9}
          icon={MessageSquare}
        />

        <StatCard
          title="Portfolio Views"
          value={341}
          icon={FileText}
        />

      </div>

      <ProfileCompletion value={72} />

      <div className="grid gap-6 lg:grid-cols-3">

        <QuickActionCard
          title="Complete Profile"
          description="Increase your chances of getting hired."
          href="/developer/profile"
        />

        <QuickActionCard
          title="Browse Projects"
          description="Find exciting opportunities."
          href="/projects"
        />

        <QuickActionCard
          title="Applications"
          description="Track all submitted applications."
          href="/developer/applications"
        />

      </div>

      <div className="grid gap-6 lg:grid-cols-2">

        <SectionCard title="Recent Activity">

          <div className="space-y-3">

            <ActivityItem
              text="Applied to ByteHub Landing Page redesign"
              time="5 minutes ago"
            />

            <ActivityItem
              text="Profile updated"
              time="Yesterday"
            />

            <ActivityItem
              text="New portfolio uploaded"
              time="2 days ago"
            />

          </div>

        </SectionCard>

        <SectionCard title="Notifications">

          <div className="space-y-3">

            <NotificationCard
              title="New project matches your skills."
              time="2 mins ago"
            />

            <NotificationCard
              title="Company viewed your profile."
              time="Today"
            />

            <NotificationCard
              title="Application accepted."
              time="Yesterday"
            />

          </div>

        </SectionCard>

      </div>

    </div>
  );
}
