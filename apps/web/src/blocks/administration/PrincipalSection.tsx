import type { AdministrationPrincipalData } from '@nexus/contracts';
import { toStaffCardData } from '@nexus/contracts';
import { StaffCard } from '@nexus/ui';

export default function PrincipalSection({ data }: { data: AdministrationPrincipalData }) {
  // M4 (Staff Module, F-160): `principal` is now a live Staff-table query
  // (see server/content/administration.ts) instead of hand-authored
  // ContentEntry copy, so it can legitimately be missing — e.g. a fresh
  // database with no principal entered into the Staff Module yet. Render
  // nothing rather than spreading `undefined` into StaffCard.
  if (!data.principal) {
    return null;
  }

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          {data.eyebrow && <p className="mb-4 text-sm font-semibold uppercase tracking-wider text-green-base">{data.eyebrow}</p>}
          {data.heading && <h2 className="text-3xl font-bold tracking-tight md:text-4xl font-display text-text-primary">{data.heading}</h2>}
        </div>
        {/* toStaffCardData flattens `portrait: { src, alt }` into the
            `imageSrc`/`imageAlt` props StaffCard actually reads — a plain
            `{...data.principal}` spread silently dropped the photo (see
            @nexus/contracts' staff-member.ts doc comment on the helper). */}
        <StaffCard {...toStaffCardData(data.principal)} variant="principal" />
      </div>
    </section>
  );
}
