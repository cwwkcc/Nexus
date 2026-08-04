'use client';

// apps/admin/src/features/editor/MediaPickerPlugin.tsx
//
// Wires MediaLibraryPicker into RichTextEditorClient's "Image" toolbar
// button, replacing the window.prompt()-based stopgap
// (RichTextEditorClient.tsx's promptForImage) now that a real Media
// Library exists. Not a Tiptap ProseMirror plugin in the technical sense —
// no new node/mark/schema rule, just a picker whose selection calls the
// existing `@tiptap/extension-image` command (`editor.chain().setImage()`)
// that promptForImage already used. "Plugin" here means "the thing that
// plugs the Media Library into the editor", matching the stub's own
// original naming/intent rather than Tiptap's Extension API.

import type { Editor } from '@tiptap/react';
import { useState } from 'react';

import { MediaLibraryPicker } from '../media/MediaLibraryPicker.js';

export interface UseMediaPickerPluginResult {
  isOpen: boolean;
  open: () => void;
  render: () => React.ReactNode;
}

/**
 * Owns the picker's open/closed state and the "insert into editor" glue.
 * `Toolbar`'s Image button just calls `open()`; the picker itself is
 * rendered wherever `render()` is placed in the tree (it's portaled to
 * `document.body` regardless, same as Modal/MediaLibraryPicker).
 */
export function useMediaPickerPlugin(editor: Editor): UseMediaPickerPluginResult {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (asset: { url: string; altText: string | null; mimeType: string }) => {
    if (!asset.mimeType.startsWith('image/')) {
      // Defense-in-depth: the picker isn't folder-scoped to 'images' when
      // opened from the editor's general "insert image" button unless the
      // caller passes folder="images" (which RichTextEditorClient does) —
      // this only matters if that's ever changed to a general-purpose
      // picker without the folder restriction.
      return;
    }
    editor
      .chain()
      .focus()
      .setImage({ src: asset.url, alt: asset.altText ?? '' })
      .run();
    setIsOpen(false);
  };

  return {
    isOpen,
    open: () => setIsOpen(true),
    render: () => <MediaLibraryPicker open={isOpen} onClose={() => setIsOpen(false)} onSelect={handleSelect} folder="images" title="Insert image" />,
  };
}
