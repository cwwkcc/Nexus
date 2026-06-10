// apps/web/src/app/[locale]/components/utilities/page.tsx
'use client';

import { CountdownTimer, RichTextRenderer } from '@nexus/ui';

function DemoSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-12">
      <h2 className="font-display text-h2 mb-4 border-b border-border-light pb-2">
        {title}
      </h2>
      <div className="flex flex-wrap gap-6 items-start">{children}</div>
    </div>
  );
}

export default function UtilitiesPage() {
  const futureDate = new Date();
  futureDate.setDate(futureDate.getDate() + 7);

  return (
    <div className="min-h-screen bg-surface-base py-12">
      <div className="content-width">
        <h1 className="font-display text-h1 mb-4">Utilities</h1>
        <p className="font-body text-body text-text-muted mb-12">
          Helper components – countdown timers and rich text renderers.
        </p>

        <DemoSection title="CountdownTimer">
          <CountdownTimer targetDate={futureDate} />
        </DemoSection>

        <DemoSection title="RichTextRenderer">
          <RichTextRenderer
            value={[
              {
                _type: 'block',
                style: 'normal',
                children: [
                  {
                    _type: 'span',
                    text: 'This is rendered from Portable Text.',
                  },
                ],
              },
            ]}
          />
        </DemoSection>
      </div>
    </div>
  );
}
