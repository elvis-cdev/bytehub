import { Card } from "@/components/ui/card";
import { Step } from "@/types/step";

type Props = {
  step: Step;
};

export default function StepCard({ step }: Props) {
  const Icon = step.icon;

  return (
    <Card className="relative rounded-3xl p-8 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      <span className="absolute right-6 top-6 text-sm font-bold text-slate-300">
        {step.number}
      </span>

      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
        <Icon className="h-8 w-8" />
      </div>

      <h3 className="mt-6 text-xl font-bold text-slate-900">
        {step.title}
      </h3>

      <p className="mt-4 leading-7 text-slate-600">
        {step.description}
      </p>
    </Card>
  );
}
