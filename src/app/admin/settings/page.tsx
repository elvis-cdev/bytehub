import PageHeader from "@/components/dashboard/components/PageHeader";
import { SettingsForm } from "@/components/dashboard/SettingsForm";

export default function AdminSettingsPage() {
  return (
    <div className="space-y-8">
      <PageHeader title="Settings" description="Manage your account security." />
      <SettingsForm />
    </div>
  );
}
