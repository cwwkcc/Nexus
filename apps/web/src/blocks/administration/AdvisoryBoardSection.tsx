import type { AdministrationAdvisoryBoardData } from '@nexus/contracts';
import { StaffCard } from '@nexus/ui';

export default function AdvisoryBoardSection({ data }: { data: AdministrationAdvisoryBoardData }) {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center max-w-2xl mx-auto">
          {data.eyebrow && <p className="mb-4 text-sm font-semibold uppercase tracking-wider text-green-base">{data.eyebrow}</p>}
          {data.heading && <h2 className="text-3xl font-bold tracking-tight md:text-4xl font-display text-text-primary">{data.heading}</h2>}
          {data.description && <p className="mt-4 text-text-muted font-body leading-relaxed">{data.description}</p>}
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {data.members.map((member, i) => (
            <StaffCard key={member.name || i} {...member} variant="compact" />
          ))}
        </div>
      </div>
    </section>
  );
}
