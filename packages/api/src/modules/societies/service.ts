// packages/api/src/modules/societies/service.ts
//
// All Society Prisma access lives here — router.ts validates input and
// calls these functions instead of touching ctx.db directly, mirroring
// modules/news/service.ts's split.

import { triggerRevalidation } from '@nexus/config';
import type { SocietyCategoryEnum } from '@nexus/contracts';
import { Prisma, type db as Db } from '@nexus/db';
import type { z } from 'zod';

import { societiesErrors } from './errors.js';
import type { SocietyAdminListInput, SocietyBySlugInput, SocietyCreateInput, SocietyDeleteInput, SocietyGetByIdInput, SocietyListInput, SocietyUpdateInput } from './validators.js';
import type { ApiConfig } from '../../config.js';

export type SocietyCreate = z.infer<typeof SocietyCreateInput>;
export type SocietyUpdate = z.infer<typeof SocietyUpdateInput>;
export type SocietyListQuery = z.infer<typeof SocietyListInput>;
export type SocietyAdminListQuery = z.infer<typeof SocietyAdminListInput>;
export type SocietyBySlug = z.infer<typeof SocietyBySlugInput>;
export type SocietyGetById = z.infer<typeof SocietyGetByIdInput>;
export type SocietyDelete = z.infer<typeof SocietyDeleteInput>;

type SocietyRow = Awaited<ReturnType<typeof Db.society.findFirstOrThrow>>;

function serialize(society: SocietyRow) {
  return {
    id: society.id,
    locale: society.locale,
    slug: society.slug,
    name: society.name,
    tagline: society.tagline ?? null,
    category: society.category as z.infer<typeof SocietyCategoryEnum>,
    foundingYear: society.foundingYear ?? null,
    description: society.description ?? null,
    meetingSchedule: society.meetingSchedule ?? null,
    memberCount: society.memberCount ?? null,
    howToJoin: society.howToJoin ?? null,
    logo: society.logoUrl ? { src: society.logoUrl, alt: society.logoAlt ?? society.name } : null,
    banner: society.bannerUrl ? { src: society.bannerUrl, alt: society.bannerAlt ?? society.name } : null,
    isFeatured: society.isFeatured,
    advisorStaffId: society.advisorStaffId ?? null,
    createdAt: society.createdAt.toISOString(),
    updatedAt: society.updatedAt.toISOString(),
  };
}

function emptyList() {
  return [] as ReturnType<typeof serialize>[];
}

/** Public — F-147 Societies Hub, and `[slug]/page.tsx`'s
 * `generateStaticParams` (unfiltered, one locale at a time) for F-112's
 * static generation. Ordered featured-first, then alphabetically — the
 * Hub shows KITS (isFeatured) prominently, matching
 * @nexus/ui SocietyCard's 'featured' variant intent. Degrades to `[]` on
 * DB failure, same convention as every other public list read. */
export async function list(db: typeof Db, input: SocietyListQuery) {
  const where: Record<string, unknown> = { locale: input.locale };
  if (input.category && input.category !== 'all') {
    where.category = input.category;
  }

  try {
    const societies = await db.society.findMany({ where, orderBy: [{ isFeatured: 'desc' }, { name: 'asc' }] });
    return societies.map(serialize);
  } catch (err) {
    console.error('[societiesService.list] falling back to [] —', err);
    return emptyList();
  }
}

/** Public — F-148 Society detail page. Looks the row up by its own
 * (locale, slug) unique index. Unlike NewsArticle/EventDetail, a Society
 * has no draft/published status (see schema.prisma's own doc comment) —
 * every row that exists is public, so there's no status filter here. */
export async function bySlug(db: typeof Db, input: SocietyBySlug) {
  try {
    const society = await db.society.findUnique({ where: { locale_slug: { locale: input.locale, slug: input.slug } } });
    return society ? serialize(society) : null;
  } catch (err) {
    console.error('[societiesService.bySlug] falling back to null —', err);
    return null;
  }
}

/** Admin edit-by-id. */
export async function getById(db: typeof Db, input: SocietyGetById) {
  const society = await db.society.findUnique({ where: { id: input.id } });
  if (!society) {
    throw societiesErrors.notFound(input.id);
  }
  return serialize(society);
}

/**
 * Admin list — deliberately unpaginated, same reasoning and same shape as
 * modules/staff/service.ts's own adminList (see validators.ts's doc
 * comment). Degrades to `[]` on DB failure, matching every other admin
 * list read in this codebase.
 */
export async function adminList(db: typeof Db, input: SocietyAdminListQuery) {
  const where: Record<string, unknown> = { locale: input.locale };

  if (input.category && input.category !== 'all') {
    where.category = input.category;
  }

  if (input.query && input.query.trim()) {
    where.OR = [{ name: { contains: input.query, mode: 'insensitive' } }, { tagline: { contains: input.query, mode: 'insensitive' } }, { description: { contains: input.query, mode: 'insensitive' } }];
  }

  try {
    const societies = await db.society.findMany({ where, orderBy: [{ isFeatured: 'desc' }, { name: 'asc' }] });
    return societies.map(serialize);
  } catch (err) {
    console.error('[societiesService.adminList] falling back to [] —', err);
    return emptyList();
  }
}

function writeData(input: SocietyCreate | SocietyUpdate) {
  return {
    locale: input.locale,
    slug: input.slug,
    name: input.name,
    tagline: input.tagline ?? null,
    category: input.category,
    foundingYear: input.foundingYear ?? null,
    description: input.description ?? null,
    meetingSchedule: input.meetingSchedule ?? null,
    memberCount: input.memberCount ?? null,
    howToJoin: input.howToJoin ?? null,
    logoUrl: input.logoUrl ?? null,
    logoAlt: input.logoAlt ?? null,
    bannerUrl: input.bannerUrl ?? null,
    bannerAlt: input.bannerAlt ?? null,
    isFeatured: input.isFeatured,
    advisorStaffId: input.advisorStaffId ?? null,
  };
}

export async function createSociety(db: typeof Db, config: ApiConfig, input: SocietyCreate) {
  let society;
  try {
    society = await db.society.create({ data: writeData(input) });
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError && (err as Prisma.PrismaClientKnownRequestError).code === 'P2002') {
      throw societiesErrors.slugConflict(input.locale, input.slug);
    }
    throw societiesErrors.saveFailed(err);
  }

  await revalidateSocieties(config, society.id);
  return serialize(society);
}

export async function updateSociety(db: typeof Db, config: ApiConfig, input: SocietyUpdate) {
  const { id, ...rest } = input;

  let society;
  try {
    society = await db.society.update({ where: { id }, data: writeData(rest as SocietyUpdate) });
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError && (err as Prisma.PrismaClientKnownRequestError).code === 'P2025') {
      throw societiesErrors.notFound(id);
    }
    if (err instanceof Prisma.PrismaClientKnownRequestError && (err as Prisma.PrismaClientKnownRequestError).code === 'P2002') {
      throw societiesErrors.slugConflict(rest.locale, rest.slug);
    }
    throw societiesErrors.saveFailed(err);
  }

  await revalidateSocieties(config, id);
  return serialize(society);
}

/** Admin-role-only (see router.ts) — Society has no draft/archive state
 * to fall back to, same reasoning as Staff's hard delete. The advisor FK
 * (schema.prisma's `onDelete: SetNull`) means deleting a *staff member*
 * who advises a society never cascades here; this is only about deleting
 * the society itself. */
export async function deleteSociety(db: typeof Db, config: ApiConfig, input: SocietyDelete) {
  let society;
  try {
    society = await db.society.delete({ where: { id: input.id } });
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError && (err as Prisma.PrismaClientKnownRequestError).code === 'P2025') {
      throw societiesErrors.notFound(input.id);
    }
    throw societiesErrors.deleteFailed(err);
  }

  await revalidateSocieties(config, society.id);
}

/** On-demand cache invalidation (F-195), same mechanism as
 * newsService.revalidateNews / eventsService.revalidateEvents. Scoped to
 * the general 'societies' scope (the Hub grid) plus the specific
 * society's own tag, so an edit to one society doesn't force-bust every
 * other society's cached detail page too. */
async function revalidateSocieties(config: ApiConfig, societyId: string): Promise<void> {
  const { webAppUrl, secret } = config.revalidate;

  if (!webAppUrl || !secret) {
    console.error(`[societiesService] skipping revalidation for society "${societyId}" — WEB_APP_URL_INTERNAL or REVALIDATE_SECRET not set`);
    return;
  }

  await Promise.all([triggerRevalidation({ webAppUrl, secret, scope: 'societies' }), triggerRevalidation({ webAppUrl, secret, scope: `societies:${societyId}` })]);
}
