// packages/config/src/site.ts

export const SITE_NAME = 'C.W.W. Kannangara Central College';

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://cwwkcc.lk';

export const ADMIN_URL =
  process.env.NEXT_PUBLIC_ADMIN_URL || 'https://admin.cwwkcc.lk';

export const API_BASE_URL = ADMIN_URL;
