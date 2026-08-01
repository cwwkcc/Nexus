// packages/api/src/procedures/admin.ts

import { t } from '../init.js';
import { auditMiddleware } from '../middleware/audit.js';
import { authMiddleware, requireRole } from '../middleware/auth.js';

/** Any signed-in, active admin-panel user (Admin, Editor, or Viewer). */
export const adminProcedure = t.procedure.use(authMiddleware);
export const adminMutation = adminProcedure.use(auditMiddleware);

/**
 * Admin-role only — for modules where an Editor must be rejected outright,
 * not just steered around a disabled control in the UI (F-075: User
 * Management, Settings). Not used by any router yet since only
 * `contentEntryRouter` exists today and Editors need it too; wired here
 * ahead of M5 so those modules can adopt it directly.
 */
export const adminOnlyProcedure = adminProcedure.use(requireRole('admin'));
export const adminOnlyMutation = adminOnlyProcedure.use(auditMiddleware);
