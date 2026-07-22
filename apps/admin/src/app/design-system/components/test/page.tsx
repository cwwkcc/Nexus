// @ts-nocheck
//web/src/app/[locale]/components/test/page.tsx
'use client';
import { StatsStrip } from '@nexus/ui';

export default function Test() {
  const sampleStats = [{ id: 'test-1', target: 100, label: 'Test Metric', suffix: '+' }];
  return <StatsStrip stats={sampleStats} />;
}
