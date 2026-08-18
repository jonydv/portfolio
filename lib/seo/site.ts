import type { Locale } from '@/lib/i18n/routing';

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.jonatandvillalbaweb.com.ar';

export const SITE_NAME = 'Jonatan David Villalba';

export const OG_LOCALES: Record<Locale, string> = {
  es: 'es_AR',
  en: 'en_US',
};

export const OG_IMAGE_SIZE = { width: 1200, height: 630 } as const;

export const OG_COVER = {
  url: '/og-cover.png',
  type: 'image/png',
  ...OG_IMAGE_SIZE,
} as const;

export function canonicalUrl(locale: Locale, path: string): string {
  return `${SITE_URL}/${locale}${path}`;
}
