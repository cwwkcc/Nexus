// packages/contracts/src/blocks/process-steps.ts

import { z } from 'zod';

export const ProcessStepSchema = z.object({
  id: z.string(),
  step: z.number(),
  title: z.string(),
  description: z.string(),
  icon: z.string().optional(),
});

export const ProcessStepsSchema = z.object({
  eyebrow: z.string().optional(),
  heading: z.string().optional(),
  steps: z.array(ProcessStepSchema),
});

export type ProcessStepsData = z.infer<typeof ProcessStepsSchema>;
