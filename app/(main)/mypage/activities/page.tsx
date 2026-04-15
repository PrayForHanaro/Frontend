'use client';

import { useMemo } from 'react';
import ActivityCard from '@/components/ui/cmm/Activity/ActivityCard';
import Header from '@/components/ui/cmm/Header';
import Nav from '@/components/ui/cmm/Nav';
import { MY_ACTIVITY_LIST } from '@/constants/activity';

export default function MyPageActivities() {
  const myActivities = useMemo(() => {
    return MY_ACTIVITY_LIST;
  }, []);
  //위에 토글 있어야 함.
  return (
    <div className="flex flex-col gap-4">
      <Header content="내 활동" />

      <div className="flex flex-col gap-4">
        {myActivities.length > 0 ? (
          myActivities.map((activity) => (
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
              isApplied={true}
            />
          ))
        ) : (
          <p className="text-center text-gray-400">참여한 활동이 없습니다.</p>
        )}
      </div>

      <Nav />
    </div>
  );
}
