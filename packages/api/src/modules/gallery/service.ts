// packages/api/src/modules/gallery/service.ts
//
// All GalleryAlbum/GalleryPhoto Prisma access lives here — router.ts
// validates input and calls these functions instead of touching ctx.db
// directly, mirroring modules/societies/service.ts's split.
//
// createAlbum/updateAlbum reconcile the submitted `photos` array against
// what's in the database in one transaction — see validators.ts's header
// comment for exactly why photos aren't separate mutations.

import { triggerRevalidation } from '@nexus/config';
import { Prisma, type db as Db } from '@nexus/db';
import type { z } from 'zod';

import { galleryErrors } from './errors.js';
import type { GalleryAlbumAdminListInput, GalleryAlbumBySlugInput, GalleryAlbumCreateInput, GalleryAlbumDeleteInput, GalleryAlbumGetByIdInput, GalleryAlbumListInput, GalleryAlbumReorderInput, GalleryAlbumUpdateInput, GalleryPhotoFields } from './validators.js';
import type { ApiConfig } from '../../config.js';

export type GalleryAlbumCreate = z.infer<typeof GalleryAlbumCreateInput>;
export type GalleryAlbumUpdate = z.infer<typeof GalleryAlbumUpdateInput>;
export type GalleryAlbumListQuery = z.infer<typeof GalleryAlbumListInput>;
export type GalleryAlbumAdminListQuery = z.infer<typeof GalleryAlbumAdminListInput>;
export type GalleryAlbumBySlug = z.infer<typeof GalleryAlbumBySlugInput>;
export type GalleryAlbumGetById = z.infer<typeof GalleryAlbumGetByIdInput>;
export type GalleryAlbumDelete = z.infer<typeof GalleryAlbumDeleteInput>;
export type GalleryAlbumReorder = z.infer<typeof GalleryAlbumReorderInput>;
export type GalleryPhotoInput = z.infer<typeof GalleryPhotoFields>;

type GalleryPhotoRow = Awaited<ReturnType<typeof Db.galleryPhoto.findFirstOrThrow>>;
type GalleryAlbumRow = Awaited<ReturnType<typeof Db.galleryAlbum.findFirstOrThrow>> & {
  photos?: GalleryPhotoRow[];
};
type GalleryAlbumSummaryRow = Omit<GalleryAlbumRow, 'photos'> & { photos?: Array<{ id: string }> };

function serializePhoto(photo: GalleryPhotoRow) {
  return {
    id: photo.id,
    albumId: photo.albumId,
    src: photo.src,
    alt: photo.alt,
    caption: photo.caption ?? null,
    order: photo.order,
    createdAt: photo.createdAt.toISOString(),
    updatedAt: photo.updatedAt.toISOString(),
  };
}

function serializeSummary(album: GalleryAlbumSummaryRow) {
  return {
    id: album.id,
    locale: album.locale,
    slug: album.slug,
    title: album.title,
    description: album.description ?? null,
    category: album.category ?? null,
    year: album.year,
    coverPhoto: album.coverPhotoUrl ? { src: album.coverPhotoUrl, alt: album.coverPhotoAlt ?? album.title } : null,
    order: album.order,
    photoCount: album.photos?.length ?? 0,
    createdAt: album.createdAt.toISOString(),
    updatedAt: album.updatedAt.toISOString(),
  };
}

function serializeFull(album: GalleryAlbumRow) {
  return {
    ...serializeSummary(album),
    photos: (album.photos ?? []).map(serializePhoto),
  };
}

function emptyList() {
  return [] as ReturnType<typeof serializeSummary>[];
}

/** Public — F-151 Gallery listing, and `[slug]/page.tsx`'s
 * `generateStaticParams` (unfiltered) for F-112's static generation.
 * Includes `photos` only for the `photoCount` — the summary projection
 * doesn't need the full array serialized out over the wire, matching
 * modules/events/service.ts's own "card vs. full entity" distinction.
 * Degrades to `[]` on DB failure, same convention as every other public
 * list read. */
export async function list(db: typeof Db, input: GalleryAlbumListQuery) {
  const where: Record<string, unknown> = { locale: input.locale };
  if (input.year !== undefined) {
    where.year = input.year;
  }
  if (input.category) {
    where.category = input.category;
  }

  try {
    const albums = await db.galleryAlbum.findMany({ where, orderBy: [{ year: 'desc' }, { order: 'asc' }], include: { photos: { select: { id: true } } } });
    return albums.map((album: GalleryAlbumSummaryRow) => serializeSummary(album));
  } catch (err) {
    console.error('[galleryService.list] falling back to [] —', err);
    return emptyList();
  }
}

/** Public — F-152 individual album page. Full album with every photo. */
export async function bySlug(db: typeof Db, input: GalleryAlbumBySlug) {
  try {
    const album = await db.galleryAlbum.findUnique({ where: { locale_slug: { locale: input.locale, slug: input.slug } }, include: { photos: true } });
    if (!album) return null;
    return serializeFull({ ...album, photos: [...(album.photos ?? [])].sort((a, b) => a.order - b.order) });
  } catch (err) {
    console.error('[galleryService.bySlug] falling back to null —', err);
    return null;
  }
}

/** Admin edit-by-id — full album with every photo. */
export async function getById(db: typeof Db, input: GalleryAlbumGetById) {
  const album = await db.galleryAlbum.findUnique({ where: { id: input.id }, include: { photos: true } });
  if (!album) {
    throw galleryErrors.notFound(input.id);
  }
  return serializeFull({ ...album, photos: [...(album.photos ?? [])].sort((a, b) => a.order - b.order) });
}

/** Admin list — deliberately unpaginated (see validators.ts's own note),
 * summary projection. Degrades to `[]` on DB failure. */
export async function adminList(db: typeof Db, input: GalleryAlbumAdminListQuery) {
  const where: Record<string, unknown> = { locale: input.locale };
  if (input.year !== undefined) {
    where.year = input.year;
  }
  if (input.category) {
    where.category = input.category;
  }
  if (input.query && input.query.trim()) {
    where.OR = [{ title: { contains: input.query, mode: 'insensitive' } }, { description: { contains: input.query, mode: 'insensitive' } }];
  }

  try {
    const albums = await db.galleryAlbum.findMany({ where, orderBy: [{ order: 'asc' }, { year: 'desc' }], include: { photos: { select: { id: true } } } });
    return albums.map((album: GalleryAlbumSummaryRow) => serializeSummary(album));
  } catch (err) {
    console.error('[galleryService.adminList] falling back to [] —', err);
    return emptyList();
  }
}

function albumWriteData(input: GalleryAlbumCreate | GalleryAlbumUpdate) {
  return {
    locale: input.locale,
    slug: input.slug,
    title: input.title,
    description: input.description ?? null,
    category: input.category ?? null,
    year: input.year,
    coverPhotoUrl: input.coverPhotoUrl ?? null,
    coverPhotoAlt: input.coverPhotoAlt ?? null,
    order: input.order,
  };
}

export async function createAlbum(db: typeof Db, config: ApiConfig, input: GalleryAlbumCreate) {
  let album: GalleryAlbumRow;
  try {
    album = await db.$transaction(async (tx) => {
      const created = await tx.galleryAlbum.create({ data: albumWriteData(input) });

      const photos = await Promise.all(
        input.photos.map((photo, index) =>
          tx.galleryPhoto.create({
            data: { albumId: created.id, src: photo.src, alt: photo.alt, caption: photo.caption ?? null, order: index },
          }),
        ),
      );

      return { ...created, photos };
    });
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError && (err as Prisma.PrismaClientKnownRequestError).code === 'P2002') {
      throw galleryErrors.slugConflict(input.locale, input.slug);
    }
    throw galleryErrors.saveFailed(err);
  }

  await revalidateGallery(config, album.id);
  return serializeFull(album);
}

export async function updateAlbum(db: typeof Db, config: ApiConfig, input: GalleryAlbumUpdate) {
  const { id, photos: submittedPhotos, ...rest } = input;

  let album: GalleryAlbumRow;
  try {
    album = await db.$transaction(async (tx) => {
      const updated = await tx.galleryAlbum.update({ where: { id }, data: albumWriteData({ ...rest, id } as GalleryAlbumUpdate) });

      const existing = await tx.galleryPhoto.findMany({ where: { albumId: id } });
      const submittedIds = new Set(submittedPhotos.filter((p) => p.id).map((p) => p.id));

      // Removed by the editor — present in the DB, absent from the
      // submitted array.
      const toDelete = existing.filter((photo) => !submittedIds.has(photo.id));
      if (toDelete.length > 0) {
        await tx.galleryPhoto.deleteMany({ where: { id: { in: toDelete.map((p) => p.id) } } });
      }

      const photos = await Promise.all(submittedPhotos.map((photo, index) => (photo.id ? tx.galleryPhoto.update({ where: { id: photo.id }, data: { src: photo.src, alt: photo.alt, caption: photo.caption ?? null, order: index } }) : tx.galleryPhoto.create({ data: { albumId: id, src: photo.src, alt: photo.alt, caption: photo.caption ?? null, order: index } }))));

      return { ...updated, photos };
    });
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError && (err as Prisma.PrismaClientKnownRequestError).code === 'P2025') {
      throw galleryErrors.notFound(id);
    }
    if (err instanceof Prisma.PrismaClientKnownRequestError && (err as Prisma.PrismaClientKnownRequestError).code === 'P2002') {
      throw galleryErrors.slugConflict(rest.locale, rest.slug);
    }
    throw galleryErrors.saveFailed(err);
  }

  await revalidateGallery(config, id);
  return serializeFull(album);
}

/** Admin-role-only (see router.ts) — GalleryAlbum has no archived/
 * soft-deleted state, same reasoning as Staff/Society's hard delete.
 * Cascades to every photo in the album (schema.prisma's `onDelete:
 * Cascade`) — no separate cleanup needed here. */
export async function deleteAlbum(db: typeof Db, config: ApiConfig, input: GalleryAlbumDelete) {
  let album;
  try {
    album = await db.galleryAlbum.delete({ where: { id: input.id } });
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError && (err as Prisma.PrismaClientKnownRequestError).code === 'P2025') {
      throw galleryErrors.notFound(input.id);
    }
    throw galleryErrors.deleteFailed(err);
  }

  await revalidateGallery(config, album.id);
}

/** F-168 drag-and-drop album reordering — same pattern as
 * staffService.reorderStaff. */
export async function reorderAlbums(db: typeof Db, config: ApiConfig, input: GalleryAlbumReorder) {
  let albums;
  try {
    albums = await db.$transaction(input.orderedIds.map((id, index) => db.galleryAlbum.update({ where: { id }, data: { order: index } })));
  } catch (err) {
    throw galleryErrors.reorderFailed(err);
  }

  await revalidateGallery(config, `locale:${input.locale}`);
  return albums.map((album) => serializeSummary(album as GalleryAlbumRow));
}

/** On-demand cache invalidation (F-195), same mechanism as
 * societiesService.revalidateSocieties. Scoped to the general 'gallery'
 * scope (the Hub grid) plus the specific album's own tag. */
async function revalidateGallery(config: ApiConfig, albumId: string): Promise<void> {
  const { webAppUrl, secret } = config.revalidate;

  if (!webAppUrl || !secret) {
    console.error(`[galleryService] skipping revalidation for album "${albumId}" — WEB_APP_URL_INTERNAL or REVALIDATE_SECRET not set`);
    return;
  }

  await Promise.all([triggerRevalidation({ webAppUrl, secret, scope: 'gallery' }), triggerRevalidation({ webAppUrl, secret, scope: `gallery:${albumId}` })]);
}
