import type { FacilitiesGridData } from '@nexus/contracts';
import { FacilityCard } from '@nexus/ui';

export default function FacilitiesGrid({ grid }: { grid: FacilitiesGridData }) {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <p className="mb-4 text-sm font-semibold uppercase tracking-wider text-primary">{grid.eyebrow}</p>
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">{grid.heading}</h2>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {grid.facilities.map((facility) => (
            <FacilityCard key={facility.id} name={facility.name} description={facility.description} imageSrc={facility.imageSrc} imageAlt={facility.imageAlt} features={facility.features || []} />
          ))}
        </div>
      </div>
    </section>
  );
}
