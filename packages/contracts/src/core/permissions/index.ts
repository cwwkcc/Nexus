// packages/contracts/src/core/permissions/index.ts
//
// Permission contracts for role-based access control in the admin panel.
//
// Should contain:
//   Permission      — union of all action strings:
//                     'content:read' | 'content:write' | 'content:publish' |
//                     'settings:read' | 'settings:write' |
//                     'media:upload' | 'media:delete' |
//                     'users:manage'
//   RolePermissions — Record<AdminRole, Permission[]>
//                     defines which permissions each role grants
//   canPerform()    — (role: AdminRole, permission: Permission) => boolean
//
// Notes:
//   Enforcement happens in the tRPC middleware (packages/api/src/trpc.ts).
//   This file defines the permission map only.
//   Add new Permission strings here before implementing a new protected feature.

// TODO: implement
