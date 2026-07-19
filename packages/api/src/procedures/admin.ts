// packages/api/src/procedures/admin.ts

import { t } from '../init.js';
import { auditMiddleware } from '../middleware/audit.js';
import { authMiddleware } from '../middleware/auth.js';

export const adminProcedure = t.procedure.use(authMiddleware);
export const adminMutation = adminProcedure.use(auditMiddleware);
