'use client';

import { Text, Button, Input, ToolTip } from '@nexus/ui';

import { DemoSection } from '../_components/DemoSection';

export default function AccessibilityPage() {
  return (
    <div className="min-h-screen bg-surface-base py-space-12">
      <div className="content-width">
        <h1 className="font-display text-h1 mb-space-4">Accessibility Components</h1>
        <p className="font-body text-body text-text-muted mb-space-12">Components and patterns that enhance accessibility – focus management, screen reader support, and keyboard navigation.</p>

        {/* Focus Ring Demo */}
        <DemoSection title="Focus Ring (Keyboard Only)">
          <p className="font-body text-body-sm text-text-muted mb-space-4">
            Use <kbd className="px-space-2 py-space-1 bg-surface-default border border-border-light rounded-sm font-mono text-caption">Tab</kbd> to navigate and see the gold focus ring.
          </p>
          <div className="flex flex-wrap gap-space-6">
            <Button variant="primary">Focusable Button</Button>
            <Button variant="secondary">Another Button</Button>
            <Input label="Focusable Input" placeholder="Type here" />
            <a href="#" className="text-gold-base underline">
              Focusable Link
            </a>
          </div>
          <p className="font-body text-caption text-text-muted mt-space-4">
            Focus rings are built with CSS custom properties: <code>var(--focus-ring-color)</code>, <code>var(--focus-ring-width)</code>, <code>var(--focus-ring-offset)</code>.
          </p>
        </DemoSection>

        {/* Screen Reader Only (sr-only) */}
        <DemoSection title="Screen Reader Only Text">
          <div className="bg-surface-default p-space-6 rounded-md">
            <p className="font-body text-body text-text-primary">
              This text is visible.
              <span className="sr-only">This text is only read by screen readers.</span>
              <Button variant="primary" aria-label="More information about accessibility">
                <span aria-hidden="true">ℹ️</span>
                <span className="sr-only">Learn about accessibility</span>
              </Button>
            </p>
          </div>
        </DemoSection>

        {/* Keyboard Navigation Demo */}
        <DemoSection title="Keyboard Navigation Patterns">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-space-8">
            <div className="bg-surface-elevated border border-border-light rounded-md p-space-5">
              <h3 className="font-display text-h3 mb-space-3">Modal Keyboard Trap</h3>
              <p className="font-body text-body-sm text-text-muted mb-space-4">
                Open a modal and press <kbd>Tab</kbd> – focus stays inside the modal. Press <kbd>Escape</kbd> to close.
              </p>
              <Button
                variant="secondary"
                onClick={() => {
                  // Simple modal demo – in practice use the Modal component
                  alert('Modal keyboard trap demo: open the real Modal component');
                }}
              >
                Open Modal (Demo)
              </Button>
            </div>
            <div className="bg-surface-elevated border border-border-light rounded-md p-space-5">
              <h3 className="font-display text-h3 mb-space-3">ARIA Live Regions</h3>
              <p className="font-body text-body-sm text-text-muted mb-space-4">Dynamic updates announced to screen readers automatically.</p>
              <div aria-live="polite" className="bg-surface-deep p-space-3 rounded-sm">
                <Text variant="body-sm" color="muted">
                  This region announces updates when content changes.
                </Text>
              </div>
            </div>
          </div>
        </DemoSection>

        {/* Touch Targets */}
        <DemoSection title="Touch Targets (≥44×44px)">
          <div className="flex flex-wrap gap-space-6 items-center">
            <Button size="md" variant="primary">
              Large Button (44px)
            </Button>
            <Button size="icon-md" aria-label="Icon button (44px)">
              ✓
            </Button>
            <div className="p-space-3 bg-surface-default rounded-md">
              <span className="inline-block p-space-2">Non‑clickable</span>
            </div>
          </div>
          <p className="font-body text-caption text-text-muted mt-space-4">All interactive elements meet WCAG 2.2 minimum touch target size.</p>
        </DemoSection>

        {/* Skip to Content (simulated) */}
        <DemoSection title="Skip to Content">
          <div className="bg-surface-elevated border border-border-light rounded-md p-space-5">
            <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-space-4 focus:left-space-4 focus:z-modal focus:bg-gold-base focus:text-green-base focus:p-space-3 focus:rounded-md">
              Skip to main content
            </a>
            <p className="font-body text-body-sm text-text-muted">
              Press <kbd>Tab</kbd> immediately after page load – a "Skip to main content" link appears.
            </p>
          </div>
        </DemoSection>

        {/* Reduced Motion Awareness */}
        <DemoSection title="Reduced Motion Awareness">
          <div className="bg-surface-elevated border border-border-light rounded-md p-space-5">
            <p className="font-body text-body-sm text-text-muted">
              All components respect <code>prefers-reduced-motion</code>. Animations are disabled or simplified when requested.
            </p>
            <ToolTip content="Even tooltips respect reduced motion (no delay, instant appearance)">
              <Button variant="secondary">Hover me</Button>
            </ToolTip>
          </div>
        </DemoSection>
      </div>
    </div>
  );
}
