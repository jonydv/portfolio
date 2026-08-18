import 'server-only';
import { routing } from '@/lib/i18n/routing';
import { getProjectSlugs } from '@/lib/content/repository';

export function localeStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export function localeAndSlugStaticParams() {
  return routing.locales.flatMap((locale) =>
    getProjectSlugs().map((slug) => ({ locale, slug })),
  );
}
