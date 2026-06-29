// packages/contracts/src/features/results/display.ts
//
// Results page display contracts — editorial layer over raw results data.
//
// Should contain:
//   GradeBadgeSchema  — grade (OLGrade | ALGrade), count?
//   ResultsYearSchema — year, olResult?: OLResultData, alResult?: ALResultData
//   ResultsPageSchema — eyebrow?, heading?, years: ResultsYear[], disclaimer?
//   ResultsPageData   — z.infer type
//
// Notes:
//   The admin composes a ResultsPage from available OLResult and ALResult records.
//   GradeBadge is rendered by the ResultsGradeBadge component in @nexus/ui.

import { z } from 'zod';

// TODO: implement
