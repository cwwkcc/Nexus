// Playwright configuration for apps/admin E2E tests (F-126).
//
// NOTE: written but not run in this sandbox — no network route to a
// browser download CDN or a live Postgres instance here, so `playwright
// install` and a real `next dev` + database chain aren't available. Run
// `pnpm --filter @nexus/admin exec playwright install` once, then `pnpm
// --filter @nexus/admin test:e2e` against a real dev DB, to actually
// verify this (and news-crud.spec.ts) before relying on it.

import { defineConfig, devices } from '@playwright/test';

const PORT = 3001;
const baseURL = `http://localhost:${PORT}`;

export default defineConfig({
  testDir: './e2e',
  fullyParallel: false, // News CRUD tests share one seeded admin account and can race on the same rows if run in parallel.
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: process.env.CI ? [['github'], ['html', { open: 'never' }]] : 'list',
  timeout: 30_000,
  use: {
    baseURL,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
  webServer: {
    command: 'pnpm build && pnpm start',
    url: baseURL,
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
});
