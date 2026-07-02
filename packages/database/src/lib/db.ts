// packages/database/src/lib/db.ts
import { PrismaPg } from '@prisma/adapter-pg';

import { PrismaClient } from '../generated/prisma/client.ts';

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });

declare global {
  var __nexusPrisma: PrismaClient | undefined;
}

export const db: PrismaClient =
  globalThis.__nexusPrisma ?? new PrismaClient({ adapter });

if (process.env.NODE_ENV !== 'production') {
  globalThis.__nexusPrisma = db;
}

export * from '../generated/prisma/client.js';
