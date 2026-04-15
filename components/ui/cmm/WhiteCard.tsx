type Props = {
  isSelected: boolean;
  contents: string;
  description?: string;
  setIsSelected?: (s: boolean) => void;
  badgeContent?: string; // 배지 텍스트를 받을 새로운 prop 추가
};

export default function WhiteCard({
  contents,
  isSelected,
  description,
  setIsSelected,
  badgeContent, // 배지 prop 추가
}: Props) {
  return (
    <div
      className={`flex h-20 w-full max-w-md items-center justify-between ${isSelected ? `border-4 border-hana-checkin-green-b bg-white` : `bg-white`} rounded-2xl p-5 text-center shadow-sm`}
    >
      <button
        type="button"
        onClick={setIsSelected ? () => setIsSelected(!isSelected) : undefined}
        disabled={!setIsSelected}
        className={`h-full w-full text-center font-semibold text-gray-800 text-lg ${setIsSelected ? '' : 'cursor-not-allowed opacity-70'}`}
      >
        <div className="flex h-full w-full flex-col items-center justify-center gap-2 text-center">
          <div>{contents}</div>

          {description && (
            <div className="font-hana-light text-sm">{description}</div>
          )}
        </div>
      </button>

      {/* 배지 추가 */}
      {badgeContent && (
        <div className="flex w-18 items-center justify-center rounded-full bg-hana-checkin-green-b px-3 py-1 font-medium text-white text-xs">
          {badgeContent}
        </div>
      )}
    </div>
  );
}
