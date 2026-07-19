// packages/api/src/middleware/audit.ts

import { t } from '../init.js';

/**
 * AuditLog model not yet in schema (F-057). Keep the middleware hook so
 * adminMutation's call shape stays stable; wire up persistence once the
 * model lands.
 */
export const auditMiddleware = t.middleware(async ({ next }) => {
  return next();
});
