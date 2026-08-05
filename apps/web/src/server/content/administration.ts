import type { AppRouter } from '@nexus/api';
import { createServerCaller } from '@nexus/api';
import type { LocaleEnumData, HeroData, AdministrationPrincipalData, AdministrationStaffGridData, AdministrationSdsData, CtaData, StaffData } from '@nexus/contracts';
import type { inferRouterOutputs } from '@trpc/server';
import { cache } from 'react';

type RouterOutputs = inferRouterOutputs<AppRouter>;
type StaffOutputRow = RouterOutputs['staff']['byRole'][number];

export interface AdministrationPageContent {
  hero: HeroData;
  principal: AdministrationPrincipalData;
  deputyPrincipals: AdministrationStaffGridData;
  assistantPrincipals: AdministrationStaffGridData;
  headPrefects: AdministrationStaffGridData;
  sds: AdministrationSdsData;
  contact: CtaData;
}

/**
 * `staff.byRole`'s output (packages/api/src/modules/staff/validators.ts)
 * validates every optional field as nullable (`X | null`) — the same
 * convention News's API output already uses for a raw Postgres column
 * with no value. `StaffSchema` (@nexus/contracts), the shared contract
 * `principal`/`staff` are typed against below, predates the Staff
 * Module's API and models that same absence as `X | undefined` instead —
 * it originated as hand-authored ContentEntry JSON, where an absent key
 * is the natural way to omit a field. This reconciles the two at the one
 * boundary where they actually meet.
 */
function toStaffData(row: StaffOutputRow): StaffData {
  return {
    id: row.id,
    name: row.name,
    role: row.role,
    title: row.title,
    department: row.department ?? undefined,
    portfolio: row.portfolio ?? undefined,
    tenure: row.tenure ?? undefined,
    quote: row.quote ?? undefined,
    bio: row.bio ?? undefined,
    portrait: row.portrait ?? undefined,
    contactEmail: row.contactEmail ?? undefined,
    joinedYear: row.joinedYear ?? undefined,
  };
}

/**
 * M4 (Staff Module, F-160/F-165) update: `principal`/`deputyPrincipals`/
 * `assistantPrincipals`/`headPrefects` are no longer read out of the raw
 * ContentEntry JSON blob — see registry/page-registry/administration.ts's
 * top-of-file note. Each is now a live `staff.byRole` query against the
 * real Staff table; only the small section-chrome fields each schema still
 * carries (`eyebrow`/`heading`/`messageLinkHref`) are still read from a
 * ContentEntry row, if an editor has set one. A ContentEntry row that
 * still has stale `principal`/`staff` JSON left over from before the Staff
 * Module existed is harmless — those fields are simply never read below.
 */
export const getAdministrationPageContent = cache(async (locale: LocaleEnumData): Promise<AdministrationPageContent> => {
  const caller = createServerCaller();

  const [sections, principalStaff, deputyStaff, assistantStaff, headPrefectStaff] = await Promise.all([caller.contentEntry.getByScope({ scope: 'page:administration', locale }), caller.staff.byRole({ role: 'principal' }), caller.staff.byRole({ role: 'deputy-principal' }), caller.staff.byRole({ role: 'assistant-principal' }), caller.staff.byRole({ role: 'head-prefect' })]);

  const principalChrome = sections['administration.principal'] as Partial<AdministrationPrincipalData> | undefined;
  const deputyChrome = sections['administration.deputyPrincipals'] as Partial<AdministrationStaffGridData> | undefined;
  const assistantChrome = sections['administration.assistantPrincipals'] as Partial<AdministrationStaffGridData> | undefined;
  const headPrefectChrome = sections['administration.headPrefects'] as Partial<AdministrationStaffGridData> | undefined;

  return {
    hero: sections['administration.hero'] as HeroData,
    principal: {
      eyebrow: principalChrome?.eyebrow,
      heading: principalChrome?.heading,
      messageLinkHref: principalChrome?.messageLinkHref,
      // Exactly one principal is expected. If none has been entered into
      // the Staff Module yet, this stays undefined and
      // PrincipalSection.tsx skips rendering the section entirely rather
      // than crashing on a missing person.
      principal: principalStaff[0] ? toStaffData(principalStaff[0]) : undefined,
    },
    deputyPrincipals: { eyebrow: deputyChrome?.eyebrow, heading: deputyChrome?.heading, staff: deputyStaff.map(toStaffData) },
    assistantPrincipals: { eyebrow: assistantChrome?.eyebrow, heading: assistantChrome?.heading, staff: assistantStaff.map(toStaffData) },
    headPrefects: { eyebrow: headPrefectChrome?.eyebrow, heading: headPrefectChrome?.heading, staff: headPrefectStaff.map(toStaffData) },
    sds: sections['administration.sds'] as AdministrationSdsData,
    contact: sections['administration.contact'] as CtaData,
  };
});
