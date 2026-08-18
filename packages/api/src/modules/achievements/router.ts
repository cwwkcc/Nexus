// packages/api/src/modules/achievements/router.ts
//
// Achievements router (Task 7.19, F-156/F-181). Mirrors the router.ts pattern
// from modules/alumni/router.ts.
//
// Public procedures:
//   - list: public achievement database
// Admin procedures:
//   - adminList: all achievements (filterable by category/year)
//   - adminGetById: single achievement for edit
//   - create: create new achievement
//   - update: edit existing achievement
//   - delete: hard delete an achievement

import { z } from 'zod';

import { createAchievement, deleteAchievement, getById, listAchievements, updateAchievement } from './service.js';
import { AchievementCreateInput, AchievementGetByIdInput, AchievementListInput, AchievementListOutput, AchievementOutput, AchievementUpdateInput } from './validators.js';
import { adminMutation, adminOnlyMutation, adminProcedure, publicProcedure, router } from '../../trpc.js';

export const achievementsRouter = router({
  list: publicProcedure
    .input(AchievementListInput)
    .output(AchievementListOutput)
    .query(({ ctx, input }) => listAchievements(ctx.db, input)),

  adminList: adminProcedure
    .input(AchievementListInput)
    .output(AchievementListOutput)
    .query(({ ctx, input }) => listAchievements(ctx.db, input)),

  adminGetById: adminProcedure
    .input(AchievementGetByIdInput)
    .output(AchievementOutput)
    .query(({ ctx, input }) => getById(ctx.db, input)),

  create: adminMutation
    .input(AchievementCreateInput)
    .output(AchievementOutput)
    .mutation(({ ctx, input }) => createAchievement(ctx.db, ctx.config, input)),

  update: adminMutation
    .input(AchievementUpdateInput)
    .output(AchievementOutput)
    .mutation(({ ctx, input }) => updateAchievement(ctx.db, ctx.config, input)),

  delete: adminOnlyMutation
    .input(AchievementGetByIdInput)
    .output(z.object({ success: z.boolean() }))
    .mutation(({ ctx, input }) => deleteAchievement(ctx.db, ctx.config, input)),
});

export type AchievementsRouter = typeof achievementsRouter;
