import type { Metadata } from 'next';
import { LOCALES, type Locale } from '@/lib/i18n/routing';
import { canonicalUrl, OG_LOCALES, SITE_NAME } from './site';

type BuildMetadataInput = {
  locale: Locale;
  path: string;
  title: string;
  description: string;
};

function alternateLanguages(path: string): Record<string, string> {
  const languages: Record<string, string> = {};

  for (const locale of LOCALES) {
    languages[locale] = canonicalUrl(locale, path);
  }

  languages['x-default'] = canonicalUrl('es', path);
  return languages;
}

export function buildMetadata({ locale, path, title, description }: BuildMetadataInput): Metadata {
  const canonical = canonicalUrl(locale, path);
  const alternateLocale = LOCALES.filter((candidate) => candidate !== locale).map(
    (candidate) => OG_LOCALES[candidate],
  );

  return {
    title,
    description,
    alternates: {
      canonical,
      languages: alternateLanguages(path),
    },
    openGraph: {
      type: 'website',
      url: canonical,
      siteName: SITE_NAME,
      title,
      description,
      locale: OG_LOCALES[locale],
      alternateLocale,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
}
