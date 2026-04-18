import { cn } from '@/lib/utils';

type MessageTextareaProps = {
  value: string;
  onChange: (value: string) => void;
  maxLength?: number;
  grow?: boolean;
};

export default function MessageTextarea({
  value,
  onChange,
  maxLength = 250,
  grow = false,
}: MessageTextareaProps) {
  return (
    <label className={cn('flex flex-col gap-2', grow && 'flex-1')}>
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
        className={cn(
          'resize-none rounded-xl bg-[#EFEBE7] p-4 font-hana-regular text-gray-900 text-sm placeholder:text-hana-gray-400 focus:outline-none focus:ring-2 focus:ring-hana-main/30',
          grow ? 'min-h-[300px] flex-1' : 'min-h-[140px]',
        )}
      />
      <p className="text-right font-hana-regular text-hana-gray-500 text-xs">
        {value.length}/{maxLength}
      </p>
    </label>
  );
}
