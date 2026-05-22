'use client';

import { useState, useEffect } from 'react';
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
    <div className="fixed bottom-0 left-0 right-0 z-[500] bg-surface-inverse border-t border-gold-base/20 shadow-lg">
      <div className="max-w-content mx-auto px-6 py-5 md:py-4 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="font-body text-sm text-text-inverse leading-relaxed">
          This website uses cookies to improve your experience. By continuing to
          use this site, you consent to our use of cookies.
        </p>
        <div className="flex gap-3 shrink-0">
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
