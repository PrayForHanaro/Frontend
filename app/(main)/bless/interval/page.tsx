'use client';

import { Plus } from 'lucide-react';
import Nav from '@/components/ui/cmm/Nav';
import BlessHeader from '../_components/bless-header';
import TargetListItem from '../_components/target-list-item';
import { MOCK_TARGETS } from '../_data/mock-targets';

export default function BlessIntervalList() {
  return (
    <div className="relative h-full w-full">
      <div className="flex h-full flex-col overflow-y-auto bg-hana-bless-bg pb-[70px]">
        <BlessHeader
          greeting="안녕하세요, 순범님."
          title="적금 가입으로"
          subtitle="사랑하는 사람에게 기도와 마음을 전해보세요."
        />

        {/* Progress bar */}
        <div className="mx-5 h-1 rounded-full bg-hana-bless-progress" />

        <p className="px-5 pt-5 pb-2 font-hana-medium text-gray-900 text-sm">
          OO님이 기도드리며 적금하는 사람들이에요
        </p>

        <div className="flex flex-col">
          {MOCK_TARGETS.map((target) => (
            <TargetListItem key={target.id} target={target} />
          ))}
        </div>

        <div className="flex justify-center py-4">
          <button
            type="button"
            onClick={() => alert('대상자 추가 기능은 추후 구현됩니다')}
            className="flex size-10 items-center justify-center rounded-full border border-hana-gray-300 bg-[#1C3D69] text-white"
            aria-label="대상자 추가"
          >
            <Plus className="size-5" />
          </button>
        </div>
      </div>
      <Nav />
    </div>
  );
}
