import { describe, expect, it } from 'vitest';
import {
  getAdjacentProjects,
  getFeaturedProjects,
  getProfile,
  getProjectBySlug,
  getProjects,
  getSkillGroups,
  getSkills,
} from '@/lib/content/repository';
import { getSource } from '@/lib/content/source';
import { LOCALES } from '@/lib/i18n/routing';

describe('resolucion de idioma', () => {
  it('aplana los campos localizados al idioma pedido', () => {
    const spanish = getProjectBySlug('es', 'marchand');
    const english = getProjectBySlug('en', 'marchand');

    expect(typeof spanish?.summary).toBe('string');
    expect(spanish?.summary).not.toBe(english?.summary);
  });

  it('usa el override de nombre por idioma cuando existe y el nombre base cuando no', () => {
    for (const locale of LOCALES) {
      for (const project of getProjects(locale)) {
        const source = getSource().projects.find((entry) => entry.slug === project.slug);
        const expected = source?.displayNameOverride?.[locale] ?? source?.name;

        expect(project.title, `${project.slug} en ${locale}`).toBe(expected);
      }
    }
  });

  it('conserva los acentos', () => {
    expect(getProjectBySlug('es', 'marchand')?.summary).toContain('Migración');
  });
});

describe('busqueda de proyectos', () => {
  it('devuelve null en vez de lanzar para un slug desconocido', () => {
    expect(getProjectBySlug('es', 'no-existe')).toBeNull();
  });

  it('ordena de forma estable por order', () => {
    const orders = getProjects('es').map((project) => project.order);
    expect(orders).toEqual([...orders].sort((left, right) => left - right));
  });

  it('separa path del href absoluto', () => {
    const project = getProjectBySlug('es', 'marchand');
    expect(project?.path).toBe('/work/marchand');
    expect(project?.href).toBe('/es/work/marchand');
  });

  it('solo devuelve destacados en getFeaturedProjects', () => {
    const featured = getFeaturedProjects('es');
    expect(featured.length).toBeGreaterThan(0);
    expect(featured.every((project) => project.featured)).toBe(true);
  });
});

describe('navegacion entre proyectos', () => {
  it('envuelve en ambos extremos', () => {
    const projects = getProjects('es');
    const first = projects[0];
    const last = projects[projects.length - 1];

    expect(getAdjacentProjects('es', first!.slug).previous?.slug).toBe(last!.slug);
    expect(getAdjacentProjects('es', last!.slug).next?.slug).toBe(first!.slug);
  });

  it('devuelve nulos para un slug desconocido', () => {
    expect(getAdjacentProjects('es', 'no-existe')).toEqual({ previous: null, next: null });
  });
});

describe('agrupacion de skills', () => {
  it('no pierde ninguna skill al agrupar', () => {
    const groups = getSkillGroups();
    const grouped = groups.flatMap((group) => group.skills.map((skill) => skill.id));

    expect(grouped).toHaveLength(getSkills().length);
    expect(new Set(grouped).size).toBe(grouped.length);
    expect([...grouped].sort()).toEqual(getSkills().map((skill) => skill.id).sort());
  });

  it('asigna cada skill a la categoria declarada en el contenido', () => {
    for (const group of getSkillGroups()) {
      for (const skill of group.skills) {
        expect(skill.category).toBe(group.category);
      }
    }
  });
});

describe('documento de curriculum', () => {
  it('cada idioma sirve su propio PDF', () => {
    for (const locale of LOCALES) {
      const { resume } = getProfile(locale);

      expect(resume.language, locale).toBe(locale);
      expect(resume.href, locale).toMatch(/\.pdf$/);
    }
  });

  it('isTranslated refleja si el documento coincide con el idioma de la pagina', () => {
    for (const locale of LOCALES) {
      const { resume } = getProfile(locale);
      expect(resume.isTranslated, locale).toBe(resume.language === locale);
    }
  });
});
