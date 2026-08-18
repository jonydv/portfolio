import { z } from 'zod';
import { httpsUrl, isoMonth, kebabSlug, localized, roleText, text } from './primitives';

export const EMPLOYMENT_TYPES = ['full-time', 'contract', 'freelance'] as const;
export const employmentType = z.enum(EMPLOYMENT_TYPES);
export type EmploymentType = (typeof EMPLOYMENT_TYPES)[number];

const highlightBullets = () => localized(z.array(text(20, 500)).min(1).max(10));

export const experienceSchema = z
  .object({
    id: kebabSlug,
    company: z.string().trim().min(1).max(60),
    companyUrl: httpsUrl.nullable().default(null),
    role: roleText(),
    start: isoMonth,
    end: isoMonth.nullable(),
    location: localized(text(3, 80)).nullable().default(null),
    employmentType: employmentType.default('full-time'),
    order: z.number().int().nonnegative(),
    highlights: highlightBullets(),
    stack: z.array(kebabSlug).default([]),
  })
  .refine((entry) => entry.end === null || entry.end >= entry.start, {
    message: 'end debe ser mayor o igual que start',
    path: ['end'],
  });

export const experienceCollectionSchema = z.array(experienceSchema);

export type ExperienceSource = z.infer<typeof experienceSchema>;
