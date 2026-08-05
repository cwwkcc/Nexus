// packages/contracts/src/system/rbac/matrix.ts
//
// The concrete permission grants for each role (F-075). `role.ts` and
// `permission.ts` define the shapes; this is the one place that says what
// each role can actually do. tRPC procedures and admin UI conditionals both
// read through `hasPermission()` rather than hand-rolling role comparisons
// (`role === 'admin'`) scattered across the codebase, so there is exactly
// one place to update when a permission changes.

import type { PermissionData } from './permission.ts';
import type { RoleEnumData } from './role.ts';

/**
 * Every resource string in use today. Kept as a plain const array — not
 * folded into `PermissionSchema` in `permission.ts` — because new resources
 * arrive routinely as modules land (Task 6.6+) and adding one should only
 * ever require touching this matrix, not the shared schema.
 */
export const RESOURCES = ['content', 'media', 'staff', 'users', 'settings', 'audit-log'] as const;
export type Resource = (typeof RESOURCES)[number];

type Action = PermissionData['action'];

/**
 * role -> resource -> the actions that role holds on that resource. A
 * missing resource key for a role grants nothing on it — this fails closed.
 *
 * - `admin`: full access everywhere, including User Management and Settings
 *   (F-075).
 * - `editor`: can create/edit content and media, but cannot manage users,
 *   cannot touch settings, and — per F-075's "cannot delete published
 *   content" — holds `publish` (draft -> published, or published -> draft)
 *   but not `admin` (hard delete / archive of a published entry).
 * - `viewer`: read-only everywhere. Scaffolded ahead of any concrete
 *   feature that needs it (F-045); not yet exposed in the admin UI and not
 *   yet granted anywhere beyond read access.
 *
 * `staff` (M4, F-165): an Editor can create/edit staff profiles but, like
 * media, cannot hard-delete one — the Staff Module has no draft/archive
 * state to fall back to (see schema.prisma's Staff model doc comment), so
 * removing a row is always the permanent `admin` action, mirroring media's
 * own hard-delete-is-admin-only reasoning.
 */
const ROLE_PERMISSIONS: Record<RoleEnumData, Partial<Record<Resource, readonly Action[]>>> = {
  admin: {
    content: ['read', 'write', 'publish', 'admin'],
    media: ['read', 'write', 'publish', 'admin'],
    staff: ['read', 'write', 'publish', 'admin'],
    users: ['read', 'write', 'publish', 'admin'],
    settings: ['read', 'write', 'publish', 'admin'],
    'audit-log': ['read'],
  },
  editor: {
    content: ['read', 'write', 'publish'],
    media: ['read', 'write'],
    staff: ['read', 'write'],
  },
  viewer: {
    content: ['read'],
    media: ['read'],
    staff: ['read'],
  },
};

/**
 * True if `role` holds `action` on `resource`. `resource` is a plain string
 * (not narrowed to `Resource`) so this stays safe to call with a resource
 * this matrix doesn't know about yet — it simply returns `false`, matching
 * `PermissionSchema`'s deliberately open `resource: z.string()` shape.
 */
export function hasPermission(role: RoleEnumData, resource: string, action: Action): boolean {
  return (ROLE_PERMISSIONS[role]?.[resource as Resource] ?? []).includes(action);
}

/** Convenience wrapper for callers already holding a parsed `PermissionData`. */
export function checkPermission(role: RoleEnumData, permission: PermissionData): boolean {
  return hasPermission(role, permission.resource, permission.action);
}
