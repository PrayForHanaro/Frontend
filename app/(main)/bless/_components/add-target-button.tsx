'use client';

import { Plus } from 'lucide-react';

export default function AddTargetButton() {
  return (
    <button
      type="button"
      onClick={() => alert('대상자 추가 기능은 추후 구현됩니다')}
      className="flex size-10 items-center justify-center rounded-full border border-hana-gray-300 bg-[#1C3D69] text-white"
      aria-label="대상자 추가"
    >
      <Plus className="size-5" />
    </button>
  );
}
