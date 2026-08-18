import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import { getSource } from '@/lib/content/source';
import { LOCALES } from '@/lib/i18n/routing';
import { ICON_NAMES } from '@/lib/content/schema/primitives';

const PUBLIC_ROOT = join(process.cwd(), 'public');
const EXPECTED_PROJECT_COUNT = 11;
const EXPECTED_GENERATED_MEDIA_COUNT = 1;
const OFFLINE_PROJECT_SLUGS = ['spartacus-demo', 'k-one', 'tupemesa'];

const source = getSource();
const skillIds = new Set(source.skills.map((skill) => skill.id));
const iconNames = new Set<string>(ICON_NAMES);

function assetExistsOnDisk(assetPath: string): boolean {
  return existsSync(join(PUBLIC_ROOT, assetPath.replace(/^\//, '')));
}

function collectAssetPaths(): string[] {
  const paths: string[] = [source.profile.image];

  for (const project of source.projects) {
    if (project.media.kind === 'screenshots') {
      if (project.media.logo !== null) paths.push(project.media.logo);
      paths.push(project.media.desktopImage, project.media.mobileImage);
    }
  }

  for (const service of source.services) paths.push(service.image);
  for (const skill of source.skills) if (skill.icon) paths.push(skill.icon);

  return paths;
}

describe('integridad de proyectos', () => {
  it('se publica la cantidad esperada de proyectos', () => {
    expect(source.projects).toHaveLength(EXPECTED_PROJECT_COUNT);
  });

  it('los proyectos con el sitio fuera de linea no se publican', () => {
    const publishedSlugs = source.projects.map((project) => project.slug);

    for (const slug of OFFLINE_PROJECT_SLUGS) {
      expect(publishedSlugs, `${slug} deberia estar excluido`).not.toContain(slug);
    }
  });

  it('los slugs son unicos', () => {
    const slugs = source.projects.map((project) => project.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it('los order son unicos', () => {
    const orders = source.projects.map((project) => project.order);
    expect(new Set(orders).size).toBe(orders.length);
  });

  it('todo stack referencia una skill existente', () => {
    for (const project of source.projects) {
      for (const skillId of project.stack) {
        expect(skillIds, `${project.slug} referencia "${skillId}"`).toContain(skillId);
      }
    }
  });

  it('solo los proyectos sin captura usan media generada', () => {
    const generated = source.projects.filter((project) => project.media.kind === 'generated');
    expect(generated).toHaveLength(EXPECTED_GENERATED_MEDIA_COUNT);
    expect(generated.map((project) => project.slug)).toEqual(['medusa-storefront']);
  });

  it('los cuerpos tienen la misma cantidad de parrafos en ambos idiomas', () => {
    for (const project of source.projects) {
      expect(project.body.es.length, project.slug).toBe(project.body.en.length);
    }
  });
});

describe('integridad de assets', () => {
  it('todo asset referenciado existe en disco', () => {
    for (const assetPath of collectAssetPaths()) {
      expect(assetExistsOnDisk(assetPath), assetPath).toBe(true);
    }
  });

  it('todo asset referenciado esta en el manifiesto de medios', () => {
    for (const assetPath of collectAssetPaths()) {
      expect(source.media[assetPath], assetPath).toBeDefined();
    }
  });

  it('el pdf del cv existe para cada idioma', () => {
    for (const locale of LOCALES) {
      expect(assetExistsOnDisk(source.profile.cv[locale].href)).toBe(true);
    }
  });
});

describe('integridad de iconos', () => {
  it('todo icono de contenido existe en el registro', () => {
    for (const credential of source.credentials) expect(iconNames).toContain(credential.icon);
    for (const goal of source.goals) expect(iconNames).toContain(goal.icon);
    for (const link of source.social) expect(iconNames).toContain(link.icon);
  });
});

describe('integridad de idiomas', () => {
  it('ningun campo localizado esta vacio en ninguno de los dos idiomas', () => {
    for (const experience of source.experience) {
      for (const locale of LOCALES) {
        expect(experience.role[locale].trim().length, experience.id).toBeGreaterThan(0);
        expect(experience.highlights[locale].length, experience.id).toBeGreaterThan(0);
      }
    }

    for (const project of source.projects) {
      for (const locale of LOCALES) {
        expect(project.summary[locale].trim().length, project.slug).toBeGreaterThan(0);
      }
    }
  });

  it('los enlaces de credenciales son https', () => {
    for (const credential of source.credentials) {
      if (credential.credentialUrl) {
        expect(credential.credentialUrl.startsWith('https://'), credential.id).toBe(true);
      }
    }
  });
});
