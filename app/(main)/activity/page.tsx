'use client';

import { useState } from 'react';

import ActivityCard from '@/app/components/cmm/ActivityCard';
import BoardToggle from '@/app/components/cmm/BoardToggle';
import Calendar from '@/app/components/cmm/Calendar';
import LongButton from '@/app/components/cmm/LongBtn';
import SearchInput from '@/app/components/cmm/SearchInput';
import { ACTIVITY_LIST, type BoardTab } from '@/constants/activity';

/**
 * @page: 소모임 메인 페이지
 * @description: 소모임 메인 페이지입니다. 게시판 토글, 검색창, 활동 카드 리스트, 활동 만들기 버튼, 캘린더로 구성되어 있습니다.
 * @author: typeYu
 * @date: 2026-04-13
 */

export default function Activity() {
  const [selectedTab, setSelectedTab] = useState<BoardTab>('전체');

  const filteredActivities =
    selectedTab === '전체'
      ? ACTIVITY_LIST
      : ACTIVITY_LIST.filter((activity) => activity.category === selectedTab);

  return (
    <div className="flex flex-col gap-4">
      <BoardToggle selectedTab={selectedTab} onChangeTab={setSelectedTab} />

      <SearchInput />

      <div className="flex flex-col gap-4">
        {filteredActivities.map((activity) => (
          <ActivityCard
            key={`${activity.category}-${activity.title}`}
            category={activity.category}
            title={activity.title}
            location={activity.location}
            schedule={activity.schedule}
            currentCount={activity.currentCount}
            maxCount={activity.maxCount}
            point={activity.point}
          />
        ))}
      </div>

      <LongButton text="활동 만들기" />
      <Calendar />
    </div>
  );
}
