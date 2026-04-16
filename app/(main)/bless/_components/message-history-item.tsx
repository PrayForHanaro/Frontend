import type { BlessMessage } from '../_types';

type MessageHistoryItemProps = {
  message: BlessMessage;
  dayNumber: number;
};

export default function MessageHistoryItem({
  message,
  dayNumber,
}: MessageHistoryItemProps) {
  const month = Number.parseInt(message.date.split('-')[1], 10);
  const day = Number.parseInt(message.date.split('-')[2], 10);

  return (
    <div className="flex gap-3 rounded-2xl border border-gray-200 bg-hana-bless-bg p-4 shadow-sm">
      <div className="flex flex-col items-center">
        <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-hana-bless-progress font-hana-bold text-sm text-white">
          {dayNumber}
        </div>
      </div>
      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <span className="font-hana-medium text-gray-700 text-sm">
          {month}월 {day}일 ({message.dayOfWeek})
        </span>
        <p className="font-hana-regular text-gray-600 text-sm leading-relaxed">
          {message.content}
        </p>
      </div>
    </div>
  );
}
