//web/src/app/[locale]/components/test/page.tsx
'use client';
import { useTranslations } from 'next-intl';
import { CrestDiagram, Footer, type CrestSymbol } from '@nexus/ui';

export default function Test() {
  const t = useTranslations('about.crest');

  const symbols = t.raw('symbols')
    ? Object.values(t.raw('symbols') as Record<string, CrestSymbol>)
    : [];
  return (
    <>
      // 1. Ambient Active Grid (Constantly Flowing background + Hover
      Highlight)
      <CrestDiagram symbols={symbols} variant="ambient" />
      // 2. Tactical Hold (Flows on Hover, Locks Solid on Pointer Down/Press)
      <CrestDiagram symbols={symbols} variant="hold" />
      // 3. Persistent Click (Flows on Hover, Toggles Lock state on Click)
      <CrestDiagram symbols={symbols} variant="click" />
    </>
  );
}
export function Test2() {
  return <Footer />;
}
