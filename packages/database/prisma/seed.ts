// packages/database/prisma/seed.ts

import 'dotenv/config';
import { seedGlobals, seedPages } from './seed/index.js';
import { db } from '../src/lib/db.js';

async function main() {
  await seedGlobals(db);
  await seedPages(db);
}

main()
  .catch(() => {
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
