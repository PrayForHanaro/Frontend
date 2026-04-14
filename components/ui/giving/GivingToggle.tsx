'use client';

import { GIVING_TABS, type GivingTab } from '@/constants/giving';

/**
 * @page: 헌금 - 토글 버튼
 * @description: 정기 헌금, 연금 연계, 헌금 내역 세 가지 구분
 * @author: typeYu
 * @date: 2026-04-14
 */

type GivingToggleProps = {
  selectedTab: GivingTab;
  onChangeTab: (tab: GivingTab) => void;
};

export default function GivingToggle({
  selectedTab,
  onChangeTab,
}: GivingToggleProps) {
  return (
    <div className="w-full pt-3">
      <div
        className="flex h-11 w-full rounded-2xl bg-[#F1EEEA] p-1"
        role="tablist"
        aria-label="헌금 카테고리 선택"
      >
        {GIVING_TABS.map((tab) => {
          const isActive = selectedTab === tab;

          return (
            <button
              key={tab}
              type="button"
              role="tab"
              aria-selected={isActive}
              aria-label={`${tab} 보기`}
              onClick={() => onChangeTab(tab)}
              className={`flex h-full min-w-0 flex-1 items-center justify-center whitespace-nowrap rounded-2xl text-center font-hana-light text-[14px] leading-none transition ${
                isActive
                  ? 'fade-in animate-in bg-hana-main text-white shadow-sm'
                  : 'bg-transparent text-[#9B9B9B]'
              }`}
            >
              {tab}
            </button>
          );
        })}
      </div>
    </div>
  );
}
