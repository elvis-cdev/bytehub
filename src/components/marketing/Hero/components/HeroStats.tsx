import { heroStats } from "@/constants/stats";

export default function HeroStats() {
  return (
    <div className="mt-12 grid grid-cols-2 gap-8 md:grid-cols-4">
      {heroStats.map((stat) => (
        <div key={stat.label}>
          <h3 className="text-3xl font-bold text-slate-900">
            {stat.value}
          </h3>

          <p className="mt-2 text-sm text-slate-500">
            {stat.label}
          </p>
        </div>
      ))}
    </div>
  );
}
