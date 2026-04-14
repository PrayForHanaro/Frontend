'use client';

import { CalendarDays, X } from 'lucide-react';
import LongButton from './LongBtn';

type ModalType = 'schedule' | 'cash';

type ScheduleCategory = 'personal' | 'church';

type ScheduleAddModalProps = {
  isOpen: boolean;
  type: ModalType;
  titleValue?: string;
  cashTypeValue?: string;
  startDate: string;
  endDate: string;
  category?: ScheduleCategory;
  memoValue?: string;
  accountValue?: string;
  cashTypeOptions?: Array<{ label: string; value: string }>;
  accountOptions?: Array<{ label: string; value: string }>;
  isSubmitDisabled?: boolean;
  onClose: () => void;
  onChangeTitle?: (value: string) => void;
  onChangeCashType?: (value: string) => void;
  onChangeStartDate: (value: string) => void;
  onChangeEndDate: (value: string) => void;
  onChangeCategory?: (value: ScheduleCategory) => void;
  onChangeMemo?: (value: string) => void;
  onChangeAccount?: (value: string) => void;
  onSubmit: () => void;
};

export default function ScheduleAddModal({
  isOpen,
  type,
  titleValue = '',
  cashTypeValue = '',
  startDate,
  endDate,
  category = 'personal',
  memoValue = '',
  accountValue = '',
  cashTypeOptions = [],
  accountOptions = [],
  isSubmitDisabled = false,
  onClose,
  onChangeTitle,
  onChangeCashType,
  onChangeStartDate,
  onChangeEndDate,
  onChangeCategory,
  onChangeMemo,
  onChangeAccount,
  onSubmit,
}: ScheduleAddModalProps) {
  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 px-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="schedule-add-modal-title"
    >
      <div className="w-full max-w-2xl rounded-[2rem] bg-white px-8 pt-10 pb-8 shadow-lg">
        <div className="mb-8 flex items-start justify-between">
          <h2
            id="schedule-add-modal-title"
            className="font-hana-title text-3xl text-hana-black"
          >
            {type === 'schedule' ? '새 일정 추가' : '새 헌금 일정 추가'}
          </h2>

          <button
            type="button"
            onClick={onClose}
            aria-label="모달 닫기"
            className="rounded-full p-1 text-hana-black transition-colors hover:bg-gray-100"
          >
            <X className="size-8" />
          </button>
        </div>

        <div className="space-y-4">
          {type === 'schedule' ? (
            <TextInput
              value={titleValue}
              placeholder="일정 제목"
              ariaLabel="일정 제목 입력"
              onChange={(value) => onChangeTitle?.(value)}
            />
          ) : (
            <SelectInput
              value={cashTypeValue}
              placeholder="헌금 종류 선택"
              ariaLabel="헌금 종류 선택"
              options={cashTypeOptions}
              onChange={(value) => onChangeCashType?.(value)}
            />
          )}

          <div className="grid grid-cols-2 gap-4">
            <DateInput
              label="시작일"
              value={startDate}
              ariaLabel="시작일 선택"
              onChange={onChangeStartDate}
            />

            <DateInput
              label="종료일"
              value={endDate}
              ariaLabel="종료일 선택"
              onChange={onChangeEndDate}
            />
          </div>

          {type === 'schedule' ? (
            <>
              <div className="flex gap-3">
                <ChipButton
                  text="개인 일정"
                  isActive={category === 'personal'}
                  onClick={() => onChangeCategory?.('personal')}
                />

                <ChipButton
                  text="교회 일정"
                  isActive={category === 'church'}
                  onClick={() => onChangeCategory?.('church')}
                />
              </div>

              <TextInput
                value={memoValue}
                placeholder="메모 (선택)"
                ariaLabel="메모 입력"
                onChange={(value) => onChangeMemo?.(value)}
              />
            </>
          ) : (
            <SelectInput
              value={accountValue}
              placeholder="계좌 선택"
              ariaLabel="계좌 선택"
              options={accountOptions}
              onChange={(value) => onChangeAccount?.(value)}
            />
          )}

          <div className="pt-2">
            <LongButton
              text="저장하기"
              type="button"
              disabled={isSubmitDisabled}
              onClick={onSubmit}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

type TextInputProps = {
  value: string;
  placeholder: string;
  ariaLabel: string;
  onChange: (value: string) => void;
};

function TextInput({
  value,
  placeholder,
  ariaLabel,
  onChange,
}: TextInputProps) {
  return (
    <input
      value={value}
      type="text"
      placeholder={placeholder}
      aria-label={ariaLabel}
      onChange={(event) => onChange(event.target.value)}
      className="h-16 w-full rounded-3xl border border-[#ddd8cf] bg-[#fcfbf8] px-5 font-hana-main text-2xl text-hana-black outline-none placeholder:text-[#b5b8bf] focus:border-hana-main"
    />
  );
}

type SelectInputProps = {
  value: string;
  placeholder: string;
  ariaLabel: string;
  options: Array<{ label: string; value: string }>;
  onChange: (value: string) => void;
};

function SelectInput({
  value,
  placeholder,
  ariaLabel,
  options,
  onChange,
}: SelectInputProps) {
  return (
    <select
      value={value}
      aria-label={ariaLabel}
      onChange={(event) => onChange(event.target.value)}
      className={`h-16 w-full rounded-3xl border border-[#ddd8cf] bg-[#fcfbf8] px-5 font-hana-main text-2xl outline-none focus:border-hana-main ${
        value ? 'text-hana-black' : 'text-[#b5b8bf]'
      }`}
    >
      <option value="" disabled>
        {placeholder}
      </option>

      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}

type DateInputProps = {
  label: string;
  value: string;
  ariaLabel: string;
  onChange: (value: string) => void;
};

function DateInput({ label, value, ariaLabel, onChange }: DateInputProps) {
  return (
    <label className="block">
      <span className="mb-2 block pl-1 font-hana-main text-[#8d8d8d] text-xl">
        {label}
      </span>

      <div className="relative">
        <input
          value={value}
          type="date"
          aria-label={ariaLabel}
          onChange={(event) => onChange(event.target.value)}
          className="h-16 w-full rounded-3xl border border-[#ddd8cf] bg-[#fcfbf8] px-5 pr-14 font-hana-main text-2xl text-hana-black outline-none focus:border-hana-main"
        />

        <CalendarDays
          aria-hidden="true"
          className="-translate-y-1/2 pointer-events-none absolute top-1/2 right-5 size-6 text-hana-black"
        />
      </div>
    </label>
  );
}

type ChipButtonProps = {
  text: string;
  isActive: boolean;
  onClick: () => void;
};

function ChipButton({ text, isActive, onClick }: ChipButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={isActive}
      className={`rounded-full px-5 py-3 font-hana-main text-xl transition-colors ${
        isActive
          ? 'bg-[#8f8f8f] text-white'
          : 'bg-[#f0efeb] text-[#8d8d8d] hover:bg-[#e7e5df]'
      }`}
    >
      {text}
    </button>
  );
}
