type Props = {
  isApplied: boolean;
  isOwner: boolean;
};

export function getActivityMode({
  isApplied,
  isOwner,
}: Props) {
  if (isOwner) return 'STOP';
  if (isApplied) return 'CANCEL';
  return 'APPLY';
}