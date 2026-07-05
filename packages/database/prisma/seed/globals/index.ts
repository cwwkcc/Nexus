/**
 * packages/database/prisma/seed/globals/index.ts
 *
 * Seeds global content (navigation, footer) for all three locales.
 */

import { FOOTER_SEED_ALL } from './footer.js';
import { NAVIGATION_SEED } from './navigation.js';
import type { PrismaClient } from '../../../src/generated/prisma/client.js';

const LOCALES = ['en', 'si', 'ta'] as const;

export async function seedGlobals(db: PrismaClient) {
  for (const locale of LOCALES) {
    // ─── Footer ──────────────────────────────────────────────────────────────
    await db.contentEntry.upsert({
      where: {
        scope_sectionKey_locale: {
          scope: 'global:footer',
          sectionKey: 'footer.main',
          locale,
        },
      },
      update: {
        data: FOOTER_SEED_ALL[locale] as object,
        status: 'published',
      },
      create: {
        scope: 'global:footer',
        sectionKey: 'footer.main',
        contentType: 'footer',
        locale,
        data: FOOTER_SEED_ALL[locale] as object,
        status: 'published',
        version: 1,
      },
    });

    // ─── Navigation (English-only for now) ──────────────────────────────────
    // Navigation stays English for all locales until translations are ready.
    await db.contentEntry.upsert({
      where: {
        scope_sectionKey_locale: {
          scope: 'global:navigation',
          sectionKey: 'navigation.main',
          locale,
        },
      },
      update: {
        data: NAVIGATION_SEED as object,
        status: 'published',
      },
      create: {
        scope: 'global:navigation',
        sectionKey: 'navigation.main',
        contentType: 'navigation',
        locale,
        data: NAVIGATION_SEED as object,
        status: 'published',
        version: 1,
      },
    });
  }
}
