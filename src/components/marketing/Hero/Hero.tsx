import Container from "@/components/layout/Container";
import Section from "@/components/layout/Section";

import HeroBadge from "./components/HeroBadge";
import HeroButtons from "./components/HeroButtons";
import HeroStats from "./components/HeroStats";
import DashboardPreview from "./components/DashboardPreview";

import { hero } from "@/constants/hero";

export default function Hero() {
  return (
    <Section>
      <Container>
        <div className="grid items-center gap-16 lg:grid-cols-2">
          <div>
            <HeroBadge />

            <h1 className="mt-8 text-5xl font-bold leading-tight tracking-tight text-slate-900 md:text-7xl">
              {hero.title}
            </h1>

            <p className="mt-8 max-w-xl text-lg leading-8 text-slate-600">
              {hero.description}
            </p>

            <HeroButtons />

            <HeroStats />
          </div>

          <DashboardPreview />
        </div>
      </Container>
    </Section>
  );
}
