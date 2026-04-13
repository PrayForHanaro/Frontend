'use client';

import { useState } from 'react';

import ActivityPeriodField, {
  type ActivityPeriodValue,
} from '@/app/components/cmm/ActivityPeriodField';
import Header from '@/components/ui/cmm/Header';
import Nav from '@/components/ui/cmm/Nav';

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
