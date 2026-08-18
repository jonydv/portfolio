import 'server-only';
import type { z } from 'zod';

import projectsJson from '@/content/projects.json';
import experienceJson from '@/content/experience.json';
import credentialsJson from '@/content/credentials.json';
import skillsJson from '@/content/skills.json';
import servicesJson from '@/content/services.json';
import goalsJson from '@/content/goals.json';
import socialJson from '@/content/social.json';
import profileJson from '@/content/profile.json';
import mediaJson from '@/content/_media.json';
import metaJson from '@/content/_meta.json';

import {
  contentMetaSchema,
  credentialsSchema,
  experienceCollectionSchema,
  goalsSchema,
  mediaManifestSchema,
  profileSchema,
  projectsSchema,
  servicesSchema,
  skillsSchema,
  socialLinksSchema,
} from './schema';
import { ContentValidationError } from './errors';

function parseCollection<Schema extends z.ZodTypeAny>(
  collection: string,
  schema: Schema,
  raw: unknown,
): z.infer<Schema> {
  const result = schema.safeParse(raw);

  if (!result.success) {
    const issues = result.error.issues.map(
      (issue) => `${issue.path.join('.') || '(raiz)'}: ${issue.message}`,
    );
    throw new ContentValidationError(collection, issues);
  }

  return result.data;
}

function byOrder<Entry extends { order: number }>(entries: Entry[]): Entry[] {
  return [...entries].sort((left, right) => left.order - right.order);
}

function loadSource() {
  return {
    meta: parseCollection('_meta', contentMetaSchema, metaJson),
    media: parseCollection('_media', mediaManifestSchema, mediaJson),
    profile: parseCollection('profile', profileSchema, profileJson),
    projects: byOrder(parseCollection('projects', projectsSchema, projectsJson)),
    experience: byOrder(parseCollection('experience', experienceCollectionSchema, experienceJson)),
    credentials: byOrder(parseCollection('credentials', credentialsSchema, credentialsJson)),
    skills: parseCollection('skills', skillsSchema, skillsJson),
    services: byOrder(parseCollection('services', servicesSchema, servicesJson)),
    goals: byOrder(parseCollection('goals', goalsSchema, goalsJson)),
    social: byOrder(parseCollection('social', socialLinksSchema, socialJson)),
  };
}

export type ContentSource = ReturnType<typeof loadSource>;

let cachedSource: ContentSource | null = null;

export function getSource(): ContentSource {
  cachedSource ??= loadSource();
  return cachedSource;
}
