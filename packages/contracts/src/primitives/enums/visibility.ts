// packages/contracts/src/primitives/enums/visibility.ts
//
// Visibility enum for content access control.

import { z } from 'zod';

export const VISIBILITY_VALUES = ['public', 'internal', 'admin-only'] as const;

export const VisibilityEnum = z.enum(VISIBILITY_VALUES);

export type VisibilityEnumData = z.infer<typeof VisibilityEnum>;
