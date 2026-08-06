import Container from "@/components/layout/Container";
import Section from "@/components/layout/Section";

import { howItWorks } from "@/constants/how-it-works";

import StepCard from "./components/StepCard";

export default function HowItWorks() {
  return (
    <Section>
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-sm font-semibold uppercase tracking-widest text-blue-600">
            How It Works
          </span>

          <h2 className="mt-4 text-4xl font-bold tracking-tight text-slate-900">
            Build Your Career in Four Simple Steps
          </h2>

          <p className="mt-6 text-lg text-slate-600">
            ByteHub helps student developers showcase their work,
            connect with businesses, and grow through real-world
            opportunities.
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2 xl:grid-cols-4">
          {howItWorks.map((step) => (
            <StepCard
              key={step.number}
              step={step}
            />
          ))}
        </div>
      </Container>
    </Section>
  );
}
