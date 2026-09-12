import type { LocaleEnumData, HeroData, ContactInfoData, CtaData } from '@nexus/contracts';
import { cache } from 'react';

import { getServerCaller } from '../lib/server-caller';

export interface ContactPageContent {
  hero: HeroData;
  info: ContactInfoData;
  cta: CtaData;
}

export const getContactPageContent = cache(async (locale: LocaleEnumData): Promise<ContactPageContent> => {
  const caller = await getServerCaller();
  const sections = await caller.contentEntry.getByScope({
    scope: 'page:contact',
    locale,
  });

  return {
    hero: sections['contact.hero'] as HeroData,
    info: sections['contact.info'] as ContactInfoData,
    cta: sections['contact.cta'] as CtaData,
  };
});
