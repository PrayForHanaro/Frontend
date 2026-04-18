'use client';

import { ChevronLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

/**
 * @page: Header
 * @description: content로 label 값을 입력해주세요
 * @author: 이승빈
 * @date: 2026-04-13
 */

type Props = {
  content: string;
};

export default function Header({ content }: Props) {
  const router = useRouter();
  return (
    <div className="-mx-4 -my-4 relative flex items-center justify-center p-4 shadow-sm">
      <button
        className="absolute left-4 cursor-pointer"
        onClick={() => router.back()}
        type="button"
      >
        <ChevronLeft />
      </button>

      <div className="text-2xl">{content}</div>
    </div>
  );
}
