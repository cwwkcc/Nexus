// packages/api/src/modules/alumni/errors.ts
//
// Error classes for the alumni module (Task 7.18, F-154/F-180).
// Mirrors the errors.ts pattern from modules/news/errors.ts.

export class AlumniNotFoundError extends Error {
  constructor(id: string) {
    super(`Alumni profile not found: ${id}`);
    this.name = 'AlumniNotFoundError';
  }
}

export class AlumniSlugCollisionError extends Error {
  constructor() {
    super('An alumni profile with these details already exists');
    this.name = 'AlumniSlugCollisionError';
  }
}

export const alumniErrors = {
  notFound: (id: string) => new AlumniNotFoundError(id),
  slugCollision: () => new AlumniSlugCollisionError(),
};
