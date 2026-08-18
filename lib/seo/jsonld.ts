import type { Credential, Experience, Profile, Project } from '@/lib/content/repository';
import type { Locale } from '@/lib/i18n/routing';
import { canonicalUrl, SITE_NAME, SITE_URL } from './site';

const PERSON_ID = `${SITE_URL}/#person`;
const WEBSITE_ID = `${SITE_URL}/#website`;

type JsonLdNode = Record<string, unknown>;

export function personJsonLd(
  profile: Profile,
  experience: Experience[],
  credentials: Credential[],
  socialUrls: string[],
  locale: Locale,
): JsonLdNode {
  const currentRole = experience[0];

  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': PERSON_ID,
    name: profile.name,
    jobTitle: profile.headline,
    description: profile.summary,
    email: `mailto:${profile.email}`,
    url: canonicalUrl(locale, ''),
    image: `${SITE_URL}${profile.image.src}`,
    address: { '@type': 'PostalAddress', addressLocality: profile.location },
    sameAs: socialUrls.filter((url) => url.startsWith('https://')),
    knowsLanguage: credentials
      .filter((credential) => credential.kind === 'language')
      .map((credential) => credential.title),
    ...(currentRole
      ? { worksFor: { '@type': 'Organization', name: currentRole.company } }
      : {}),
    alumniOf: credentials
      .filter((credential) => credential.kind === 'degree')
      .map((credential) => ({ '@type': 'CollegeOrUniversity', name: credential.issuer })),
  };
}

export function websiteJsonLd(locale: Locale): JsonLdNode {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    name: SITE_NAME,
    url: canonicalUrl(locale, ''),
    inLanguage: locale,
    publisher: { '@id': PERSON_ID },
  };
}

export function breadcrumbJsonLd(
  items: { name: string; path: string }[],
  locale: Locale,
): JsonLdNode {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: canonicalUrl(locale, item.path),
    })),
  };
}

export function creativeWorkJsonLd(project: Project, locale: Locale): JsonLdNode {
  return {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: project.title,
    description: project.summary,
    url: canonicalUrl(locale, project.path),
    dateCreated: String(project.startYear),
    keywords: project.stack.join(', '),
    inLanguage: locale,
    creator: { '@id': PERSON_ID },
    ...(project.media.kind === 'screenshots'
      ? { image: `${SITE_URL}${project.media.desktop.src}` }
      : {}),
  };
}

export function projectListJsonLd(projects: Project[], locale: Locale): JsonLdNode {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    numberOfItems: projects.length,
    itemListElement: projects.map((project, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      url: canonicalUrl(locale, project.path),
      name: project.title,
    })),
  };
}
