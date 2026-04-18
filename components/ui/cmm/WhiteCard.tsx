type Props = {
  isSelected: boolean;
  contents: string;
  description?: string;
  description2?: string;
  setIsSelected?: (s: boolean) => void;
  badgeContent?: string;
  badgeType?: 'badge' | 'tag';
  align?: 'center' | 'left';
  descriptionType?: 'default' | 'amount';
  tag?: string;
  showCheckbox?: boolean;
};

export default function WhiteCard({
  contents,
  isSelected,
  description,
  description2,
  setIsSelected,
  badgeContent,
  badgeType = 'badge',
  align = 'center',
  descriptionType = 'default',
  tag,
  showCheckbox = false,
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
      className={`flex min-h-[80px] w-full max-w-md items-center justify-between rounded-2xl p-5 shadow-sm ${
        isSelected
          ? 'border-4 border-hana-checkin-green-b bg-white'
          : 'bg-white'
      }`}
    >
      {showCheckbox ? (
        <div className="flex flex-1 items-center gap-3">
          <input
            type="checkbox"
            checked={isSelected}
            onChange={() => setIsSelected?.(!isSelected)}
            className="h-5 w-5 cursor-pointer accent-hana-light-mint"
          />
          <div
            className={`flex flex-col gap-2 ${align === 'left' ? 'text-left' : 'text-center'}`}
          >
            <div className="font-semibold text-gray-800 text-lg">
              {contents}
            </div>
            {description2 && (
              <div className="text-hana-gray-500 text-sm">{description2}</div>
            )}
            {description && (
              <div className={`${descriptionClasses} text-sm`}>
                {description}
              </div>
            )}
          </div>
        </div>
      ) : (
        <button
          type="button"
          onClick={setIsSelected ? () => setIsSelected(!isSelected) : undefined}
          disabled={!setIsSelected}
          className={`flex-1 font-semibold text-gray-800 text-lg ${
            setIsSelected ? '' : 'cursor-not-allowed opacity-70'
          }`}
        >
          <div className={`flex h-full w-full flex-col gap-2 ${alignClasses}`}>
            <div>{contents}</div>
            {description2 && (
              <div className="text-hana-gray-500 text-sm">{description2}</div>
            )}
            {description && (
              <div className={`${descriptionClasses} text-sm`}>
                {description}
              </div>
            )}
          </div>
        </button>
      )}

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
