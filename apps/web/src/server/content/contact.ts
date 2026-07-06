import { createServerCaller } from '@nexus/api';
import type {
  Locale,
  ContactHeroData,
  ContactInfoData,
  ContactCtaData,
} from '@nexus/contracts';
import { cache } from 'react';

export interface ContactPageContent {
  hero: ContactHeroData;
  info: ContactInfoData;
  cta: ContactCtaData;
}

export const getContactPageContent = cache(
  async (locale: Locale): Promise<ContactPageContent> => {
    const sections = await createServerCaller().contentEntry.getByScope({
      scope: 'page:contact',
      locale,
    });

    return {
      hero: sections['contact.hero'] as ContactHeroData,
      info: sections['contact.info'] as ContactInfoData,
      cta: sections['contact.cta'] as ContactCtaData,
    };
  },
);
