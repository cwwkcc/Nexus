# @nexus/config

Tooling configuration for the Nexus monorepo.

This package provides shared configuration for development tools:

- Tailwind CSS preset
- Next.js configuration

**Note:** Design tokens have moved to `@nexus/tokens`. Environment variable validation has moved to `@nexus/env`.

## Installation

This package is part of the Nexus monorepo and is automatically available to all workspace packages.

```bash
# Install dependencies (run from monorepo root)
pnpm install
```

## Usage

### Tailwind Preset

The Tailwind preset includes all design tokens from `@nexus/tokens` and is the recommended way to use them in Tailwind projects:

```javascript
// tailwind.config.js
import { nexusPreset } from '@nexus/config/tailwind';

export default {
  presets: [nexusPreset],
  // app-specific configuration
};
```

### Next.js Configuration

Shared Next.js configuration for web and admin apps:

```javascript
// next.config.js
const { sharedNextConfig } = require('@nexus/config/next');

const nextConfig = {
  ...sharedNextConfig,
  // app-specific additions
};
```

## Development

### Scripts

```bash
# Watch TypeScript compilation
pnpm dev

# Build TypeScript
pnpm build

# Generate CSS variables from tokens
pnpm generate:css-vars

# Generate cn() utility class groups
pnpm generate:cn

# Generate both CSS vars and cn groups
pnpm generate
```

### File Structure

```
packages/config/
├── src/
│   ├── tailwind/
│   │   └── preset.ts     # Tailwind preset (consumes @nexus/tokens)
│   ├── next.ts           # Shared Next.js configuration
│   └── index.ts          # Package exports
└── package.json
```

## Related Packages

- `@nexus/tokens` – Design tokens (colors, spacing, typography, etc.)
- `@nexus/env` – Environment variable validation
