// @ts-nocheck
'use client';

import { Drawer, DropdownMenu, ShareSheet, ToolTip, Button } from '@nexus/ui';
import { useState } from 'react';

import { DemoSection } from '../_components/DemoSection';

export default function OverlaysPage() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);

  const dropdownItems = [
    { id: 'profile', label: 'Profile', href: '/profile' },
    { id: 'settings', label: 'Settings', href: '/settings' },
    { id: 'logout', label: 'Logout', onClick: () => alert('Logout clicked') },
  ];

  return (
    <div className="min-h-screen bg-surface-base py-space-12">
      <div className="content-width">
        <h1 className="font-display text-h1 mb-space-4">Overlays</h1>
        <p className="font-body text-body text-text-muted mb-space-12">Floating UI elements – drawers, dropdowns, share sheets, and tooltips.</p>

        {/* Drawer */}
        <DemoSection title="Drawer">
          <Button onClick={() => setDrawerOpen(true)} variant="primary">
            Open Drawer
          </Button>
          <Drawer isOpen={drawerOpen} onClose={() => setDrawerOpen(false)} position="right" size="md">
            <div className="p-space-6">
              <h3 className="font-display text-h3 mb-space-4">Drawer Content</h3>
              <p className="font-body text-body text-text-muted">This is a slide‑in panel. Click outside or press Escape to close.</p>
              <Button onClick={() => setDrawerOpen(false)} className="mt-space-4">
                Close
              </Button>
            </div>
          </Drawer>
          <div className="mt-space-4">
            <p className="font-body text-caption text-text-muted">
              Persistent sidebar variant (for admin) also available via <code>persistent</code> prop.
            </p>
          </div>
        </DemoSection>

        {/* DropdownMenu */}
        <DemoSection title="DropdownMenu">
          <div className="flex gap-space-8 flex-wrap">
            <DropdownMenu trigger={<Button variant="secondary">Navigation Dropdown</Button>} items={dropdownItems} variant="navigation" />
            <DropdownMenu
              trigger={<Button variant="outline">Filter Dropdown</Button>}
              items={[
                { id: 'recent', label: 'Most Recent' },
                { id: 'oldest', label: 'Oldest' },
              ]}
              variant="filter"
              align="right"
            />
          </div>
        </DemoSection>

        {/* ShareSheet */}
        <DemoSection title="ShareSheet">
          <Button onClick={() => setShareOpen(true)} variant="secondary">
            Open Share Sheet
          </Button>
          <ShareSheet isOpen={shareOpen} onClose={() => setShareOpen(false)} title="C.W.W. Kannangara Central College" url="https://cwwkcc.lk" />
        </DemoSection>

        {/* ToolTip */}
        <DemoSection title="ToolTip">
          <div className="flex gap-space-8 flex-wrap items-center">
            <ToolTip content="Top tooltip" position="top">
              <Button variant="secondary">Top</Button>
            </ToolTip>
            <ToolTip content="Bottom tooltip" position="bottom">
              <Button variant="secondary">Bottom</Button>
            </ToolTip>
            <ToolTip content="Left tooltip" position="left">
              <Button variant="secondary">Left</Button>
            </ToolTip>
            <ToolTip content="Right tooltip" position="right">
              <Button variant="secondary">Right</Button>
            </ToolTip>
            <ToolTip content="Disabled elements can still show tooltip">
              <span className="inline-block cursor-help underline decoration-dotted">Hover me (any element)</span>
            </ToolTip>
          </div>
        </DemoSection>
      </div>
    </div>
  );
}
