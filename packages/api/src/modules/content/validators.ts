// packages/api/src/modules/content/validators.ts
//
// Input and output schemas for the content module. Extracted out of
// router.ts so they can be reused by service.ts and tests without pulling
// in tRPC itself.

import { LocaleEnum } from '@nexus/contracts';
import { z } from 'zod';

// Matches the Prisma `ContentStatus` enum (draft/published/archived) — the
// contracts package's PublishStatusEnum has a 4th state (in-review) that
// doesn't exist in the DB yet. This schema deliberately tracks the DB, not
// @nexus/contracts, until that gap is reconciled (see router.ts).
export const ContentStatusInput = z.enum(['draft', 'published', 'archived']);

export const ScopeLocaleInput = z.object({
  scope: z.string().min(1),
  locale: LocaleEnum,
});

export const UpdateInput = z.object({
  scope: z.string().min(1),
  sectionKey: z.string().min(1),
  contentType: z.string().min(1),
  locale: LocaleEnum,
  data: z.unknown(),
  status: ContentStatusInput,
});

export const SetStatusInput = z.object({
  scope: z.string().min(1),
  sectionKey: z.string().min(1),
  locale: LocaleEnum,
  status: ContentStatusInput,
});

// --- Output schemas -------------------------------------------------------
//
// `data` stays z.unknown() everywhere: it's arbitrary block JSON (hero,
// richText, cta, ...) that callers cast to whichever block type they
// expect (see apps/web's footer/nav content readers). Validating its shape
// here would mean duplicating every block schema from @nexus/contracts, or
// just widening back to z.unknown() anyway — the value an output schema
// adds is guaranteeing the envelope (which keys exist, status, version),
// not re-validating the payload a second time.

export const ContentEntryOutput = z.object({
  id: z.string(),
  scope: z.string(),
  sectionKey: z.string(),
  contentType: z.string(),
  locale: LocaleEnum,
  status: ContentStatusInput,
  data: z.unknown(),
  version: z.number().int(),
  updatedAt: z.date(),
  updatedBy: z.string().nullable(),
});

// getByScope: sectionKey -> raw block data (published only, locale-resolved).
export const GetByScopeOutput = z.record(z.string(), z.unknown());

// adminGetByScope: sectionKey -> status/version/data envelope, every status.
export const AdminGetByScopeOutput = z.record(
  z.string(),
  z.object({
    status: ContentStatusInput,
    version: z.number().int(),
    data: z.unknown(),
  }),
);
