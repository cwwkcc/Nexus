// packages/database/prisma/seed.ts

import 'dotenv/config';
import { seedBreakGlassAdmin, seedGlobals, seedPages } from './seed/index.js';
import { db } from '../src/lib/db.js';

async function main() {
  await seedGlobals(db);
  await seedPages(db);
  await seedBreakGlassAdmin(db);
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
