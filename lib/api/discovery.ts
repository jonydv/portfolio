import 'server-only';
import { routing } from '@/lib/i18n/routing';
import { getContentMeta, getProjectSlugs } from '@/lib/content/repository';

const API_NAME = 'Jonatan David Villalba portfolio content API';

const COLLECTION_ENDPOINTS = [
  'profile',
  'projects',
  'experience',
  'credentials',
  'skills',
  'services',
  'goals',
  'social',
  'resume',
] as const;

export function buildDiscoveryDocument() {
  const { version, generatedAt } = getContentMeta();

  return {
    name: API_NAME,
    version,
    generatedAt,
    locales: routing.locales,
    defaultLocale: routing.defaultLocale,
    endpoints: [
      ...COLLECTION_ENDPOINTS.map((collection) => `/api/{locale}/${collection}`),
      '/api/{locale}/projects/{slug}',
    ],
    projectSlugs: getProjectSlugs(),
  };
}
