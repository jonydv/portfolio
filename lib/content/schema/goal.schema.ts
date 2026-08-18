import { z } from 'zod';
import { iconName, localized, text } from './primitives';

export const goalSchema = z.object({
  id: z.string().regex(/^goal-\d+$/),
  order: z.number().int().nonnegative(),
  icon: iconName,
  text: localized(text(20, 400)),
});

export const goalsSchema = z.array(goalSchema);

export type GoalSource = z.infer<typeof goalSchema>;
