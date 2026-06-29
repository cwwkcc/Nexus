// packages/contracts/src/core/common/date.ts
//
// Date and time utility contracts.
//
// Should contain:
//   DateStringSchema    — z.string().date() (YYYY-MM-DD)
//   DateTimeSchema      — z.string().datetime() (ISO 8601)
//   DateRangeSchema     — start (DateString), end (DateString)
//   AcademicYearSchema  — year ('2024/2025'), startDate, endDate
//   TermSchema          — name ('Term 1'|'Term 2'|'Term 3'), start, end, academicYear
//
// Notes:
//   Always store dates as ISO strings, not JS Date objects.
//   Zod, Prisma, and JSON serialisation all handle strings consistently.
//   The Sri Lankan school year runs January–November with three terms.



// TODO: implement

export type Date = unknown;
