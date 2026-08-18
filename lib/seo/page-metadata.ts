import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { isLocale } from '@/lib/i18n/locale';
import { DEFAULT_LOCALE, type Locale } from '@/lib/i18n/routing';
import { buildMetadata } from './metadata';

type MetaNamespace = 'home' | 'work' | 'about' | 'cv' | 'contact';

const PATH_BY_NAMESPACE: Record<MetaNamespace, string> = {
  home: '',
  work: '/work',
  about: '/about',
  cv: '/cv',
  contact: '/contact',
};

export async function buildPageMetadata(
  rawLocale: string,
  namespace: MetaNamespace,
): Promise<Metadata> {
  const locale: Locale = isLocale(rawLocale) ? rawLocale : DEFAULT_LOCALE;
  const t = await getTranslations({ locale, namespace: 'meta' });

  return buildMetadata({
    locale,
    path: PATH_BY_NAMESPACE[namespace],
    title: t(`${namespace}.title`),
    description: t(`${namespace}.description`),
  });
}
