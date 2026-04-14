'use client';

import { useState } from 'react';

import ActivityPeriodField, {
  type ActivityPeriodValue,
} from '@/components/ui/cmm/Activity/ActivityPeriodField';
import Header from '@/components/ui/cmm/Header';
import Nav from '@/components/ui/cmm/Nav';

/**
 * @page: 소모임 - 활동 등록 페이지
 * @description: 활동 등록 페이지입니다. 제목, 설명글, 활동 기간을 입력받는 폼으로 구성되어 있습니다. 아직 제출 기능은 구현되어 있지 않습니다.
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

export default function ActivityRegister() {
  const [periodValue, setPeriodValue] =
    useState<ActivityPeriodValue>(INITIAL_PERIOD_VALUE);

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
            placeholder="모임명은 짧을 수록 이해하기 쉬워요"
            className="w-full rounded-md border border-[#E5E7EB] bg-white p-4 font-hana-main text-[#222222] text-base outline-none placeholder:text-[#9CA3AF]"
          />
        </section>

        <section className="flex flex-col gap-2">
          <h2 className="font-bold font-hana-main text-[#222222] text-base">
            설명글 *
          </h2>

          <textarea
            placeholder="자세한 설명을 적어주세요"
            className="min-h-[168px] w-full resize-none rounded-md border border-[#E5E7EB] bg-white p-4 font-hana-main text-[#222222] text-base outline-none placeholder:text-[#9CA3AF]"
          />
        </section>

        <ActivityPeriodField
          value={periodValue}
          onChangeValue={setPeriodValue}
        />
      </div>

      <Nav />
    </div>
  );
}
