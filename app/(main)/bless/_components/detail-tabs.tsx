'use client';

import { Heart, Send } from 'lucide-react';
import { cn } from '@/lib/utils';

type DetailTabsProps = {
  activeTab: 'savings' | 'prayer';
  onTabChange: (tab: 'savings' | 'prayer') => void;
};

export default function DetailTabs({
  activeTab,
  onTabChange,
}: DetailTabsProps) {
  return (
    <div className="flex border-hana-gray-200 border-b">
      <button
        type="button"
        onClick={() => onTabChange('savings')}
        className={cn(
          'flex flex-1 flex-col items-center gap-1 pt-4 pb-3 transition-colors',
          activeTab === 'savings'
            ? 'border-hana-main border-b-2 text-hana-main'
            : 'text-hana-gray-400',
        )}
      >
        <Heart
          className={cn('size-5', activeTab === 'savings' && 'fill-hana-main')}
        />
        <span className="font-hana-medium text-xs">하나 사랑적금</span>
        <span className="font-hana-regular text-[10px] text-hana-gray-500">
          예적금 +5.0%
        </span>
      </button>
      <button
        type="button"
        onClick={() => onTabChange('prayer')}
        className={cn(
          'flex flex-1 flex-col items-center gap-1 pt-4 pb-3 transition-colors',
          activeTab === 'prayer'
            ? 'border-hana-main border-b-2 text-hana-main'
            : 'text-hana-gray-400',
        )}
      >
        <Send
          className={cn('size-5', activeTab === 'prayer' && 'fill-hana-main')}
        />
        <span className="font-hana-medium text-xs">기도 보내기</span>
        <span className="font-hana-regular text-[10px] text-hana-gray-500">
          메세지
        </span>
      </button>
    </div>
  );
}
