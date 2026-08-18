import type { MetadataRoute } from 'next';
import { LOCALES } from '@/lib/i18n/routing';
import { getContentMeta, getProjectSlugs } from '@/lib/content/repository';
import { canonicalUrl } from '@/lib/seo/site';

const HOME_PATH = '';
const WORK_INDEX_PATH = '/work';

const STATIC_PATHS = [HOME_PATH, WORK_INDEX_PATH, '/about', '/cv', '/contact'] as const;

const HOME_PRIORITY = 1;
const WORK_INDEX_PRIORITY = 0.9;
const DEFAULT_PRIORITY = 0.7;

function priorityFor(path: string): number {
  if (path === HOME_PATH) return HOME_PRIORITY;
  if (path === WORK_INDEX_PATH) return WORK_INDEX_PRIORITY;
  return DEFAULT_PRIORITY;
}

function alternatesFor(path: string) {
  return {
    languages: Object.fromEntries(LOCALES.map((locale) => [locale, canonicalUrl(locale, path)])),
  };
}

export default function sitemap(): MetadataRoute.Sitemap {
  const { generatedAt } = getContentMeta();
  const paths = [...STATIC_PATHS, ...getProjectSlugs().map((slug) => `/work/${slug}`)];

  return LOCALES.flatMap((locale) =>
    paths.map((path) => ({
      url: canonicalUrl(locale, path),
      lastModified: generatedAt,
      changeFrequency: path === HOME_PATH ? ('monthly' as const) : ('yearly' as const),
      priority: priorityFor(path),
      alternates: alternatesFor(path),
    })),
  );
}
