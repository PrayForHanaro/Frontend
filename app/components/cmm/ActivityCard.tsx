'use client';

import { MapPin, Users } from 'lucide-react';
import type { KeyboardEvent, MouseEvent } from 'react';

import type { ActivityCategory } from '@/constants/activity';
import CategoryTag from './Tag';

/**
 * @page: 소모임 카드
 * @description: 봉사모집, 동행찾기, 교육행사 세 가지 버전
 * @author: typeyu
 * @date: 2026-04-13
 */

type ActivityCardProps = {
  category: ActivityCategory;
  title: string;
  location: string;
  schedule: string;
  currentCount: number;
  maxCount: number;
  point: number;
  onClickAction?: () => void;
  onApplyAction?: () => void;
};

export default function ActivityCard({
  category,
  title,
  location,
  schedule,
  currentCount,
  maxCount,
  point,
  onClickAction,
  onApplyAction,
}: ActivityCardProps) {
  function handleApplyClick(event: MouseEvent<HTMLButtonElement>) {
    event.stopPropagation();
    onApplyAction?.();
  }

  function handleCardKeyDown(event: KeyboardEvent<HTMLElement>) {
    if (!onClickAction) {
      return;
    }

    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onClickAction();
    }
  }

  return (
    <article
      className="w-full rounded-3xl bg-white p-6 hover:scale-102"
      style={{
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
      }}
      onClick={onClickAction}
      onKeyDown={handleCardKeyDown}
      role={onClickAction ? 'button' : undefined}
      tabIndex={onClickAction ? 0 : undefined}
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

        <button
          type="button"
          aria-label={`${title} 신청하기`}
          onClick={handleApplyClick}
          className="h-12 shrink-0 whitespace-nowrap rounded-xl bg-hana-main px-4 font-bold font-hana-main text-[14px] text-white hover:bg-hana-mint"
        >
          신청하기
        </button>
      </div>
    </article>
  );
}
