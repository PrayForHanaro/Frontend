'use client';

import { MapPin, Users } from 'lucide-react';

import type { ActivityCategory } from '@/constants/activity';
import { getActivityMode } from '@/utils/activity/getActivityMode';
import ApplyButton from './ApplyButton';
import CategoryTag from './Tag';

/**
 * @page: 소모임 카드
 * @description: 봉사모집, 동행찾기, 교육행사 세 가지 버전
 * @author: typeyu
 * @date: 2026-04-13
 */

type ActivityCardProps = {
  id: number;
  category: ActivityCategory;
  title: string;
  location: string;
  schedule: string;
  currentCount: number;
  maxCount: number;
  point: number;
  isApplied: boolean;
  isOwner: boolean;
  status: 'RECRUITING' | 'CLOSED' | 'CANCELLED';
};

export default function ActivityCard({
  id,
  category,
  title,
  location,
  schedule,
  currentCount,
  maxCount,
  point,
  isApplied,
  isOwner,
  status,
}: ActivityCardProps) {
  
  const mode = getActivityMode({
    isApplied,
    isOwner,
  });

  const isInactive = status !== 'RECRUITING';

  return (
    <article
      className={`w-full rounded-3xl p-6 transition ${
        isInactive ? 'bg-gray-100 opacity-60' : 'bg-white hover:scale-102'
      }`}
      style={{
        boxShadow: isInactive ? 'none' : '0 4px 20px rgba(0, 0, 0, 0.08)',
      }}
      aria-label={`${title} 활동 카드`}
    >
      <div className="mb-2">
        <CategoryTag label={category} />
      </div>

      <h3 className="font-bold font-hana-main text-[#1D3050] text-[18px] leading-[1.4]">
        {title}
      </h3>

      <div className="mt-2 flex items-center gap-1.5 text-[#909090]">
        <MapPin
          size={16}
          strokeWidth={2.2}
          aria-hidden="true"
          className="shrink-0"
        />

        <span className="font-hana-main font-medium text-[14px] leading-none">
          {location} | {schedule}
        </span>
      </div>

      <div className="mt-2 flex items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3">
          <span className="flex items-center gap-1.5 font-hana-main font-medium text-[#1D3050] text-[14px]">
            <Users
              size={16}
              strokeWidth={2.2}
              aria-hidden="true"
              className="shrink-0"
            />
            {currentCount}/{maxCount}명
          </span>

          <CategoryTag label="포인트" text={`+${point}포인트`} />
        </div>

        <ApplyButton activityId={id} mode={mode} />
      </div>
    </article>
  );
}
