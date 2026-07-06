import type { AdministrationPrincipalData } from '@nexus/contracts';
import { StaffCard } from '@nexus/ui';

export default function PrincipalSection({ data }: { data: AdministrationPrincipalData }) {
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
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl font-display text-text-primary">
              {data.heading}
            </h2>
          )}
        </div>
        <StaffCard
          {...data.principal}
          variant="principal"
        />
      </div>
    </section>
  );
}
