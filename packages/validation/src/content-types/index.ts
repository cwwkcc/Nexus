// packages/validation/src/content-types/index.ts
//
// Generic, reusable content type schemas. These are the building blocks of the
// Nexus CMS. Pages reference a contentType from this registry; sections may use
// these schemas directly or extend them with page-specific fields.
//
// Developers add new types here as pages require them.
// Each type gets a renderer in apps/web/src/components/content-renderers/.

import { z } from 'zod';

// ── hero ──────────────────────────────────────────────────────────────────────
// Title section with eyebrow text, headline, and optional subtitle.

export const HeroSchema = z.object({
  eyebrow: z.string(),
  title: z.string(),
  titleEm: z.string().optional(), // Italicised/highlighted word within the title
  subtitle: z.string().optional(),
});
export type HeroData = z.infer<typeof HeroSchema>;

// ── richText ──────────────────────────────────────────────────────────────────
// HTML content from a rich-text editor (Tiptap). Rendered via RichTextRenderer.

export const RichTextSchema = z.object({
  content: z.string(), // HTML string
});
export type RichTextData = z.infer<typeof RichTextSchema>;

// ── timeline ──────────────────────────────────────────────────────────────────
// Ordered list of historical events grouped by era.

export const TimelineItemSchema = z.object({
  id: z.string(),
  year: z.string(),
  title: z.string(),
  description: z.string(),
  era: z.string().optional(), // e.g. 'early' | 'mid' | 'modern'
});

export const TimelineSchema = z.object({
  eyebrow: z.string().optional(),
  heading: z.string().optional(),
  items: z.array(TimelineItemSchema),
});
export type TimelineData = z.infer<typeof TimelineSchema>;
export type TimelineItem = z.infer<typeof TimelineItemSchema>;

// ── members ───────────────────────────────────────────────────────────────────
// List of people — used for society pages, leadership sections, etc.

export const MemberSchema = z.object({
  id: z.string(),
  name: z.string(),
  role: z.string(),
  image: z.string().optional(),
  bio: z.string().optional(),
});

export const MembersSchema = z.object({
  eyebrow: z.string().optional(),
  heading: z.string().optional(),
  members: z.array(MemberSchema),
});
export type MembersData = z.infer<typeof MembersSchema>;
export type MemberItem = z.infer<typeof MemberSchema>;

// ── stats ─────────────────────────────────────────────────────────────────────
// Statistics strip — animated count-up numbers.

export const StatItemSchema = z.object({
  id: z.string(),
  target: z.number(),
  label: z.string(),
  suffix: z.string().optional(),
  prefix: z.string().optional(),
  description: z.string().optional(),
  tooltip: z.string().optional(),
  disableCountUp: z.boolean().optional(),
});

export const StatsSchema = z.object({
  stats: z.array(StatItemSchema),
});
export type StatsData = z.infer<typeof StatsSchema>;
export type StatItem = z.infer<typeof StatItemSchema>;

// ── gallery ───────────────────────────────────────────────────────────────────
// Image grid or lightbox gallery.

export const GalleryImageSchema = z.object({
  id: z.string(),
  src: z.string(),
  alt: z.string(),
  caption: z.string().optional(),
});

export const GallerySchema = z.object({
  eyebrow: z.string().optional(),
  heading: z.string().optional(),
  images: z.array(GalleryImageSchema),
});
export type GalleryData = z.infer<typeof GallerySchema>;
export type GalleryImage = z.infer<typeof GalleryImageSchema>;

// ── quote ─────────────────────────────────────────────────────────────────────
// Single highlighted pull-quote with optional attribution.

export const QuoteSchema = z.object({
  eyebrow: z.string().optional(),
  quote: z.string(),
  attribution: z.string().optional(),
});
export type QuoteData = z.infer<typeof QuoteSchema>;

// ── cta ───────────────────────────────────────────────────────────────────────
// Call-to-action section with a primary (and optional secondary) button.

export const CtaSchema = z.object({
  eyebrow: z.string().optional(),
  title: z.string(),
  subtitle: z.string().optional(),
  buttonLabel: z.string(),
  buttonHref: z.string(),
  secondaryButtonLabel: z.string().optional(),
  secondaryButtonHref: z.string().optional(),
});
export type CtaData = z.infer<typeof CtaSchema>;

// ── values ────────────────────────────────────────────────────────────────────
// Core values list — each value has a title, description, and optional icon.

export const ValueItemSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  icon: z.string().optional(),
});

export const ValuesSchema = z.object({
  eyebrow: z.string().optional(),
  heading: z.string().optional(),
  values: z.array(ValueItemSchema),
});
export type ValuesData = z.infer<typeof ValuesSchema>;
export type ValueItem = z.infer<typeof ValueItemSchema>;

// ── faq ───────────────────────────────────────────────────────────────────────
// Frequently asked questions accordion.

export const FaqItemSchema = z.object({
  id: z.string(),
  question: z.string(),
  answer: z.string(),
});

export const FaqSchema = z.object({
  eyebrow: z.string().optional(),
  heading: z.string().optional(),
  items: z.array(FaqItemSchema),
});
export type FaqData = z.infer<typeof FaqSchema>;
export type FaqItem = z.infer<typeof FaqItemSchema>;

// ── announcement ──────────────────────────────────────────────────────────────
// Dismissible banner for notices, warnings, or alerts.

export const AnnouncementSchema = z.object({
  variant: z.enum(['info', 'warning', 'error', 'success']).default('info'),
  message: z.string(),
  linkLabel: z.string().optional(),
  linkHref: z.string().optional(),
  expiresAt: z.string().datetime().optional(),
});
export type AnnouncementData = z.infer<typeof AnnouncementSchema>;

// ── downloads ─────────────────────────────────────────────────────────────────
// List of downloadable documents or files.

export const DownloadItemSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string().optional(),
  href: z.string(),
  fileType: z.string().optional(), // e.g. 'PDF', 'DOCX'
  fileSize: z.string().optional(), // e.g. '2.4 MB'
});

export const DownloadsSchema = z.object({
  eyebrow: z.string().optional(),
  heading: z.string().optional(),
  items: z.array(DownloadItemSchema),
});
export type DownloadsData = z.infer<typeof DownloadsSchema>;
export type DownloadItem = z.infer<typeof DownloadItemSchema>;

// ── CONTENT_TYPES registry ───────────────────────────────────────────────────
// The master map of type name → Zod schema.
// Developers add new types here as pages require them.

export const CONTENT_TYPES = {
  hero: HeroSchema,
  richText: RichTextSchema,
  timeline: TimelineSchema,
  members: MembersSchema,
  stats: StatsSchema,
  gallery: GallerySchema,
  quote: QuoteSchema,
  cta: CtaSchema,
  values: ValuesSchema,
  faq: FaqSchema,
  announcement: AnnouncementSchema,
  downloads: DownloadsSchema,
} as const;

export type ContentTypeName = keyof typeof CONTENT_TYPES;
