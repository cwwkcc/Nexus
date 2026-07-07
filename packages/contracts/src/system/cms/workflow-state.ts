// packages/contracts/src/system/cms/workflow-state.ts
//
// The draft/review/publish workflow state enum and the set of legal transitions between states.

import { z } from 'zod';

export const WORKFLOW_STATE_VALUES = ['draft', 'in-review', 'published', 'archived'] as const;

export const WorkflowStateEnum = z.enum(WORKFLOW_STATE_VALUES);

export type WorkflowStateEnumData = z.infer<typeof WorkflowStateEnum>;

export const WorkflowTransitionSchema = z.object({
  from: WorkflowStateEnum,
  to: WorkflowStateEnum,
  triggeredBy: z.string(),
});

export type WorkflowTransitionData = z.infer<typeof WorkflowTransitionSchema>;
