// packages/database/scripts/migrate-about-content.ts
//
// One-time migration for ADR-009. Reads the existing en/si/ta
// apps/web/messages/{locale}/about.json files and seeds them into
// PageContent. Safe to re-run (upserts). Does NOT delete the source JSON
// files or the about.json `stats`/`alumni` keys — those stay in place
// until Tasks 8.2 (stats) and 7.18/Alumni Module wiring read from their own
// tables; this script only touches the ten sections that move to
// PageContent per ADR-009.
//
// Run from the repo root:
//   pnpm --filter @nexus/db exec tsx scripts/migrate-about-content.ts
//
// Requires DATABASE_URL to be set and `prisma generate` to have been run.

import { readFile } from 'node:fs/promises';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

import {
  ABOUT_SECTION_SCHEMAS,
  SUPPORTED_LOCALES,
  type AboutSectionKey,
  type Locale,
} from '@nexus/validation';

import { db } from '../src/lib/db.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = resolve(__dirname, '../../../');
const KNOWN_PLACEHOLDER_PORTRAIT = '/images/ironman.jpg';

interface MigrationFlag {
  locale: Locale;
  sectionKey: AboutSectionKey;
  message: string;
}

const flags: MigrationFlag[] = [];

async function readAboutJson(locale: Locale): Promise<Record<string, unknown>> {
  const path = resolve(REPO_ROOT, `apps/web/messages/${locale}/about.json`);
  const raw = await readFile(path, 'utf-8');
  return (JSON.parse(raw) as { about: Record<string, unknown> }).about;
}

function buildSections(
  locale: Locale,
  about: Record<string, any>,
): Record<AboutSectionKey, unknown> {
  // --- timeline: standardise desc -> description, flag if it happened ---
  const milestones = (about.timeline?.milestones ?? []).map((m: any) => {
    if (m.desc && !m.description) {
      flags.push({
        locale,
        sectionKey: 'about.timeline',
        message: `milestone "${m.id}" used "desc" instead of "description" in the source JSON — normalised automatically.`,
      });
    }
    return {
      id: m.id,
      year: String(m.year),
      title: m.title,
      description: m.description ?? m.desc,
      era: m.era,
    };
  });

  // --- values: object keyed by id -> array with explicit id ---
  const values = Object.entries(about.values?.values ?? {}).map(
    ([id, v]: [string, any]) => ({ id, ...v }),
  );

  // --- aboutKannangara: portraitSrc didn't exist in messages, was
  // hardcoded directly in OurNameSake.tsx. Carry the same value forward so
  // nothing visibly breaks, but flag it loudly — this is the fourth
  // ironman.jpg placeholder on this page (three in alumni, now this one).
  const portraitSrc =
    about.aboutKannangara?.portraitSrc ?? KNOWN_PLACEHOLDER_PORTRAIT;
  if (portraitSrc === KNOWN_PLACEHOLDER_PORTRAIT) {
    flags.push({
      locale,
      sectionKey: 'about.aboutKannangara',
      message:
        'portraitSrc is the placeholder /images/ironman.jpg, carried forward from the hardcoded JSX value. Replace with a real portrait before this is reviewed by anyone outside the dev team.',
    });
  }

  // --- legacy.heritage.caption: known stray dev note ---
  const caption: string = about.legacy?.heritage?.caption ?? '';
  if (/brain power|try karannawath/i.test(caption)) {
    flags.push({
      locale,
      sectionKey: 'about.legacy',
      message:
        'heritage.caption still contains the stray Sinhala/Singlish dev note instead of a real caption. Migrated as-is — replace before publishing.',
    });
  }

  return {
    'about.hero': about.hero,
    'about.story': about.story,
    'about.aboutKannangara': { ...about.aboutKannangara, portraitSrc },
    'about.timeline': {
      eyebrow: about.timeline.eyebrow,
      heading: about.timeline.heading,
      milestones,
    },
    'about.ethos': about.ethos,
    'about.values': { valuesEyebrow: about.values.valuesEyebrow, values },
    'about.crest': about.crest,
    'about.legacy': about.legacy,
    'about.anthem': about.anthem,
    'about.closing': about.closing,
  };
}

async function migrateLocale(locale: Locale) {
  const about = await readAboutJson(locale);
  const sections = buildSections(locale, about);

  for (const [sectionKey, data] of Object.entries(sections) as [
    AboutSectionKey,
    unknown,
  ][]) {
    const schema = ABOUT_SECTION_SCHEMAS[sectionKey];
    const parsed = schema.safeParse(data);
    if (!parsed.success) {
      console.error(`✗ [${locale}] ${sectionKey} failed validation:`);
      console.error(parsed.error.format());
      process.exitCode = 1;
      continue;
    }

    await db.pageContent.upsert({
      where: { page_sectionKey_locale: { page: 'about', sectionKey, locale } },
      create: {
        page: 'about',
        sectionKey,
        locale,
        data: parsed.data,
        version: 1,
      },
      update: { data: parsed.data, version: { increment: 1 } },
    });
    console.log(`✓ [${locale}] ${sectionKey}`);
  }
}

async function main() {
  for (const locale of SUPPORTED_LOCALES) {
    console.log(`\n— Migrating about.json (${locale}) —`);
    await migrateLocale(locale);
  }

  if (flags.length > 0) {
    console.log(
      `\n${flags.length} item(s) need human review before this content goes live:\n`,
    );
    for (const f of flags) {
      console.log(`  [${f.locale}] ${f.sectionKey}: ${f.message}`);
    }
  } else {
    console.log('\nNo content flags raised.');
  }
}

main()
  .catch((err) => {
    console.error(err);
    process.exitCode = 1;
  })
  .finally(async () => {
    await db.$disconnect();
  });
