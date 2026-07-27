## "Where does X live?"

| I'm looking for...                                   | It's here                                                                                                                    |
| ---------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| Design token values (colours, type, spacing, motion) | `packages/tokens/src/` — `primitives/` for raw values, `semantic/` for role-based ones                                       |
| Next.js/Tailwind/font build config                   | `packages/config/`                                                                                                           |
| Zod schemas, content-type identifiers, Page Registry | `packages/contracts/src/` — see `docs/architecture/Contracts.md` for the full map                                            |
| Shared React components                              | `packages/ui/src/components/`                                                                                                |
| tRPC routers                                         | `packages/api/src/`                                                                                                          |
| Prisma schema and seed scripts                       | `packages/database/prisma/`                                                                                                  |
| Environment variable validation                      | `packages/env/src/` (`server.ts`, `client.ts`, `shared.ts`)                                                                  |
| Public site pages                                    | `apps/web/src/app/[locale]/`                                                                                                 |
| Public site page-composition blocks                  | `apps/web/src/blocks/` — several page folders don't exist yet; see `docs/Design System/Components/Component Reference.md` §3 |
| Admin panel pages                                    | `apps/admin/src/app/`                                                                                                        |
| Admin panel feature components                       | `apps/admin/src/features/` (not `apps/admin/src/components/`, which is empty)                                                |
| Backup/restore/deploy/secret-rotation scripts        | `infra/scripts/`                                                                                                             |
| Caddy reverse-proxy config                           | `infra/caddy/`                                                                                                               |

---
