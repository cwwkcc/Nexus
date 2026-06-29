// packages/contracts/src/blocks/results-display.ts
//
// Results display block — editorial summary of exam results for the Results page.
// Distinct from features/results/ (the detailed data model).
//
// Should contain:
//   ResultsSummarySchema  — examType ('OL'|'AL'), year (string),
//                           heading?, highlights: string[], downloadHref?
//   ResultsDisplaySchema  — eyebrow?, heading?, summaries: ResultsSummary[]
//   ResultsDisplayData    — z.infer type
//
// Notes:
//   This is the curated editorial layer, not raw per-student data.
//   Full result schemas are in features/results/.



// TODO: implement

export type ResultsDisplay = unknown;
