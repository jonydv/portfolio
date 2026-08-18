'use client';

import { useTranslations } from 'next-intl';

export default function LocaleError({ reset }: { error: Error; reset: () => void }) {
  const t = useTranslations('error');

  return (
    <div className="px-[var(--spacing-gutter)] py-[var(--spacing-section)]">
      <div className="mx-auto w-full max-w-[var(--container-page)]">
        <p className="metaline mb-6">500</p>
        <h1 className="text-headline">
          {t('title')}
        </h1>
        <p className="mt-6 max-w-[var(--container-measure)] text-lede text-ink-muted">
          {t('description')}
        </p>
        <button type="button" onClick={reset} className="metaline mt-10 text-accent">
          {t('retry')} ↗
        </button>
      </div>
    </div>
  );
}
