'use client';

import { Crown } from 'lucide-react';

/**
 * @page: 소모임 - 활동 멤버 아바타 컴포넌트
 * @description: 활동 멤버 아바타 컴포넌트입니다. 멤버의 이름과 이니셜을 표시하며, 리더인 경우 왕관 아이콘이 함께 표시됩니다.
 * @author: typeYu
 * @date: 2026-04-14
 */

type ActivityMemberAvatarProps = {
  name: string;
  initial: string;
  isLeader?: boolean;
};

export default function ActivityMemberAvatar({
  name,
  initial,
  isLeader = false,
}: ActivityMemberAvatarProps) {
  return (
    <div className="flex shrink-0 flex-col items-center gap-2">
      <div className="relative flex h-14 w-14 items-center justify-center rounded-full bg-[#E7F4F3]">
        <span className="font-hana-main text-[20px] text-hana-main">
          {initial}
        </span>

        {isLeader ? (
          <div className="absolute right-0 bottom-0">
            <Crown
              size={26}
              aria-hidden="true"
              className="fill-[#F2B63D] text-[#F2B63D]"
              strokeWidth={1.5}
            />
          </div>
        ) : null}
      </div>

      <span className="font-hana-main font-medium text-[#7A7A7A] text-[14px]">
        {name}
      </span>
    </div>
  );
}
