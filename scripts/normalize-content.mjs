import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { join, resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const PROJECT_ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const CONTENT_DIR = join(PROJECT_ROOT, 'content');

const CAROUSEL_SOURCE = 'src/app/shared/components/project/project.component.ts';
const WORKS_SOURCE = 'src/app/pages/works/works.component.ts';
const SKILLS_SOURCE = 'src/app/shared/components/skills/skills.component.ts';
const SERVICES_SOURCE = 'src/app/shared/components/services-section/services-section.component.ts';
const GOALS_SOURCE = 'src/app/pages/curriculum/curriculum.component.ts';
const CONTACT_SOURCE = 'src/app/shared/components/contact/contact.component.ts';

const PARAGRAPH_SEPARATOR = /\n+|\s{4,}/;

const SKILL_IDS_BY_LABEL = {
  TypeScript: 'typescript',
  Angular: 'angular',
  RxJS: 'rxjs',
  NgRx: 'ngrx',
  'SAP Spartacus': 'sap-spartacus',
  'Next.js': 'nextjs',
  React: 'react',
  'Node.js': 'nodejs',
  Express: 'express',
  'TanStack Query': 'tanstack-query',
  NextAuth: 'nextauth',
  'SCSS / Sass': 'sass',
  'Tailwind CSS': 'tailwind-css',
  JavaScript: 'javascript',
  MongoDB: 'mongodb',
  MySQL: 'mysql',
  'Claude AI': 'claude-ai',
  'GitHub Copilot': 'github-copilot',
  'Cursor AI': 'cursor-ai',
  AWS: 'aws',
  Git: 'git',
  Jira: 'jira',
  Karma: 'karma',
  Jasmine: 'jasmine',
};

const SKILL_CATEGORY_BY_ID = {
  angular: 'frameworks',
  nextjs: 'frameworks',
  react: 'frameworks',
  'sap-spartacus': 'ecommerce',
  'tailwind-css': 'languages',
  sass: 'languages',
  ngrx: 'state',
  rxjs: 'state',
  'tanstack-query': 'state',
  typescript: 'languages',
  javascript: 'languages',
  nodejs: 'languages',
  express: 'languages',
  mongodb: 'languages',
  mysql: 'languages',
  nextauth: 'languages',
  aws: 'quality',
  git: 'quality',
  jira: 'quality',
  karma: 'quality',
  jasmine: 'quality',
  'claude-ai': 'ai',
  'github-copilot': 'ai',
  'cursor-ai': 'ai',
};

const ADDITIONAL_SKILLS = [
  { id: 'angular-signals', label: 'Angular Signals', category: 'frameworks' },
  { id: 'standalone-components', label: 'Standalone Components', category: 'frameworks' },
  { id: 'react-native', label: 'React Native', category: 'frameworks' },
  { id: 'microfrontends', label: 'Microfrontends', category: 'frameworks' },
  { id: 'nx', label: 'Nx', category: 'frameworks' },
  { id: 'lerna', label: 'Lerna', category: 'frameworks' },
  { id: 'bff-pattern', label: 'Patrón BFF', category: 'frameworks' },
  { id: 'pwa', label: 'PWA', category: 'frameworks' },
  { id: 'i18n', label: 'i18n', category: 'frameworks' },
  { id: 'ssr-ssg', label: 'SSR / SSG / ISR', category: 'frameworks' },
  { id: 'zustand', label: 'Zustand', category: 'state' },
  { id: 'redux-toolkit', label: 'Redux Toolkit', category: 'state' },
  { id: 'context-api', label: 'Context API', category: 'state' },
  { id: 'signalstore', label: 'SignalStore', category: 'state' },
  { id: 'postgresql', label: 'PostgreSQL', category: 'languages' },
  { id: 'angular-material', label: 'Angular Material', category: 'languages' },
  { id: 'primeng', label: 'PrimeNG', category: 'languages' },
  { id: 'rest-apis', label: 'REST APIs', category: 'languages' },
  { id: 'graphql', label: 'GraphQL', category: 'languages' },
  { id: 'clean-architecture', label: 'Clean Architecture', category: 'languages' },
  { id: 'design-systems', label: 'Design Systems', category: 'languages' },
  { id: 'npm-packages', label: 'Librerías NPM', category: 'languages' },
  { id: 'tdd', label: 'TDD', category: 'quality' },
  { id: 'vitest', label: 'Vitest', category: 'quality' },
  { id: 'jest', label: 'Jest', category: 'quality' },
  { id: 'cypress', label: 'Cypress', category: 'quality' },
  { id: 'core-web-vitals', label: 'Core Web Vitals', category: 'quality' },
  { id: 'wcag', label: 'Accesibilidad WCAG', category: 'quality' },
  { id: 'github-actions', label: 'GitHub Actions', category: 'quality' },
  { id: 'jenkins', label: 'Jenkins', category: 'quality' },
  { id: 'docker', label: 'Docker', category: 'quality' },
  { id: 'gitflow', label: 'GitFlow', category: 'quality' },
  { id: 'scrum', label: 'Scrum / Kanban', category: 'quality' },
  { id: 'capacitor', label: 'Capacitor', category: 'quality' },
  { id: 'ionic', label: 'Ionic', category: 'quality' },
  { id: 'ga4', label: 'Google Analytics 4', category: 'quality' },
  { id: 'sap-commerce-cloud', label: 'SAP Commerce Cloud (CCv2)', category: 'ecommerce' },
  { id: 'smartedit', label: 'SmartEdit', category: 'ecommerce' },
  { id: 'backoffice', label: 'Backoffice', category: 'ecommerce' },
  { id: 'hac', label: 'HAC', category: 'ecommerce' },
  { id: 'headless-commerce', label: 'Commerce Headless', category: 'ecommerce' },
  { id: 'medusajs', label: 'Medusa.js v2', category: 'ecommerce' },
  { id: 'mercado-pago', label: 'Mercado Pago Checkout Pro', category: 'ecommerce' },
  { id: 'claude-code', label: 'Claude Code', category: 'ai' },
];

const SERVICE_SLUGS = [
  'frontend-architecture',
  'enterprise-ecommerce',
  'technical-leadership',
  'performance-seo',
  'fullstack-integration',
  'concept-to-production',
  'security-quality',
  'ai-workflows',
];

const SOCIAL_PLATFORMS = {
  GitHub: { id: 'github', icon: 'github' },
  LinkedIn: { id: 'linkedin', icon: 'linkedin' },
  Gmail: { id: 'email', icon: 'mail' },
};

const GOAL_ICONS = ['layers', 'rocket', 'users', 'sparkles'];

function readJson(absolutePath) {
  return JSON.parse(readFileSync(absolutePath, 'utf8'));
}

function writeJson(fileName, payload) {
  writeFileSync(join(CONTENT_DIR, fileName), `${JSON.stringify(payload, null, 2)}\n`, 'utf8');
  const count = Array.isArray(payload) ? payload.length : Object.keys(payload).length;
  console.log(`content/${fileName}: ${count} entradas`);
}

function toPublicPath(legacyAssetPath) {
  return legacyAssetPath.replace(/^(\.\.\/)+assets/, '');
}

function splitParagraphs(rawText) {
  return rawText
    .split(PARAGRAPH_SEPARATOR)
    .map((paragraph) => paragraph.trim())
    .filter((paragraph) => paragraph.length > 0);
}

function assertEveryLegacyEntryConsumedOnce(mapping, carouselLength, worksLength) {
  const carouselUsage = new Map();
  const worksUsage = new Map();

  for (const entry of mapping.projects) {
    carouselUsage.set(entry.carouselIndex, (carouselUsage.get(entry.carouselIndex) ?? 0) + 1);
    worksUsage.set(entry.worksIndex, (worksUsage.get(entry.worksIndex) ?? 0) + 1);
  }

  const problems = [];

  for (let index = 0; index < carouselLength; index += 1) {
    const uses = carouselUsage.get(index) ?? 0;
    if (uses !== 1) problems.push(`carousel[${index}] consumido ${uses} veces`);
  }

  for (let index = 0; index < worksLength; index += 1) {
    const uses = worksUsage.get(index) ?? 0;
    if (uses !== 1) problems.push(`works[${index}] consumido ${uses} veces`);
  }

  if (problems.length > 0) {
    throw new Error(`Emparejamiento invalido:\n  ${problems.join('\n  ')}`);
  }

  console.log(
    `Emparejamiento verificado: ${carouselLength} entradas de carrusel y ${worksLength} de works consumidas exactamente una vez.`,
  );
}

function buildProjects(raw, mapping) {
  const carousel = raw[CAROUSEL_SOURCE].projects;
  const works = raw[WORKS_SOURCE].gridItems;

  assertEveryLegacyEntryConsumedOnce(mapping, carousel.length, works.length);

  const offline = mapping.projects.filter((entry) => entry.offline === true);
  if (offline.length > 0) {
    console.log(`Excluidos por sitio fuera de linea: ${offline.map((entry) => entry.slug).join(', ')}`);
  }

  const merged = mapping.projects
    .filter((entry) => entry.offline !== true)
    .map((entry) => {
      const carouselEntry = carousel[entry.carouselIndex];
      const worksEntry = works[entry.worksIndex];

      return {
        slug: entry.slug,
        name: entry.name,
        displayNameOverride: entry.displayNameOverride ?? null,
        order: entry.order,
        featured: entry.featured,
        startYear: entry.startYear,
        endYear: entry.endYear,
        country: entry.country,
        client: entry.client,
        role: entry.role,
        summary: entry.summary,
        body: {
          es: entry.bodyOverride?.es ?? splitParagraphs(worksEntry.paragraph.es),
          en: entry.bodyOverride?.en ?? splitParagraphs(worksEntry.paragraph.en),
        },
        highlight: null,
        stack: entry.stack,
        tags: entry.tags,
        url: carouselEntry.url.replace(/\/$/, ''),
        repoUrl: null,
        media: {
          kind: 'screenshots',
          logo: toPublicPath(entry.logo),
          desktopImage: toPublicPath(entry.desktopImage),
          mobileImage: toPublicPath(entry.mobileImage),
          alt: {
            es: `Captura del sitio de ${entry.name}`,
            en: `Screenshot of the ${entry.name} website`,
          },
        },
      };
    });

  const additional = mapping.additionalProjects.map((entry) => ({
    slug: entry.slug,
    name: entry.name,
    displayNameOverride: entry.displayNameOverride ?? null,
    order: entry.order,
    featured: entry.featured,
    startYear: entry.startYear,
    endYear: entry.endYear,
    country: entry.country,
    client: entry.client,
    role: entry.role,
    summary: entry.summary,
    body: entry.body,
    highlight: null,
    stack: entry.stack,
    tags: entry.tags,
    url: entry.url,
    repoUrl: entry.repoUrl,
    media: entry.media,
  }));

  return [...merged, ...additional].sort((left, right) => left.order - right.order);
}

function buildSkills(raw) {
  const legacySkills = raw[SKILLS_SOURCE].skills;

  const fromLegacy = legacySkills.map((skill) => {
    const id = SKILL_IDS_BY_LABEL[skill.label];
    if (!id) throw new Error(`Skill sin id mapeado: ${skill.label}`);

    const category = SKILL_CATEGORY_BY_ID[id];
    if (!category) throw new Error(`Skill sin categoria mapeada: ${id}`);

    return { id, label: skill.label, category, icon: toPublicPath(skill.icon) };
  });

  const fromResume = ADDITIONAL_SKILLS.map((skill) => ({ ...skill, icon: null }));

  return [...fromLegacy, ...fromResume];
}

function buildServices(raw) {
  const legacyServices = raw[SERVICES_SOURCE].services;

  return legacyServices.map((service, index) => ({
    slug: SERVICE_SLUGS[index],
    order: index,
    title: service.title,
    description: service.text,
    image: toPublicPath(service.imgUrl),
  }));
}

function buildGoals(raw) {
  const legacyGoals = raw[GOALS_SOURCE].goals;

  return legacyGoals.map((goal, index) => ({
    id: `goal-${index + 1}`,
    order: index,
    icon: GOAL_ICONS[index],
    text: goal.text,
  }));
}

function buildSocial(raw) {
  const legacyContact = raw[CONTACT_SOURCE].contact;

  return legacyContact.map((link, index) => {
    const platform = SOCIAL_PLATFORMS[link.displayName];
    if (!platform) throw new Error(`Plataforma social desconocida: ${link.displayName}`);

    return {
      id: platform.id,
      order: index,
      label: link.displayName,
      icon: platform.icon,
      url: link.url,
    };
  });
}

function normalize() {
  const raw = readJson(join(PROJECT_ROOT, 'scripts', 'legacy-raw.json'));
  const mapping = readJson(join(PROJECT_ROOT, 'scripts', 'legacy-slug-map.json'));

  mkdirSync(CONTENT_DIR, { recursive: true });

  writeJson('projects.json', buildProjects(raw, mapping));
  writeJson('skills.json', buildSkills(raw));
  writeJson('services.json', buildServices(raw));
  writeJson('goals.json', buildGoals(raw));
  writeJson('social.json', buildSocial(raw));
}

normalize();
