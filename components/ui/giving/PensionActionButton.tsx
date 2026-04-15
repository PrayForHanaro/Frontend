'use client';

import { Plus } from 'lucide-react';

/**
 * @page: 헌금 - 연금 액션 버튼
 * @description: 연금 가입하기, 연금 불러오기에 사용하는 흰색 버튼 컴포넌트입니다.
 * @author: typeYu
 * @date: 2026-04-15
 */

type PensionActionButtonProps = {
  text: string;
  onClick?: () => void;
};

export default function PensionActionButton({
  text,
  onClick,
}: PensionActionButtonProps) {
  return (
    <button
      type="button"
      aria-label={text}
      onClick={onClick}
      className="flex h-13 w-full items-center justify-center gap-2 rounded-2xl border border-[#D8D2C8] border-dashed bg-white font-hana-main text-[#8E8E8E] text-[18px] transition-colors hover:bg-[#e2e1dd]"
    >
      <Plus size={18} strokeWidth={2.2} aria-hidden="true" />
      <span>{text}</span>
    </button>
  );
}
