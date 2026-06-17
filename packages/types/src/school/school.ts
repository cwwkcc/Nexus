/**
 * General school domain types.
 * Used by: packages/ui, apps/web, apps/admin, packages/api
 */

// ── Achievements ──────────────────────────────────────────────────────────────

export interface Achievement {
  id: string;
  text: string;
  year?: string;
  category?: string;
}

// ── Gallery ───────────────────────────────────────────────────────────────────

export interface GalleryAlbum {
  id: string;
  title: string;
  year: string;
  photoCount: number;
  category?: string;
  href: string;
  coverSrc?: string;
  coverAlt?: string;
}

// ── Alumni ────────────────────────────────────────────────────────────────────

export interface AlumniProfile {
  id: string;
  name: string;
  graduationYear: number;
  position: string;
  quote: string;
  portraitSrc?: string;
  portraitAlt?: string;
}

// ── Announcements ─────────────────────────────────────────────────────────────

export type AnnouncementVariant = 'warning' | 'error' | 'info';

export interface Announcement {
  id: string;
  variant: AnnouncementVariant;
  message: string;
  publishedAt: string; // ISO datetime
  expiresAt?: string; // ISO datetime
}
