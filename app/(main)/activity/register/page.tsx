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

  function handleRegisterActivity() {
    if (!isFormValid) {
      return;
    }

    const activityId = Date.now().toString();

    // sessionStorage에 새로운 활동 데이터 저장
    const newActivityData = {
      id: activityId,
      title,
      description,
      periodValue,
      capacity,
      location,
      images: images.map((file) => file.name), // 파일명만 저장
    };

    sessionStorage.setItem('newActivity', JSON.stringify(newActivityData));

    // 활동 목록 페이지로 돌아가기
    router.push('/activity');
  }

  return (
    <div className="flex flex-col gap-4">
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

      <Nav />
    </div>
  );
}
