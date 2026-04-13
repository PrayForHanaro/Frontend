'use client';

type MessageTextareaProps = {
  value: string;
  onChange: (value: string) => void;
  maxLength?: number;
};

export default function MessageTextarea({
  value,
  onChange,
  maxLength = 250,
}: MessageTextareaProps) {
  return (
    <label className="flex flex-col gap-2">
      <span className="font-hana-medium text-gray-900 text-sm">
        기도의 말씀을 적어주세요 ✍️
      </span>
      <textarea
        value={value}
        onChange={(e) => {
          if (e.target.value.length <= maxLength) {
            onChange(e.target.value);
          }
        }}
        placeholder="전하고 싶은 기도를 적어주세요..."
        className="min-h-[120px] resize-none rounded-xl bg-[#EFEBE7] p-4 font-hana-regular text-gray-900 text-sm placeholder:text-hana-gray-400 focus:outline-none focus:ring-2 focus:ring-hana-main/30"
      />
      <p className="text-right font-hana-regular text-hana-gray-500 text-xs">
        {value.length}/{maxLength}
      </p>
    </label>
  );
}
