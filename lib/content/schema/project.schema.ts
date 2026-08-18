import { z } from 'zod';
import {
  bodyParagraphs,
  calendarYear,
  countryCode,
  DEFAULT_GRADIENT_ANGLE,
  hexColor,
  httpsUrl,
  kebabSlug,
  localized,
  publicAssetPath,
  roleText,
  skillIdRefs,
  summaryText,
  text,
} from './primitives';

export const PROJECT_TAGS = [
  'ecommerce',
  'sap-spartacus',
  'angular',
  'react',
  'nextjs',
  'migration',
  'architecture',
  'design-system',
  'fullstack',
  'ai',
  'personal',
] as const;

export const projectTag = z.enum(PROJECT_TAGS);
export type ProjectTag = (typeof PROJECT_TAGS)[number];

const brandName = () => z.string().trim().min(1).max(60);
const localizedDisplayName = () => localized(z.string().trim().min(1).max(80));
const pullQuote = () => localized(text(20, 240));

const projectBase = z.object({
  slug: kebabSlug,
  name: brandName(),
  displayNameOverride: localizedDisplayName().nullable().default(null),
  order: z.number().int().nonnegative(),
  featured: z.boolean().default(false),
  startYear: calendarYear,
  endYear: calendarYear.nullable().default(null),
  country: countryCode,
  client: brandName().nullable().default(null),
  role: roleText(),
  summary: summaryText(),
  body: bodyParagraphs(),
  highlight: pullQuote().nullable().default(null),
  stack: skillIdRefs(),
  tags: z.array(projectTag).min(1).max(5),
  url: httpsUrl.nullable(),
  repoUrl: httpsUrl.nullable().default(null),
});

const screenshotMedia = z.object({
  kind: z.literal('screenshots'),
  logo: publicAssetPath.nullable().default(null),
  desktopImage: publicAssetPath,
  mobileImage: publicAssetPath,
  alt: localized(text(10, 160)),
});

const generatedMedia = z.object({
  kind: z.literal('generated'),
  gradientFrom: hexColor,
  gradientTo: hexColor,
  gradientAngle: z.number().int().min(0).max(360).default(DEFAULT_GRADIENT_ANGLE),
  monogram: z.string().min(1).max(3),
});

export const projectSchema = projectBase
  .extend({
    media: z.discriminatedUnion('kind', [screenshotMedia, generatedMedia]),
  })
  .refine((project) => project.endYear === null || project.endYear >= project.startYear, {
    message: 'endYear debe ser mayor o igual que startYear',
    path: ['endYear'],
  });

export const projectsSchema = z.array(projectSchema);

export type ProjectSource = z.infer<typeof projectSchema>;
export type ProjectMediaSource = ProjectSource['media'];
