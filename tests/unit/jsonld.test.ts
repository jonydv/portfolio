import { describe, expect, it } from 'vitest';
import {
  breadcrumbJsonLd,
  creativeWorkJsonLd,
  personJsonLd,
  projectListJsonLd,
  websiteJsonLd,
} from '@/lib/seo/jsonld';
import {
  getCredentials,
  getExperience,
  getProfile,
  getProjects,
  getSocialLinks,
} from '@/lib/content/repository';

const locale = 'es';
const projects = getProjects(locale);
const person = personJsonLd(
  getProfile(locale),
  getExperience(locale),
  getCredentials(locale),
  getSocialLinks().map((link) => link.url),
  locale,
);

const nodes = [
  person,
  websiteJsonLd(locale),
  breadcrumbJsonLd([{ name: 'Home', path: '' }], locale),
  creativeWorkJsonLd(projects[0]!, locale),
  projectListJsonLd(projects, locale),
];

describe('constructores de JSON-LD', () => {
  it('todos producen JSON valido con contexto y tipo', () => {
    for (const node of nodes) {
      const serialized = JSON.stringify(node);
      expect(() => JSON.parse(serialized)).not.toThrow();
      expect(node['@context']).toBe('https://schema.org');
      expect(node['@type']).toBeTruthy();
    }
  });

  it('no filtra undefined en la serializacion', () => {
    for (const node of nodes) {
      expect(JSON.stringify(node)).not.toContain('undefined');
    }
  });

  it('el Person solo expone sameAs con https', () => {
    for (const url of person.sameAs as string[]) {
      expect(url.startsWith('https://')).toBe(true);
    }
  });

  it('las referencias cruzadas apuntan al mismo @id de Person', () => {
    const creativeWork = creativeWorkJsonLd(projects[0]!, locale);
    expect((creativeWork.creator as Record<string, string>)['@id']).toBe(person['@id']);
  });
});
