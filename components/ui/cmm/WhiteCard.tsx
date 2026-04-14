type Props = {
  isSelected: boolean;
  contents: string;
  description?: string;
  setIsSelected?: (s: boolean) => void;
};

export default function WhiteCard({
  contents,
  isSelected,
  description,
  setIsSelected,
}: Props) {
  console.log(description);
  return (
    <div
      className={`flex h-20 w-full max-w-md items-center justify-center ${isSelected ? `border-4 border-hana-checkin-green-b bg-white` : `bg-white`} rounded-2xl p-5 text-center shadow-sm`}
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
    </div>
  );
}
