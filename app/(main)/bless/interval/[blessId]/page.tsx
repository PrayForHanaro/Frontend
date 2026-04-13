'use client';

import { Heart, TrendingUp } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import Header from '@/components/ui/cmm/Header';
import Nav from '@/components/ui/cmm/Nav';
import BlessActionButton from '../../_components/bless-action-button';
import DetailTabs from '../../_components/detail-tabs';
import MessageHistoryItem from '../../_components/message-history-item';
import { MOCK_MESSAGES } from '../../_data/mock-messages';
import { MOCK_TARGETS } from '../../_data/mock-targets';

export default function BlessInterval() {
  const { blessId } = useParams<{ blessId: string }>();
  const [activeTab, setActiveTab] = useState<'savings' | 'prayer'>('prayer');

  const target = MOCK_TARGETS.find((t) => t.id === blessId);
  const messages = MOCK_MESSAGES[blessId] ?? [];

  if (!target) {
    return (
      <div className="flex min-h-full items-center justify-center">
        <p className="font-hana-regular text-hana-gray-500">
          대상자를 찾을 수 없습니다.
        </p>
      </div>
    );
  }

  return (
    <div className="relative h-full w-full">
      <div className="flex h-full flex-col overflow-y-auto pb-[70px]">
        <Header content="기도적금" />
        {/* Hero section */}
        <div className="flex flex-col items-center bg-gradient-to-b from-hana-light-green to-white px-6 pt-10 pb-6 text-center">
          <div className="mb-3 flex size-14 items-center justify-center rounded-full bg-hana-complete-bg">
            <Heart className="size-7 fill-hana-main text-hana-main" />
          </div>
          <p className="font-hana-medium text-hana-gray-600 text-sm">
            To. {target.name}
          </p>
          <h1 className="mt-1 font-hana-bold text-2xl text-gray-900">
            {target.daysOfPrayer}일째
          </h1>
          <p className="font-hana-regular text-hana-gray-500 text-sm">
            기도하고 있어요
          </p>

          {/* Stats */}
          <div className="mt-4 flex w-full justify-center gap-8">
            <div className="text-center">
              <p className="font-hana-regular text-hana-gray-500 text-xs">
                달성률
              </p>
              <p className="font-hana-bold text-gray-900 text-lg">
                {target.totalAmount.toLocaleString()}원
              </p>
            </div>
            <div className="text-center">
              <p className="font-hana-regular text-hana-gray-500 text-xs">
                매일 드리는 마음
              </p>
              <p className="font-hana-bold text-gray-900 text-lg">
                {target.dailyAmount.toLocaleString()}원
              </p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <DetailTabs activeTab={activeTab} onTabChange={setActiveTab} />

        {/* Tab content */}
        <div className="flex-1 px-4 pt-4">
          {activeTab === 'savings' ? (
            <div className="flex flex-col items-center gap-4 rounded-2xl bg-hana-gray-100 p-6">
              <TrendingUp className="size-10 text-hana-main" />
              <h3 className="font-hana-bold text-gray-900">하나 사랑적금</h3>
              <p className="font-hana-medium text-hana-main text-sm">
                예적금 +5.0%
              </p>
              <p className="text-center font-hana-regular text-hana-gray-500 text-xs">
                사랑적금 상세 페이지는 추후 구현됩니다.
              </p>
            </div>
          ) : (
            <div className="flex flex-col divide-y divide-hana-gray-200">
              {messages.map((msg, idx) => (
                <MessageHistoryItem
                  key={msg.id}
                  message={msg}
                  dayNumber={target.daysOfPrayer - idx}
                />
              ))}
            </div>
          )}
        </div>

        {/* Bottom CTA */}
        {activeTab === 'prayer' && (
          <div className="px-6 pt-4 pb-2">
            <Link href={`/bless/interval/${blessId}/message`}>
              <BlessActionButton>기도의 말씀을 적어주세요</BlessActionButton>
            </Link>
          </div>
        )}
      </div>
      <Nav />
    </div>
  );
}
