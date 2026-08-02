'use client';

// Tiptap-based rich text editor (F-150).
// Dynamically imported (F-096) — see RichTextEditorClient.tsx for the real
// implementation; this file exists only to code-split it out of the main
// bundle and guarantee `ssr: false`, since Tiptap touches the DOM directly.
// Used in News (F-150) and Page Content (F-164) modules.

import dynamic from 'next/dynamic';

import type { RichTextEditorProps } from './RichTextEditorClient';

export const RichTextEditor = dynamic<RichTextEditorProps>(() => import('./RichTextEditorClient').then((mod) => mod.RichTextEditorClient), {
  ssr: false,
  loading: () => <div className="min-h-[20rem] animate-pulse rounded-md border border-border-default bg-surface-hover" aria-hidden="true" />,
});

export type { RichTextEditorProps } from './RichTextEditorClient';
