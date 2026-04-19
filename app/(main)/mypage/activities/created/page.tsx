'use client';

import { useMemo, useState } from 'react';
import ActivityCard from '@/components/ui/cmm/Activity/ActivityCard';
import ActivityJoinToast from '@/components/ui/cmm/Activity/ActivityJoinToast';
import SearchInput from '@/components/ui/cmm/Activity/SearchInput';
import Header from '@/components/ui/cmm/Header';
import Nav from '@/components/ui/cmm/Nav';
import { MY_ACTIVITY_LIST } from '@/constants/activity';

export default function MyPageActivities() {
  const [searchKeyword, setSearchKeyword] = useState('');

  const filteredActivities = useMemo(() => {
    const trimmedKeyword = searchKeyword.trim().toLowerCase();

    const tabFilteredActivities = MY_ACTIVITY_LIST;

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
  }, [searchKeyword]);

  return (
    <div className="relative h-full w-full overflow-hidden">
      <div className="scrollbar-hide h-full overflow-y-auto px-4 pb-24">
        <div className="flex flex-col gap-4">
          <Header content="내가 만든 활동" />

          <SearchInput value={searchKeyword} onChangeValue={setSearchKeyword} />

          <div className="flex flex-col gap-4">
            {filteredActivities.length > 0 ? (
              filteredActivities.map((activity) => (
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
              ))
            ) : (
              <p className="text-center text-gray-400">활동이 없습니다.</p>
            )}
          </div>
        </div>
      </div>
      <Nav />
      <ActivityJoinToast />
    </div>
  );
}
