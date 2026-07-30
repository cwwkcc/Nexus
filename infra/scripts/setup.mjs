#!/usr/bin/env node
/**
 * scripts/setup.mjs
 *
 * One-shot local environment setup for Nexus.
 * Run with:  node scripts/setup.mjs
 *
 * What this does, in order:
 *   1. Checks Node version and activates the pinned pnpm version via corepack.
 *   2. Creates .env from .env.example with safe DEMO values, if .env doesn't
 *      already exist. These are placeholders, not real secrets — see the
 *      note printed at the end.
 *   3. Installs dependencies (pnpm install).
 *   4. Starts Postgres via Docker Compose and waits until it's healthy.
 *   5. Applies existing Prisma migrations (non-interactive, safe to re-run).
 *   6. Seeds the database.
 *
 * Written as plain Node instead of a shell script so it runs the same way
 * on macOS, Linux, and Windows.
 */

import { execSync } from 'node:child_process';
import { randomBytes } from 'node:crypto';
import { existsSync, readFileSync, writeFileSync } from 'node:fs';

const TOTAL_STEPS = 6;
const step = (n, msg) => console.log(`\n[${n}/${TOTAL_STEPS}] ${msg}`);
const run = (cmd) => execSync(cmd, { stdio: 'inherit' });
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function main() {
  // --- 1. Node / pnpm ---
  step(1, 'Checking Node version and activating pnpm...');
  const nodeMajor = parseInt(process.versions.node.split('.')[0], 10);
  if (nodeMajor < 22) {
    console.warn(`⚠️  Node ${process.versions.node} detected — this project expects Node >=22. Continuing anyway.`);
  }
  try {
    run('corepack enable');
    run('corepack prepare pnpm@10.32.1 --activate');
  } catch {
    console.warn('⚠️  corepack step failed — continuing, assuming pnpm is already available on PATH.');
  }

  // --- 2. .env ---
  step(2, 'Setting up .env...');
  if (!existsSync('.env')) {
    if (!existsSync('.env.example')) {
      console.error('❌ .env.example not found in the project root — cannot generate .env. Aborting.');
      process.exit(1);
    }
    const secret = () => randomBytes(32).toString('hex');
    // DEMO values only — enough for the app to pass its startup validation
    // and boot. Login, uploads, and email will not actually work since
    // Google OAuth / R2 / Resend are dummy credentials. Real deployments
    // must replace these with real values.
    const demoValues = {
      DATABASE_URL: 'postgresql://nexus:nexus@localhost:5432/nexus',
      NEXTAUTH_SECRET: secret(),
      NEXTAUTH_URL: 'http://localhost:3001',
      GOOGLE_CLIENT_ID: 'demo-client-id',
      GOOGLE_CLIENT_SECRET: 'demo-client-secret',
      R2_ACCOUNT_ID: 'demo-account-id',
      R2_ACCESS_KEY_ID: 'demo-access-key',
      R2_SECRET_ACCESS_KEY: 'demo-secret-key',
      R2_BUCKET_NAME: 'demo-bucket',
      R2_PUBLIC_URL: 'http://localhost:9000/demo-bucket',
      RESEND_API_KEY: 'demo-resend-key',
      ADMIN_API_SECRET: '',
      REVALIDATE_SECRET: secret(),
      ADMIN_EMAIL: 'admin@example.com',
      ADMIN_PASSWORD: 'demo-password',
      SENTRY_DSN: '',
      UMAMI_WEBSITE_ID: '',
    };
    let content = readFileSync('.env.example', 'utf8');
    for (const [key, value] of Object.entries(demoValues)) {
      const re = new RegExp(`^${key}=.*$`, 'm');
      content = content.replace(re, `${key}=${value}`);
    }
    writeFileSync('.env', content);
    console.log('✅ .env created with demo values.');
  } else {
    console.log('✅ .env already exists — leaving it untouched.');
  }

  // --- 3. Install deps ---
  step(3, 'Installing dependencies (pnpm install)...');
  run('pnpm install');

  // --- 4. Postgres ---
  step(4, 'Starting Postgres via Docker Compose...');
  run('docker compose up -d');

  console.log('Waiting for Postgres to report healthy...');
  const startedAt = Date.now();
  const timeoutMs = 60_000;
  for (;;) {
    try {
      execSync('docker compose exec -T postgres pg_isready -U nexus -d nexus', { stdio: 'ignore' });
      break;
    } catch {
      if (Date.now() - startedAt > timeoutMs) {
        console.error('❌ Postgres did not become healthy within 60s. Check "docker compose logs postgres".');
        process.exit(1);
      }
      await sleep(2000);
    }
  }
  console.log('✅ Postgres is up.');

  // --- 5. Migrate ---
  step(5, 'Applying database migrations...');
  run('pnpm --filter @nexus/db db:migrate:deploy');

  // --- 6. Seed ---
  step(6, 'Seeding the database...');
  run('pnpm db:seed');

  console.log('\n🎉 Setup complete!');
  console.log('   pnpm dev:web    → http://localhost:3000');
  console.log('   pnpm dev:admin  → http://localhost:3001');
  console.log('\nNote: Google login, media uploads, and email are on demo/dummy');
  console.log("credentials (see .env) — those specific features won't work until");
  console.log('real values are filled in. Everything else should run normally.');
}

main().catch((err) => {
  console.error('\n❌ Setup failed:', err.message ?? err);
  process.exit(1);
});
