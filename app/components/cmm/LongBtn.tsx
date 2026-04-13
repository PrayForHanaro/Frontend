'use client';

/**
 * @page: hana main 색의 긴 버튼
 * @description: 페이지 전체에서 쓰이는 w-full 긴 버튼 컴포넌트입니다. 마음껏 가져다 쓰시길..
 * @author: typeYu
 * @date: 2026-04-13
 */

type LongButtonProps = {
  text: string;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  onClick?: () => void;
};

export default function LongButton({
  text,
  type = 'button',
  disabled = false,
  onClick,
}: LongButtonProps) {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`h-14 w-full rounded-2xl bg-hana-main font-hana-main text-[18px] text-white hover:bg-hana-linear-deep-green ${
        disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'
      }`}
    >
      {text}
    </button>
  );
}
