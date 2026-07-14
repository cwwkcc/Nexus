# @nexus/env

Environment variable validation for Nexus applications.

This package provides Zod schemas for validating environment variables at runtime.

## Usage

```typescript
import { validateEnv, validateServerEnv, validatePublicEnv } from '@nexus/env';

// Validate all environment variables
const env = validateEnv();

// Validate server-only environment variables
const serverEnv = validateServerEnv();

// Validate public environment variables
const publicEnv = validatePublicEnv();
```

## Purpose

Environment variables are application configuration, not tooling configuration. They define:
- Database connection strings
- API keys
- OAuth credentials
- Feature flags
- Application URLs

These are consumed by:
- Applications (apps/web, apps/admin)
- Server-side code
- API packages
