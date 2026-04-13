'use client';

type CalendarView = 'month' | 'week';
type EventType = 'church' | 'smallGroup' | 'personal';

type CalenderProps = {
  year?: number;
  month?: number;
  view?: CalendarView;
  selectedDate?: number;
  events?: Partial<Record<number, EventType[]>>;
  onPrevMonth?: () => void;
  onNextMonth?: () => void;
  onSelectDate?: (date: number) => void;
  onChangeView?: (view: CalendarView) => void;
};

const DAY_LABELS = ['일', '월', '화', '수', '목', '금', '토'];

const DEFAULT_EVENTS: Partial<Record<number, EventType[]>> = {
  1: ['church'],
  2: ['church'],
  3: ['church'],
  5: ['church'],
  6: ['church'],
  7: ['church'],
  8: ['church'],
  9: ['church'],
  10: ['church'],
  12: ['church'],
  13: ['church'],
  14: ['church'],
  15: ['church', 'smallGroup'],
  16: ['church'],
  17: ['church'],
  19: ['church'],
  20: ['church', 'personal'],
  21: ['church'],
  22: ['church'],
  23: ['church'],
  24: ['church'],
  26: ['church'],
  27: ['church'],
  28: ['church'],
  29: ['church'],
  30: ['church'],
};

function getEventColor(type: EventType) {
  if (type === 'church') {
    return '#00897B';
  }

  if (type === 'smallGroup') {
    return '#FF8F00';
  }

  return '#7E57C2';
}

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

function ChevronLeftIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="m15 18-6-6 6-6" />
    </svg>
  );
}

function ChevronRightIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}

function CalenderHeader({
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
  onPrevMonth?: () => void;
  onNextMonth?: () => void;
  onChangeView?: (view: CalendarView) => void;
}) {
  return (
    <div className="mb-3 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <button
          type="button"
          aria-label="이전 달 보기"
          onClick={onPrevMonth}
          className="rounded-xl p-2 transition-colors hover:bg-gray-100"
        >
          <ChevronLeftIcon />
        </button>

        <h2
          style={{
            fontSize: '16px',
            fontWeight: 700,
            color: '#222222',
          }}
        >
          {year}년 {month}월
        </h2>

        <button
          type="button"
          aria-label="다음 달 보기"
          onClick={onNextMonth}
          className="rounded-xl p-2 transition-colors hover:bg-gray-100"
        >
          <ChevronRightIcon />
        </button>
      </div>

      <div
        style={{
          display: 'flex',
          gap: '2px',
          padding: '2px',
          borderRadius: '9999px',
          background: '#F1EEEA',
        }}
      >
        <button
          type="button"
          aria-label="월간 보기"
          onClick={() => onChangeView?.('month')}
          style={{
            padding: '4px 14px',
            borderRadius: '9999px',
            fontSize: '13px',
            fontWeight: 500,
            background: view === 'month' ? '#00897B' : 'transparent',
            color: view === 'month' ? '#FFFFFF' : '#878787',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          월
        </button>

        <button
          type="button"
          aria-label="주간 보기"
          onClick={() => onChangeView?.('week')}
          style={{
            padding: '4px 14px',
            borderRadius: '9999px',
            fontSize: '13px',
            fontWeight: 500,
            background: view === 'week' ? '#00897B' : 'transparent',
            color: view === 'week' ? '#FFFFFF' : '#878787',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          주
        </button>
      </div>
    </div>
  );
}

function CalenderDayNameRow() {
  return (
    <div className="mb-1 grid grid-cols-7 gap-1">
      {DAY_LABELS.map((label, index) => {
        const isSunday = index === 0;
        const isSaturday = index === 6;

        return (
          <div
            key={label}
            style={{
              textAlign: 'center',
              fontSize: '12px',
              fontWeight: 500,
              padding: '4px 0',
              color: isSunday ? '#E53935' : isSaturday ? '#1565C0' : '#333333',
            }}
          >
            {label}
          </div>
        );
      })}
    </div>
  );
}

function CalenderLegend() {
  return (
    <div
      style={{
        display: 'flex',
        gap: '12px',
        marginTop: '8px',
        fontSize: '11px',
        color: '#757575',
        flexWrap: 'wrap',
      }}
    >
      <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
        <span
          style={{
            width: '6px',
            height: '6px',
            borderRadius: '50%',
            background: '#00897B',
          }}
        />
        교회 일정
      </span>

      <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
        <span
          style={{
            width: '6px',
            height: '6px',
            borderRadius: '50%',
            background: '#FF8F00',
          }}
        />
        소모임
      </span>

      <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
        <span
          style={{
            width: '6px',
            height: '6px',
            borderRadius: '50%',
            background: '#7E57C2',
          }}
        />
        개인
      </span>
    </div>
  );
}

function CalenderDayCell({
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
  onSelectDate?: (date: number) => void;
}) {
  if (!date) {
    return <div style={{ width: '40px', height: '40px' }} aria-hidden="true" />;
  }

  const isSunday = dayIndex === 0;

  return (
    <button
      type="button"
      aria-label={`${date}일 일정 보기`}
      onClick={() => onSelectDate?.(date)}
      style={{
        width: '40px',
        height: '40px',
        borderRadius: '50%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        border: 'none',
        cursor: 'pointer',
        background: isSelected ? '#00897B' : 'transparent',
        color: isSelected ? '#FFFFFF' : isSunday ? '#E53935' : '#333333',
        fontSize: '14px',
        fontWeight: isSelected ? 700 : 400,
        position: 'relative',
      }}
    >
      {date}

      {eventTypes.length > 0 ? (
        <div
          style={{
            position: 'absolute',
            bottom: '2px',
            display: 'flex',
            gap: '2px',
          }}
        >
          {eventTypes.slice(0, 3).map((type) => (
            <span
              key={`${date}-${type}`}
              style={{
                width: '4px',
                height: '4px',
                borderRadius: '50%',
                background: isSelected ? '#FFFFFF' : getEventColor(type),
              }}
            />
          ))}
        </div>
      ) : null}
    </button>
  );
}

export default function Calender({
  year,
  month,
  view = 'month',
  selectedDate,
  events = DEFAULT_EVENTS,
  onPrevMonth,
  onNextMonth,
  onSelectDate,
  onChangeView,
}: CalenderProps) {
  const today = new Date();

  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth() + 1;
  const currentDate = today.getDate();

  const resolvedYear = year ?? currentYear;
  const resolvedMonth = month ?? currentMonth;

  const isCurrentMonth =
    resolvedYear === currentYear && resolvedMonth === currentMonth;

  const resolvedSelectedDate =
    selectedDate ?? (isCurrentMonth ? currentDate : undefined);

  const days = buildCalendarDays(resolvedYear, resolvedMonth);

  return (
    <div
      style={{
        background: '#FFFFFF',
        borderRadius: '20px',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
        padding: '16px',
        width: '100%',
      }}
    >
      <CalenderHeader
        year={resolvedYear}
        month={resolvedMonth}
        view={view}
        onPrevMonth={onPrevMonth}
        onNextMonth={onNextMonth}
        onChangeView={onChangeView}
      />

      <CalenderDayNameRow />

      <div className="mb-1 grid grid-cols-7 gap-1">
        {days.map((date, index) => {
          const dayIndex = index % 7;
          const eventTypes = date ? (events[date] ?? []) : [];
          const isSelected = date === resolvedSelectedDate;

          return (
            <CalenderDayCell
              key={`${resolvedYear}-${resolvedMonth}-${date ?? `empty-${index}`}`}
              date={date}
              dayIndex={dayIndex}
              isSelected={isSelected}
              eventTypes={eventTypes}
              onSelectDate={onSelectDate}
            />
          );
        })}
      </div>

      <CalenderLegend />
    </div>
  );
}
