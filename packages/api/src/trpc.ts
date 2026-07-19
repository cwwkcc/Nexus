// packages/api/src/trpc.ts
//
// This tRPC setup provides the API layer for the backend and admin panel.
// The current authentication path is still a bootstrap stub, but the structure
// is now ready to accept a real Auth.js session once Task 6.3 is implemented.
//
// t/Context live in init.ts; the procedure tiers live in procedures/ and
// middleware/. This file is just the stable public barrel so nothing outside
// packages/api/src has to know about that internal split.

import { t } from './init.js';

export type { Context } from './init.js';
export { adminMutation, adminProcedure } from './procedures/admin.js';
export { publicProcedure } from './procedures/public.js';

export const router = t.router;
export const createCallerFactory = t.createCallerFactory;
