'use client';

// apps/admin/src/features/editor/RichTextEditorClient.tsx
//
// Tiptap-based rich text editor (F-150). The real implementation behind
// RichTextEditor.tsx's dynamic import (F-096) — Tiptap touches the DOM
// directly and must never run during SSR.
//
// Extension choices are deliberately narrower than Tiptap's defaults,
// scoped exactly to what RichTextRenderer.tsx (@nexus/ui) knows how to
// render: paragraph, heading (levels 2–4 only — h1 is the article's own
// title field, not part of the body), bold/italic/link marks, bullet/
// ordered lists, blockquote, image, hard break. StarterKit bundles more
// than that (strike, underline, code, codeBlock, horizontalRule) — those
// are explicitly disabled below so an editor can't produce a node the
// renderer silently drops (RichTextRenderer's `default: return null` for
// unrecognized types).

import { cn, Icon } from '@nexus/ui';
import { Image } from '@tiptap/extension-image';
import { Link } from '@tiptap/extension-link';
import { EditorContent, useEditor, type Editor, type JSONContent } from '@tiptap/react';
import { StarterKit } from '@tiptap/starter-kit';
import { useEffect } from 'react';

import { useMediaPickerPlugin } from './MediaPickerPlugin.js';

export interface RichTextEditorProps {
  /** Tiptap document (`{ type: 'doc', content: [...] }`), or null/undefined for an empty editor. */
  value: JSONContent | null | undefined;
  onChange: (value: JSONContent) => void;
  placeholder?: string;
  /** Disables editing (e.g. while a save is in flight) without unmounting the editor. */
  disabled?: boolean;
}

const emptyDoc: JSONContent = { type: 'doc', content: [{ type: 'paragraph' }] };

function ToolbarButton({ active, disabled, label, icon, onClick }: { active?: boolean; disabled?: boolean; label: string; icon: Parameters<typeof Icon>[0]['name']; onClick: () => void }) {
  return (
    <button type="button" aria-label={label} aria-pressed={active} disabled={disabled} onClick={onClick} className={cn('inline-flex items-center justify-center rounded-sm border border-transparent p-space-2 transition-colors', 'text-text-muted hover:bg-surface-hover hover:text-text-primary disabled:opacity-50 disabled:pointer-events-none', active && 'bg-green-base text-text-inverse hover:bg-green-base hover:text-text-inverse')}>
      <Icon name={icon} size="sm" />
    </button>
  );
}

function Toolbar({ editor }: { editor: Editor }) {
  const mediaPicker = useMediaPickerPlugin(editor);

  const promptForLink = () => {
    const previousUrl = editor.getAttributes('link').href as string | undefined;

    const url = window.prompt('Link URL (leave blank to remove):', previousUrl ?? 'https://');
    if (url === null) return;
    if (url.trim() === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();
      return;
    }
    editor.chain().focus().extendMarkRange('link').setLink({ href: url.trim() }).run();
  };

  return (
    <div className="flex flex-wrap items-center gap-space-1 border-b border-border-default bg-surface-default p-space-2">
      <ToolbarButton label="Bold" icon="bold" active={editor.isActive('bold')} onClick={() => editor.chain().focus().toggleBold().run()} />
      <ToolbarButton label="Italic" icon="italic" active={editor.isActive('italic')} onClick={() => editor.chain().focus().toggleItalic().run()} />
      <span className="mx-space-1 h-icon-md w-px bg-border-default" aria-hidden="true" />
      <ToolbarButton label="Heading 2" icon="heading-2" active={editor.isActive('heading', { level: 2 })} onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} />
      <ToolbarButton label="Heading 3" icon="heading-3" active={editor.isActive('heading', { level: 3 })} onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} />
      <ToolbarButton label="Heading 4" icon="heading-4" active={editor.isActive('heading', { level: 4 })} onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()} />
      <span className="mx-space-1 h-icon-md w-px bg-border-default" aria-hidden="true" />
      <ToolbarButton label="Bullet list" icon="list" active={editor.isActive('bulletList')} onClick={() => editor.chain().focus().toggleBulletList().run()} />
      <ToolbarButton label="Numbered list" icon="list-ordered" active={editor.isActive('orderedList')} onClick={() => editor.chain().focus().toggleOrderedList().run()} />
      <ToolbarButton label="Quote" icon="quote" active={editor.isActive('blockquote')} onClick={() => editor.chain().focus().toggleBlockquote().run()} />
      <span className="mx-space-1 h-icon-md w-px bg-border-default" aria-hidden="true" />
      <ToolbarButton label="Link" icon="link" active={editor.isActive('link')} onClick={promptForLink} />
      <ToolbarButton label="Image" icon="image" onClick={mediaPicker.open} />
      <span className="mx-space-1 h-icon-md w-px bg-border-default" aria-hidden="true" />
      <ToolbarButton label="Undo" icon="undo" disabled={!editor.can().undo()} onClick={() => editor.chain().focus().undo().run()} />
      <ToolbarButton label="Redo" icon="redo" disabled={!editor.can().redo()} onClick={() => editor.chain().focus().redo().run()} />
      {mediaPicker.render()}
    </div>
  );
}

export function RichTextEditorClient({ value, onChange, placeholder, disabled }: RichTextEditorProps) {
  const editor = useEditor({
    immediatelyRender: false,
    editable: !disabled,
    extensions: [
      StarterKit.configure({
        heading: { levels: [2, 3, 4] },
        strike: false,
        underline: false,
        code: false,
        codeBlock: false,
        horizontalRule: false,
        link: { openOnClick: false, autolink: true },
      }),
      Link.configure({ openOnClick: false, autolink: true }),
      Image.configure({ inline: false }),
    ],
    content: value && value.type === 'doc' ? value : emptyDoc,
    onUpdate: ({ editor: updated }) => {
      onChange(updated.getJSON());
    },
    editorProps: {
      attributes: {
        class: 'prose-editor min-h-[16rem] max-w-none px-space-4 py-space-3 font-body text-body text-text-primary focus:outline-none',
        'data-placeholder': placeholder ?? 'Write the article…',
      },
    },
  });

  // Keep the editor in sync if `value` changes from outside (e.g. loading a
  // different article into an already-mounted editor instance).
  useEffect(() => {
    if (!editor) return;
    const incoming = value && value.type === 'doc' ? value : emptyDoc;
    const current = editor.getJSON();
    if (JSON.stringify(current) !== JSON.stringify(incoming)) {
      editor.commands.setContent(incoming, { emitUpdate: false });
    }
    // Only re-sync when the article identity changes upstream, not on every
    // keystroke — `editor` itself is stable across renders.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  useEffect(() => {
    editor?.setEditable(!disabled);
  }, [editor, disabled]);

  if (!editor) {
    return <div className="min-h-[20rem] animate-pulse rounded-md border border-border-default bg-surface-hover" aria-hidden="true" />;
  }

  return (
    <div className={cn('overflow-hidden rounded-md border border-border-default bg-surface-elevated', disabled && 'opacity-70')}>
      <Toolbar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
}
