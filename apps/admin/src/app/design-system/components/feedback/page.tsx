// apps/web/src/app/[locale]/components/feedback/page.tsx
'use client';

import { Alert, Modal, Toast } from '@nexus/ui';
import { useState } from 'react';

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

export default function FeedbackPage() {
  const [toastVisible, setToastVisible] = useState(false);
  const [toastType, setToastType] = useState<'success' | 'error' | 'warning'>(
    'success',
  );
  const [infoModalOpen, setInfoModalOpen] = useState(false);
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);

  const showToast = (type: 'success' | 'error' | 'warning') => {
    setToastType(type);
    setToastVisible(true);
  };

  return (
    <div className="min-h-screen bg-surface-base py-space-12">
      <div className="content-width">
        <h1 className="font-display text-h1 mb-space-4">Feedback Components</h1>
        <p className="font-body text-body text-text-muted mb-space-12">
          Alert, Modal, and Toast – user feedback and overlay components.
        </p>

        {/* Alert */}
        <DemoSection title="Alert – All Variants">
          <Alert variant="info" title="Information">
            This is an informational alert. Use for general messages.
          </Alert>
          <Alert variant="success">Success! Your action was completed.</Alert>
          <Alert variant="warning">Warning: Please review your input.</Alert>
          <Alert variant="error">Error: Something went wrong.</Alert>
        </DemoSection>

        {/* Modal */}
        <DemoSection title="Modal – Information & Confirmation">
          <button
            onClick={() => setInfoModalOpen(true)}
            className="px-space-4 py-space-2 bg-green-base text-text-inverse rounded-sm"
          >
            Open Information Modal
          </button>
          <button
            onClick={() => setConfirmModalOpen(true)}
            className="px-space-4 py-space-2 bg-semantic-error-base text-text-inverse rounded-sm"
          >
            Open Confirmation Modal
          </button>

          <Modal
            open={infoModalOpen}
            onClose={() => setInfoModalOpen(false)}
            variant="information"
            title="Information"
            description="This is an information modal. It can contain any content. Click outside or press Escape to close."
          />

          <Modal
            open={confirmModalOpen}
            onClose={() => setConfirmModalOpen(false)}
            variant="confirmation"
            title="Delete Item"
            description="Are you sure you want to delete this item? This action cannot be undone."
            destructive
            confirmLabel="Delete"
            onConfirm={() => alert('Item deleted')}
          />
        </DemoSection>

        {/* Toast */}
        <DemoSection title="Toast – All Variants">
          <div className="flex gap-space-4">
            <button
              onClick={() => showToast('success')}
              className="px-space-4 py-space-2 bg-semantic-success-base text-text-inverse rounded-sm"
            >
              Success Toast
            </button>
            <button
              onClick={() => showToast('error')}
              className="px-space-4 py-space-2 bg-semantic-error-base text-text-inverse rounded-sm"
            >
              Error Toast
            </button>
            <button
              onClick={() => showToast('warning')}
              className="px-space-4 py-space-2 bg-semantic-warning-base text-text-inverse rounded-sm"
            >
              Warning Toast
            </button>
          </div>

          <Toast
            variant={toastType}
            message={
              toastType === 'success'
                ? 'Operation completed successfully!'
                : toastType === 'error'
                  ? 'Failed to save. Please try again.'
                  : 'Your session will expire soon.'
            }
            visible={toastVisible}
            onDismiss={() => setToastVisible(false)}
            duration={4000}
          />
        </DemoSection>
      </div>
    </div>
  );
}
