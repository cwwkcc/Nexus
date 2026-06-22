'use client';

import { useState, useEffect } from 'react';

import { cn } from '../../utilities/cn';
import { Button } from '../atoms/Button';

const STORAGE_KEY = 'kcc-cookie-consent';

export function CookieConsentBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const hasConsent = localStorage.getItem(STORAGE_KEY);
    if (!hasConsent) {
      setVisible(true);
    }
  }, []);

  const accept = () => {
    localStorage.setItem(STORAGE_KEY, 'accepted');
    setVisible(false);
  };

  const decline = () => {
    localStorage.setItem(STORAGE_KEY, 'declined');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      className={cn(
        'fixed bottom-0 left-0 right-0 z-toast',
        'bg-surface-inverse border-t border-gold-base/20',
        'shadow-elevation-3',
      )}
    >
      <div
        className={cn(
          'max-w-content mx-auto',
          'px-space-6 py-space-5 md:py-space-4',
          'flex flex-col md:flex-row items-center justify-between gap-space-4',
        )}
      >
        <p
          className={cn(
            'font-body text-body-sm text-text-inverse leading-relaxed',
            'text-center md:text-left',
          )}
        >
          This website uses cookies to improve your experience. By continuing to
          use this site, you consent to our use of cookies.
        </p>
        <div className="flex gap-space-3 shrink-0">
          <Button onClick={accept} variant="primary" size="sm">
            Accept
          </Button>
          <Button onClick={decline} variant="ghost" size="sm">
            Decline
          </Button>
        </div>
      </div>
    </div>
  );
}
