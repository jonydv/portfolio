import { z } from 'zod';
import { publicAssetPath } from './primitives';

export const imageEntrySchema = z.object({
  width: z.number().int().positive(),
  height: z.number().int().positive(),
  bytes: z.number().int().positive(),
  blurDataURL: z.string().startsWith('data:image/').optional(),
});

export const mediaManifestSchema = z.record(publicAssetPath, imageEntrySchema);

export type ImageEntry = z.infer<typeof imageEntrySchema>;

export type ImageAsset = {
  src: string;
  width: number;
  height: number;
  alt: string;
  blurDataURL?: string;
};
