export const BLESS_ONCE_FORM_KEY = 'bless-once-form';

export const RELATION_LABELS = {
  SON: '아들',
  DAUGHTER: '딸',
  GRANDCHILD: '손주',
} as const;

export type GiftReceiverType = keyof typeof RELATION_LABELS;
