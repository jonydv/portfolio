import { z } from 'zod';
import { kebabSlug, publicAssetPath } from './primitives';

export const SKILL_CATEGORIES = [
  'frameworks',
  'state',
  'languages',
  'quality',
  'ecommerce',
  'ai',
] as const;
export const skillCategory = z.enum(SKILL_CATEGORIES);
export type SkillCategory = (typeof SKILL_CATEGORIES)[number];

export const skillSchema = z.object({
  id: kebabSlug,
  label: z.string().trim().min(1).max(40),
  category: skillCategory,
  icon: publicAssetPath.nullable().default(null),
});

export const skillsSchema = z.array(skillSchema);

export type SkillSource = z.infer<typeof skillSchema>;
