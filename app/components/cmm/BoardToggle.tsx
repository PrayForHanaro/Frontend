'use client';

import { BOARD_TABS, type BoardTab } from '@/constants/activity';

/**
 * @page: 소모임 - 토글 버튼
 * @description: 전체 게시판, 봉사모집, 동행찾기, 교육행사 네 가지 구분
 * @author: typeyu
 * @date: 2026-04-13
 */

type BoardToggleProps = {
  selectedTab: BoardTab;
  onChangeTab: (tab: BoardTab) => void;
};

export default function BoardToggle({
  selectedTab,
  onChangeTab,
}: BoardToggleProps) {
  return (
    <div className="w-full">
      <div
        className="flex h-11 w-full rounded-2xl bg-[#F1EEEA] p-1"
        role="tablist"
        aria-label="게시판 카테고리 선택"
      >
        {BOARD_TABS.map((tab) => {
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
