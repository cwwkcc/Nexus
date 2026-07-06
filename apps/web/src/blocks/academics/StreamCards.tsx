import type { AcademicsStreamCardsData } from '@nexus/contracts';
import { AcademicStreamCard } from '@nexus/ui';

export default function StreamCards({ data }: { data: AcademicsStreamCardsData }) {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          {data.eyebrow && (
            <p className="mb-4 text-sm font-semibold uppercase tracking-wider text-green-base">
              {data.eyebrow}
            </p>
          )}
          {data.heading && (
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl text-text-primary font-display">
              {data.heading}
            </h2>
          )}
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {data.streams.map((stream) => (
            <AcademicStreamCard
              key={stream.id}
              {...stream}
              href={`/academics/${stream.stream}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
