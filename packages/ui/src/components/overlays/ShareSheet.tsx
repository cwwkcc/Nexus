'use client';

import { useState } from 'react';
import { createPortal } from 'react-dom';

import { Button } from '../atoms/Button';

export interface ShareSheetProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  url: string;
  text?: string;
}

export function ShareSheet({ isOpen, onClose, title, url }: ShareSheetProps) {
  const [copied, setCopied] = useState(false);

  const shareViaWhatsApp = () => {
    window.open(
      `https://wa.me/?text=${encodeURIComponent(`${title}\n${url}`)}`,
      '_blank',
    );
  };

  const shareViaFacebook = () => {
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      '_blank',
    );
  };

  const copyLink = async () => {
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!isOpen) return null;

  return createPortal(
    <>
      <div
        className="fixed inset-0 bg-overlay-heavy z-[450]"
        onClick={onClose}
      />
      <div className="fixed bottom-0 left-0 right-0 bg-surface-elevated rounded-t-xl shadow-elevation-3 z-[500] animate-slide-up">
        <div className="p-6">
          <h3 className="font-display text-h3 mb-4">Share this</h3>
          <div className="flex gap-4 justify-around mb-6">
            <button
              onClick={shareViaWhatsApp}
              className="flex flex-col items-center gap-2 text-green-base hover:text-gold-base transition-colors"
            >
              <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12.032 2.001c-5.523 0-10 4.477-10 10 0 1.822.491 3.53 1.34 5.002L2 22l5.109-1.332c1.422.801 3.06 1.267 4.816 1.267 5.523 0 10-4.477 10-10s-4.477-10-10-10z" />
              </svg>
              <span className="font-body text-caption">WhatsApp</span>
            </button>
            <button
              onClick={shareViaFacebook}
              className="flex flex-col items-center gap-2 text-blue-700 hover:text-gold-base transition-colors"
            >
              <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.989C18.343 21.128 22 16.991 22 12z" />
              </svg>
              <span className="font-body text-caption">Facebook</span>
            </button>
            <button
              onClick={copyLink}
              className="flex flex-col items-center gap-2 text-gold-base hover:text-gold-hover transition-colors"
            >
              <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
              </svg>
              <span className="font-body text-caption">
                {copied ? 'Copied!' : 'Copy Link'}
              </span>
            </button>
          </div>
          <Button onClick={onClose} fullWidth variant="secondary">
            Cancel
          </Button>
        </div>
      </div>
      <style>{`
        @keyframes slide-up {
          from { transform: translateY(100%); }
          to { transform: translateY(0); }
        }
        .animate-slide-up {
          animation: slide-up 0.3s ease-out;
        }
      `}</style>
    </>,
    document.body,
  );
}
