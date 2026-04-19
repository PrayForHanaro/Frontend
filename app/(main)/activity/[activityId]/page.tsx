'use client';

import { CalendarDays, MapPin, Users } from 'lucide-react';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import ActivityAdBanner from '@/components/ui/cmm/Activity/ActivityAdBanner';
import ActivityCommentSection from '@/components/ui/cmm/Activity/ActivityCommentSection';
import ActivityMemberSection from '@/components/ui/cmm/Activity/ActivityMemberSection';
import Header from '@/components/ui/cmm/Header';
import Nav from '@/components/ui/cmm/Nav';
import {
  type ActivityDetail,
  applyActivity,
  getActivity,
} from '@/lib/activity-api';

/**
 * @page: 소모임 - 활동 상세 페이지
 * @description: 활동 상세 페이지입니다. 활동의 제목, 카테고리, 일정, 장소, 인원 등의 정보와 함께 활동에 참여한 멤버 리스트와 댓글 섹션으로 구성되어 있습니다
 * @author: typeYu
 * @date: 2026-04-14
 */

const DEFAULT_IMAGE =
  'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=1200&auto=format&fit=crop';

export default function ActivityId() {
  const params = useParams<{ activityId: string }>();
  const activityId = params.activityId;

  const [detail, setDetail] = useState<ActivityDetail | null>(null);
  const [isBannerVisible, setIsBannerVisible] = useState(false);

  useEffect(() => {
    async function loadActivity() {
      try {
        const nextDetail = await getActivity(activityId);
        setDetail(nextDetail);
      } catch (error) {
        console.error(error);
      }
    }

    loadActivity();

    const timer = window.setTimeout(() => {
      setIsBannerVisible(true);
    }, 2000);

    return () => {
      window.clearTimeout(timer);
    };
  }, [activityId]);

  async function handleApply() {
    const nextDetail = await applyActivity(activityId);
    setDetail(nextDetail);
  }

  function handleMoveGroupAccountGuidePage() {
    window.open(
      'https://www.kebhana.com/cont/mall/mall08/mall0801/mall080103/1524598_115188.jsp',
      '_blank',
      'noopener,noreferrer',
    );
  }

  if (!detail) {
    return <div className="p-5">불러오는 중...</div>;
  }

  return (
    <div className="relative h-full w-full overflow-hidden">
      <div className="scrollbar-hide h-full overflow-y-auto bg-[#F7F8FA] px-5 pt-4 pb-24">
        <Header content="소모임 상세" />
        <div className="mt-4">
          <section className="rounded-2xl bg-white p-5">
            <h1 className="font-hana-main font-semibold text-[#222222] text-[22px]">
              {detail.title}
            </h1>

            <div className="mt-3 flex items-center gap-2">
              <span className="rounded-full bg-[#E7F4F3] px-3 py-1 font-hana-main text-[12px] text-hana-main">
                {detail.category}
              </span>
              <span className="rounded-full bg-[#F1F3F5] px-3 py-1 font-hana-main text-[#666666] text-[12px]">
                {detail.status === 'RECRUITING'
                  ? '모집중'
                  : detail.status === 'CLOSED'
                    ? '마감'
                    : '중단'}
              </span>
            </div>

            <div className="mt-5 flex flex-col gap-3 text-[#444444]">
              <div className="flex items-center gap-2">
                <CalendarDays size={18} />
                <span>{detail.schedule}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin size={18} />
                <span>{detail.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Users size={18} />
                <span>
                  {detail.currentCount}/{detail.maxCount}명
                </span>
              </div>
            </div>

            <div className="relative mt-5 aspect-[16/10] overflow-hidden rounded-2xl">
              <Image
                src={detail.imageUrls[0] || DEFAULT_IMAGE}
                alt={detail.title}
                fill
                className="object-cover"
                unoptimized
              />
            </div>

            <p className="mt-5 whitespace-pre-wrap font-hana-main text-[#444444] text-[15px] leading-6">
              {detail.description}
            </p>
          </section>

          <ActivityMemberSection
            currentCount={detail.currentCount}
            maxCount={detail.maxCount}
            members={detail.members}
            isApplied={detail.isApplied}
            isOwner={detail.isOwner}
            status={detail.status}
            onApply={handleApply}
          />

          <ActivityCommentSection />
        </div>

        <ActivityAdBanner
          isVisible={isBannerVisible}
          onClick={handleMoveGroupAccountGuidePage}
        />
      </div>
      <Nav />
    </div>
  );
}
