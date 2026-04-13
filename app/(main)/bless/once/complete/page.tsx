'use client';

import { Heart, Send } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import BlessActionButton from '../../_components/bless-action-button';
import KakaoShareButton from '../../_components/kakao-share-button';
import type { OnceBlessFormData } from '../../_types';

export default function BlessOnceComplete() {
  const router = useRouter();
  const [formData, setFormData] = useState<OnceBlessFormData | null>(null);

  useEffect(() => {
    const stored = sessionStorage.getItem('bless-once-form');
    if (!stored) {
      router.replace('/bless/once/input');
      return;
    }
    setFormData(JSON.parse(stored));
  }, [router]);

  if (!formData) {
    return null;
  }

  const handleSend = () => {
    sessionStorage.removeItem('bless-once-form');
    alert('축복이 전달되었습니다!');
    router.push('/bless/interval');
  };

  const recipientDisplay = formData.recipientName
    ? `${formData.recipientName} (${formData.recipientRelation})`
    : formData.accountNumber;

  return (
    <div className="flex min-h-full flex-col pb-20">
      {/* Top */}
      <div className="px-6 pt-4">
        <p className="font-hana-bold text-gray-900 text-sm">HANA님</p>
      </div>

      {/* Hero */}
      <div className="flex flex-col items-center px-6 pt-6 pb-4 text-center">
        <div className="mb-3 flex size-12 items-center justify-center rounded-full bg-hana-carousel-bg-green">
          <Send className="-rotate-12 size-5 text-hana-main" />
        </div>
        <h1 className="font-hana-bold text-gray-900 text-lg">
          이번 달 축복 보내기
        </h1>
        <p className="mt-1 font-hana-regular text-hana-gray-500 text-sm">
          사랑하는 사람에게 기도와 마음을 전하세요
        </p>
      </div>

      {/* Card label */}
      <div className="px-6 pb-3">
        <p className="font-hana-medium text-gray-900 text-sm">
          축복 카드를 확인하세요 ❤️
        </p>
      </div>

      {/* Blessing card */}
      <div className="mx-6 overflow-hidden rounded-2xl bg-gradient-to-br from-hana-light-green to-white shadow-sm">
        <div className="flex flex-col gap-3 p-5">
          <div className="flex items-center gap-2">
            <span className="font-hana-regular text-hana-gray-500 text-xs">
              받는 분
            </span>
            <span className="font-hana-medium text-gray-900 text-sm">
              {recipientDisplay}
            </span>
          </div>
          <div className="flex justify-center py-2">
            <Heart className="size-6 fill-hana-pastel-pink text-hana-pastel-pink" />
          </div>
          {formData.message && (
            <p className="line-clamp-2 text-center font-hana-regular text-gray-700 text-sm">
              {formData.message}
            </p>
          )}
          <p className="text-center font-hana-bold text-gray-900 text-xl">
            {formData.amount.toLocaleString()}원
          </p>
        </div>
      </div>

      {/* Buttons */}
      <div className="mt-auto flex flex-col gap-3 px-6 pt-6 pb-6">
        <KakaoShareButton />
        <BlessActionButton onClick={handleSend}>축복 보내기</BlessActionButton>
        <BlessActionButton
          variant="outline"
          onClick={() => router.push('/bless/once/input')}
        >
          이전으로 돌아가기
        </BlessActionButton>
      </div>
    </div>
  );
}
