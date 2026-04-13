'use client';

import { Gift } from 'lucide-react';
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
    <div className="flex gap-3 py-3">
      <div className="flex flex-col items-center">
        <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-hana-light-green font-hana-bold text-hana-main text-sm">
          {dayNumber}
        </div>
      </div>
      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <div className="flex items-center gap-2">
          <span className="font-hana-medium text-gray-700 text-sm">
            {month}월 {day}일({message.dayOfWeek})
          </span>
          <span className="flex items-center gap-0.5 rounded-full bg-hana-fade-green px-2 py-0.5 font-hana-medium text-hana-badge-green text-xs">
            <Gift className="size-3" />+{message.points}포인트
          </span>
        </div>
        <p className="font-hana-regular text-gray-600 text-sm leading-relaxed">
          {message.content}
        </p>
      </div>
    </div>
  );
}
