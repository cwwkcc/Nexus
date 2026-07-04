## Summary

## Related Feature Registry ID / Issue

F-\_\_\_ · Closes #

## Type of change

- [ ] feat
- [ ] fix
- [ ] docs
- [ ] style
- [ ] refactor
- [ ] test
- [ ] chore

(matches the Conventional Commits prefix your commits should use — see the
Developer Onboarding Guide)

## Checklist

- [ ] `pnpm nx affected -t lint typecheck build` passes locally
- [ ] Unit tests added/updated (`pnpm test:run`) where applicable
- [ ] Migrations included if the Prisma schema changed (`pnpm db:migrate`)
- [ ] New **reusable UI chrome** strings (nav, footer, buttons) added to `messages/{en,si,ta}.json`
- [ ] New **editorial content** seeded via `ContentEntry` in all three locales — not added to next-intl message files (see ADR-009)
- [ ] Design tokens used for any new styling — no hardcoded colors/spacing
- [ ] Accessibility checked (labels, roles, contrast) for any new UI

## Screenshots (if UI changed)

| Locale | Before | After |
| ------ | ------ | ----- |
| en     |        |       |
| si     |        |       |
| ta     |        |       |

## Notes for reviewers
