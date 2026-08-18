import { DEFAULT_THEME, THEME_ATTRIBUTE, THEME_COOKIE_NAME, type Theme } from './theme-script';

const ONE_YEAR_IN_SECONDS = 31536000;
const THEME_COOKIE_PATTERN = new RegExp(`(?:^|; )${THEME_COOKIE_NAME}=(light|dark)`);

export function readStoredTheme(): Theme {
  return (document.cookie.match(THEME_COOKIE_PATTERN)?.[1] as Theme) ?? DEFAULT_THEME;
}

export function readThemeFromDocument(): Theme {
  return document.documentElement.getAttribute(THEME_ATTRIBUTE) === 'light' ? 'light' : DEFAULT_THEME;
}

export function paintTheme(theme: Theme) {
  document.documentElement.setAttribute(THEME_ATTRIBUTE, theme);
  document.documentElement.style.colorScheme = theme;
}

export function persistTheme(theme: Theme) {
  paintTheme(theme);
  document.cookie = `${THEME_COOKIE_NAME}=${theme};path=/;max-age=${ONE_YEAR_IN_SECONDS};samesite=lax`;
}

export function restoreThemeFromCookie() {
  const stored = readStoredTheme();
  if (document.documentElement.getAttribute(THEME_ATTRIBUTE) !== stored) {
    paintTheme(stored);
  }
}
