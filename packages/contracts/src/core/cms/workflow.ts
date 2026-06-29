// packages/contracts/src/core/cms/workflow.ts
//
// Content approval workflow contracts.
// Supports the draft → review → published lifecycle.
//
// Should contain:
//   ContentStatus       — z.enum(['draft', 'in_review', 'approved', 'published', 'archived'])
//   WorkflowTransition  — { from: ContentStatus, to: ContentStatus, triggeredBy: string }
//   ApprovalRequest     — { contentEntryId: string, requestedBy: string, note?: string }
//   ApprovalDecision    — { approved: boolean, decidedBy: string, comment?: string }
//
// Notes:
//   Not implemented in Phase 1. Scaffold now so ContentEntry can add a
//   status column later without redesigning contracts.
//   The workflow engine lives in packages/api — this file is shapes only.

import { z } from 'zod';

// TODO: implement
