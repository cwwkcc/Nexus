// packages/api/src/modules/achievements/errors.ts
//
// Error classes for the achievements module (Task 7.19, F-156/F-181).
// Mirrors the errors.ts pattern from modules/alumni/errors.ts.

export class AchievementNotFoundError extends Error {
  constructor(id: string) {
    super(`Achievement not found: ${id}`);
    this.name = 'AchievementNotFoundError';
  }
}

export const achievementErrors = {
  notFound: (id: string) => new AchievementNotFoundError(id),
};
