// apps/web/src/app/[locale]/components/utilities/page.tsx
'use client';

import { CountdownTimer } from '@nexus/ui';
import { DemoSection } from '../_components/DemoSection';

export default function UtilitiesPage() {
  const now = Date.now();

  const targetDates = [
    {
      label: '10 Seconds',
      targetDate: new Date(now + 10 * 1000),
    },
    {
      label: '5 Minutes',
      targetDate: new Date(now + 5 * 60 * 1000),
    },
    {
      label: '2 Hours',
      targetDate: new Date(now + 2 * 60 * 60 * 1000),
    },
    {
      label: '2 Days',
      targetDate: new Date(now + 2 * 24 * 60 * 60 * 1000),
    },
  ];

  return (
    <div className="min-h-screen bg-surface-base py-space-12">
      <div className="content-width">
        <h1 className="font-display text-h1 mb-space-4">Utilities</h1>

        <DemoSection title="CountdownTimer">
          <div className="space-y-space-8">
            {targetDates.map((TargetDate) => (
              <div key={TargetDate.label}>
                <h3 className="mb-space-3">{TargetDate.label}</h3>
                <CountdownTimer targetDate={TargetDate.targetDate} />
              </div>
            ))}
          </div>
        </DemoSection>
      </div>
    </div>
  );
}
