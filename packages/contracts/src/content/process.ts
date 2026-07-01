// packages/contracts/src/content/process.ts
//
// Process/journey contracts.
//
// Should contain:
//   StepSchema      — id, number, title, description
//   StepData        — z.infer type
//   JourneyNodeSchema — id, label, description?, status?, position
//   JourneyNodeData   — z.infer type
//   JourneyEdgeSchema — from, to, label?
//   JourneyEdgeData   — z.infer type

import { z } from 'zod';

export const StepSchema = z.object({
  id: z.string(),
  number: z.number(),
  title: z.string(),
  description: z.string(),
});

export type StepData = z.infer<typeof StepSchema>;

export const JourneyNodeSchema = z.object({
  id: z.string(),
  label: z.string(),
  description: z.string().optional(),
  status: z.string().optional(),
  position: z.object({
    x: z.number(),
    y: z.number(),
  }),
});

export type JourneyNodeData = z.infer<typeof JourneyNodeSchema>;

export const JourneyEdgeSchema = z.object({
  from: z.string(),
  to: z.string(),
  label: z.string().optional(),
});

export type JourneyEdgeData = z.infer<typeof JourneyEdgeSchema>;
