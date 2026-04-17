'use client';

import { Heart, Send } from 'lucide-react';
import Link from 'next/link';

type DetailButtonsProps = {
  blessId: string;
};

export default function DetailButtons({ blessId }: DetailButtonsProps) {
  return (
    <div className="flex gap-3">
      <button
        type="button"
        onClick={() => alert('사랑적금 상세 페이지는 추후 구현됩니다.')}
        className="flex flex-1 flex-col items-center gap-1 rounded-xl border border-gray-200 bg-hana-bless-bg py-3 text-hana-gray-600 shadow-sm transition-all active:scale-[0.97] active:opacity-60"
      >
        <Heart className="size-5" />
        <span className="font-hana-medium text-xs">하나 사랑적금</span>
        <span className="font-hana-regular text-[10px] text-hana-gray-400">
          예적금 연 +5.0%
        </span>
      </button>
      <Link
        href={`/bless/interval/${blessId}/message`}
        className="flex flex-1 flex-col items-center gap-1 rounded-xl border border-gray-200 bg-hana-bless-bg py-3 text-hana-gray-600 shadow-sm transition-all active:scale-[0.97] active:opacity-60"
      >
        <Send className="size-5" />
        <span className="font-hana-medium text-xs">기도 보내기</span>
        <span className="font-hana-regular text-[10px] text-hana-gray-400">
          메세지
        </span>
      </Link>
    </div>
  );
}
