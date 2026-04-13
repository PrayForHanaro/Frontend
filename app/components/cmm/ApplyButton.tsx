'use client';

import { useRouter } from 'next/navigation';

/**
 * @page: 소모임 - 신청하기 버튼
 * @description: 활동 카드에서 신청하기 버튼으로 쓰이는 컴포넌트입니다. isApplied prop이 true면 신청 완료된 상태로 보이도록 스타일이 바뀝니다.
 * @author: typeYu
 * @date: 2026-04-13
 */

type ApplyButtonProps = {
  activityId: number;
  isApplied?: boolean;
};

export default function ApplyButton({
  activityId,
  isApplied = false,
}: ApplyButtonProps) {
  const router = useRouter();

  function handleClick() {
    router.push(`/activity/${activityId}`);
  }

  return (
    <button
      type="button"
      aria-label="활동 신청하기"
      onClick={handleClick}
      className={`h-12 shrink-0 whitespace-nowrap rounded-xl px-4 font-bold font-hana-main text-[14px] text-white ${
        isApplied ? 'bg-hana-pink' : 'bg-hana-main hover:bg-hana-mint'
      }`}
    >
      신청하기
    </button>
  );
}
