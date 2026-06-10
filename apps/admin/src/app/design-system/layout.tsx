import { DesignSystemNav } from './components/_components/DesignSystemNav';

export default function DesignSystemLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-surface-base">
      <div className="max-w-content mx-auto px-space-6 py-space-8">
        <h1 className="font-display text-h1 mb-space-2">Design System</h1>
        <p className="font-body text-body text-text-muted mb-space-8">
          Visual foundations and component library – sourced directly from
          design tokens.
        </p>

        <DesignSystemNav />

        {children}
      </div>
    </div>
  );
}
