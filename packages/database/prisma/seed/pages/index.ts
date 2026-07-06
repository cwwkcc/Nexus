// packages/database/prisma/seed/pages/index.ts

import { seedAbout } from './about.js';
import { seedAcademics } from './academics.js';
import { seedAdministration } from './administration.js';
import { seedContact } from './contact.js';
import { seedFacilities } from './facilities.js';
import type { PrismaClient } from '../../../src/generated/prisma/client.js';

export async function seedPages(db: PrismaClient) {
  await seedAbout(db);
  await seedAcademics(db);
  await seedAdministration(db);
  await seedContact(db);
  await seedFacilities(db);
}
