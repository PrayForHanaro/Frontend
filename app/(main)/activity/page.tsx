'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import ActivityCard from '@/components/ui/cmm/Activity/ActivityCard';
import ActivityJoinToast from '@/components/ui/cmm/Activity/ActivityJoinToast';
import type { ActivityPeriodValue } from '@/components/ui/cmm/Activity/ActivityPeriodField';
import BoardToggle from '@/components/ui/cmm/Activity/BoardToggle';
import Calendar from '@/components/ui/cmm/Activity/Calendar';
import SearchInput from '@/components/ui/cmm/Activity/SearchInput';
import Header from '@/components/ui/cmm/Header';
import LongButton from '@/components/ui/cmm/LongBtn';
import Nav from '@/components/ui/cmm/Nav';
import {
  ACTIVITY_LIST,
  type ActivityItem,
  type BoardTab,
} from '@/constants/activity';

type NewActivityData = {
  id: string;
  title: string;
  description: string;
  periodValue: ActivityPeriodValue;
  capacity: number;
  location: string;
  images: string[];
};

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
  const [activities, setActivities] = useState<ActivityItem[]>(ACTIVITY_LIST);

  // sessionStorage에서 새로운 활동 데이터를 로드
  useEffect(() => {
    const newActivityData = sessionStorage.getItem('newActivity');
    if (newActivityData) {
      try {
        const newActivity = JSON.parse(newActivityData) as NewActivityData;

        // 새로운 활동 객체 생성 (활동 목록 형식에 맞춤)
        const formattedActivity: ActivityItem = {
          id: parseInt(newActivity.id, 10),
          category: '동행찾기', // 기본값으로 동행찾기로 설정
          title: newActivity.title,
          location: newActivity.location,
          schedule: formatSchedule(newActivity.periodValue),
          currentCount: 1,
          maxCount: newActivity.capacity,
          point: 30, // 기본값
          isApplied: true,
          isOwner: true,
          status: 'RECRUITING' as const,
        };

        // 기존 활동 목록에 새 활동 추가 (맨 앞에)
        setActivities([formattedActivity, ...ACTIVITY_LIST]);
      } catch (error) {
        console.error('Failed to parse newActivity:', error);
      }
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
  }, [searchKeyword, selectedTab, activities]);

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
      <ActivityJoinToast />
    </div>
  );
}

// periodValue를 읽기 좋은 문자열로 변환하는 헬퍼 함수
function formatSchedule(periodValue: ActivityPeriodValue): string {
  if (periodValue.meetingType === 'single') {
    return `${periodValue.singleDate} ${periodValue.singleTime}`;
  }

  if (periodValue.recurringType === 'daily') {
    return `매일 ${periodValue.recurringStartDate} ~ ${periodValue.recurringEndDate}`;
  }

  if (periodValue.recurringType === 'weekday') {
    const days = periodValue.recurringWeekdays.join(', ');
    return `매주 ${days} ${periodValue.recurringStartDate} ~ ${periodValue.recurringEndDate}`;
  }

  if (periodValue.recurringType === 'monthly') {
    const dates = periodValue.recurringMonthDays.join(', ');
    return `매월 ${dates}일 ${periodValue.recurringStartDate} ~ ${periodValue.recurringEndDate}`;
  }

  return '날짜 미정';
}
