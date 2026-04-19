'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import ActivityAdBanner from '@/components/ui/cmm/Activity/ActivityAdBanner';
import ActivityCapacityField from '@/components/ui/cmm/Activity/ActivityCapacityField';
import ActivityImageField from '@/components/ui/cmm/Activity/ActivityImageField';
import ActivityLocationField from '@/components/ui/cmm/Activity/ActivityLocationField';
import ActivityPeriodField, {
  type ActivityPeriodValue,
} from '@/components/ui/cmm/Activity/ActivityPeriodField';
import Header from '@/components/ui/cmm/Header';
import LongButton from '@/components/ui/cmm/LongBtn';
import Nav from '@/components/ui/cmm/Nav';
import { createActivity } from '@/lib/activity-api';

/**
 * @page: 소모임 - 활동 등록 페이지
 * @description: 활동 등록 페이지입니다. 제목, 설명글, 활동 기간, 인원, 사진, 장소를 입력받는 폼으로 구성되어 있습니다.
 * @author: typeYu
 * @date: 2026-04-13
 */

const INITIAL_PERIOD_VALUE: ActivityPeriodValue = {
  meetingType: 'single',
  recurringType: 'daily',
  singleDate: '',
  singleTime: '',
  recurringStartDate: '',
  recurringEndDate: '',
  recurringTime: '',
  recurringWeekdays: [],
  recurringMonthDays: [],
};

function isPeriodValid(periodValue: ActivityPeriodValue) {
  if (periodValue.meetingType === 'single') {
    return Boolean(periodValue.singleDate && periodValue.singleTime);
  }

  const hasRecurringBaseValue = Boolean(
    periodValue.recurringStartDate &&
      periodValue.recurringEndDate &&
      periodValue.recurringTime,
  );

  if (!hasRecurringBaseValue) {
    return false;
  }

  if (periodValue.recurringType === 'daily') {
    return true;
  }

  if (periodValue.recurringType === 'weekday') {
    return periodValue.recurringWeekdays.length > 0;
  }

  if (periodValue.recurringType === 'monthly') {
    return periodValue.recurringMonthDays.length > 0;
  }

  return false;
}

export default function ActivityRegister() {
  const router = useRouter();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [periodValue, setPeriodValue] =
    useState<ActivityPeriodValue>(INITIAL_PERIOD_VALUE);
  const [capacity, setCapacity] = useState(2);
  const [images, setImages] = useState<File[]>([]);
  const [location, setLocation] = useState('');
  const [isBannerVisible, setIsBannerVisible] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setIsBannerVisible(true);
    }, 2000);

    return () => {
      window.clearTimeout(timer);
    };
  }, []);

  const isTitleValid = title.trim().length > 0;
  const isDescriptionValid = description.trim().length > 0;
  const isLocationValid = location.trim().length > 0;
  const isCapacityValid = capacity >= 2;
  const isActivityPeriodValid = isPeriodValid(periodValue);

  const isFormValid =
    isTitleValid &&
    isDescriptionValid &&
    isLocationValid &&
    isCapacityValid &&
    isActivityPeriodValid;

  function handleMoveGroupAccountGuidePage() {
    window.open(
      'https://www.kebhana.com/cont/mall/mall08/mall0801/mall080103/1524598_115188.jsp',
      '_blank',
      'noopener,noreferrer',
    );
  }

  async function handleRegisterActivity() {
    if (!isFormValid) {
      return;
    }

    try {
      // 백엔드 가이드: multipart/form-data 통합 전송
      const formData = new FormData();

      // 1. 활동 정보 JSON (Blob 형태로 추가)
      const activityData = {
        category: '동행찾기',
        meetingType: periodValue.meetingType,
        recurringType: periodValue.recurringType,
        title,
        description,
        location,
        maxMembers: capacity,
        pointAmount: 30,
        singleDate: periodValue.singleDate,
        singleTime: periodValue.singleTime,
        recurringStartDate: periodValue.recurringStartDate,
        recurringEndDate: periodValue.recurringEndDate,
        recurringTime: periodValue.recurringTime,
        recurringWeekdays: periodValue.recurringWeekdays,
        recurringMonthDays: periodValue.recurringMonthDays,
        imageUrls: [], // S3 업로드 URL은 백엔드에서 처리
      };

      formData.append(
        'request',
        new Blob([JSON.stringify(activityData)], { type: 'application/json' }),
      );

      // 2. 이미지 파일 리스트 (최대 3장)
      images.forEach((file) => {
        formData.append('files', file);
      });

      const createdActivity = await createActivity(formData);

      // 백엔드 가이드: 응답 데이터에서 id(또는 activityId)를 꺼내어 상세 페이지로 리다이렉트
      // lib/activity-api.ts의 ActivityDetail 타입에 id가 포함되어 있음
      router.push(`/activity/${createdActivity.id}`);
    } catch (error) {
      console.error(error);
      alert('활동 등록에 실패했습니다.');
    }
  }

  return (
    <div className="relative h-full w-full overflow-hidden">
      <div className="scrollbar-hide h-full overflow-y-auto px-4 pb-24">
        <Header content="활동 만들기" />

        <div className="mt-5 flex flex-col gap-6">
          <section className="flex flex-col gap-2">
            <h2 className="font-bold font-hana-main text-[#222222] text-base">
              제목 *
            </h2>

            <input
              type="text"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              placeholder="모임명은 짧을 수록 이해하기 쉬워요"
              className="w-full rounded-md border border-[#E5E7EB] bg-white p-4 font-hana-main text-[#222222] text-base outline-none placeholder:text-[#9CA3AF]"
            />
          </section>

          <section className="flex flex-col gap-2">
            <h2 className="font-bold font-hana-main text-[#222222] text-base">
              설명글 *
            </h2>

            <textarea
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              placeholder="자세한 설명을 적어주세요"
              className="min-h-42 w-full resize-none rounded-md border border-[#E5E7EB] bg-white p-4 font-hana-main text-[#222222] text-base outline-none placeholder:text-[#9CA3AF]"
            />
          </section>

          <ActivityPeriodField
            value={periodValue}
            onChangeValue={setPeriodValue}
          />

          <ActivityCapacityField value={capacity} onChangeValue={setCapacity} />

          <ActivityLocationField value={location} onChangeValue={setLocation} />

          <ActivityImageField value={images} onChangeValue={setImages} />

          <LongButton
            text="등록하기"
            disabled={!isFormValid}
            onClick={handleRegisterActivity}
          />
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
