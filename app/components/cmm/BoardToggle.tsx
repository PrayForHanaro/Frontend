'use client';

import { useState } from 'react';

type BoardTab = '전체' | '봉사모집' | '동행찾기' | '교회행사';

type BoardToggleProps = {
  defaultTab?: BoardTab;
  onChangeTab?: (tab: BoardTab) => void;
};

const BOARD_TABS: BoardTab[] = ['전체', '봉사모집', '동행찾기', '교회행사'];

export default function BoardToggle({
  defaultTab = '전체',
  onChangeTab,
}: BoardToggleProps) {
  const [selectedTab, setSelectedTab] = useState<BoardTab>(defaultTab);

  function handleClick(tab: BoardTab) {
    setSelectedTab(tab);
    onChangeTab?.(tab);
  }

  return (
    <div className="w-full">
      <div
        className="flex h-[44px] w-full rounded-[12px] bg-[#F1EEEA] p-1"
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
              onClick={() => handleClick(tab)}
              className={`flex h-full min-w-0 flex-1 items-center justify-center whitespace-nowrap rounded-[12px] text-center font-hana-light text-[14px] text-base leading-none transition ${
                isActive
                  ? 'bg-hana-main text-white shadow-sm'
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
