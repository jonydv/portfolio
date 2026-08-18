import type { ReactNode } from 'react';
import { cn } from '@/lib/utils/cn';

export function Section({
  children,
  className,
  id,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section id={id} className={cn('px-[var(--spacing-gutter)] py-[var(--spacing-section)]', className)}>
      <div className="mx-auto w-full max-w-[var(--container-page)]">{children}</div>
    </section>
  );
}

export function SectionHeader({
  index,
  title,
  description,
}: {
  index: string;
  title: string;
  description?: string;
}) {
  return (
    <header className="reveal mb-12 border-t border-hairline pt-6">
      <p className="metaline">
        {index} — {title}
      </p>
      {description ? (
        <p className="mt-4 max-w-[var(--container-measure)] text-lede  text-ink-muted">
          {description}
        </p>
      ) : null}
    </header>
  );
}
