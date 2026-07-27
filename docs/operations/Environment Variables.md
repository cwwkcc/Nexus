# Nexus — Environment Variables

**Complete reference for all environment variables**

---

## Overview

Environment variables are the primary way to configure the Nexus platform. Secrets (credentials, passwords, keys) are stored only in environment variables — never committed to the repository.

**This revision is built directly from `packages/env/src/server.ts`, `client.ts`, and `shared.ts`** — the actual Zod schemas the app validates against at boot — rather than a hand-maintained list. Several variables in the previous revision don't exist in those schemas at all, and several real, required variables were missing.

---

## Location of Variables

| Environment     | Location                                       |
| --------------- | ---------------------------------------------- |
| **Development** | `apps/web/.env.local`, `apps/admin/.env.local` |
| **Production**  | `/opt/nexus/.env` on Hetzner server            |
| **CI/CD**       | GitHub Repository Secrets                      |

---

## Template File

The template file is `.env.example` in each app's root directory. Copy it to `.env.local` for development.

```bash
# Copy the template for development
cp apps/web/.env.example apps/web/.env.local
cp apps/admin/.env.example apps/admin/.env.local
```

---

## Shared Variables

Validated by `packages/env/src/shared.ts` — the only variable genuinely shared between client and server code today.

| Variable   | Required | Description                                                         | Example      |
| ---------- | -------- | ------------------------------------------------------------------- | ------------ |
| `NODE_ENV` | ❌ No    | Defaults to `development`. `development` \| `production` \| `test`. | `production` |

---

## Client Variables (safe to expose to the browser)

Validated by `packages/env/src/client.ts`. Only `NEXT_PUBLIC_`-prefixed variables belong here.

| Variable                       | Required | Description                                                         | Example                   |
| ------------------------------ | -------- | ------------------------------------------------------------------- | ------------------------- |
| `NEXT_PUBLIC_SITE_URL`         | ✅ Yes   | Public site base URL                                                | `https://cwwkcc.lk`       |
| `NEXT_PUBLIC_ADMIN_URL`        | ✅ Yes   | Admin panel base URL                                                | `https://admin.cwwkcc.lk` |
| `NEXT_PUBLIC_UMAMI_WEBSITE_ID` | ❌ No    | Umami website ID for client-side tracking. Not shipped yet (F-087). | `abc-123-def`             |

---

## Server Variables

Validated by `packages/env/src/server.ts`. Guarded by a `server-only` import — this isn't just a naming convention; a build fails if any of this is reachable from a `'use client'` component.

### Database

| Variable       | Required | Description                  | Example                                            |
| -------------- | -------- | ---------------------------- | -------------------------------------------------- |
| `DATABASE_URL` | ✅ Yes   | PostgreSQL connection string | `postgresql://nexus:password@localhost:5432/nexus` |

`POSTGRES_USER`, `POSTGRES_PASSWORD`, and `POSTGRES_DB` (used by the Postgres container itself in `docker-compose.yml`) aren't part of this Zod schema — they configure the database server, not the app, so a missing or wrong value there won't be caught by the app's own env validation at boot.

### Authentication (Auth.js)

| Variable          | Required | Description                                         | Example                                                          |
| ----------------- | -------- | --------------------------------------------------- | ---------------------------------------------------------------- |
| `NEXTAUTH_SECRET` | ✅ Yes   | Secret used to encrypt sessions, min. 32 characters | Generate with `openssl rand -base64 32`                          |
| `NEXTAUTH_URL`    | ✅ Yes   | Base URL of the app                                 | `https://cwwkcc.lk` for web, `https://admin.cwwkcc.lk` for admin |

`NEXTAUTH_URL_INTERNAL` isn't in the current schema — an earlier revision of this document listed it as a real optional variable, but there's no such entry in `server.ts` today.

### Admin API Auth

| Variable           | Required          | Description                                                                                                                                                                                                                                                                           |
| ------------------ | ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `ADMIN_API_SECRET` | ❌ No (currently) | **Bootstrap/temporary stub.** When unset, the admin tRPC procedure allows every request through with no check at all. This needs to become required — or be replaced with real Auth.js session auth — before production launch. Track as a release gate, not something to ship as-is. |

### On-Demand Revalidation

| Variable            | Required | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| ------------------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `REVALIDATE_SECRET` | ✅ Yes   | Guards `apps/web`'s `/api/revalidate` route. **This one has a real history**: the route compares `secret !== process.env.REVALIDATE_SECRET`, so if the variable was ever left unset, a request that omitted `secret` entirely would send `undefined !== undefined` — which passes. An unset `REVALIDATE_SECRET` was a silent, open revalidation endpoint. It's required in the schema specifically so the app now fails to boot instead of shipping that gap silently. **Wasn't listed in an earlier revision of this document at all.** |

### Google OAuth

| Variable               | Required | Description                              | Example                                    |
| ---------------------- | -------- | ---------------------------------------- | ------------------------------------------ |
| `GOOGLE_CLIENT_ID`     | ✅ Yes   | Google Cloud Console OAuth Client ID     | `123456789-xxx.apps.googleusercontent.com` |
| `GOOGLE_CLIENT_SECRET` | ✅ Yes   | Google Cloud Console OAuth Client Secret | `GOCSPX-xxx`                               |

### Storage (Cloudflare R2)

| Variable               | Required | Description                                                                              | Example                    |
| ---------------------- | -------- | ---------------------------------------------------------------------------------------- | -------------------------- |
| `R2_ACCOUNT_ID`        | ✅ Yes   | Cloudflare account ID. **Wasn't listed in an earlier revision of this document at all.** | `abcdef123456789`          |
| `R2_ACCESS_KEY_ID`     | ✅ Yes   | R2 Access Key ID                                                                         | `abcdef123456`             |
| `R2_SECRET_ACCESS_KEY` | ✅ Yes   | R2 Secret Access Key                                                                     | `xyz789`                   |
| `R2_BUCKET_NAME`       | ✅ Yes   | R2 bucket name                                                                           | `kcc-assets`               |
| `R2_PUBLIC_URL`        | ✅ Yes   | Public URL for the bucket                                                                | `https://assets.cwwkcc.lk` |

`R2_ENDPOINT` isn't in the current schema — an earlier revision listed it as required, but there's no such entry in `server.ts` today.

### Email (Resend)

| Variable         | Required | Description    | Example  |
| ---------------- | -------- | -------------- | -------- |
| `RESEND_API_KEY` | ✅ Yes   | Resend API Key | `re_xxx` |

`CONTACT_EMAIL` and `FEEDBACK_EMAIL` aren't in this Zod schema either — if they're used anywhere in the codebase, they aren't currently validated at boot the way everything above is, so a missing value there would surface as a runtime error somewhere else rather than a clear startup failure.

### Analytics (Umami)

| Variable           | Required | Description                                             | Example       |
| ------------------ | -------- | ------------------------------------------------------- | ------------- |
| `UMAMI_WEBSITE_ID` | ❌ No    | Umami website ID, server-side. Not shipped yet (F-087). | `abc-123-def` |

`UMAMI_URL` isn't in the schema — there's no server-side variable by that name in `server.ts`; only `UMAMI_WEBSITE_ID` (here) and `NEXT_PUBLIC_UMAMI_WEBSITE_ID` (client-side, above) exist.

### Optional / Not Yet Shipped

| Variable     | Required | Description                                               |
| ------------ | -------- | --------------------------------------------------------- |
| `SENTRY_DSN` | ❌ No    | Sentry DSN for error monitoring. Not shipped yet (F-085). |

`MAINTENANCE_MODE` and `LOG_LEVEL` aren't in the schema — an earlier revision of this document listed both, but neither exists in the codebase today.

### Break-Glass Admin Account (F-064)

| Variable         | Required | Description                                |
| ---------------- | -------- | ------------------------------------------ |
| `ADMIN_EMAIL`    | ✅ Yes   | Email for the break-glass admin account    |
| `ADMIN_PASSWORD` | ✅ Yes   | Password for the break-glass admin account |

Both are required in the schema — meaning **the whole app fails to boot if either is ever unset, including after the account has already been seeded.** Worth deciding deliberately whether that's the intended lifecycle for these two, or whether they should move to a narrower schema owned only by the seed script once the account exists.

---

## Setting Variables in Production

### On Hetzner Server

```bash
# 1. SSH into the server
ssh user@server-ip

# 2. Edit the environment file
cd /opt/nexus
nano .env

# 3. Add all variables
DATABASE_URL=postgresql://...
NEXTAUTH_SECRET=...
# ... etc

# 4. Restart services
docker compose up -d
```

### In GitHub Secrets

1. Go to the GitHub repository
2. Navigate to **Settings → Secrets and variables → Actions**
3. Add each variable as a repository secret
4. The CI/CD pipeline will use these secrets for deployment

---

## Generating Secrets

### Generate a Random Secret

```bash
# Generate a 32-byte random string (base64 encoded)
openssl rand -base64 32

# Example output: 3Z8K7TqY9wB2vL4pM6nA1cX5dF7jH9kL0
```

### Generate a Secure Password

```bash
# Generate a 16-character random password
openssl rand -base64 16

# Example output: pR4kL8mN2qB6vX9y
```

---

## Security Guidelines

1. **Never commit secrets to the repository**
2. **Use different secrets for development and production**
3. **Rotate secrets annually or after a security incident**
4. **Limit access to the `.env` file to essential personnel**
5. **Use GitHub Secrets for CI/CD, never hardcode credentials**

---

## Changelog

**This revision** — rebuilt this whole document against the actual Zod schemas in `packages/env`:

- Added `REVALIDATE_SECRET`, `NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_ADMIN_URL`, `NEXT_PUBLIC_UMAMI_WEBSITE_ID`, `R2_ACCOUNT_ID`, and `ADMIN_API_SECRET` — all real, and `REVALIDATE_SECRET` and `R2_ACCOUNT_ID` are required — none of which were listed before.
- Flagged `NEXTAUTH_URL_INTERNAL`, `R2_ENDPOINT`, `UMAMI_URL`, `MAINTENANCE_MODE`, and `LOG_LEVEL` as not present in the current schema.
- Noted that `POSTGRES_USER`/`POSTGRES_PASSWORD`/`POSTGRES_DB` and `CONTACT_EMAIL`/`FEEDBACK_EMAIL` exist somewhere in the platform's config but aren't validated by `packages/env` the way everything else here is.
