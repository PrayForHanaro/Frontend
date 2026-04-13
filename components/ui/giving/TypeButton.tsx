type TypeButtonProps = {
  type: string;
  isActive: boolean;
  onClick: () => void;
};

export default function TypeButton({
  type,
  isActive,
  onClick,
}: TypeButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`cursor-pointer rounded-full border px-4 py-2 text-sm transition-colors ${
        isActive
          ? 'border-hana-main bg-hana-main text-white'
          : 'border-gray-200 bg-gray-100 text-gray-500'
      }`}
    >
      {type}
    </button>
  );
}
