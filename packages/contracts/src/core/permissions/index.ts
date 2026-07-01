// packages/contracts/src/core/permissions/index.ts
//
// Permission and role contracts.
//
// Should contain:
//   Role               — z.enum(['admin', 'editor', 'viewer'])
//   Permission         — z.enum(['read', 'write', 'publish', 'admin'])
//   RolePermissions    — Record<Role, Permission[]>
//
// Notes:
//   Not implemented in Phase 1. Scaffold now for future RBAC system.

import { z } from 'zod';

export const Role = z.enum(['admin', 'editor', 'viewer']);

export const Permission = z.enum(['read', 'write', 'publish', 'admin']);

export const RolePermissions: Record<z.infer<typeof Role>, z.infer<typeof Permission>[]> = {
  admin: ['read', 'write', 'publish', 'admin'],
  editor: ['read', 'write', 'publish'],
  viewer: ['read'],
};
