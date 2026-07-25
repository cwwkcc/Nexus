// apps/web/src/app/[locale]/components/notifications/page.tsx
'use client';

import { Alert, AnnouncementBanner, Toast } from '@nexus/ui';
import { useState } from 'react';

function DemoSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-space-16">
      <h2 className="font-display text-h2 mb-space-6 pb-space-2 border-b border-border-light">{title}</h2>
      <div className="flex flex-wrap gap-space-8 items-start">{children}</div>
    </div>
  );
}

export default function FeedbackPage() {
  const [toastVisible, setToastVisible] = useState(false);
  const [toastType, setToastType] = useState<'success' | 'error' | 'warning'>('success');

  const showToast = (type: 'success' | 'error' | 'warning') => {
    setToastType(type);
    setToastVisible(true);
  };

  return (
    <div className="min-h-screen bg-surface-base py-space-12">
      <div className="content-width">
        <h1 className="font-display text-h1 mb-space-4">Feedback Components</h1>
        <p className="font-body text-body text-text-muted mb-space-12">Alert, Modal,AnnouncementBanner, and Toast – user feedback and overlay components.</p>

        {/* Alert */}
        <DemoSection title="Alert – All Variants">
          <Alert variant="info" title="Information">
            This is an informational alert. Use for general messages.
          </Alert>
          <Alert variant="success">Success! Your action was completed.</Alert>
          <Alert variant="warning">Warning: Please review your input.</Alert>
          <Alert variant="error">Error: Something went wrong.</Alert>
        </DemoSection>

        {/* Toast */}
        <DemoSection title="Toast – All Variants">
          <div className="flex gap-space-4">
            <button onClick={() => showToast('success')} className="px-space-4 py-space-2 bg-semantic-success-base text-text-inverse rounded-sm">
              Success Toast
            </button>
            <button onClick={() => showToast('error')} className="px-space-4 py-space-2 bg-semantic-error-base text-text-inverse rounded-sm">
              Error Toast
            </button>
            <button onClick={() => showToast('warning')} className="px-space-4 py-space-2 bg-semantic-warning-base text-text-inverse rounded-sm">
              Warning Toast
            </button>
          </div>

          <Toast variant={toastType} message={toastType === 'success' ? 'Operation completed successfully!' : toastType === 'error' ? 'Failed to save. Please try again.' : 'Your session will expire soon.'} visible={toastVisible} onDismiss={() => setToastVisible(false)} duration={4000} />
        </DemoSection>

        <DemoSection title="AnnouncementBanner">
          <p className="font-body text-body-sm text-text-muted mb-space-3">Dismissible top‑of‑page announcement strip for urgent notices.</p>
          <div className="space-y-space-4 w-full">
            <AnnouncementBanner variant="info">School reopens on 5 May.</AnnouncementBanner>
            <AnnouncementBanner variant="warning" dismissible>
              Admissions closing soon – apply by 30 June.
            </AnnouncementBanner>
            <AnnouncementBanner variant="error">Website maintenance scheduled for Sunday 2 AM – 4 AM.</AnnouncementBanner>
          </div>
        </DemoSection>
      </div>
    </div>
  );
}
