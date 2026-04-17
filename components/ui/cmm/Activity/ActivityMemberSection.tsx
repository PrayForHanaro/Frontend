'use client';

import { useState } from 'react';

import ActivityMemberAvatar from '@/components/ui/cmm/Activity/ActivityMemberAvatar';
import LongButton from '@/components/ui/cmm/LongBtn';

/**
 * @page: 소모임 - 활동 멤버 섹션 컴포넌트
 * @description: 활동 멤버 섹션 컴포넌트입니다. 현재 참여 중인 멤버 리스트와 참여하기 버튼으로 구성되어 있습니다. 참여하기 버튼 클릭 시 참여 확인 모달이 나타납니다.
 * @author: typeYu
 * @date: 2026-04-14
 */

type ActivityMember = {
  id: number;
  name: string;
  initial: string;
  isLeader?: boolean;
};

type ActivityMemberSectionProps = {
  currentCount: number;
  maxCount: number;
  members: ActivityMember[];
  isApplied: boolean;
  isOwner: boolean;
  status: 'RECRUITING' | 'CLOSED' | 'CANCELLED';
  onApply: () => Promise<void>;
};

export default function ActivityMemberSection({
  currentCount,
  maxCount,
  members,
  isApplied,
  isOwner,
  status,
  onApply,
}: ActivityMemberSectionProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isClosed = status !== 'RECRUITING' || currentCount >= maxCount;
  const isDisabled = isSubmitting || isApplied || isOwner || isClosed;

  const buttonText = isOwner
    ? '내가 만든 활동'
    : isApplied
      ? '참여 완료'
      : isClosed
        ? '모집 마감'
        : '참여하기';

  function handleOpenModal() {
    if (isDisabled) {
      return;
    }

    setIsModalOpen(true);
  }

  function handleCloseModal() {
    setIsModalOpen(false);
  }

  async function handleApply() {
    try {
      setIsSubmitting(true);
      await onApply();
      sessionStorage.setItem('activityJoinToast', 'true');
      setIsModalOpen(false);
    } catch (error) {
      console.error(error);
      alert('활동 참여에 실패했습니다.');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <>
      <section className="mt-6 rounded-2xl bg-white p-5">
        <h2 className="font-hana-main font-semibold text-[#222222] text-[18px]">
          팀원 {currentCount}/{maxCount}
        </h2>
        <div className="mt-4 flex flex-col gap-3">
          {members.map((member) => (
            <ActivityMemberAvatar
              key={member.id}
              name={member.name}
              initial={member.initial}
              isLeader={member.isLeader}
            />
          ))}
        </div>
        <div className="mt-5">
          <LongButton
            text={buttonText}
            onClick={handleOpenModal}
            disabled={isDisabled}
          />
        </div>
      </section>

      {isModalOpen ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-5">
          <div className="w-full max-w-sm rounded-2xl bg-white p-6">
            <div className="mb-4 text-center text-3xl">✓</div>
            <h3 className="text-center font-hana-main font-semibold text-[#222222] text-[18px]">
              이 활동에 참여하시겠어요?
            </h3>
            <p className="mt-2 text-center font-hana-main text-[#666666] text-[14px]">
              함께할 준비가 되셨네요.
              <br />
              참여하시겠습니까?
            </p>
            <div className="mt-6 grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={handleCloseModal}
                className="h-12 rounded-xl border border-[#DEDEDE] bg-white font-hana-main font-semibold text-[#666666]"
              >
                닫기
              </button>
              <button
                type="button"
                onClick={handleApply}
                disabled={isSubmitting}
                className="h-12 rounded-xl bg-hana-main font-hana-main font-semibold text-white disabled:opacity-50"
              >
                {isSubmitting ? '처리중...' : '참여하기'}
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
