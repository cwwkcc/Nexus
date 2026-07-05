// packages/database/prisma/seed/globals/index.ts

import { SUPPORTED_LOCALES } from '@nexus/contracts';

import { FOOTER_SEED } from './footer.js';
import { NAVIGATION_SEED } from './navigation.js';
import type { PrismaClient } from '../../../src/generated/prisma/client.js';

export async function seedGlobals(db: PrismaClient) {
  for (const locale of SUPPORTED_LOCALES) {
    //  Footer
    await db.contentEntry.upsert({
      where: {
        scope_sectionKey_locale: {
          scope: 'global:footer',
          sectionKey: 'footer.main',
          locale,
        },
      },
      update: {
        data: FOOTER_SEED[locale] as object,
        status: 'published',
      },
      create: {
        scope: 'global:footer',
        sectionKey: 'footer.main',
        contentType: 'footer',
        locale,
        data: FOOTER_SEED[locale] as object,
        status: 'published',
        version: 1,
      },
    });

    //  Navigation
    await db.contentEntry.upsert({
      where: {
        scope_sectionKey_locale: {
          scope: 'global:navigation',
          sectionKey: 'navigation.main',
          locale,
        },
      },
      update: {
        data: NAVIGATION_SEED[locale] as object,
        status: 'published',
      },
      create: {
        scope: 'global:navigation',
        sectionKey: 'navigation.main',
        contentType: 'navigation',
        locale,
        data: NAVIGATION_SEED[locale] as object,
        status: 'published',
        version: 1,
      },
    });
  }
}
