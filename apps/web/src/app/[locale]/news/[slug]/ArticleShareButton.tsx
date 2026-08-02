'use client';

// apps/web/src/app/[locale]/news/[slug]/ArticleShareButton.tsx
//
// ShareSheet (@nexus/ui) is a controlled overlay (isOpen/onClose) — needs
// client state, so it can't be triggered directly from the article page's
// server component.

import { Button } from '@nexus/ui';
import { ShareSheet } from '@nexus/ui';
import { useState } from 'react';

interface ArticleShareButtonProps {
  title: string;
  url: string;
  label: string;
}

export function ArticleShareButton({ title, url, label }: ArticleShareButtonProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button variant="outline" size="sm" onClick={() => setOpen(true)}>
        {label}
      </Button>
      <ShareSheet isOpen={open} onClose={() => setOpen(false)} title={title} url={url} labels={{ title: label }} />
    </>
  );
}
