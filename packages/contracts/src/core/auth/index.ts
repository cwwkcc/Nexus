// packages/contracts/src/core/auth/index.ts
//
// Authentication and session contracts for the admin panel.
//
// Should contain:
//   AdminRole     — z.enum(['super_admin', 'editor', 'viewer'])
//   AdminUser     — id, email, name, role (AdminRole), createdAt
//   SessionSchema — userId, email, role, expiresAt
//   AdminRole     — z.infer type
//   AdminUser     — z.infer type
//   Session       — z.infer type
//
// Notes:
//   Auth uses Google OAuth (see docs/operations/Google OAuth Setup.md).
//   This schema describes the tRPC context.user shape after session verification.
//   The actual NextAuth config lives in apps/admin — not here.

import { z } from 'zod';

// TODO: implement
