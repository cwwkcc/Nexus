/**
 * packages/database/prisma/seed.ts
 *
 * Master database seeder.
 * Calls all individual seed modules in sequence.
 */

import 'dotenv/config';

import { seedAbout } from './seed-about.js';
import { db } from '../src/lib/db.js';

async function main() {
  await seedAbout(db);
}

main()
  .catch(() => {
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
