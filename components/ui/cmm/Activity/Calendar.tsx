'use client';

import { ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import ScheduleAddModal, {
  type ScheduleCategory,
} from '@/components/ui/cmm/ScheduleAddModal';

/**
 * @page: Calendar Component
 * @description: 캘린더 컴포넌트입니다.
 * @author: typeYu
 * @date: 2026-04-18
 */

type CalendarView = 'month' | 'week';
type EventType = 'church' | 'smallGroup' | 'personal';

type CalendarProps = {
  year?: number;
  month?: number;
  view?: CalendarView;
  selectedDate?: number;
  events?: Partial<Record<string, string[]>>;
  onPrevMonth?: () => void;
  onNextMonth?: () => void;
  onSelectDate?: (date: number) => void;
  onChangeView?: (view: CalendarView) => void;
};

type CalendarEventItem = {
  id: string;
  date: string;
  type: EventType;
  title: string;
  categoryLabel: string;
};

const DAY_LABELS = ['일', '월', '화', '수', '목', '금', '토'];

const EVENT_META = {
  church: {
    dotClassName: 'bg-hana-main',
    barClassName: 'bg-hana-main',
    label: '교회',
  },
  smallGroup: {
    dotClassName: 'bg-[#F59E0B]',
    barClassName: 'bg-[#F59E0B]',
    label: '소모임',
  },
  personal: {
    dotClassName: 'bg-[#7C3AED]',
    barClassName: 'bg-[#7C3AED]',
    label: '개인 일정',
  },
} as const;

function buildCalendarDays(year: number, month: number) {
  const firstDay = new Date(year, month - 1, 1).getDay();
  const lastDate = new Date(year, month, 0).getDate();
  const totalCells = Math.ceil((firstDay + lastDate) / 7) * 7;

  return Array.from({ length: totalCells }, (_, index) => {
    const date = index - firstDay + 1;

    if (date < 1 || date > lastDate) {
      return null;
    }

    return date;
  });
}

function buildWeekDays(days: Array<number | null>, selectedDate: number) {
  const selectedIndex = days.findIndex((day) => day === selectedDate);
  const weekIndex = selectedIndex === -1 ? 0 : Math.floor(selectedIndex / 7);
  const startIndex = weekIndex * 7;

  return days.slice(startIndex, startIndex + 7);
}

function formatDateKey(year: number, month: number, date: number) {
  const resolvedMonth = String(month).padStart(2, '0');
  const resolvedDate = String(date).padStart(2, '0');

  return `${year}-${resolvedMonth}-${resolvedDate}`;
}

function parseDateKey(value: string) {
  const [year, month, date] = value.split('-').map(Number);

  if (!year || !month || !date) {
    return null;
  }

  return { year, month, date };
}

function formatDetailDateLabel(dateKey: string) {
  const parsedDate = parseDateKey(dateKey);

  if (!parsedDate) {
    return '';
  }

  return `${parsedDate.month}월 ${parsedDate.date}일`;
}

function buildDefaultScheduleItems(year: number, month: number) {
  return [
    {
      id: `default-${year}-${month}-18`,
      date: formatDateKey(year, month, 18),
      type: 'church' as const,
      title: '새벽기도',
      categoryLabel: '교회',
    },
    {
      id: `default-${year}-${month}-20`,
      date: formatDateKey(year, month, 20),
      type: 'smallGroup' as const,
      title: '1시 점심 약속',
      categoryLabel: '소모임',
    },
    {
      id: `default-${year}-${month}-24`,
      date: formatDateKey(year, month, 24),
      type: 'personal' as const,
      title: '큐티 시간',
      categoryLabel: '개인 일정',
    },
  ];
}

function mergeEventMaps(
  externalEvents: Partial<Record<string, string[]>>,
  internalEvents: Partial<Record<number, EventType[]>>,
  year: number,
  month: number,
) {
  const mergedMap: Partial<Record<number, EventType[]>> = {};

  const externalEntries = Object.entries(externalEvents);
  const keys = new Set<number>([
    ...Object.keys(internalEvents).map(Number),
    ...externalEntries
      .map(([key]) => {
        const parsed = parseDateKey(key);
        if (parsed && parsed.year === year && parsed.month === month) {
          return parsed.date;
        }

        const numericKey = Number(key);
        return Number.isNaN(numericKey) ? null : numericKey;
      })
      .filter((value): value is number => value !== null),
  ]);

  keys.forEach((key) => {
    const externalValues = externalEntries.find(([entryKey]) => {
      const parsed = parseDateKey(entryKey);
      if (parsed) {
        return (
          parsed.year === year && parsed.month === month && parsed.date === key
        );
      }
      return Number(entryKey) === key;
    });

    const values = [
      ...(externalValues ? (externalValues[1] as EventType[]) : []),
      ...(internalEvents[key] ?? []),
    ];

    mergedMap[key] = Array.from(new Set(values));
  });

  return mergedMap;
}

function buildEventMapByMonth(
  items: CalendarEventItem[],
  year: number,
  month: number,
) {
  const eventMap: Partial<Record<number, EventType[]>> = {};

  items.forEach((item) => {
    const parsedDate = parseDateKey(item.date);

    if (!parsedDate) {
      return;
    }

    if (parsedDate.year !== year || parsedDate.month !== month) {
      return;
    }

    const currentItems = eventMap[parsedDate.date] ?? [];

    eventMap[parsedDate.date] = Array.from(
      new Set([...currentItems, item.type]),
    );
  });

  return eventMap;
}

function getLastDateOfMonth(year: number, month: number) {
  return new Date(year, month, 0).getDate();
}

function CalendarHeader({
  year,
  month,
  view,
  onPrevMonth,
  onNextMonth,
  onChangeView,
}: {
  year: number;
  month: number;
  view: CalendarView;
  onPrevMonth: () => void;
  onNextMonth: () => void;
  onChangeView: (view: CalendarView) => void;
}) {
  return (
    <div className="mb-4 flex items-center justify-between">
      <div className="flex items-center gap-1">
        <button
          type="button"
          aria-label="이전 달 보기"
          onClick={onPrevMonth}
          className="flex size-8 items-center justify-center rounded-full text-hana-black transition-colors hover:bg-gray-100"
        >
          <ChevronLeft className="size-4" />
        </button>

        <h2 className="font-hana-main font-semibold text-base text-hana-black">
          {year}년 {month}월
        </h2>

        <button
          type="button"
          aria-label="다음 달 보기"
          onClick={onNextMonth}
          className="flex size-8 items-center justify-center rounded-full text-hana-black transition-colors hover:bg-gray-100"
        >
          <ChevronRight className="size-4" />
        </button>
      </div>

      <div className="flex items-center rounded-full bg-[#F1EEEA] p-0.5">
        <button
          type="button"
          aria-label="월간 보기"
          onClick={() => onChangeView('month')}
          className={`rounded-full px-3 py-1 text-[13px] transition-colors ${
            view === 'month'
              ? 'bg-hana-main text-white'
              : 'text-[#878787] hover:text-hana-black'
          }`}
        >
          월
        </button>

        <button
          type="button"
          aria-label="주간 보기"
          onClick={() => onChangeView('week')}
          className={`rounded-full px-3 py-1 text-[13px] transition-colors ${
            view === 'week'
              ? 'bg-hana-main text-white'
              : 'text-[#878787] hover:text-hana-black'
          }`}
        >
          주
        </button>
      </div>
    </div>
  );
}

function CalendarDayNameRow() {
  return (
    <div className="mb-1 grid grid-cols-7 gap-1">
      {DAY_LABELS.map((label, index) => {
        const isSunday = index === 0;
        const isSaturday = index === 6;

        return (
          <div
            key={label}
            className={`py-1 text-center font-medium text-xs ${
              isSunday
                ? 'text-[#E53935]'
                : isSaturday
                  ? 'text-[#1565C0]'
                  : 'text-[#333333]'
            }`}
          >
            {label}
          </div>
        );
      })}
    </div>
  );
}

function CalendarLegend() {
  return (
    <div className="mt-3 flex flex-wrap items-center gap-3 text-[#757575] text-[11px]">
      <LegendItem type="church" label="교회 일정" />
      <LegendItem type="smallGroup" label="소모임" />
      <LegendItem type="personal" label="개인" />
    </div>
  );
}

function LegendItem({ type, label }: { type: EventType; label: string }) {
  return (
    <span className="flex items-center gap-1">
      <span
        className={`block size-1.5 rounded-full ${EVENT_META[type].dotClassName}`}
      />
      {label}
    </span>
  );
}

function CalendarDayCell({
  date,
  dayIndex,
  isSelected,
  eventTypes,
  onSelectDate,
}: {
  date: number | null;
  dayIndex: number;
  isSelected: boolean;
  eventTypes: EventType[];
  onSelectDate: (date: number) => void;
}) {
  if (!date) {
    return <div className="h-12" aria-hidden="true" />;
  }

  const isSunday = dayIndex === 0;
  const isSaturday = dayIndex === 6;

  return (
    <button
      type="button"
      aria-label={`${date}일 일정 보기`}
      onClick={() => onSelectDate(date)}
      className={`flex h-12 w-full flex-col items-center justify-center rounded-xl border transition-all ${
        isSelected
          ? 'border-hana-main bg-[#EEF8F6] shadow-sm'
          : 'border-transparent hover:bg-[#F8F8F8]'
      }`}
    >
      <span
        className={`text-sm ${
          isSelected
            ? 'font-semibold text-hana-main'
            : isSunday
              ? 'text-[#E53935]'
              : isSaturday
                ? 'text-[#1565C0]'
                : 'text-[#333333]'
        }`}
      >
        {date}
      </span>

      {eventTypes.length > 0 ? (
        <span className="mt-1 flex items-center gap-1">
          {eventTypes.slice(0, 3).map((type) => (
            <span
              key={`${date}-${type}`}
              className={`block size-1 rounded-full ${EVENT_META[type].dotClassName}`}
            />
          ))}
        </span>
      ) : (
        <span className="mt-1 block size-1" aria-hidden="true" />
      )}
    </button>
  );
}

function ScheduleDetailCard({ item }: { item: CalendarEventItem }) {
  return (
    <div className="flex h-16 w-full items-center gap-3 rounded-2xl border border-[#E8EBEE] bg-white px-4">
      <div
        className={`h-10 w-1 shrink-0 rounded-full ${EVENT_META[item.type].barClassName}`}
      />

      <div className="min-w-0">
        <p className="truncate font-hana-main text-hana-black text-sm">
          {item.title}
        </p>

        <p className="mt-1 font-hana-main text-hana-gray-400 text-xs">
          {item.categoryLabel}
        </p>
      </div>
    </div>
  );
}

export default function Calendar({
  year,
  month,
  view = 'month',
  selectedDate = 18,
  events = {},
  onPrevMonth,
  onNextMonth,
  onSelectDate,
  onChangeView,
}: CalendarProps) {
  const today = useMemo(() => new Date(), []);
  const initialYear = year ?? today.getFullYear();
  const initialMonth = month ?? today.getMonth() + 1;

  const [currentYear, setCurrentYear] = useState(initialYear);
  const [currentMonth, setCurrentMonth] = useState(initialMonth);
  const [internalView, setInternalView] = useState<CalendarView>(view);
  const [internalSelectedDate, setInternalSelectedDate] =
    useState(selectedDate);
  const [scheduleItems, setScheduleItems] = useState<CalendarEventItem[]>(() =>
    buildDefaultScheduleItems(initialYear, initialMonth),
  );

  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  const [titleValue, setTitleValue] = useState('');
  const [startDateValue, setStartDateValue] = useState(
    formatDateKey(initialYear, initialMonth, selectedDate),
  );
  const [endDateValue, setEndDateValue] = useState(
    formatDateKey(initialYear, initialMonth, selectedDate),
  );
  const [categoryValue, setCategoryValue] =
    useState<ScheduleCategory>('personal');
  const [memoValue, setMemoValue] = useState('');

  useEffect(() => {
    if (year) {
      setCurrentYear(year);
    }
  }, [year]);

  useEffect(() => {
    if (month) {
      setCurrentMonth(month);
    }
  }, [month]);

  useEffect(() => {
    setInternalView(view);
  }, [view]);

  useEffect(() => {
    setInternalSelectedDate(selectedDate);
  }, [selectedDate]);

  const resolvedSelectedDate = internalSelectedDate;
  const selectedDateKey = formatDateKey(
    currentYear,
    currentMonth,
    resolvedSelectedDate,
  );

  const calendarDays = useMemo(() => {
    return buildCalendarDays(currentYear, currentMonth);
  }, [currentMonth, currentYear]);

  const visibleDays = useMemo(() => {
    if (internalView === 'week') {
      return buildWeekDays(calendarDays, resolvedSelectedDate);
    }

    return calendarDays;
  }, [calendarDays, internalView, resolvedSelectedDate]);

  const internalEventMap = useMemo(() => {
    return buildEventMapByMonth(scheduleItems, currentYear, currentMonth);
  }, [currentMonth, currentYear, scheduleItems]);

  const mergedEventMap = useMemo(() => {
    return mergeEventMaps(events, internalEventMap, currentYear, currentMonth);
  }, [events, internalEventMap, currentYear, currentMonth]);

  const selectedSchedules = useMemo(() => {
    return scheduleItems.filter((item) => item.date === selectedDateKey);
  }, [scheduleItems, selectedDateKey]);

  useEffect(() => {
    if (isScheduleModalOpen) {
      return;
    }

    setStartDateValue(selectedDateKey);
    setEndDateValue(selectedDateKey);
  }, [isScheduleModalOpen, selectedDateKey]);

  function handleSelectDate(date: number) {
    setInternalSelectedDate(date);
    onSelectDate?.(date);
  }

  function handlePrevMonth() {
    if (onPrevMonth) {
      onPrevMonth();
      return;
    }

    let nextYear = currentYear;
    let nextMonth = currentMonth - 1;

    if (nextMonth < 1) {
      nextYear -= 1;
      nextMonth = 12;
    }

    const lastDate = getLastDateOfMonth(nextYear, nextMonth);

    setCurrentYear(nextYear);
    setCurrentMonth(nextMonth);
    setInternalSelectedDate((prevDate) => Math.min(prevDate, lastDate));
  }

  function handleNextMonth() {
    if (onNextMonth) {
      onNextMonth();
      return;
    }

    let nextYear = currentYear;
    let nextMonth = currentMonth + 1;

    if (nextMonth > 12) {
      nextYear += 1;
      nextMonth = 1;
    }

    const lastDate = getLastDateOfMonth(nextYear, nextMonth);

    setCurrentYear(nextYear);
    setCurrentMonth(nextMonth);
    setInternalSelectedDate((prevDate) => Math.min(prevDate, lastDate));
  }

  function handleChangeView(nextView: CalendarView) {
    setInternalView(nextView);
    onChangeView?.(nextView);
  }

  function handleOpenScheduleModal() {
    setTitleValue('');
    setMemoValue('');
    setCategoryValue('personal');
    setStartDateValue(selectedDateKey);
    setEndDateValue(selectedDateKey);
    setIsScheduleModalOpen(true);
  }

  function handleCloseScheduleModal() {
    setIsScheduleModalOpen(false);
  }

  function handleSubmitSchedule() {
    const trimmedTitle = titleValue.trim();

    if (!trimmedTitle || !startDateValue) {
      return;
    }

    const nextItem: CalendarEventItem = {
      id: `${Date.now()}`,
      date: startDateValue,
      type: categoryValue,
      title: trimmedTitle,
      categoryLabel: EVENT_META[categoryValue].label,
    };

    const parsedDate = parseDateKey(startDateValue);

    setScheduleItems((prevItems) => [nextItem, ...prevItems]);

    if (parsedDate) {
      setCurrentYear(parsedDate.year);
      setCurrentMonth(parsedDate.month);
      setInternalSelectedDate(parsedDate.date);
      onSelectDate?.(parsedDate.date);
    }

    setIsScheduleModalOpen(false);
  }

  return (
    <>
      <div className="w-full rounded-4xl bg-white p-4 shadow-[0_4px_20px_rgba(0,0,0,0.08)]">
        <CalendarHeader
          year={currentYear}
          month={currentMonth}
          view={internalView}
          onPrevMonth={handlePrevMonth}
          onNextMonth={handleNextMonth}
          onChangeView={handleChangeView}
        />

        <CalendarDayNameRow />

        <div className="grid grid-cols-7 gap-1">
          {visibleDays.map((date, index) => {
            const dayIndex = index % 7;
            const eventTypes = date ? (mergedEventMap[date] ?? []) : [];
            const isSelected = date === resolvedSelectedDate;

            return (
              <CalendarDayCell
                key={`${currentYear}-${currentMonth}-${date ?? `empty-${index}`}`}
                date={date}
                dayIndex={dayIndex}
                isSelected={isSelected}
                eventTypes={eventTypes}
                onSelectDate={handleSelectDate}
              />
            );
          })}
        </div>

        <CalendarLegend />

        <div className="mt-4 border-[#F0F2F4] border-t pt-4">
          <div className="flex items-center justify-between">
            <h3 className="font-hana-main font-semibold text-base text-hana-black">
              {formatDetailDateLabel(selectedDateKey)}
            </h3>

            <button
              type="button"
              aria-label="일정 추가"
              onClick={handleOpenScheduleModal}
              className="flex size-8 items-center justify-center rounded-full bg-hana-main text-white shadow-sm hover:bg-hana-mint"
            >
              <Plus className="size-4" />
            </button>
          </div>

          <div className="mt-3 space-y-2">
            {selectedSchedules.length > 0 ? (
              selectedSchedules.map((item) => (
                <ScheduleDetailCard key={item.id} item={item} />
              ))
            ) : (
              <div className="flex h-16 w-full items-center justify-center rounded-2xl border border-[#D9DEE3] border-dashed bg-[#FAFBFC]">
                <p className="font-hana-main text-hana-gray-400 text-xs">
                  등록된 일정이 없습니다.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      <ScheduleAddModal
        isOpen={isScheduleModalOpen}
        type="schedule"
        titleValue={titleValue}
        startDate={startDateValue}
        endDate={endDateValue}
        category={categoryValue}
        memoValue={memoValue}
        isSubmitDisabled={!titleValue.trim()}
        onClose={handleCloseScheduleModal}
        onChangeTitle={setTitleValue}
        onChangeStartDate={setStartDateValue}
        onChangeEndDate={setEndDateValue}
        onChangeCategory={setCategoryValue}
        onChangeMemo={setMemoValue}
        onSubmit={handleSubmitSchedule}
      />
    </>
  );
}
