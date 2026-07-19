// packages/api/src/modules/content/service.ts
//
// All ContentEntry Prisma access lives here — router.ts validates input and
// calls these functions instead of touching ctx.db directly. See README's
// "adding a new module" note: routers validate + call the service; services
// own the database.

import { triggerRevalidation } from '@nexus/config';
import { DEFAULT_LOCALE } from '@nexus/contracts';
import { Prisma, type db as Db } from '@nexus/db';
import type { z } from 'zod';

import { contentErrors } from './errors.js';
import type { ScopeLocaleInput, SetStatusInput, UpdateInput } from './validators.js';
import type { ApiConfig } from '../../config.js';

type ScopeLocale = z.infer<typeof ScopeLocaleInput>;
type Update = z.infer<typeof UpdateInput>;
type SetStatus = z.infer<typeof SetStatusInput>;

/**
 * Public read. Published entries only, English-first fallback per section
 * (F-088) so a page half-translated into Sinhala shows English for just the
 * untranslated sections instead of a blank page. Degrades to `{}` on DB
 * failure — see README's "don't let a failed query crash the whole
 * appRouter" — this is a read path, not a write.
 */
export async function getByScope(db: typeof Db, { scope, locale }: ScopeLocale): Promise<Record<string, unknown>> {
  try {
    const [requested, fallback] = await Promise.all([db.contentEntry.findMany({ where: { scope, locale, status: 'published' } }), locale === DEFAULT_LOCALE ? Promise.resolve([]) : db.contentEntry.findMany({ where: { scope, locale: DEFAULT_LOCALE, status: 'published' } })]);

    const result: Record<string, unknown> = {};
    // English first, then overwrite with the requested locale wherever a
    // translation actually exists.
    for (const entry of fallback) result[entry.sectionKey] = entry.data;
    for (const entry of requested) result[entry.sectionKey] = entry.data;
    return result;
  } catch (err) {
    console.error('[contentService.getByScope] falling back to {} —', err);
    return {};
  }
}

/**
 * Admin read. Every status, keyed by sectionKey to { status, version, data }
 * so the page editor can show draft/published state and version number.
 * Must degrade to {} on DB failure — asserted by
 * __tests__/router.test.ts ("content entry reads degrade gracefully when
 * the database is unavailable").
 */
export async function adminGetByScope(db: typeof Db, { scope, locale }: ScopeLocale): Promise<Record<string, { status: string; version: number; data: unknown }>> {
  try {
    const entries = await db.contentEntry.findMany({ where: { scope, locale } });

    return entries.reduce<Record<string, { status: string; version: number; data: unknown }>>((acc, entry) => {
      acc[entry.sectionKey] = { status: entry.status, version: entry.version, data: entry.data };
      return acc;
    }, {});
  } catch (err) {
    console.error('[contentService.adminGetByScope] falling back to {} —', err);
    return {};
  }
}

/**
 * Admin write. Upserts the ContentEntry row (unique on scope+sectionKey+
 * locale) and snapshots the new data into ContentEntryVersion in the same
 * transaction. Version is a simple increment — no optimistic-concurrency
 * check against a client-supplied "expected version" yet, so two editors
 * saving the same section back-to-back will silently last-write-wins rather
 * than conflict. Worth revisiting once there's more than one admin editing.
 * Triggers on-demand revalidation (F-195) after a successful write,
 * regardless of the entry's status.
 */
export async function updateEntry(db: typeof Db, config: ApiConfig, input: Update) {
  const { scope, sectionKey, contentType, locale, data, status } = input;
  const jsonData = data as Prisma.InputJsonValue;

  let entry;
  try {
    entry = await db.$transaction(async (tx) => {
      const existing = await tx.contentEntry.findUnique({
        where: { scope_sectionKey_locale: { scope, sectionKey, locale } },
      });

      const version = (existing?.version ?? 0) + 1;

      const upserted = await tx.contentEntry.upsert({
        where: { scope_sectionKey_locale: { scope, sectionKey, locale } },
        create: { scope, sectionKey, locale, contentType, status, data: jsonData, version },
        update: { contentType, status, data: jsonData, version },
      });

      await tx.contentEntryVersion.create({
        data: { contentEntryId: upserted.id, version, data: jsonData },
      });

      return upserted;
    });
  } catch (err) {
    throw contentErrors.saveFailed(err);
  }

  await revalidateScope(config, scope);
  return entry;
}

/**
 * Admin write. Moves an entry between draft/published/archived without
 * touching its content or creating a new ContentEntryVersion snapshot —
 * the content hasn't changed, so there's nothing new to snapshot. This is
 * what admin panel "delete" calls (archive), per Task 6.12's status-based
 * archiving pattern — never a raw DELETE.
 */
export async function setEntryStatus(db: typeof Db, config: ApiConfig, input: SetStatus) {
  const { scope, sectionKey, locale, status } = input;

  let entry;
  try {
    entry = await db.contentEntry.update({
      where: { scope_sectionKey_locale: { scope, sectionKey, locale } },
      data: { status },
    });
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === 'P2025') {
      throw contentErrors.notFound(scope, sectionKey, locale);
    }
    throw contentErrors.statusUpdateFailed(err);
  }

  await revalidateScope(config, scope);
  return entry;
}

/**
 * On-demand cache invalidation (F-195). admin and web are separate
 * processes, so this POSTs to web's own /api/revalidate route rather than
 * calling revalidateTag() directly — see packages/config/src/cache.ts.
 * Swallows its own failures; a revalidation miss must never fail an
 * otherwise-successful save. Skips (with a log line) if either config
 * value isn't set, rather than throwing on an unrelated fetch failure.
 */
async function revalidateScope(config: ApiConfig, scope: string): Promise<void> {
  const { webAppUrl, secret } = config.revalidate;

  if (!webAppUrl || !secret) {
    console.error(`[contentService] skipping revalidation for scope "${scope}" — WEB_APP_URL_INTERNAL or REVALIDATE_SECRET not set`);
    return;
  }

  await triggerRevalidation({ webAppUrl, secret, scope });
}
