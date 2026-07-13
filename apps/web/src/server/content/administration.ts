import { createServerCaller } from '@nexus/api';
import type {
  LocaleEnumData,
  HeroData,
  AdministrationPrincipalData,
  AdministrationStaffGridData,
  AdministrationAdvisoryBoardData,
  AdministrationContactData,
} from '@nexus/contracts';
import { cache } from 'react';

export interface AdministrationPageContent {
  hero: HeroData;
  principal: AdministrationPrincipalData;
  vicePrincipals: AdministrationStaffGridData;
  headsOfDepartment: AdministrationStaffGridData;
  advisoryBoard: AdministrationAdvisoryBoardData;
  contact: AdministrationContactData;
}

export const getAdministrationPageContent = cache(
  async (locale: LocaleEnumData): Promise<AdministrationPageContent> => {
    const sections = await createServerCaller().contentEntry.getByScope({
      scope: 'page:administration',
      locale,
    });
    return {
      hero: sections['administration.hero'] as HeroData,
      principal: sections[
        'administration.principal'
      ] as AdministrationPrincipalData,
      vicePrincipals: sections[
        'administration.vicePrincipals'
      ] as AdministrationStaffGridData,
      headsOfDepartment: sections[
        'administration.headsOfDepartment'
      ] as AdministrationStaffGridData,
      advisoryBoard: sections[
        'administration.advisoryBoard'
      ] as AdministrationAdvisoryBoardData,
      contact: sections['administration.contact'] as AdministrationContactData,
    };
  },
);
