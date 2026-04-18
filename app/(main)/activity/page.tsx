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
import {
  ACTIVITY_LIST,
  type ActivityItem,
  type BoardTab,
} from '@/constants/activity';

/**
 * @page: 소모임 - 활동 목록 페이지
 * @description:  활동 목록 페이지입니다. 활동 카드 리스트와 활동 등록 페이지로 이동하는 버튼으로 구성되어 있습니다.
 * @author: typeYu
 * @date: 2026-04-14
 */

const JOINED_ACTIVITY_IDS_KEY = 'joinedActivityIds';

function getStoredJoinedActivityIds() {
  if (typeof window === 'undefined') {
    return [] as number[];
  }

  try {
    const stored = sessionStorage.getItem(JOINED_ACTIVITY_IDS_KEY);
    return stored ? (JSON.parse(stored) as number[]) : [];
  } catch {
    return [];
  }
}

function saveJoinedActivityIds(ids: number[]) {
  if (typeof window === 'undefined') {
    return;
  }

  sessionStorage.setItem(JOINED_ACTIVITY_IDS_KEY, JSON.stringify(ids));
}

function formatDateKey(year: number, month: number, day: number) {
  const resolvedMonth = String(month).padStart(2, '0');
  const resolvedDay = String(day).padStart(2, '0');

  return `${year}-${resolvedMonth}-${resolvedDay}`;
}

function parseScheduleToDateKeys(schedule: string) {
  const dateKeys: string[] = [];

  const monthDayMatch = schedule.match(/(\d{1,2})\.(\d{1,2})/);
  if (monthDayMatch) {
    const month = Number(monthDayMatch[1]);
    const day = Number(monthDayMatch[2]);
    dateKeys.push(formatDateKey(2026, month, day));
    return dateKeys;
  }

  const monthDayTextMatch = schedule.match(/(\d{1,2})월\s*(\d{1,2})일/);
  if (monthDayTextMatch) {
    const month = Number(monthDayTextMatch[1]);
    const day = Number(monthDayTextMatch[2]);
    dateKeys.push(formatDateKey(2026, month, day));
    return dateKeys;
  }

  const secondWeekMatch = schedule.match(/(\d{1,2})월\s*둘째\s*주/);
  if (secondWeekMatch) {
    const month = Number(secondWeekMatch[1]);
    dateKeys.push(formatDateKey(2026, month, 10));
    return dateKeys;
  }

  return dateKeys;
}

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

function getActivityDateKeys(activity: ActivityItem) {
  return parseScheduleToDateKeys(activity.schedule);
}

function buildEventsFromActivities(activities: ActivityItem[]) {
  return activities.reduce(
    (events, activity) => {
      if (!activity.isApplied) {
        return events;
      }

      getActivityDateKeys(activity).forEach((key) => {
        const existing = events[key] ?? [];
        events[key] = Array.from(new Set([...existing, 'smallGroup']));
      });

      return events;
    },
    {} as Record<string, Array<'smallGroup'>>,
  );
}

type NewActivityData = {
  id: string;
  title: string;
  description: string;
  periodValue: ActivityPeriodValue;
  capacity: number;
  location: string;
  images: string[];
};

export default function Activity() {
  const router = useRouter();

  const [selectedTab, setSelectedTab] = useState<BoardTab>('전체');
  const [searchKeyword, setSearchKeyword] = useState('');
  const [activities, setActivities] = useState<ActivityItem[]>(ACTIVITY_LIST);

  useEffect(() => {
    const joinedIds = getStoredJoinedActivityIds();
    const hydratedActivities = ACTIVITY_LIST.map((activity) => ({
      ...activity,
      isApplied: joinedIds.includes(activity.id),
    }));

    const newActivityData = sessionStorage.getItem('newActivity');
    if (newActivityData) {
      try {
        const newActivity = JSON.parse(newActivityData) as NewActivityData;

        const formattedActivity: ActivityItem = {
          id: parseInt(newActivity.id, 10),
          category: '동행찾기',
          title: newActivity.title,
          location: newActivity.location,
          schedule: formatSchedule(newActivity.periodValue),
          currentCount: 1,
          maxCount: newActivity.capacity,
          point: 30,
          isApplied: true,
          isOwner: true,
          status: 'RECRUITING' as const,
        };

        setActivities([formattedActivity, ...hydratedActivities]);
      } catch (error) {
        console.error('Failed to parse newActivity:', error);
        setActivities(hydratedActivities);
      }

      return;
    }

    setActivities(hydratedActivities);
  }, []);

  const handleToggleApply = (activityId: number, nextIsApplied: boolean) => {
    setActivities((prevActivities) =>
      prevActivities.map((activity) => {
        if (activity.id !== activityId) {
          return activity;
        }

        return {
          ...activity,
          isApplied: nextIsApplied,
          currentCount: nextIsApplied
            ? activity.currentCount + 1
            : Math.max(activity.currentCount - 1, 0),
        };
      }),
    );

    const joinedIds = getStoredJoinedActivityIds();
    const nextIds = nextIsApplied
      ? Array.from(new Set([...joinedIds, activityId]))
      : joinedIds.filter((id) => id !== activityId);

    saveJoinedActivityIds(nextIds);

    if (nextIsApplied) {
      sessionStorage.setItem('activityJoinToast', 'true');
    }
  };

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

  const calendarEvents = useMemo<Partial<Record<string, string[]>>>(() => {
    return buildEventsFromActivities(activities);
  }, [activities]);

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
            onToggleApply={handleToggleApply}
          />
        ))}
      </div>

      <LongButton text="활동 만들기" onClick={handleMoveRegisterPage} />

      <Calendar events={calendarEvents} />
      <ActivityJoinToast />
    </div>
  );
}
