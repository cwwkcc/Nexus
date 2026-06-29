// packages/contracts/src/core/common/rich-text.ts
//
// Rich text content contract for Tiptap-authored HTML.
//
// Should contain:
//   RichTextSchema  — z.object({ content: z.string() })
//                     content is sanitised HTML produced by the Tiptap editor
//   RichTextData    — z.infer<typeof RichTextSchema>
//
// Notes:
//   Content is stored as sanitised HTML in ContentEntry.data.
//   Rendered in the web app via the RichTextRenderer component in @nexus/ui.
//   Sanitisation happens server-side on write — validate on ingest, not on read.
//   If you switch to Tiptap JSON format later, update this schema and
//   RichTextRenderer together.



// TODO: implement

export type CoreRichText2 = unknown;
