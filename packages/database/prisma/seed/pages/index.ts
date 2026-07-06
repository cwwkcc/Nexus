// packages/database/prisma/seed/pages/index.ts

import { seedAbout } from './about.js';
import type { PrismaClient } from '../../../src/generated/prisma/client.js';

export async function seedPages(db: PrismaClient) {
  await seedAbout(db);
}
