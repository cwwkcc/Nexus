// apps/admin/src/app/design-system/glass/page.tsx
'use client';

function DemoSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-space-16">
      <h2 className="font-display text-h2 mb-space-6 pb-space-2 border-b border-border-light">
        {title}
      </h2>
      <div className="flex flex-wrap gap-space-8 items-start">{children}</div>
    </div>
  );
}

export default function GlassPage() {
  return (
    <div className="min-h-screen bg-surface-base py-space-12">
      <div className="content-width">
        <h1 className="font-display text-h1 mb-space-4">Glass Tokens</h1>
        <p className="font-body text-body text-text-muted mb-space-12">
          Transparent, non‑blur surfaces that create the “forest mist”
          aesthetic.
        </p>

        <DemoSection title="Glass Surfaces">
          <div className="w-size-48 h-size-32 bg-glass-surface-light rounded-md flex items-center justify-center border border-glass-border shadow-glass-shadow">
            <span className="font-body text-caption">glass-surface-light</span>
          </div>
          <div className="w-size-48 h-size-32 bg-glass-surface-medium rounded-md flex items-center justify-center border border-glass-border shadow-glass-shadow">
            <span className="font-body text-caption">glass-surface-medium</span>
          </div>
        </DemoSection>

        <DemoSection title="Glass Border & Shadow">
          <div className="w-size-48 h-size-32 bg-surface-elevated rounded-md flex items-center justify-center border border-glass-border shadow-glass-shadow">
            <span className="font-body text-caption">
              border-glass-border + shadow-glass-shadow
            </span>
          </div>
        </DemoSection>
      </div>
    </div>
  );
}
