import type { AdministrationStaffGridData } from '@nexus/contracts';
import { toStaffCardData } from '@nexus/contracts';
import { StaffCard } from '@nexus/ui';

export default function StaffGridSection({ data }: { data: AdministrationStaffGridData }) {
  // M4 (Staff Module, F-160): `staff` is now a live Staff-table query (see
  // server/content/administration.ts), so it can legitimately be empty —
  // e.g. a fresh database with no deputy principals entered yet. Render
  // nothing rather than an empty heading floating over an empty grid.
  if (data.staff.length === 0) {
    return null;
  }

  return (
    <section className="py-16 md:py-24 bg-surface-deep border-y border-border-light">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          {data.eyebrow && <p className="mb-4 text-sm font-semibold uppercase tracking-wider text-green-base">{data.eyebrow}</p>}
          {data.heading && <h2 className="text-3xl font-bold tracking-tight md:text-4xl font-display text-text-primary">{data.heading}</h2>}
        </div>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {/* toStaffCardData flattens `portrait: { src, alt }` into the
              `imageSrc`/`imageAlt` props StaffCard actually reads — a plain
              `{...member}` spread silently dropped every photo (see
              @nexus/contracts' staff-member.ts doc comment on the helper).
              Keyed by `id` (a real Staff row id) rather than `name`, which
              isn't guaranteed unique across a staff roster. */}
          {data.staff.map((member) => (
            <StaffCard key={member.id} {...toStaffCardData(member)} variant="grid" />
          ))}
        </div>
      </div>
    </section>
  );
}
