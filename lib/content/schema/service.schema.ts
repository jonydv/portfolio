import { z } from 'zod';
import { kebabSlug, localized, publicAssetPath, text } from './primitives';

export const serviceSchema = z.object({
  slug: kebabSlug,
  order: z.number().int().nonnegative(),
  title: localized(text(3, 80)),
  description: localized(text(40, 400)),
  image: publicAssetPath,
});

export const servicesSchema = z.array(serviceSchema);

export type ServiceSource = z.infer<typeof serviceSchema>;
