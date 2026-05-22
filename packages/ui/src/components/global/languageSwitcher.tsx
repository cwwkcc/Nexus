'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { clsx } from 'clsx';

export interface LanguageSwitcherProps {
  locale?: string;
  variant?: 'header' | 'mobile';
  onDark?: boolean;
}

const languages = [
  { code: 'en', label: 'EN', name: 'English' },
  { code: 'si', label: 'සිං', name: 'Sinhala', isSinhala: true },
  { code: 'ta', label: 'தமி', name: 'Tamil', isTamil: true },
];

export function LanguageSwitcher({
  locale = 'en',
  variant = 'header',
  onDark = false,
}: LanguageSwitcherProps) {
  const pathname = usePathname();

  // Remove the current locale from pathname to build new URLs
  const pathWithoutLocale = pathname.replace(/^\/(en|si|ta)/, '') || '/';

  return (
    <div className="flex items-center gap-1.5">
      {languages.map((lang, idx) => {
        const isActive = locale === lang.code;
        const href = `/${lang.code}${pathWithoutLocale}`;

        return (
          <span key={lang.code} className="flex items-center gap-1.5">
            {idx > 0 && (
              <span
                className={clsx(
                  'text-xs',
                  onDark ? 'text-text-inverse/25' : 'text-border-default',
                )}
              >
                /
              </span>
            )}
            <Link
              href={href}
              hrefLang={lang.code}
              aria-label={`Switch to ${lang.name}`}
              className={clsx(
                'transition-colors duration-150',
                lang.isSinhala && 'font-sinhala',
                lang.isTamil && 'font-body',
                'text-xs uppercase tracking-wide',
                isActive
                  ? clsx(
                      'text-gold-base border-b border-gold-base',
                      variant === 'mobile' ? 'pb-0.5' : 'pb-0.5',
                    )
                  : clsx(
                      onDark
                        ? 'text-text-inverse/55 hover:text-gold-base'
                        : 'text-text-muted hover:text-gold-base',
                      variant === 'mobile' ? 'pb-0.5' : 'pb-0.5',
                    ),
              )}
            >
              {lang.label}
            </Link>
          </span>
        );
      })}
    </div>
  );
}
