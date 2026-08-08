import PageHeader from "@/components/dashboard/components/PageHeader";
import { SettingsForm } from "@/components/dashboard/SettingsForm";

export default function DeveloperSettingsPage() {
  return (
    <div className="space-y-8">
      <PageHeader title="Settings" description="Manage your account security." />
      <SettingsForm />
    </div>
  );
}
