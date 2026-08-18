import { z } from 'zod';

export const contentMetaSchema = z.object({
  version: z.string().min(1),
  generatedAt: z.iso.datetime(),
  contentHash: z.string().length(64),
});

export type ContentMeta = z.infer<typeof contentMetaSchema>;
