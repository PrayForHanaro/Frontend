'use client';

import { CalendarDays, Clock3 } from 'lucide-react';
import { useRef } from 'react';

/**
 * @page: 모임 생성/수정 페이지
 * @description:  모임의 활동 기간을 설정하는 컴포넌트입니다. 일회성 모임과 정기 모임을 모두 지원하며, 정기 모임의 경우 매일, 요일 선택, 매월 옵션을 제공합니다.
 * @author: typeYu
 * @date: 2026-04-14
 */

type MeetingType = 'single' | 'recurring';
type RecurringType = 'daily' | 'weekday' | 'monthly';
type Weekday = '일' | '월' | '화' | '수' | '목' | '금' | '토';

export type ActivityPeriodValue = {
  meetingType: MeetingType;
  recurringType: RecurringType;
  singleDate: string;
  singleTime: string;
  recurringStartDate: string;
  recurringEndDate: string;
  recurringTime: string;
  recurringWeekdays: Weekday[];
  recurringMonthDays: number[];
};

type ActivityPeriodFieldProps = {
  value: ActivityPeriodValue;
  onChangeValue: (nextValue: ActivityPeriodValue) => void;
};

const WEEKDAYS: Weekday[] = ['일', '월', '화', '수', '목', '금', '토'];
const MONTH_DAYS = Array.from({ length: 31 }, (_, number) => number + 1);

function formatDateLabel(value: string) {
  if (!value) {
    return '연도-월-일';
  }

  return value.replaceAll('-', '.');
}

function formatTimeLabel(value: string) {
  if (!value) {
    return '--:--';
  }

  return value;
}

function DateField({
  value,
  onChangeValue,
  ariaLabel,
}: {
  value: string;
  onChangeValue: (value: string) => void;
  ariaLabel: string;
}) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleOpenPicker = () => {
    const inputElement = inputRef.current;

    if (!inputElement) {
      return;
    }

    if (typeof inputElement.showPicker === 'function') {
      inputElement.showPicker();
      return;
    }

    inputElement.focus();
    inputElement.click();
  };

  return (
    <div className="relative w-full">
      <input
        ref={inputRef}
        type="date"
        value={value}
        onChange={(event) => onChangeValue(event.target.value)}
        aria-label={ariaLabel}
        className="pointer-events-none absolute inset-0 opacity-0"
        tabIndex={-1}
      />

      <button
        type="button"
        onClick={handleOpenPicker}
        aria-label={ariaLabel}
        className="flex h-11 w-full items-center justify-between rounded-xl border border-[#DEDEDE] bg-white px-4"
      >
        <span
          className={`font-hana-main text-[16px] ${
            value ? 'text-[#222222]' : 'text-[#9B9B9B]'
          }`}
        >
          {formatDateLabel(value)}
        </span>

        <CalendarDays
          size={18}
          aria-hidden="true"
          className="pointer-events-none text-[#222222]"
        />
      </button>
    </div>
  );
}

function TimeField({
  value,
  onChangeValue,
  ariaLabel,
}: {
  value: string;
  onChangeValue: (value: string) => void;
  ariaLabel: string;
}) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleOpenPicker = () => {
    const inputElement = inputRef.current;

    if (!inputElement) {
      return;
    }

    if (typeof inputElement.showPicker === 'function') {
      inputElement.showPicker();
      return;
    }

    inputElement.focus();
    inputElement.click();
  };

  return (
    <div className="relative w-full">
      <input
        ref={inputRef}
        type="time"
        value={value}
        onChange={(event) => onChangeValue(event.target.value)}
        aria-label={ariaLabel}
        className="pointer-events-none absolute inset-0 opacity-0"
        tabIndex={-1}
      />

      <button
        type="button"
        onClick={handleOpenPicker}
        aria-label={ariaLabel}
        className="flex h-11 w-full items-center justify-between rounded-xl border border-[#DEDEDE] bg-white px-4"
      >
        <span
          className={`font-hana-main text-[16px] ${
            value ? 'text-[#222222]' : 'text-[#9B9B9B]'
          }`}
        >
          {formatTimeLabel(value)}
        </span>

        <Clock3
          size={18}
          aria-hidden="true"
          className="pointer-events-none text-[#222222]"
        />
      </button>
    </div>
  );
}

function MeetingTypeToggle({
  meetingType,
  onChangeMeetingType,
}: {
  meetingType: MeetingType;
  onChangeMeetingType: (value: MeetingType) => void;
}) {
  return (
    <div className="grid w-full grid-cols-2 gap-2">
      <button
        type="button"
        onClick={() => onChangeMeetingType('single')}
        className={`h-11 rounded-xl border font-hana-main font-semibold text-[16px] ${
          meetingType === 'single'
            ? 'border-transparent bg-hana-main text-white'
            : 'border-[#DEDEDE] bg-white text-[#8F8F8F]'
        }`}
      >
        일회성
      </button>

      <button
        type="button"
        onClick={() => onChangeMeetingType('recurring')}
        className={`h-11 rounded-xl border font-hana-main font-semibold text-[16px] ${
          meetingType === 'recurring'
            ? 'border-transparent bg-hana-main text-white'
            : 'border-[#DEDEDE] bg-white text-[#8F8F8F]'
        }`}
      >
        정기모임
      </button>
    </div>
  );
}

function RecurringTypeToggle({
  recurringType,
  onChangeRecurringType,
}: {
  recurringType: RecurringType;
  onChangeRecurringType: (value: RecurringType) => void;
}) {
  return (
    <div className="grid w-full grid-cols-3 gap-2">
      <button
        type="button"
        onClick={() => onChangeRecurringType('daily')}
        className={`h-11 rounded-xl border font-hana-main font-semibold text-[16px] ${
          recurringType === 'daily'
            ? 'border-transparent bg-hana-main text-white'
            : 'border-[#DEDEDE] bg-white text-[#8F8F8F]'
        }`}
      >
        매일
      </button>

      <button
        type="button"
        onClick={() => onChangeRecurringType('weekday')}
        className={`h-11 rounded-xl border font-hana-main font-semibold text-[16px] ${
          recurringType === 'weekday'
            ? 'border-[#222222] bg-[#E7F4F3] text-hana-main'
            : 'border-[#DEDEDE] bg-white text-[#8F8F8F]'
        }`}
      >
        요일 선택
      </button>

      <button
        type="button"
        onClick={() => onChangeRecurringType('monthly')}
        className={`h-11 rounded-xl border font-hana-main font-semibold text-[16px] ${
          recurringType === 'monthly'
            ? 'border-[#3AAFA2] bg-[#E7F4F3] text-hana-main'
            : 'border-[#DEDEDE] bg-white text-[#8F8F8F]'
        }`}
      >
        매월
      </button>
    </div>
  );
}

function WeekdaySelector({
  selectedWeekdays,
  onToggleWeekday,
}: {
  selectedWeekdays: Weekday[];
  onToggleWeekday: (weekday: Weekday) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {WEEKDAYS.map((weekday) => {
        const isSelected = selectedWeekdays.includes(weekday);

        return (
          <button
            key={weekday}
            type="button"
            onClick={() => onToggleWeekday(weekday)}
            className={`flex h-10 w-10 items-center justify-center rounded-full border font-hana-main font-semibold text-[14px] ${
              isSelected
                ? 'border-transparent bg-hana-main text-white'
                : 'border-[#DEDEDE] bg-white text-[#8F8F8F]'
            }`}
          >
            {weekday}
          </button>
        );
      })}
    </div>
  );
}

function MonthlySelector({
  selectedMonthDays,
  onToggleMonthDay,
}: {
  selectedMonthDays: number[];
  onToggleMonthDay: (day: number) => void;
}) {
  const summaryText =
    selectedMonthDays.length > 0
      ? selectedMonthDays.map((day) => `${day}일`).join(', ')
      : '매월 N일';

  return (
    <div className="flex flex-col gap-3">
      <div className="flex min-h-11 items-center rounded-xl border border-[#DEDEDE] bg-white px-4 font-hana-main text-[#9B9B9B] text-[16px]">
        {summaryText}
      </div>

      <div className="flex flex-wrap gap-2">
        {MONTH_DAYS.map((day) => {
          const isSelected = selectedMonthDays.includes(day);

          return (
            <button
              key={day}
              type="button"
              onClick={() => onToggleMonthDay(day)}
              className={`min-w-11 rounded-full border px-3 py-2 font-hana-main font-semibold text-[14px] ${
                isSelected
                  ? 'border-transparent bg-hana-main text-white'
                  : 'border-[#DEDEDE] bg-white text-[#8F8F8F]'
              }`}
            >
              {day}일
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default function ActivityPeriodField({
  value,
  onChangeValue,
}: ActivityPeriodFieldProps) {
  const updateValue = <K extends keyof ActivityPeriodValue>(
    key: K,
    nextValue: ActivityPeriodValue[K],
  ) => {
    onChangeValue({
      ...value,
      [key]: nextValue,
    });
  };

  const handleChangeMeetingType = (nextMeetingType: MeetingType) => {
    onChangeValue({
      ...value,
      meetingType: nextMeetingType,
    });
  };

  const handleChangeRecurringType = (nextRecurringType: RecurringType) => {
    onChangeValue({
      ...value,
      recurringType: nextRecurringType,
    });
  };

  const handleToggleWeekday = (weekday: Weekday) => {
    const nextWeekdays = value.recurringWeekdays.includes(weekday)
      ? value.recurringWeekdays.filter((item) => item !== weekday)
      : [...value.recurringWeekdays, weekday];

    updateValue('recurringWeekdays', nextWeekdays);
  };

  const handleToggleMonthDay = (day: number) => {
    const nextMonthDays = value.recurringMonthDays.includes(day)
      ? value.recurringMonthDays.filter((item) => item !== day)
      : [...value.recurringMonthDays, day].sort((a, b) => a - b);

    updateValue('recurringMonthDays', nextMonthDays);
  };

  return (
    <section className="flex flex-col gap-3">
      <h2 className="font-hana-main font-semibold text-[#1D3050] text-[16px]">
        기간 *
      </h2>

      <MeetingTypeToggle
        meetingType={value.meetingType}
        onChangeMeetingType={handleChangeMeetingType}
      />

      {value.meetingType === 'single' ? (
        <>
          <DateField
            value={value.singleDate}
            onChangeValue={(nextValue) => updateValue('singleDate', nextValue)}
            ariaLabel="일회성 날짜 선택"
          />

          <TimeField
            value={value.singleTime}
            onChangeValue={(nextValue) => updateValue('singleTime', nextValue)}
            ariaLabel="일회성 시간 선택"
          />
        </>
      ) : (
        <>
          <div className="grid grid-cols-2 gap-2">
            <DateField
              value={value.recurringStartDate}
              onChangeValue={(nextValue) =>
                updateValue('recurringStartDate', nextValue)
              }
              ariaLabel="정기모임 시작 날짜 선택"
            />

            <DateField
              value={value.recurringEndDate}
              onChangeValue={(nextValue) =>
                updateValue('recurringEndDate', nextValue)
              }
              ariaLabel="정기모임 종료 날짜 선택"
            />
          </div>

          <RecurringTypeToggle
            recurringType={value.recurringType}
            onChangeRecurringType={handleChangeRecurringType}
          />

          {value.recurringType === 'weekday' ? (
            <WeekdaySelector
              selectedWeekdays={value.recurringWeekdays}
              onToggleWeekday={handleToggleWeekday}
            />
          ) : null}

          {value.recurringType === 'monthly' ? (
            <MonthlySelector
              selectedMonthDays={value.recurringMonthDays}
              onToggleMonthDay={handleToggleMonthDay}
            />
          ) : null}

          <TimeField
            value={value.recurringTime}
            onChangeValue={(nextValue) =>
              updateValue('recurringTime', nextValue)
            }
            ariaLabel="정기모임 시간 선택"
          />
        </>
      )}
    </section>
  );
}
