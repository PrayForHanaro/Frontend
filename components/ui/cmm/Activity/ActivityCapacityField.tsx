'use client';

import { useEffect, useState } from 'react';

/**
 * @page: 인구 수 컴포넌트
 * @description: 인구 수 컴포넌트입니다. +, - 버튼과 숫자 입력 필드로 구성되어 있습니다. 최소값: 2명, 최대값:99명
 * @author: 작성자명
 * @date: 2026-04-14
 */

type ActivityCapacityFieldProps = {
  value: number;
  onChangeValue: (nextValue: number) => void;
  min?: number;
  max?: number;
};

export default function ActivityCapacityField({
  value,
  onChangeValue,
  min = 2,
  max = 99,
}: ActivityCapacityFieldProps) {
  const [inputValue, setInputValue] = useState(String(value));

  useEffect(() => {
    setInputValue(String(value));
  }, [value]);

  const isMinusDisabled = value <= min;
  const isPlusDisabled = value >= max;

  function handleDecrease() {
    if (isMinusDisabled) {
      return;
    }

    onChangeValue(value - 1);
  }

  function handleIncrease() {
    if (isPlusDisabled) {
      return;
    }

    onChangeValue(value + 1);
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const onlyNumberValue = event.target.value.replace(/[^0-9]/g, '');
    setInputValue(onlyNumberValue);
  }

  function handleBlur() {
    if (inputValue === '') {
      setInputValue(String(value));
      return;
    }

    const nextValue = Number(inputValue);

    if (Number.isNaN(nextValue)) {
      setInputValue(String(value));
      return;
    }

    if (nextValue < min) {
      onChangeValue(min);
      setInputValue(String(min));
      return;
    }

    if (nextValue > max) {
      onChangeValue(max);
      setInputValue(String(max));
      return;
    }

    onChangeValue(nextValue);
    setInputValue(String(nextValue));
  }

  function handleFocus(event: React.FocusEvent<HTMLInputElement>) {
    event.target.select();
  }

  return (
    <section className="flex flex-col gap-2">
      <h2 className="font-bold font-hana-main text-[#222222] text-base">
        인원 *
      </h2>

      <div className="flex items-center">
        <button
          type="button"
          aria-label="인원 감소"
          onClick={handleDecrease}
          disabled={isMinusDisabled}
          className={`flex h-11 w-11 items-center justify-center rounded-full border-2 text-[32px] leading-none transition ${
            isMinusDisabled
              ? 'cursor-not-allowed border-[#BFCFCB] text-[#BFCFCB]'
              : 'cursor-pointer border-hana-main text-hana-main hover:bg-[#E7F4F3]'
          }`}
        >
          -
        </button>

        <input
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          aria-label="인원 입력"
          value={inputValue}
          onChange={handleChange}
          onBlur={handleBlur}
          onFocus={handleFocus}
          className="h-10 w-18 bg-transparent text-center font-bold font-hana-main text-[#1D3050] text-[18px]"
        />

        <button
          type="button"
          aria-label="인원 증가"
          onClick={handleIncrease}
          disabled={isPlusDisabled}
          className={`flex h-11 w-11 items-center justify-center rounded-full border-2 text-[32px] leading-none transition ${
            isPlusDisabled
              ? 'cursor-not-allowed border-[#BFCFCB] text-[#BFCFCB]'
              : 'cursor-pointer border-hana-main text-hana-main hover:bg-[#E7F4F3]'
          }`}
        >
          +
        </button>
      </div>
    </section>
  );
}
