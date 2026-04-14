type GivingPersonProps = {
  selected: '기명' | '무기명';
  onChange: (value: '기명' | '무기명') => void;
};

export function GivingPersonSelector({
  selected,
  onChange,
}: GivingPersonProps) {
  return (
    <div className="flex gap-2">
      {(['기명', '무기명'] as const).map((type) => {
        const isActive = selected === type;
        return (
          <button
            key={type}
            type="button"
            onClick={() => onChange(type)}
            className={`flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-xl border px-6 py-3 transition-all duration-300 ${
              isActive
                ? 'border-hana-main bg-hana-main/5 text-hana-main'
                : 'border-gray-200 text-gray-500'
            }`}
          >
            <div
              className={`flex h-5 w-5 items-center justify-center rounded-full border transition-all duration-300 ${isActive ? 'border-hana-main bg-hana-main' : 'border-gray-300'}`}
            >
              {isActive && (
                <svg
                  className="h-3 w-3 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={3}
                >
                  <title>기명/무기명 체크</title>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              )}
            </div>
            {type}
          </button>
        );
      })}
    </div>
  );
}
