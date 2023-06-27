import { z } from 'zod';
export const ZBadgesState = z
  .enum(['general', 'success', 'failure', 'information', 'alert'])
  .default('general');
export const ZBadgesType = z
  .enum(['primary', 'secondary', 'tertiary'])
  .default('primary');
export const ZBadgesContain = z
  .enum(['icon', 'text', 'icon-text'])
  .default('icon');
export const ZBadgesConfig = z.object({
  state: ZBadgesState,
  type: ZBadgesType,
  contain: ZBadgesContain,
  iconName: z.ostring(),
  label: z.ostring(),
});

export type BadgesComponentConfig = z.infer<typeof ZBadgesConfig>;
