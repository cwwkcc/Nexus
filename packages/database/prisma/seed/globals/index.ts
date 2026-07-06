// packages/database/prisma/seed/globals/index.ts

import { SUPPORTED_LOCALES } from '@nexus/contracts';

import { seedFooter } from './footer.js';
import { seedNavigation } from './navigation.js';
import type { PrismaClient } from '../../../src/generated/prisma/client.js';

export async function seedGlobals(db: PrismaClient) {
  await seedFooter(db, SUPPORTED_LOCALES);
  await seedNavigation(db, SUPPORTED_LOCALES);
}
