'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import ActivityCard from '@/components/ui/cmm/Activity/ActivityCard';
import ActivityJoinToast from '@/components/ui/cmm/Activity/ActivityJoinToast';
import BoardToggle from '@/components/ui/cmm/Activity/BoardToggle';
import Calendar from '@/components/ui/cmm/Activity/Calendar';
import SearchInput from '@/components/ui/cmm/Activity/SearchInput';
import Header from '@/components/ui/cmm/Header';
import LongButton from '@/components/ui/cmm/LongBtn';
import Nav from '@/components/ui/cmm/Nav';
import type { ActivityItem, BoardTab } from '@/constants/activity';
import { getActivities } from '@/lib/activity-api';

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
  const [activities, setActivities] = useState<ActivityItem[]>([]);
  const [isToastVisible, setIsToastVisible] = useState(false);

  useEffect(() => {
    async function loadActivities() {
      try {
        const nextActivities = await getActivities();
        setActivities(nextActivities as ActivityItem[]);
      } catch (error) {
        console.error(error);
      }
    }

    loadActivities();

    const joinToastValue = sessionStorage.getItem('activityJoinToast');

    if (joinToastValue === 'true') {
      setIsToastVisible(true);
      sessionStorage.removeItem('activityJoinToast');

      const timer = window.setTimeout(() => {
        setIsToastVisible(false);
      }, 2500);

      return () => {
        window.clearTimeout(timer);
      };
    }
  }, []);

  const filteredActivities = useMemo(() => {
    const trimmedKeyword = searchKeyword.trim().toLowerCase();

    const tabFilteredActivities =
      selectedTab === '전체'
        ? activities
        : activities.filter((activity) => activity.category === selectedTab);

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
  }, [activities, searchKeyword, selectedTab]);

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
            isApplied={activity.isApplied}
            isOwner={activity.isOwner}
            status={activity.status}
          />
        ))}
      </div>

      <LongButton text="활동 만들기" onClick={handleMoveRegisterPage} />

      <Calendar />
      <Nav />
      <ActivityJoinToast isVisible={isToastVisible} />
    </div>
  );
}
