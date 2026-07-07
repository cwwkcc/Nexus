// packages/contracts/src/primitives/enums/priority.ts
//
// Priority enum for task and content prioritization.

import { z } from 'zod';

export const PRIORITY_VALUES = ['low', 'medium', 'high', 'urgent'] as const;

export const PriorityEnum = z.enum(PRIORITY_VALUES);

export type PriorityEnumData = z.infer<typeof PriorityEnum>;
