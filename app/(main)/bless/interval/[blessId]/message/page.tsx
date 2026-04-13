'use client';

import { ChevronLeft, Heart } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import Nav from '@/components/ui/cmm/Nav';
import BibleVerseBox from '../../../_components/bible-verse-box';
import BlessActionButton from '../../../_components/bless-action-button';
import MessageTextarea from '../../../_components/message-textarea';
import { getRandomVerse } from '../../../_data/bible-verses';
import { MOCK_TARGETS } from '../../../_data/mock-targets';

export default function BlessIntervalMessage() {
  const { blessId } = useParams<{ blessId: string }>();
  const router = useRouter();
  const [message, setMessage] = useState('');
  const [verse] = useState(getRandomVerse);

  const target = MOCK_TARGETS.find((t) => t.id === blessId);

  const handleNext = () => {
    router.push('/bless/interval/complete');
  };

  return (
    <div className="relative h-full w-full">
      <div className="flex h-full flex-col overflow-y-auto bg-hana-bless-bg pb-[70px]">
        {/* Back button */}
        <button
          type="button"
          onClick={() => router.back()}
          className="self-start p-4"
          aria-label="뒤로가기"
        >
          <ChevronLeft className="size-6 text-gray-700" />
        </button>

        {/* Hero card */}
        {target && (
          <div className="mx-4 rounded-2xl border border-gray-200 bg-hana-bless-bg px-6 py-6 shadow-sm">
            <div className="flex flex-col items-center text-center">
              <div className="mb-3 flex size-14 items-center justify-center rounded-full bg-hana-bless-progress">
                <Heart className="size-7 fill-white text-white" />
              </div>
              <p className="font-hana-medium text-[#568F6E] text-sm">
                To. {target.name}
              </p>
              <h1 className="mt-1 font-hana-bold text-2xl text-[#568F6E]">
                {target.daysOfPrayer}일째
              </h1>
              <p className="font-hana-regular text-[#568F6E] text-sm">
                기도하고 있어요
              </p>
            </div>

            {/* Progress bar */}
            <div className="mt-4 h-2 overflow-hidden rounded-full bg-gray-200">
              <div
                className="h-full rounded-full bg-hana-bless-progress"
                style={{
                  width: `${Math.min((target.daysOfPrayer / 200) * 100, 100)}%`,
                }}
              />
            </div>

            {/* Stats */}
            <div className="mt-2 flex justify-between">
              <div>
                <p className="font-hana-regular text-[10px] text-hana-gray-400">
                  달성률
                </p>
                <p className="font-hana-medium text-gray-700 text-xs">
                  {target.totalAmount.toLocaleString()}원
                </p>
              </div>
              <div className="text-right">
                <p className="font-hana-regular text-[10px] text-hana-gray-400">
                  매일 드리는 마음
                </p>
                <p className="font-hana-medium text-gray-700 text-xs">
                  {target.dailyAmount.toLocaleString()}원
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="flex flex-col gap-6 px-4 pt-6">
          <BibleVerseBox verse={verse} />
          <MessageTextarea value={message} onChange={setMessage} />
        </div>

        <div className="mt-auto px-4 pt-8 pb-6">
          <BlessActionButton onClick={handleNext}>
            다음 단계로
          </BlessActionButton>
        </div>
      </div>
      <Nav />
    </div>
  );
}
