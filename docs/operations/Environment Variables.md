# Nexus — Environment Variables

**Complete reference for all environment variables**

---

## Overview

Environment variables are the primary way to configure the Nexus platform. Secrets (credentials, passwords, keys) are stored only in environment variables — never committed to the repository.

---

## Location of Variables

| Environment | Location |
|-------------|----------|
| **Development** | `apps/web/.env.local`, `apps/admin/.env.local` |
| **Production** | `/opt/nexus/.env` on Hetzner server |
| **CI/CD** | GitHub Repository Secrets |

---

## Template File

The template file is `.env.example` in each app's root directory. Copy it to `.env.local` for development.

```bash
# Copy the template for development
cp apps/web/.env.example apps/web/.env.local
cp apps/admin/.env.example apps/admin/.env.local
```

---

## Database Variables

| Variable | Required | Description | Example |
|----------|----------|-------------|---------|
| `DATABASE_URL` | ✅ Yes | PostgreSQL connection string | `postgresql://nexus:password@localhost:5432/nexus` |
| `POSTGRES_USER` | ✅ Yes | Database username | `nexus` |
| `POSTGRES_PASSWORD` | ✅ Yes | Database password | `strong-password` |
| `POSTGRES_DB` | ✅ Yes | Database name | `nexus` |

---

## Authentication Variables (Auth.js)

| Variable | Required | Description | Example |
|----------|----------|-------------|---------|
| `NEXTAUTH_SECRET` | ✅ Yes | Secret used to encrypt sessions | Generate with `openssl rand -base64 32` |
| `NEXTAUTH_URL` | ✅ Yes | Base URL of the app | `https://cwwkcc.lk` for web, `https://admin.cwwkcc.lk` for admin |
| `NEXTAUTH_URL_INTERNAL` | ❌ No | Internal URL for server-side calls | `http://nexus-web:3000` for Docker |

### Google OAuth

| Variable | Required | Description | Example |
|----------|----------|-------------|---------|
| `GOOGLE_CLIENT_ID` | ✅ Yes | Google Cloud Console OAuth Client ID | `123456789-xxx.apps.googleusercontent.com` |
| `GOOGLE_CLIENT_SECRET` | ✅ Yes | Google Cloud Console OAuth Client Secret | `GOCSPX-xxx` |

---

## Storage Variables (Cloudflare R2)

| Variable | Required | Description | Example |
|----------|----------|-------------|---------|
| `R2_ACCESS_KEY_ID` | ✅ Yes | R2 Access Key ID | `abcdef123456` |
| `R2_SECRET_ACCESS_KEY` | ✅ Yes | R2 Secret Access Key | `xyz789` |
| `R2_BUCKET_NAME` | ✅ Yes | R2 bucket name | `kcc-assets` |
| `R2_PUBLIC_URL` | ✅ Yes | Public URL for the bucket | `https://assets.cwwkcc.lk` |
| `R2_ENDPOINT` | ✅ Yes | R2 endpoint URL | `https://xxx.r2.cloudflarestorage.com` |

---

## Email Variables (Resend)

| Variable | Required | Description | Example |
|----------|----------|-------------|---------|
| `RESEND_API_KEY` | ✅ Yes | Resend API Key | `re_xxx` |
| `CONTACT_EMAIL` | ✅ Yes | Email address for contact form submissions | `contact@cwwkcc.lk` |
| `FEEDBACK_EMAIL` | ✅ Yes | Email address for feedback submissions | `principal@cwwkcc.lk` |

---

## Analytics Variables (Umami)

| Variable | Required | Description | Example |
|----------|----------|-------------|---------|
| `UMAMI_URL` | ❌ No | URL of the Umami instance | `https://umami.cwwkcc.lk` |
| `UMAMI_WEBSITE_ID` | ❌ No | Umami website ID | `abc-123-def` |

---

## Optional Variables

| Variable | Required | Description | Example |
|----------|----------|-------------|---------|
| `SENTRY_DSN` | ❌ No | Sentry DSN for error monitoring | `https://xxx@xxx.ingest.sentry.io/xxx` |
| `MAINTENANCE_MODE` | ❌ No | Enable maintenance mode | `true` (disables site) |
| `LOG_LEVEL` | ❌ No | Logging level | `info`, `debug`, `error` |

---

## Break-Glass Admin Variables

| Variable | Required | Description | Example |
|----------|----------|-------------|---------|
| `ADMIN_EMAIL` | ✅ Yes | Email for the break-glass admin account | `admin@cwwkcc.lk` |
| `ADMIN_PASSWORD` | ✅ Yes | Password for the break-glass admin account | `strong-password` |

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

