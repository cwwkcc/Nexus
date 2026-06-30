// packages/contracts/src/registry/globals/footer.ts
//
// Footer content schema. Mirrors packages/ui/src/components/layout/Footer.tsx,
// which currently renders hardcoded defaults — this is the target shape for
// when it's wired to ContentEntry (sectionKey 'footer.main', scope 'global:footer').
//
// Social icons are stored as a string key, not a component reference —
// the @nexus/ui icon registry resolves the key to the actual icon.

import { z } from 'zod';

export const FooterLinkSchema = z.object({
  id: z.string(),
  label: z.string(),
  href: z.string(),
});
export type FooterLink = z.infer<typeof FooterLinkSchema>;

export const FooterColumnSchema = z.object({
  id: z.string(),
  heading: z.string(),
  links: z.array(FooterLinkSchema),
});
export type FooterColumn = z.infer<typeof FooterColumnSchema>;

export const FooterSocialLinkSchema = z.object({
  id: z.string(),
  label: z.string(),
  href: z.string(),
  icon: z.enum(['facebook', 'instagram', 'youtube', 'github', 'linkedin']),
});
export type FooterSocialLink = z.infer<typeof FooterSocialLinkSchema>;

export const FooterContactLineSchema = z.object({
  label: z.string(),
  href: z.string().optional(),
});
export type FooterContactLine = z.infer<typeof FooterContactLineSchema>;

export const FooterContentSchema = z.object({
  schoolName: z.string(),
  tagline: z.string().optional(),
  contactLines: z.array(FooterContactLineSchema).optional(),
  columns: z.array(FooterColumnSchema),
  socialLinks: z.array(FooterSocialLinkSchema).optional(),
  copyright: z.string().optional(),
  legalLinks: z.array(FooterLinkSchema).optional(),
});
export type FooterContentData = z.infer<typeof FooterContentSchema>;
