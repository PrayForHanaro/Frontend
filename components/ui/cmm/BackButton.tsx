'use client';

import { ChevronLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function BackButton() {
  const router = useRouter();
  return (
    <button
      type="button"
      onClick={() => router.back()}
      className="absolute top-0 left-0 z-10 cursor-pointer p-4"
      aria-label="뒤로가기"
    >
      <ChevronLeft className="size-6 text-gray-700" />
    </button>
  );
}
