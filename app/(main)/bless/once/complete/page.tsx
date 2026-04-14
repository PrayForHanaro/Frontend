'use client';

import { Heart } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Nav from '@/components/ui/cmm/Nav';
import BlessActionButton from '../../_components/bless-action-button';
import BlessHeader from '../../_components/bless-header';
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

  const handleComplete = () => {
    sessionStorage.removeItem('bless-once-form');
    router.push('/home');
  };

  const recipientDisplay = formData.recipientName
    ? `${formData.recipientName} (${formData.recipientRelation})`
    : formData.accountNumber;

  return (
    <div className="relative h-full w-full">
      <div className="absolute top-4 left-6 z-10">
        <p className="font-hana-bold text-gray-900 text-sm">HANA님</p>
      </div>

      <div className="flex h-full flex-col overflow-y-auto pb-[70px]">
        <BlessHeader
          title="이번 달 축복 보내기"
          subtitle="사랑하는 사람에게 기도와 마음을 전하세요."
        />

        <div className="px-6 pb-3 text-center">
          <p className="font-hana-medium text-gray-900 text-sm">
            축복 카드를 확인하세요 ❤️
          </p>
        </div>

        <div className="mx-6 overflow-hidden rounded-2xl bg-gradient-to-br from-[#F5ECE0] via-[#F9F6F1] to-[#E8EEEA] shadow-sm">
          <div className="flex flex-col items-center gap-2 px-5 py-5 text-center">
            <span className="font-hana-regular text-hana-gray-500 text-xs">
              받는 분
            </span>
            <span className="font-hana-bold text-gray-900 text-lg">
              {recipientDisplay}
            </span>
            <Heart className="my-1 size-5 text-hana-main" />
            {formData.message && (
              <p className="line-clamp-2 font-hana-regular text-hana-gray-600 text-sm">
                {`"${formData.message}"`}
              </p>
            )}
            <p className="mt-2 font-hana-bold text-[#568F6E] text-xl">
              {formData.amount.toLocaleString()}원
            </p>
          </div>
        </div>

        <div className="mt-auto flex flex-col gap-2.5 px-6 pt-5 pb-5">
          <KakaoShareButton />
          <BlessActionButton onClick={handleComplete}>완료</BlessActionButton>
        </div>
      </div>
      <Nav />
    </div>
  );
}
