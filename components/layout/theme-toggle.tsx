'use client';

import { Icon } from '@/components/icons';
import { THEME_ATTRIBUTE, THEME_COOKIE_NAME, type Theme } from '@/lib/theme/theme-script';

const ONE_YEAR_IN_SECONDS = 31536000;

function readThemeFromDocument(): Theme {
  return document.documentElement.getAttribute(THEME_ATTRIBUTE) === 'dark' ? 'dark' : 'light';
}

function applyTheme(theme: Theme) {
  document.documentElement.setAttribute(THEME_ATTRIBUTE, theme);
  document.documentElement.style.colorScheme = theme;
  document.cookie = `${THEME_COOKIE_NAME}=${theme};path=/;max-age=${ONE_YEAR_IN_SECONDS};samesite=lax`;
}

export function ThemeToggle({ label }: { label: string }) {
  const toggle = () => {
    applyTheme(readThemeFromDocument() === 'dark' ? 'light' : 'dark');
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
