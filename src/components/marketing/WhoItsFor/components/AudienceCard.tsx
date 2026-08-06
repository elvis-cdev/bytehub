import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import type { Audience } from "@/types/marketing";

type Props = {
  audience: Audience;
};

export default function AudienceCard({ audience }: Props) {
  const Icon = audience.icon;

  return (
    <Card className="rounded-3xl border border-slate-200 p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
        <Icon className="h-7 w-7" />
      </div>

      <h3 className="mt-8 text-2xl font-bold text-slate-900">
        {audience.title}
      </h3>

      <p className="mt-2 font-medium text-blue-600">
        {audience.subtitle}
      </p>

      <p className="mt-5 leading-7 text-slate-600">
        {audience.description}
      </p>

      <div className="mt-8 space-y-4">
        {audience.features.map((feature) => {
          const FeatureIcon = feature.icon;

          return (
            <div
              key={feature.text}
              className="flex items-center gap-3"
            >
              <FeatureIcon className="h-5 w-5 text-blue-600" />

              <span className="text-slate-700">
                {feature.text}
              </span>
            </div>
          );
        })}
      </div>

      <Link
        href={audience.href}
        className="mt-10 block"
      >
        <Button className="w-full rounded-xl">
          {audience.button}
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </Link>
    </Card>
  );
}
