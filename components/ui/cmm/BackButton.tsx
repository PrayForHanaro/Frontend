'use client';

import { ChevronLeft } from 'lucide-react';
import type { Route } from 'next';
import { useRouter } from 'next/navigation';

type BackButtonProps = {
  to?: Route | string;
};

export default function BackButton({ to }: BackButtonProps) {
  const router = useRouter();

  const handleClick = () => {
    if (to) {
      router.push(to as Route);
      return;
    }
    router.back();
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className="absolute top-0 left-0 z-10 cursor-pointer p-4"
      aria-label="뒤로가기"
    >
      <ChevronLeft className="size-6 text-gray-700" />
    </button>
  );
}
