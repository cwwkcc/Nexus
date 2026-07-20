'use client';

import { useEffect, useState } from 'react';

import { cn } from '../../utilities/cn';

export interface OfflineBannerProps {
  message?: string;
}

export function OfflineBanner({ message = 'You are currently offline. Some features may be unavailable.' }: OfflineBannerProps) {
  const [isOffline, setIsOffline] = useState(false);

  useEffect(() => {
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    setIsOffline(!navigator.onLine);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  if (!isOffline) return null;

  return (
    <div role="alert" className={cn('fixed top-0 left-0 right-0 z-raised', 'bg-surface-inverse text-text-inverse text-center', 'py-space-3 px-space-4')} style={{ top: 'var(--nav-height, 0px)' }}>
      <p className="font-body text-body-sm">{message}</p>
    </div>
  );
}
