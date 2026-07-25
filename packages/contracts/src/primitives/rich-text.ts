// packages/contracts/src/primitives/rich-text.ts

// Rich text content contract for Tiptap-authored content.
//
// Notes:
//   Content is stored as a Tiptap/ProseMirror JSON document in ContentEntry.data,
//   matching what apps/admin's RichTextEditor (F-150) will save via editor.getJSON().
//   Rendered in the web app via the RichTextRenderer component in @nexus/ui.
//   Keep this schema's node/mark shape in sync with the TiptapNode type in
//   RichTextRenderer.tsx — if the editor's extensions change (new node types,
//   renamed attrs), update both together.

import { z } from 'zod';

const TiptapMarkSchema = z.object({
  type: z.string(),
  attrs: z.record(z.string(), z.unknown()).optional(),
});

export type TiptapNode = {
  type: string;
  attrs?: Record<string, unknown>;
  content?: TiptapNode[];
  marks?: z.infer<typeof TiptapMarkSchema>[];
  text?: string;
};

const TiptapNodeSchema: z.ZodType<TiptapNode> = z.lazy(() =>
  z.object({
    type: z.string(),
    attrs: z.record(z.string(), z.unknown()).optional(),
    content: z.array(TiptapNodeSchema).optional(),
    marks: z.array(TiptapMarkSchema).optional(),
    text: z.string().optional(),
  }),
);

export const RichTextSchema = z.object({
  content: TiptapNodeSchema,
});

export type RichTextData = z.infer<typeof RichTextSchema>;
