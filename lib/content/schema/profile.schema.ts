import { z } from 'zod';
import { localeCode, localized, publicAssetPath, text } from './primitives';

const resumeDocumentSchema = z.object({
  href: publicAssetPath.endsWith('.pdf'),
  language: localeCode,
});

export const profileSchema = z.object({
  name: z.string().trim().min(1).max(80),
  greeting: localized(text(2, 40)),
  headline: localized(text(10, 60)),
  focus: localized(text(3, 60)),
  specialties: z.array(z.string().trim().min(1).max(30)).min(1).max(8),
  summary: localized(text(80, 700)),
  bio: localized(text(80, 1600)),
  expertiseIntro: localized(text(80, 700)),
  location: localized(text(3, 80)),
  availability: localized(text(3, 90)),
  email: z.email(),
  yearsOfExperience: z.number().int().min(1).max(60),
  image: publicAssetPath,
  cv: localized(resumeDocumentSchema),
});

export type ProfileSource = z.infer<typeof profileSchema>;
export type ResumeDocument = z.infer<typeof resumeDocumentSchema>;
