'use client';

import { useRouter } from 'next/navigation';
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
  activityId?: number;
};

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

export default function ActivityMemberSection({
  currentCount,
  maxCount,
  members,
  activityId,
}: ActivityMemberSectionProps) {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);

  function handleOpenModal() {
    setIsModalOpen(true);
  }

  function handleCloseModal() {
    setIsModalOpen(false);
  }

  function handleMoveActivity() {
    if (activityId && activityId > 0) {
      const joinedIds = getStoredJoinedActivityIds();
      const nextIds = Array.from(new Set([...joinedIds, activityId]));
      saveJoinedActivityIds(nextIds);
    }

    sessionStorage.setItem('activityJoinToast', 'true');
    setIsModalOpen(false);
    router.push('/activity');
  }

  return (
    <>
      <section
        className="w-full rounded-[24px] bg-white p-6"
        style={{
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
        }}
      >
        <div className="flex flex-col gap-6">
          <h2 className="font-bold font-hana-main text-[#1D3050] text-[18px]">
            팀원 {currentCount}/{maxCount}
          </h2>

          <div className="member-horizontal-scroll overflow-x-auto pb-2">
            <div className="flex min-w-max items-start gap-6 pr-2">
              {members.map((member) => (
                <ActivityMemberAvatar
                  key={member.id}
                  name={member.name}
                  initial={member.initial}
                  isLeader={member.isLeader}
                />
              ))}
            </div>
          </div>

          <LongButton text="참여하기" onClick={handleOpenModal} />
        </div>
      </section>

      {isModalOpen ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 px-5">
          <div className="w-full max-w-sm rounded-[28px] bg-white px-6 py-7 shadow-[0_12px_40px_rgba(0,0,0,0.18)]">
            <div className="flex flex-col items-center text-center">
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#E7F4F3]">
                <span
                  className="font-hana-main text-[26px] text-hana-main leading-none"
                  aria-hidden="true"
                >
                  ✓
                </span>
              </div>

              <h3 className="font-bold font-hana-main text-[#1D3050] text-[20px]">
                이 활동에 참여하시겠어요?
              </h3>

              <p className="mt-2 break-keep font-hana-main text-[#5B6573] text-[15px] leading-6">
                함께할 준비가 되셨네요.
                <br />
                참여하시겠습니까?
              </p>

              <div className="mt-6 flex w-full gap-3">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="h-12 flex-1 rounded-2xl border border-[#D7E2E0] bg-white font-hana-main text-[#4B5563] text-[16px] transition hover:bg-[#F8FAFA]"
                >
                  닫기
                </button>

                <button
                  type="button"
                  onClick={handleMoveActivity}
                  className="h-12 flex-1 rounded-2xl bg-hana-main font-hana-main text-[16px] text-white transition hover:bg-hana-mint"
                >
                  참여하기
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
