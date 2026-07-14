import type { AcademicsStreamComparisonData } from '@nexus/contracts';
import { StreamComparisonTable } from '@nexus/ui';

export default function StreamComparison({ data }: { data: AcademicsStreamComparisonData }) {
  return (
    <section className="py-16 md:py-24 bg-surface-deep border-y border-border-light">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          {data.eyebrow && <p className="mb-4 text-sm font-semibold uppercase tracking-wider text-green-base">{data.eyebrow}</p>}
          {data.heading && <h2 className="text-3xl font-bold tracking-tight md:text-4xl text-text-primary font-display">{data.heading}</h2>}
        </div>
        <StreamComparisonTable streams={data.comparisons} />
      </div>
    </section>
  );
}
