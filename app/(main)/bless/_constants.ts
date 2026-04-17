export const BLESS_ONCE_FORM_KEY = 'bless-once-form';

export const RELATION_LABELS = {
  CHILD: '자녀',
  GRANDCHILD: '손주',
  GREAT_GRANDCHILD: '증손주',
} as const;

export type GiftReceiverType = keyof typeof RELATION_LABELS;
