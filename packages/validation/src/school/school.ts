import { z } from 'zod';

// ── Achievements ──────────────────────────────────────────────────────────────

export const AchievementSchema = z.object({
  id: z.string(),
  text: z.string().min(1),
  year: z.string().optional(),
  category: z.string().optional(),
});

// ── Gallery ───────────────────────────────────────────────────────────────────

export const GalleryAlbumSchema = z.object({
  id: z.string(),
  title: z.string().min(1),
  year: z.string(),
  photoCount: z.number().int().nonnegative(),
  category: z.string().optional(),
  href: z.string(),
  coverSrc: z.string().url().optional(),
  coverAlt: z.string().optional(),
});

// ── Alumni ────────────────────────────────────────────────────────────────────

export const AlumniProfileSchema = z.object({
  id: z.string(),
  name: z.string().min(1),
  graduationYear: z.number().int(),
  position: z.string().min(1),
  quote: z.string().min(1),
  portraitSrc: z.string().url().optional(),
  portraitAlt: z.string().optional(),
});

// ── Stats ─────────────────────────────────────────────────────────────────────
// Pure data shape — display concerns (icon, trend) stay in packages/ui.

export const StatItemSchema = z.object({
  id: z.string(),
  target: z.number(),
  label: z.string().min(1),
  suffix: z.string().optional(),
  prefix: z.string().optional(),
  decimals: z.number().int().nonnegative().default(0),
  separator: z.string().optional(),
  description: z.string().optional(),
  ariaLabel: z.string().optional(),
  duration: z.number().positive().optional(),
});

// ── Announcements ─────────────────────────────────────────────────────────────

export const AnnouncementVariantSchema = z.enum(['warning', 'error', 'info']);

export const AnnouncementSchema = z.object({
  id: z.string(),
  variant: AnnouncementVariantSchema,
  message: z.string().min(1),
  publishedAt: z.string().datetime(),
  expiresAt: z.string().datetime().optional(),
});

// --- Inferred types ---
export type Achievement = z.infer<typeof AchievementSchema>;
export type GalleryAlbum = z.infer<typeof GalleryAlbumSchema>;
export type AlumniProfile = z.infer<typeof AlumniProfileSchema>;
export type StatItem = z.infer<typeof StatItemSchema>;
export type AnnouncementVariant = z.infer<typeof AnnouncementVariantSchema>;
export type Announcement = z.infer<typeof AnnouncementSchema>;
