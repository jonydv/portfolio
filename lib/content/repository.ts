import 'server-only';
import { cache } from 'react';
import type { Locale } from '@/lib/i18n/routing';
import type {
  ContentMeta,
  CredentialSource,
  ExperienceSource,
  GoalSource,
  ImageAsset,
  ProfileSource,
  ProjectSource,
  ServiceSource,
  SkillCategory,
  SkillSource,
  SocialLinkSource,
} from './schema';
import { getSource } from './source';
import { hydrateImage, pick, pickNullable } from './resolve';

export type ProjectMedia =
  | { kind: 'screenshots'; logo: ImageAsset | null; desktop: ImageAsset; mobile: ImageAsset }
  | { kind: 'generated'; gradientFrom: string; gradientTo: string; gradientAngle: number; monogram: string };

export type Project = {
  slug: string;
  title: string;
  name: string;
  order: number;
  featured: boolean;
  startYear: number;
  endYear: number | null;
  country: string;
  client: string | null;
  role: string;
  summary: string;
  body: string[];
  highlight: string | null;
  stack: string[];
  tags: string[];
  url: string | null;
  repoUrl: string | null;
  media: ProjectMedia;
  path: string;
  href: string;
};

export type Experience = {
  id: string;
  company: string;
  companyUrl: string | null;
  role: string;
  start: string;
  end: string | null;
  location: string | null;
  employmentType: string;
  highlights: string[];
  stack: string[];
};

export type Credential = {
  id: string;
  kind: string;
  icon: string;
  issuer: string | null;
  title: string;
  subtitle: string | null;
  startYear: number | null;
  endYear: number | null;
  issuedAt: string | null;
  credentialUrl: string | null;
};

export type Skill = {
  id: string;
  label: string;
  category: SkillCategory;
  icon: string | null;
};

export type SkillGroup = {
  category: SkillCategory;
  skills: Skill[];
};

export type Service = {
  slug: string;
  title: string;
  description: string;
  image: ImageAsset;
};

export type Goal = {
  id: string;
  icon: string;
  text: string;
};

export type SocialLink = {
  id: string;
  label: string;
  icon: string;
  url: string;
};

export type Profile = {
  name: string;
  greeting: string;
  headline: string;
  focus: string;
  specialties: string[];
  summary: string;
  bio: string;
  expertiseIntro: string;
  location: string;
  availability: string;
  email: string;
  yearsOfExperience: number;
  image: ImageAsset;
  resume: { href: string; language: Locale; isTranslated: boolean };
};

function projectPath(slug: string): string {
  return `/work/${slug}`;
}

function projectHref(locale: Locale, slug: string): string {
  return `/${locale}${projectPath(slug)}`;
}

function toProjectMedia(source: ProjectSource, locale: Locale, title: string): ProjectMedia {
  if (source.media.kind === 'generated') {
    return {
      kind: 'generated',
      gradientFrom: source.media.gradientFrom,
      gradientTo: source.media.gradientTo,
      gradientAngle: source.media.gradientAngle,
      monogram: source.media.monogram,
    };
  }

  const alt = pick(source.media.alt, locale);

  return {
    kind: 'screenshots',
    logo: source.media.logo === null ? null : hydrateImage(source.media.logo, title),
    desktop: hydrateImage(source.media.desktopImage, alt),
    mobile: hydrateImage(source.media.mobileImage, alt),
  };
}

function toProject(source: ProjectSource, locale: Locale): Project {
  const title = pickNullable(source.displayNameOverride, locale) ?? source.name;

  return {
    slug: source.slug,
    title,
    name: source.name,
    order: source.order,
    featured: source.featured,
    startYear: source.startYear,
    endYear: source.endYear,
    country: source.country,
    client: source.client,
    role: pick(source.role, locale),
    summary: pick(source.summary, locale),
    body: pick(source.body, locale),
    highlight: pickNullable(source.highlight, locale),
    stack: source.stack,
    tags: source.tags,
    url: source.url,
    repoUrl: source.repoUrl,
    media: toProjectMedia(source, locale, title),
    path: projectPath(source.slug),
    href: projectHref(locale, source.slug),
  };
}

function toExperience(source: ExperienceSource, locale: Locale): Experience {
  return {
    id: source.id,
    company: source.company,
    companyUrl: source.companyUrl,
    role: pick(source.role, locale),
    start: source.start,
    end: source.end,
    location: pickNullable(source.location, locale),
    employmentType: source.employmentType,
    highlights: pick(source.highlights, locale),
    stack: source.stack,
  };
}

function toCredential(source: CredentialSource, locale: Locale): Credential {
  return {
    id: source.id,
    kind: source.kind,
    icon: source.icon,
    issuer: source.issuer,
    title: pick(source.title, locale),
    subtitle: pickNullable(source.subtitle, locale),
    startYear: source.startYear,
    endYear: source.endYear,
    issuedAt: source.issuedAt,
    credentialUrl: source.credentialUrl,
  };
}

function toSkill(source: SkillSource): Skill {
  return { id: source.id, label: source.label, category: source.category, icon: source.icon };
}

function toService(source: ServiceSource, locale: Locale): Service {
  const title = pick(source.title, locale);

  return {
    slug: source.slug,
    title,
    description: pick(source.description, locale),
    image: hydrateImage(source.image, title),
  };
}

function toGoal(source: GoalSource, locale: Locale): Goal {
  return { id: source.id, icon: source.icon, text: pick(source.text, locale) };
}

function toSocialLink(source: SocialLinkSource): SocialLink {
  return { id: source.id, label: source.label, icon: source.icon, url: source.url };
}

function toProfile(source: ProfileSource, locale: Locale): Profile {
  const resume = pick(source.cv, locale);

  return {
    name: source.name,
    greeting: pick(source.greeting, locale),
    headline: pick(source.headline, locale),
    focus: pick(source.focus, locale),
    specialties: source.specialties,
    summary: pick(source.summary, locale),
    bio: pick(source.bio, locale),
    expertiseIntro: pick(source.expertiseIntro, locale),
    location: pick(source.location, locale),
    availability: pick(source.availability, locale),
    email: source.email,
    yearsOfExperience: source.yearsOfExperience,
    image: hydrateImage(source.image, source.name),
    resume: { href: resume.href, language: resume.language, isTranslated: resume.language === locale },
  };
}

export const getContentMeta = cache((): ContentMeta => getSource().meta);

export const getProjects = cache((locale: Locale): Project[] =>
  getSource().projects.map((project) => toProject(project, locale)),
);

export const getFeaturedProjects = cache((locale: Locale): Project[] =>
  getProjects(locale).filter((project) => project.featured),
);

export const getProjectSlugs = cache((): string[] => getSource().projects.map((project) => project.slug));

export const getProjectBySlug = cache((locale: Locale, slug: string): Project | null => {
  const source = getSource().projects.find((project) => project.slug === slug);
  return source ? toProject(source, locale) : null;
});

export const getAdjacentProjects = cache(
  (locale: Locale, slug: string): { previous: Project | null; next: Project | null } => {
    const projects = getProjects(locale);
    const index = projects.findIndex((project) => project.slug === slug);

    if (index === -1) return { previous: null, next: null };

    const previous = projects[(index - 1 + projects.length) % projects.length] ?? null;
    const next = projects[(index + 1) % projects.length] ?? null;

    return { previous, next };
  },
);

export const getExperience = cache((locale: Locale): Experience[] =>
  getSource().experience.map((entry) => toExperience(entry, locale)),
);

export const getCredentials = cache((locale: Locale): Credential[] =>
  getSource().credentials.map((entry) => toCredential(entry, locale)),
);

export const getSkills = cache((): Skill[] => getSource().skills.map(toSkill));

export const getSkillGroups = cache((): SkillGroup[] => {
  const groups = new Map<SkillCategory, Skill[]>();

  for (const skill of getSkills()) {
    const existing = groups.get(skill.category) ?? [];
    existing.push(skill);
    groups.set(skill.category, existing);
  }

  return [...groups.entries()].map(([category, skills]) => ({ category, skills }));
});

export const getServices = cache((locale: Locale): Service[] =>
  getSource().services.map((entry) => toService(entry, locale)),
);

export const getGoals = cache((locale: Locale): Goal[] =>
  getSource().goals.map((entry) => toGoal(entry, locale)),
);

export const getSocialLinks = cache((): SocialLink[] => getSource().social.map(toSocialLink));

export const getProfile = cache((locale: Locale): Profile => toProfile(getSource().profile, locale));

export const getResume = cache((locale: Locale) => ({
  profile: getProfile(locale),
  experience: getExperience(locale),
  credentials: getCredentials(locale),
  skills: getSkillGroups(),
  goals: getGoals(locale),
}));
