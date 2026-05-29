//web/src/app/[locale]/components/test/page.tsx
'use client';
import { useTranslations } from 'next-intl';
import { CrestDiagram, type CrestSymbol } from '@nexus/ui';

export default function Test() {
  const t = useTranslations('about.crest');

  const symbols = t.raw('symbols')
    ? Object.values(t.raw('symbols') as Record<string, CrestSymbol>)
    : [];
  return <CrestDiagram symbols={symbols} />;
}
