import type { AdministrationStaffGridData } from '@nexus/contracts';
import { StaffCard } from '@nexus/ui';

export default function StaffGridSection({ data }: { data: AdministrationStaffGridData }) {
  return (
    <section className="py-16 md:py-24 bg-surface-deep border-y border-border-light">
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
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {data.staff.map((member, i) => (
            <StaffCard
              key={member.name || i}
              {...member}
              variant="grid"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
