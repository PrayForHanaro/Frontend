'use client';

import { MessageCircle } from 'lucide-react';

export default function KakaoShareButton() {
  const handleShare = () => {
    alert('카카오톡 공유 기능은 추후 연동됩니다');
  };

  return (
    <button
      type="button"
      onClick={handleShare}
      className="flex w-full items-center justify-center gap-2 rounded-xl border border-hana-gray-300 bg-white py-3.5 font-hana-medium text-base text-gray-700 transition-colors active:bg-hana-gray-100"
    >
      <MessageCircle className="size-5" />
      카카오톡으로 공유
    </button>
  );
}
