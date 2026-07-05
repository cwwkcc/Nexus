/**
 * packages/database/prisma/seed.ts
 *
 * Master database seeder.
 * Imports all seed functions from the `seed/` directory and runs them in order.
 */

import 'dotenv/config';
import { seedGlobals, seedPages } from './seed/index.js';
import { db } from '../src/lib/db.js';

async function main() {
  // 1. Seed global content (navigation, footer)
  await seedGlobals(db);

  // 2. Seed page content (about, home, etc.)
  await seedPages(db);
}

main()
  .catch(() => {
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
