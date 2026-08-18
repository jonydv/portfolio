import { z } from 'zod';
import { contactUrl, iconName, kebabSlug } from './primitives';

export const socialLinkSchema = z.object({
  id: kebabSlug,
  order: z.number().int().nonnegative(),
  label: z.string().trim().min(1).max(40),
  icon: iconName,
  url: contactUrl,
});

export const socialLinksSchema = z.array(socialLinkSchema);

export type SocialLinkSource = z.infer<typeof socialLinkSchema>;
