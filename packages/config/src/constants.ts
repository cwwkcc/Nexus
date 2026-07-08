/**
 * Shared application constants
 *
 * These constants are used across multiple applications (web, admin).
 * Locale constants are defined here for convenience, matching the values
 * in @nexus/contracts/primitives/locale to maintain consistency.
 */

/**
 * Supported locales
 * Keep this in sync with @nexus/contracts/primitives/locale.ts.
 */
export const SUPPORTED_LOCALES = ['en', 'si', 'ta'] as const;

/**
 * Default locale
 */
export type SupportedLocale = (typeof SUPPORTED_LOCALES)[number];
export const DEFAULT_LOCALE: SupportedLocale = 'en';

/**
 * Site name
 */
export const SITE_NAME = 'C.W.W. Kannangara Central College';

/**
 * Site URL (public-facing)
 * Falls back to localhost in development if not set
 */
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://cwwkcc.lk';

/**
 * Admin panel URL
 * Falls back to localhost in development if not set
 */
export const ADMIN_URL =
  process.env.NEXT_PUBLIC_ADMIN_URL || 'https://admin.cwwkcc.lk';

/**
 * API base URL (for tRPC)
 * Derived from admin URL for consistency
 */
export const API_BASE_URL = ADMIN_URL;

/**
 * Default page size for paginated lists
 */
export const DEFAULT_PAGE_SIZE = 20;

/**
 * Maximum number of gallery images per gallery
 */
export const MAX_GALLERY_IMAGES = 50;

/**
 * Minimum password length
 */
export const MIN_PASSWORD_LENGTH = 8;

/**
 * Default upload limit (10MB in bytes)
 */
export const DEFAULT_UPLOAD_LIMIT = 10 * 1024 * 1024;

/**
 * Maximum rich text length
 */
export const MAX_RICH_TEXT_LENGTH = 100000;

/**
 * Maximum title length
 */
export const MAX_TITLE_LENGTH = 200;

/**
 * Maximum description length
 */
export const MAX_DESCRIPTION_LENGTH = 500;
