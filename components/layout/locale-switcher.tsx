'use client';

import { useParams } from 'next/navigation';
import { useTransition } from 'react';
import { usePathname, useRouter } from '@/lib/i18n/navigation';
import { LOCALES, type Locale } from '@/lib/i18n/routing';
import { cn } from '@/lib/utils/cn';

export function LocaleSwitcher() {
  const pathname = usePathname();
  const params = useParams();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const activeLocale = params.locale as Locale;

  const switchTo = (locale: Locale) => {
    startTransition(() => {
      router.replace(pathname, { locale });
    });
  };

  return (
    <div className="metaline flex items-center gap-1" aria-busy={isPending}>
      {LOCALES.map((locale, index) => (
        <span key={locale} className="flex items-center gap-1">
          {index > 0 ? <span className="text-ink-faint">/</span> : null}
          <button
            type="button"
            onClick={() => switchTo(locale)}
            aria-current={locale === activeLocale ? 'true' : undefined}
            className={cn(
              'uppercase transition-colors',
              locale === activeLocale
                ? 'text-accent'
                : 'text-ink-muted hover:text-ink',
            )}
          >
            {locale}
          </button>
        </span>
      ))}
    </div>
  );
}
