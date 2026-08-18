import type { ReactNode } from 'react';

export function ExternalLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group inline-flex items-baseline gap-1.5 text-ink underline decoration-hairline underline-offset-4 transition-colors hover:decoration-accent hover:text-accent"
    >
      {children}
      <span aria-hidden className="text-ink-faint transition-colors group-hover:text-accent">
        ↗
      </span>
    </a>
  );
}
