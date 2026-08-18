'use client';

import { Icon } from '@/components/icons';
import { persistTheme, readThemeFromDocument } from '@/lib/theme/apply-theme';

export function ThemeToggle({ label }: { label: string }) {
  const toggle = () => {
    persistTheme(readThemeFromDocument() === 'dark' ? 'light' : 'dark');
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={label}
      className="grid size-9 place-items-center rounded-full border border-hairline text-ink-muted transition-colors hover:border-accent hover:text-accent"
    >
      <Icon name="moon" className="size-4 dark:hidden" />
      <Icon name="sun" className="hidden size-4 dark:block" />
    </button>
  );
}
