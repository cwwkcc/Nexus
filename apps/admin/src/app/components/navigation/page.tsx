// apps/web/src/app/[locale]/components/navigation/page.tsx
'use client';

import { Tabs } from '@nexus/ui';

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

export default function NavigationPage() {
  return (
    <div className="min-h-screen bg-surface-base py-12">
      <div className="content-width">
        <h1 className="font-display text-h1 mb-4">Navigation</h1>
        <p className="font-body text-body text-text-muted mb-12">
          Tab components for switching between content panels.
        </p>

        <DemoSection title="Tabs (Line variant)">
          <Tabs
            variant="line"
            tabs={[
              {
                id: 'tab1',
                label: 'Tab 1',
                content: <div className="p-4">Content of Tab 1</div>,
              },
              {
                id: 'tab2',
                label: 'Tab 2',
                content: <div className="p-4">Content of Tab 2</div>,
              },
            ]}
          />
        </DemoSection>

        <DemoSection title="Tabs (Pills variant)">
          <Tabs
            variant="pills"
            tabs={[
              {
                id: 'a',
                label: 'Option A',
                content: <div>Option A details</div>,
              },
              {
                id: 'b',
                label: 'Option B',
                content: <div>Option B details</div>,
              },
            ]}
          />
        </DemoSection>
      </div>
    </div>
  );
}
