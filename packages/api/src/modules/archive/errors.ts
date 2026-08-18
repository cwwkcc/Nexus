// packages/api/src/modules/archive/errors.ts
//
// Error classes for the archive module (Task 7.20, F-155/F-182).
// Mirrors the errors.ts pattern from modules/achievements/errors.ts.

export class ArchiveNotFoundError extends Error {
  constructor(id: string) {
    super(`Archive entry not found: ${id}`);
    this.name = 'ArchiveNotFoundError';
  }
}

export const archiveErrors = {
  notFound: (id: string) => new ArchiveNotFoundError(id),
};
