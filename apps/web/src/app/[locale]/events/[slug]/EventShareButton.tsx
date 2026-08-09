'use client';

// apps/web/src/app/[locale]/events/[slug]/EventShareButton.tsx
//
// Identical reasoning to news/[slug]/ArticleShareButton.tsx — ShareSheet
// is a controlled overlay and needs client state, so it can't be
// triggered directly from the event detail page's server component.

import { Button, ShareSheet } from '@nexus/ui';
import { useState } from 'react';

interface EventShareButtonProps {
  title: string;
  url: string;
  label: string;
}

export function EventShareButton({ title, url, label }: EventShareButtonProps) {
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
