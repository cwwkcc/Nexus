# @nexus/config

Shared configuration package for the Nexus monorepo. This package provides design tokens, environment variable validation, shared application constants, and Next.js configuration used across all applications.

## Overview

This package serves as the central source of truth for:
- **Design tokens** – Colors, typography, spacing, motion, shadows, and other visual primitives
- **Tailwind preset** – The `nexusPreset` that maps tokens to Tailwind utilities
- **Environment validation** – Zod schemas for validating environment variables
- **Shared constants** – Site-wide constants (name, URLs, locales, limits)
- **Next.js config** – Shared Next.js configuration for web and admin apps

## Installation

This package is part of the Nexus monorepo and is automatically available to all workspace packages.

```bash
# Install dependencies (run from monorepo root)
pnpm install
```

## Usage

### Design Tokens

Design tokens are exported from `src/tokens/` and can be imported directly:

```typescript
import { colors, spacing, fontSize } from '@nexus/config';
```

### Tailwind Preset

The `nexusPreset` is used in your Tailwind configuration:

```javascript
// tailwind.config.js
const { nexusPreset } = require('@nexus/config');

module.exports = {
  presets: [nexusPreset],
  // ... other config
};
```

### Environment Variable Validation

Validate environment variables at application startup:

```typescript
import { validateEnv, validateServerEnv, validatePublicEnv } from '@nexus/config';

// Validate all environment variables
const env = validateEnv();
console.log(env.DATABASE_URL);

// Or validate only server/public variables
const serverEnv = validateServerEnv();
const publicEnv = validatePublicEnv();
```

**Available schemas:**
- `envSchema` – Combined server and public variables
- `serverEnvSchema` – Server-only variables (DATABASE_URL, NEXTAUTH_SECRET, etc.)
- `publicEnvSchema` – Public variables (NEXT_PUBLIC_*)

**Validation functions:**
- `validateEnv()` – Validates all environment variables
- `validateServerEnv()` – Validates server-only variables
- `validatePublicEnv()` – Validates public variables

### Shared Constants

Use shared application constants across your apps:

```typescript
import {
  SITE_NAME,
  DEFAULT_LOCALE,
  SUPPORTED_LOCALES,
  SITE_URL,
  ADMIN_URL,
  DEFAULT_PAGE_SIZE,
  MAX_GALLERY_IMAGES,
} from '@nexus/config';
```

### Next.js Configuration

Both `apps/web` and `apps/admin` use the shared Next.js configuration:

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
│   ├── tokens/           # Design tokens (colors, spacing, typography, etc.)
│   ├── tailwind/
│   │   └── preset.ts     # Tailwind preset
│   ├── env.ts            # Environment variable validation schemas
│   ├── constants.ts      # Shared application constants
│   ├── next.ts           # Shared Next.js configuration
│   └── index.ts          # Package exports
├── scripts/
│   ├── generate-css-vars.js    # Generates tokens.css
│   └── generate-cn-groups.js    # Generates cn() class groups
└── package.json
```

## Design Tokens

The token system includes:

- **Colors** – Semantic and primitive color scales
- **Typography** – Font sizes, line heights, letter spacing, font families
- **Spacing** – 4px-based spacing scale
- **Motion** – Transition durations and easing functions
- **Shadows** – Elevation shadow system
- **Radius** – Border radius scale
- **Z-index** – Stacking context tiers
- **Opacity** – Opacity scale
- **Blur** – Backdrop blur values
- **Aspect ratio** – Common aspect ratios
- **Gradients** – Predefined gradient backgrounds
- **Sizing** – Width/height utility scale
- **Glass** – Glassmorphism tokens
- **Focus** – Focus ring tokens

## Environment Variables

### Required Variables

- `DATABASE_URL` – PostgreSQL connection string
- `NEXTAUTH_SECRET` – Auth.js secret (min 32 characters)
- `NEXTAUTH_URL` – Auth.js callback URL
- `GOOGLE_CLIENT_ID` – Google OAuth client ID
- `GOOGLE_CLIENT_SECRET` – Google OAuth client secret
- `R2_ACCOUNT_ID` – Cloudflare R2 account ID
- `R2_ACCESS_KEY_ID` – R2 access key ID
- `R2_SECRET_ACCESS_KEY` – R2 secret access key
- `R2_BUCKET_NAME` – R2 bucket name
- `R2_PUBLIC_URL` – R2 public CDN URL
- `RESEND_API_KEY` – Resend email API key
- `ADMIN_EMAIL` – Break-glass admin email
- `ADMIN_PASSWORD` – Break-glass admin password

### Optional Variables

- `SENTRY_DSN` – Sentry error tracking DSN
- `UMAMI_WEBSITE_ID` – Umami analytics site ID
- `NEXT_PUBLIC_SITE_URL` – Public site URL (defaults to https://cwwkcc.lk)
- `NEXT_PUBLIC_ADMIN_URL` – Admin panel URL (defaults to https://admin.cwwkcc.lk)
- `NEXT_PUBLIC_UMAMI_WEBSITE_ID` – Public Umami website ID

## Shared Constants

### Site Configuration

- `SITE_NAME` – "C.W.W. Kannangara Central College"
- `DEFAULT_LOCALE` – 'en'
- `SUPPORTED_LOCALES` – ['en', 'si', 'ta']
- `SITE_URL` – Public site URL from environment
- `ADMIN_URL` – Admin panel URL from environment
- `API_BASE_URL` – API base URL (derived from ADMIN_URL)

### Application Limits

- `DEFAULT_PAGE_SIZE` – 20
- `MAX_GALLERY_IMAGES` – 50
- `MIN_PASSWORD_LENGTH` – 8
- `DEFAULT_UPLOAD_LIMIT` – 10MB (in bytes)
- `MAX_RICH_TEXT_LENGTH` – 100,000
- `MAX_TITLE_LENGTH` – 200
- `MAX_DESCRIPTION_LENGTH` – 500

## CSS Variables

Design tokens are automatically generated as CSS custom properties and written to:
- `apps/web/src/app/tokens.css`
- `apps/admin/src/app/tokens.css`

These files are regenerated by running `pnpm generate:css-vars`.

## Notes

- Locale constants are defined directly in this package for convenience, matching the values in `@nexus/contracts/primitives/locale` to maintain consistency
- Developer tooling configs (TypeScript, ESLint, Prettier) remain at the monorepo root per Nx conventions
- This package uses `nodenext` module resolution with `.js` extensions in imports
