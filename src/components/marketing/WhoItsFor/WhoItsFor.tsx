import Container from "@/components/layout/Container";
import Section from "@/components/layout/Section";

import AudienceCard from "./components/AudienceCard";

import { audiences } from "@/constants/audiences";

export default function WhoItsFor() {
  return (
    <Section className="py-24">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-sm font-semibold uppercase tracking-widest text-blue-600">
            Who ByteHub Is For
          </span>

          <h2 className="mt-4 text-4xl font-bold tracking-tight text-slate-900">
            One Platform.
            <br />
            Two Communities.
          </h2>

          <p className="mt-6 text-lg leading-8 text-slate-600">
            Whether you are building your first portfolio or searching for exceptional student developers, ByteHub gives you one trusted place to connect, collaborate, and grow.
          </p>
        </div>

        <div className="mt-20 grid gap-8 lg:grid-cols-2">
          {audiences.map((audience) => (
            <AudienceCard
              key={audience.title}
              audience={audience}
            />
          ))}
        </div>
      </Container>
    </Section>
  );
}
