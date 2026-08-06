import {
  Briefcase,
  FolderKanban,
  Star,
  TrendingUp,
} from "lucide-react";

export default function DashboardPreview() {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xl">
      <div className="mb-8">
        <h3 className="text-xl font-semibold">
          ByteHub Dashboard
        </h3>

        <p className="text-sm text-slate-500">
          Welcome back 👋
        </p>
      </div>

      <div className="space-y-4">
        <Card
          icon={<Star className="h-5 w-5" />}
          title="ByteScore"
          value="945"
        />

        <Card
          icon={<FolderKanban className="h-5 w-5" />}
          title="Projects"
          value="12"
        />

        <Card
          icon={<Briefcase className="h-5 w-5" />}
          title="Applications"
          value="8"
        />

        <Card
          icon={<TrendingUp className="h-5 w-5" />}
          title="Profile Views"
          value="1,284"
        />
      </div>
    </div>
  );
}

function Card({
  icon,
  title,
  value,
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
}) {
  return (
    <div className="flex items-center justify-between rounded-xl bg-slate-50 p-4">
      <div className="flex items-center gap-3">
        {icon}

        <span>{title}</span>
      </div>

      <span className="font-bold">{value}</span>
    </div>
  );
}
