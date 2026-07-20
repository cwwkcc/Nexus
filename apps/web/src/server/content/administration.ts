import { createServerCaller } from '@nexus/api';
import type { LocaleEnumData, HeroData, AdministrationPrincipalData, AdministrationStaffGridData, AdministrationSdsData, CtaData } from '@nexus/contracts';
import { cache } from 'react';

export interface AdministrationPageContent {
  hero: HeroData;
  principal: AdministrationPrincipalData;
  deputyPrincipals: AdministrationStaffGridData;
  assistantPrincipals: AdministrationStaffGridData;
  headPrefects: AdministrationStaffGridData;
  sds: AdministrationSdsData;
  contact: CtaData;
}

export const getAdministrationPageContent = cache(async (locale: LocaleEnumData): Promise<AdministrationPageContent> => {
  const sections = await createServerCaller().contentEntry.getByScope({
    scope: 'page:administration',
    locale,
  });
  return {
    hero: sections['administration.hero'] as HeroData,
    principal: sections['administration.principal'] as AdministrationPrincipalData,
    deputyPrincipals: sections['administration.deputyPrincipals'] as AdministrationStaffGridData,
    assistantPrincipals: sections['administration.assistantPrincipals'] as AdministrationStaffGridData,
    headPrefects: sections['administration.headPrefects'] as AdministrationStaffGridData,
    sds: sections['administration.sds'] as AdministrationSdsData,
    contact: sections['administration.contact'] as CtaData,
  };
});
