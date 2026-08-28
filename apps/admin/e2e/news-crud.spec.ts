// E2E test: create, edit, publish news article (F-126).
//
// NOTE: written but not run in this sandbox — see playwright.config.ts's
// top comment. Needs a real dev server + seeded Postgres + the break-glass
// account's ADMIN_EMAIL/ADMIN_PASSWORD env vars (F-064/F-078) to execute.
// Assumes the break-glass account has not enrolled TOTP (F-080) in the
// test environment — the login form's authenticator field is left blank,
// matching its own "leave blank if you haven't set up an authenticator
// yet" helper text.

import { expect, test, type Page } from '@playwright/test';

const ADMIN_EMAIL = process.env.ADMIN_EMAIL ?? 'admin@cwwkcc.lk';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD ?? '';

async function login(page: Page) {
  await page.goto('/login');
  await page.getByLabel('Email').fill(ADMIN_EMAIL);
  await page.getByLabel('Password').fill(ADMIN_PASSWORD);
  await page.getByRole('button', { name: 'Sign in' }).click();
  await expect(page).toHaveURL('/');
}

test.describe('News module', () => {
  test.beforeEach(async ({ page }) => {
    test.skip(!ADMIN_PASSWORD, 'ADMIN_PASSWORD not set in this environment — see playwright.config.ts.');
    await login(page);
  });

  test('creates a draft, edits it, and publishes it', async ({ page }) => {
    const title = `Playwright test article ${Date.now()}`;

    // Create
    await page.goto('/news/new');
    await page.getByLabel('Title').fill(title);
    await page.locator('.prose-editor').fill('This is the body of a Playwright-authored test article.');
    await page.getByRole('button', { name: 'Create article' }).click();
    await expect(page).toHaveURL('/news');
    await expect(page.getByText(title)).toBeVisible();

    // The new article should be a draft
    const row = page.getByRole('row', { name: new RegExp(title) });
    await expect(row.getByText('Draft', { exact: true })).toBeVisible();

    // Edit
    await row.getByRole('link', { name: title }).click();
    await expect(page).toHaveURL(/\/news\/[^/]+$/);
    const updatedTitle = `${title} (updated)`;
    await page.getByLabel('Title').fill(updatedTitle);
    await page.getByRole('button', { name: 'Save changes' }).click();
    await expect(page).toHaveURL('/news');
    await expect(page.getByText(updatedTitle)).toBeVisible();

    // Submit for review, then publish — a draft's row action is now
    // "Submit for Review", not a direct-to-published shortcut, now that
    // News has its own draft → review → published → archived workflow.
    const updatedRow = page.getByRole('row', { name: new RegExp(updatedTitle) });
    await updatedRow.getByRole('button', { name: 'Submit for Review' }).click();
    await expect(updatedRow.getByText('In Review', { exact: true })).toBeVisible();

    await updatedRow.getByRole('button', { name: 'Publish' }).click();
    await expect(updatedRow.getByText('Published', { exact: true })).toBeVisible();

    // Clean up: archive it so repeated runs don't accumulate published test articles
    await updatedRow.getByRole('button', { name: 'Archive' }).click();
    await expect(updatedRow.getByText('Archived', { exact: true })).toBeVisible();
  });

  test('bulk-publishes multiple selected drafts', async ({ page }) => {
    const titles = [`Bulk test A ${Date.now()}`, `Bulk test B ${Date.now()}`];

    for (const title of titles) {
      await page.goto('/news/new');
      await page.getByLabel('Title').fill(title);
      await page.locator('.prose-editor').fill('Bulk-action test body.');
      await page.getByRole('button', { name: 'Create article' }).click();
      await expect(page).toHaveURL('/news');
    }

    for (const title of titles) {
      await page
        .getByRole('row', { name: new RegExp(title) })
        .getByRole('checkbox')
        .check();
    }

    // Scoped to the bulk-action toolbar specifically: a fresh draft's own
    // row action is "Submit for Review" now, not "Publish", but any
    // review-status article already in the list still has its own
    // row-level "Publish" button — an unscoped page-wide locator risks
    // matching more than one element either way.
    const bulkBar = page.getByRole('toolbar', { name: 'Bulk actions' });
    await bulkBar.getByRole('button', { name: 'Publish' }).click();

    for (const title of titles) {
      await expect(page.getByRole('row', { name: new RegExp(title) }).getByText('Published', { exact: true })).toBeVisible();
    }

    // Clean up
    for (const title of titles) {
      await page
        .getByRole('row', { name: new RegExp(title) })
        .getByRole('checkbox')
        .check();
    }
    await bulkBar.getByRole('button', { name: 'Archive' }).click();
  });
});
