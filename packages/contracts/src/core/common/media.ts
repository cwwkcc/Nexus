// packages/contracts/src/core/common/media.ts
//
// Shared contracts for non-image media assets stored in R2.
//
// Should contain:
//   VideoSchema     — src (R2 key), poster? (R2 key), title?, duration? (seconds)
//   AudioSchema     — src (R2 key), title, duration? (seconds), transcriptUrl?
//   DocumentSchema  — src (R2 key or URL), title,
//                     fileType ('PDF'|'DOCX'|'XLSX'|'PPT'|'ZIP'),
//                     fileSize? (human-readable: '2.4 MB'), description?
//
// Notes:
//   AudioSchema is used by blocks/anthem.ts (school anthem player).
//   DocumentSchema is used by blocks/downloads.ts.
//   All src values are R2 keys — same convention as ImageSchema.



// TODO: implement

export type CoreMedia2 = unknown;
