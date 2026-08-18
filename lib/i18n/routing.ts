import { defineRouting } from 'next-intl/routing';

export const LOCALES = ['es', 'en'] as const;
export const DEFAULT_LOCALE = 'es';

export type Locale = (typeof LOCALES)[number];

export const routing = defineRouting({
  locales: LOCALES,
  defaultLocale: DEFAULT_LOCALE,
  localePrefix: 'always',
});
