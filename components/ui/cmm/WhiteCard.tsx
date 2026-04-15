type Props = {
  isSelected: boolean;
  contents: string;
  description?: string;
  setIsSelected?: (s: boolean) => void;
  badgeContent?: string;
  badgeType?: 'badge' | 'tag';
  align?: 'center' | 'left';
  descriptionType?: 'default' | 'amount';
  tag?: string;
};

export default function WhiteCard({
  contents,
  isSelected,
  description,
  setIsSelected,
  badgeContent,
  badgeType = 'badge',
  align = 'center',
  descriptionType = 'default',
  tag,
}: Props) {
  const alignClasses =
    align === 'left'
      ? 'items-start justify-center text-left'
      : 'items-center justify-center text-center';

  const descriptionClasses =
    descriptionType === 'amount'
      ? 'font-bold text-yellow-600 text-xl'
      : 'font-hana-light';
  return (
    <div
      className={`flex h-20 w-full max-w-md items-center justify-between ${isSelected ? `border-4 border-hana-checkin-green-b bg-white` : `bg-white`} rounded-2xl p-5 text-center shadow-sm`}
    >
      <button
        type="button"
        onClick={setIsSelected ? () => setIsSelected(!isSelected) : undefined}
        disabled={!setIsSelected}
        className={
          'h-full flex-1 font-semibold text-gray-800 text-lg' +
          (setIsSelected ? '' : 'cursor-not-allowed opacity-70')
        }
      >
        <div className={`flex h-full w-full flex-col gap-2 ${alignClasses}`}>
          <div>{contents}</div>

          {description && (
            <div className={`${descriptionClasses} text-sm`}>{description}</div>
          )}
        </div>
      </button>

      {tag && <div className="text-gray-400 text-xs">{tag}</div>}
      {badgeContent && badgeType === 'badge' && (
        <div className="flex w-18 items-center justify-center rounded-full bg-hana-checkin-green-b px-3 py-1 font-medium text-white text-xs">
          {badgeContent}
        </div>
      )}
      {badgeContent && badgeType === 'tag' && (
        <div className="text-gray-400 text-xs">{badgeContent}</div>
      )}
    </div>
  );
}
