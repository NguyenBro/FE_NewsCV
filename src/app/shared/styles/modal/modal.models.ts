import { z } from 'zod';
import { ZBadgesState } from '../badges/badges.models';
export const ZModalConfig = z.object({
  state: ZBadgesState.optional(),
  titleModal: z.ostring(),
  labelModal: z.ostring(),
  statusText: z.ostring(),
  isVisible: z.boolean(),
  isFooter: z.boolean().default(true),
  iconModal: z.ostring(),
  postScriptModal: z.ostring(),
  size: z.enum(['default', 'small']).default('default'),
});

export type ModalComponentConfig = z.infer<typeof ZModalConfig>;
