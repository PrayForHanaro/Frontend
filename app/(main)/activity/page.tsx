'use client';

import { useRouter } from 'next/navigation';
import { useMemo, useState } from 'react';
import ActivityCard from '@/components/ui/cmm/Activity/ActivityCard';
import ActivityJoinToast from '@/components/ui/cmm/Activity/ActivityJoinToast';
import BoardToggle from '@/components/ui/cmm/Activity/BoardToggle';
import Calendar from '@/components/ui/cmm/Activity/Calendar';
import LongButton from '@/components/ui/cmm/Activity/LongBtn';
import SearchInput from '@/components/ui/cmm/Activity/SearchInput';
import Header from '@/components/ui/cmm/Header';
import Nav from '@/components/ui/cmm/Nav';
import { ACTIVITY_LIST, type BoardTab } from '@/constants/activity';

/**
 * @page: 소모임 - 활동 목록 페이지
 * @description:  활동 목록 페이지입니다. 활동 카드 리스트와 활동 등록 페이지로 이동하는 버튼으로 구성되어 있습니다.
 * @author: typeYu
 * @date: 2026-04-14
 */

export default function Activity() {
  const router = useRouter();

  const [selectedTab, setSelectedTab] = useState<BoardTab>('전체');
  const [searchKeyword, setSearchKeyword] = useState('');

  const filteredActivities = useMemo(() => {
    const trimmedKeyword = searchKeyword.trim().toLowerCase();

    const tabFilteredActivities =
      selectedTab === '전체'
        ? ACTIVITY_LIST
        : ACTIVITY_LIST.filter((activity) => activity.category === selectedTab);

    if (!trimmedKeyword) {
      return tabFilteredActivities;
    }

    return tabFilteredActivities.filter((activity) => {
      return (
        activity.title.toLowerCase().includes(trimmedKeyword) ||
        activity.location.toLowerCase().includes(trimmedKeyword) ||
        activity.schedule.toLowerCase().includes(trimmedKeyword) ||
        activity.category.toLowerCase().includes(trimmedKeyword)
      );
    });
  }, [searchKeyword, selectedTab]);

  function handleMoveRegisterPage() {
    router.push('/activity/register');
  }

  return (
    <div className="flex flex-col gap-4">
      <Header content="소모임" />

      <BoardToggle selectedTab={selectedTab} onChangeTab={setSelectedTab} />

      <SearchInput value={searchKeyword} onChangeValue={setSearchKeyword} />

      <div className="flex flex-col gap-4">
        {filteredActivities.map((activity) => (
          <ActivityCard
            key={activity.id}
            id={activity.id}
            category={activity.category}
            title={activity.title}
            location={activity.location}
            schedule={activity.schedule}
            currentCount={activity.currentCount}
            maxCount={activity.maxCount}
            point={activity.point}
            isApplied={false}
          />
        ))}
      </div>

      <LongButton text="활동 만들기" onClick={handleMoveRegisterPage} />

      <Calendar />
      <Nav />
      <ActivityJoinToast />
    </div>
  );
}
