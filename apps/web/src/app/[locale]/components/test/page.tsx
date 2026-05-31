//web/src/app/[locale]/components/test/page.tsx
'use client';
import { StatsStrip } from '@nexus/ui';
import { useTranslations } from 'next-intl';

export default function Test() {
  const t = useTranslations('about.crest');

  return (
    <>
      <StatsStrip />
    </>
  );
}
