// packages/contracts/src/blocks/downloads.ts
//
// Downloads block — list of downloadable documents.
//
// Should contain:
//   DownloadItemSchema — id, title, description?, href (R2 key or URL),
//                        fileType? ('PDF'|'DOCX'|'XLSX'|'PPT'|'ZIP'),
//                        fileSize? (human-readable e.g. '2.4 MB')
//   DownloadsSchema    — eyebrow?, heading?, items: DownloadItem[]
//   DownloadsData      — z.infer type
//   DownloadItem       — z.infer type
//
// Used on: Admissions (prospectus, forms), Results (past papers), Administration

import { z } from 'zod';

// TODO: implement (migrate from packages/validation/src/content-types/index.ts)
