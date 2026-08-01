// packages/api/src/middleware/audit.ts

import { t } from '../init.js';

/**
 * Every admin mutation gets an audit trail entry (Task 6.11): who, which
 * procedure, what was sent, and whether it succeeded. The `AuditLog` model
 * doesn't exist until M5 — `ctx.db` simply has no `auditLog` property at
 * runtime until then, so this checks for it and logs a warning instead of
 * writing, rather than crashing every admin mutation in the meantime. Once
 * M5 adds the model and regenerates the Prisma client, audit entries start
 * persisting with no further change required here.
 */
export const auditMiddleware = t.middleware(async ({ ctx, path, type, input, next }) => {
  const result = await next();

  const db = ctx.db as unknown as {
    auditLog?: { create: (args: { data: Record<string, unknown> }) => Promise<unknown> };
  };

  if (!db.auditLog) {
    console.warn(`[auditMiddleware] Skipped audit entry for "${path}": the AuditLog model is not added until M5.`);
    return result;
  }

  try {
    await db.auditLog.create({
      data: {
        actorId: ctx.session?.userId ?? null,
        actorEmail: ctx.session?.email ?? null,
        procedure: path,
        type,
        // Deep-clone through JSON so this is always a plain, serialisable
        // value — tRPC inputs can contain things (Date, Map) a Prisma Json
        // column can't take directly.
        input: input === undefined ? null : JSON.parse(JSON.stringify(input)),
        success: result.ok,
      },
    });
  } catch (err) {
    // The mutation itself already ran and returned above — a failure to
    // record its audit entry must never look like the mutation itself
    // failed. Surface it loudly in logs instead.
    console.error(`[auditMiddleware] Failed to write audit entry for "${path}":`, err);
  }

  return result;
});
