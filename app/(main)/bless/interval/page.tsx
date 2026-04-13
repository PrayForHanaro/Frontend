'use client';

import { Plus } from 'lucide-react';
import BlessHeader from '../_components/bless-header';
import TargetListItem from '../_components/target-list-item';
import { MOCK_TARGETS } from '../_data/mock-targets';

export default function BlessIntervalList() {
  return (
    <div className="flex min-h-full flex-col pb-20">
      <BlessHeader
        greeting="안녕하세요, 순범님"
        title="적금 가입으로"
        subtitle="사랑하는 사람에게 기도와 마음을 전해보세요."
      />

      <div className="flex items-center justify-between px-5 pt-6 pb-2">
        <p className="font-hana-medium text-gray-900 text-sm">
          OO님이 기도드리며 적금하는 사람들이에요
        </p>
        <button
          type="button"
          disabled
          className="flex size-7 items-center justify-center rounded-full bg-hana-main text-white opacity-50"
          aria-label="대상자 추가"
        >
          <Plus className="size-4" />
        </button>
      </div>

      <div className="flex flex-col">
        {MOCK_TARGETS.map((target) => (
          <TargetListItem key={target.id} target={target} />
        ))}
      </div>
    </div>
  );
}
