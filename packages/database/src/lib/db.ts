import { PrismaClient } from '../generated/prisma/client.js';

declare global {
  // eslint-disable-next-line no-var
  var __nexusPrisma: PrismaClient | undefined;
}

export const db: PrismaClient = globalThis.__nexusPrisma ?? new PrismaClient();

if (process.env.NODE_ENV !== 'production') {
  globalThis.__nexusPrisma = db;
}

export * from '../generated/prisma/client.js';
