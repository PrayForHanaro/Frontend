'use client';

import { CalendarDays, MapPin, Users } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';

import ActivityAdBanner from '@/components/ui/cmm/Activity/ActivityAdBanner';
import ActivityCommentSection from '@/components/ui/cmm/Activity/ActivityCommentSection';
import ActivityMemberSection from '@/components/ui/cmm/Activity/ActivityMemberSection';
import Header from '@/components/ui/cmm/Header';
import Nav from '@/components/ui/cmm/Nav';

/**
 * @page: 소모임 - 활동 상세 페이지
 * @description: 활동 상세 페이지입니다. 활동의 제목, 카테고리, 일정, 장소, 인원 등의 정보와 함께 활동에 참여한 멤버 리스트와 댓글 섹션으로 구성되어 있습니다
 * @author: typeYu
 * @date: 2026-04-14
 */

const MEMBERS = [
  {
    id: 1,
    name: '김승빈',
    initial: '김',
    isLeader: true,
  },
  {
    id: 2,
    name: '이장수',
    initial: '이',
  },
  {
    id: 3,
    name: '이동한',
    initial: '이',
  },
  {
    id: 4,
    name: '권신범',
    initial: '권',
  },
  {
    id: 5,
    name: '유지연',
    initial: '유',
  },
];

export default function ActivityId() {
  const [isBannerVisible, setIsBannerVisible] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setIsBannerVisible(true);
    }, 2000);

    return () => {
      window.clearTimeout(timer);
    };
  }, []);

  return (
    <div className="flex flex-col gap-4 pb-20">
      <Header content="동행찾기" />

      <section
        className="w-full rounded-4xl bg-white p-4"
        style={{
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
        }}
      >
        <div className="flex flex-col gap-4">
          <h1 className="font-bold font-hana-regular text-[#1D3050] text-[24px] leading-[1.35]">
            봄꽃 구경 겸 나들이 가요^^
          </h1>

          <div className="flex items-center gap-2">
            <span className="rounded-full bg-[#E7F4F3] px-3 py-1 font-hana-regular font-semibold text-[14px] text-hana-main">
              일회성
            </span>

            <span className="rounded-full bg-[#EAF6E8] px-3 py-1 font-hana-regular font-semibold text-[#6FAE63] text-[14px]">
              모집중
            </span>
          </div>

          <div className="flex flex-col gap-3 text-[#7E7E7E]">
            <div className="flex items-center gap-3">
              <CalendarDays
                size={20}
                strokeWidth={2}
                aria-hidden="true"
                className="shrink-0"
              />
              <span className="font-hana-regular font-medium text-[#4A4A4A] text-[16px]">
                4월 둘째주
              </span>
            </div>

            <div className="flex items-center gap-3">
              <MapPin
                size={20}
                strokeWidth={2}
                aria-hidden="true"
                className="shrink-0"
              />
              <span className="font-hana-regular font-medium text-[#4A4A4A] text-[16px]">
                종로구
              </span>
            </div>

            <div className="flex items-center gap-3">
              <Users
                size={20}
                strokeWidth={2}
                aria-hidden="true"
                className="shrink-0"
              />
              <span className="font-hana-regular font-medium text-[#1D3050] text-[16px]">
                5/12명
              </span>
            </div>
          </div>

          <div className="overflow-hidden rounded-3xl">
            <Image
              src="/background.svg"
              alt="봄꽃 풍경 이미지"
              width={800}
              height={520}
              className="h-auto w-full object-cover"
              priority
            />
          </div>

          <p className="font-hana-regular text-[#4A4A4A] text-[18px] leading-[1.6]">
            종로구에서 봄꽃 구경하며 함께 산책할 분을 찾습니다~
          </p>
        </div>
      </section>

      <ActivityMemberSection currentCount={5} maxCount={12} members={MEMBERS} />

      <ActivityCommentSection />

      <ActivityAdBanner isVisible={isBannerVisible} />

      <Nav />
    </div>
  );
}
