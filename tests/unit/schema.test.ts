import { describe, expect, it } from 'vitest';
import { getSource } from '@/lib/content/source';
import { projectSchema } from '@/lib/content/schema/project.schema';
import { experienceSchema } from '@/lib/content/schema/experience.schema';
import { text, kebabSlug, httpsUrl, isoMonth } from '@/lib/content/schema/primitives';

const VALID_PROJECT_BASE = {
  slug: 'demo',
  name: 'Demo',
  order: 0,
  startYear: 2024,
  country: 'AR',
  role: { es: 'Autor', en: 'Author' },
  summary: {
    es: 'Una descripcion suficientemente larga para superar el minimo exigido por el schema.',
    en: 'A description long enough to clear the minimum length required by the schema.',
  },
  body: { es: ['Un parrafo con suficiente longitud.'], en: ['A paragraph with enough length.'] },
  stack: ['angular'],
  tags: ['angular'],
  url: null,
  media: {
    kind: 'generated',
    gradientFrom: '#a78bfa',
    gradientTo: '#64ffda',
    monogram: 'D',
  },
};

describe('carga de contenido', () => {
  it('todos los archivos de content satisfacen su schema', () => {
    expect(() => getSource()).not.toThrow();
  });

  it('memoiza la fuente entre llamadas', () => {
    expect(getSource()).toBe(getSource());
  });
});

describe('primitivas', () => {
  it('rechaza mojibake', () => {
    expect(text().safeParse('MigraciÃ³n completa').success).toBe(false);
    expect(text().safeParse('Migración completa').success).toBe(true);
  });

  it('exige kebab-case en los slugs', () => {
    expect(kebabSlug.safeParse('spartacus-demo').success).toBe(true);
    expect(kebabSlug.safeParse('Spartacus Demo').success).toBe(false);
    expect(kebabSlug.safeParse('spartacus_demo').success).toBe(false);
  });

  it('exige https en las urls', () => {
    expect(httpsUrl.safeParse('https://example.com').success).toBe(true);
    expect(httpsUrl.safeParse('http://example.com').success).toBe(false);
  });

  it('exige formato YYYY-MM en isoMonth', () => {
    expect(isoMonth.safeParse('2021-03').success).toBe(true);
    expect(isoMonth.safeParse('2021-13').success).toBe(false);
    expect(isoMonth.safeParse('2021-3').success).toBe(false);
  });
});

describe('projectSchema', () => {
  it('aplica los valores por defecto', () => {
    const parsed = projectSchema.parse(VALID_PROJECT_BASE);
    expect(parsed.featured).toBe(false);
    expect(parsed.displayNameOverride).toBeNull();
    expect(parsed.endYear).toBeNull();
    expect(parsed.repoUrl).toBeNull();
  });

  it('rechaza endYear anterior a startYear', () => {
    const result = projectSchema.safeParse({ ...VALID_PROJECT_BASE, endYear: 2020 });
    expect(result.success).toBe(false);
  });

  it('discrimina la variante de media', () => {
    const generated = projectSchema.parse(VALID_PROJECT_BASE);
    expect(generated.media.kind).toBe('generated');

    const withScreenshots = projectSchema.safeParse({
      ...VALID_PROJECT_BASE,
      media: { kind: 'screenshots', logo: '/a.svg', desktopImage: '/b.webp', mobileImage: '/c.webp' },
    });
    expect(withScreenshots.success).toBe(false);
  });

  it('rechaza un summary mas largo que el maximo de OG', () => {
    const result = projectSchema.safeParse({
      ...VALID_PROJECT_BASE,
      summary: { es: 'a'.repeat(201), en: 'b'.repeat(201) },
    });
    expect(result.success).toBe(false);
  });
});

describe('experienceSchema', () => {
  it('rechaza end anterior a start', () => {
    const result = experienceSchema.safeParse({
      id: 'demo',
      company: 'Demo',
      role: { es: 'Dev', en: 'Dev' },
      start: '2023-05',
      end: '2023-01',
      order: 0,
      highlights: { es: ['Un highlight con longitud suficiente.'], en: ['A highlight long enough.'] },
    });
    expect(result.success).toBe(false);
  });
});
