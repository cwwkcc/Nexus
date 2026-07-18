# `@nexus/tokens`

Design tokens are the **single source of truth** for every visual decision in Nexus. This package exports raw primitive values, semantic mappings, and generator functions that produce:

- CSS custom properties (used by `apps/web` and `apps/admin`)
- The Tailwind theme (used by `@nexus/config`’s preset)
- The `cn()` utility class groups (used by `@nexus/ui`)
- A flat JSON representation (for documentation and debugging)

Everything in the design system — colours, spacing, typography, motion, shadows, and more — is defined once here and consumed everywhere else.

---

## Structure

```
packages/tokens/
├── src/
│   ├── primitives/          # Raw, un‑semantic values (the building blocks)
│   │   ├── colors.ts
│   │   ├── spacing.ts
│   │   ├── sizing.ts
│   │   ├── typography.ts
│   │   ├── radius.ts
│   │   ├── shadows.ts
│   │   ├── motion.ts
│   │   └── effects.ts       # blur, opacity, aspect‑ratio, z‑index, gradients, scale
│   ├── semantic/            # Purpose‑bound mappings (what these tokens *mean*)
│   │   ├── colors.ts        # brandColors, statusColors
│   │   ├── backgrounds.ts   # surface, overlay
│   │   ├── borders.ts
│   │   ├── text.ts
│   │   └── index.ts
│   ├── themes/              # Theme overrides (dark, light, high‑contrast) – currently stubs
│   │   ├── dark.ts
│   │   ├── light.ts
│   │   └── high-contrast.ts
│   ├── generators/          # Pure functions that produce derived outputs
│   │   ├── css.ts           # → CSS custom properties string
│   │   ├── tailwind.ts      # → Tailwind theme object
│   │   ├── cn.ts            # → `cn()` utility source code
│   │   ├── json.ts          # → flat token list
│   │   └── figma.ts         # stub (not yet implemented)
│   └── index.ts             # public exports
├── scripts/
│   ├── generate-css-vars.js   # writes to apps/*/app/tokens.css
│   └── generate-cn-groups.js  # writes to packages/ui/src/utilities/cn.tsx
└── package.json
```

---

## Usage

### Import tokens in TypeScript

```ts
import { brandColors, spacing, fontSize } from '@nexus/tokens';
```

All primitive and semantic exports are available from the root.

### Use the Tailwind theme

The `nexusTheme` object (from `generators/tailwind.ts`) is consumed by `@nexus/config`’s Tailwind preset. You don’t need to import it directly unless you’re building a custom preset.

### Generate CSS variables

Run:

```bash
pnpm --filter @nexus/tokens generate:css
```

This writes `tokens.css` to both `apps/web/src/app/` and `apps/admin/src/app/`. These files are imported in each app’s `global.css`.

### Generate the `cn()` utility

```bash
pnpm --filter @nexus/tokens generate:cn
```

This regenerates `packages/ui/src/utilities/cn.tsx`, which is the single `cn()` function used throughout the monorepo.

### Generate everything

```bash
pnpm --filter @nexus/tokens generate
```

Runs both generation scripts.

> These generators are also invoked via the root `package.json` scripts (`pnpm build` runs them transitively). In most cases you won’t need to run them manually — they are automatically kept in sync when you run a full build.

---

## Adding or modifying tokens

1. **Edit primitives** – Update raw values in `primitives/*.ts`.
2. **Edit semantic mappings** – If needed, adjust `semantic/*.ts` to reference the new primitives.
3. **Re‑generate** – Run `pnpm --filter @nexus/tokens generate` to produce updated CSS and `cn` outputs.
4. **Commit** all files, including the generated outputs (they are part of the repository to keep builds deterministic).

---

## Dependencies

- **`@nexus/config`** – consumes the Tailwind preset built from these tokens.
- **`@nexus/ui`** – consumes the `cn()` utility and imports token values directly for component styling.
- **`apps/web` & `apps/admin`** – import the generated `tokens.css` for CSS custom properties.

The token package itself has **no runtime dependencies** — it is a pure data and generator package.

---

## Design principles

- **Single source of truth** – Every colour, spacing, and font size is defined exactly once.
- **Semantic over raw** – Use `surface-base` or `text-primary`, not `#FBF9F2` directly.
- **Generated outputs are committed** – This ensures that every build sees the same CSS variables and `cn` groups, even if the generator logic changes.
- **Extension via themes** – The `themes/` folder is reserved for future light/dark/high‑contrast variants (currently stubs).

---

## Further reading

- [Foundations.md](../../docs/Design%20System/Foundations.md) – how tokens are used in the design system.
- [Tokens Reference.md](../../docs/Design%20System/Tokens%20Reference.md) – the complete list of token names and values.
- [Engineering Roadmap.md](../../docs/technical/Engineering%20Roadmap.md) – where tokens fit in the build order.

---

_C.W.W. Kannangara Central College – Est. 1873 – Wisdom is All Wealth_
