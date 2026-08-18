'use client';

import { useEffect, useState } from 'react';
import { Icon } from '@/components/icons';

const FEEDBACK_DURATION_MS = 2000;

type CopyEmailProps = {
  email: string;
  copyLabel: string;
  copiedLabel: string;
};

export function CopyEmail({ email, copyLabel, copiedLabel }: CopyEmailProps) {
  const [hasCopied, setHasCopied] = useState(false);

  useEffect(() => {
    if (!hasCopied) return;

    const timer = setTimeout(() => setHasCopied(false), FEEDBACK_DURATION_MS);
    return () => clearTimeout(timer);
  }, [hasCopied]);

  const copy = async () => {
    await navigator.clipboard.writeText(email);
    setHasCopied(true);
  };

  return (
    <button
      type="button"
      onClick={copy}
      aria-label={copyLabel}
      className="metaline inline-flex items-center gap-2 text-ink-muted transition-colors hover:text-accent"
    >
      <Icon name={hasCopied ? 'check' : 'copy'} className="size-4" />
      <span aria-live="polite">{hasCopied ? copiedLabel : copyLabel}</span>
    </button>
  );
}
