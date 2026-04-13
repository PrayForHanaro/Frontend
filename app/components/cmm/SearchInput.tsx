'use client';

import { Search } from 'lucide-react';

/**
 * @page: 소모임 - 검색 입력창
 * @description: 아직 검색 기능은 미 구현
 * @author: typeYu
 * @date: 2026-04-13
 */

type SearchInputProps = {
  placeholder?: string;
};

export default function SearchInput({
  placeholder = '검색하기',
}: SearchInputProps) {
  return (
    <div className="w-full">
      <label className="relative block w-full" aria-label="검색어 입력">
        <span className="-translate-y-1/2 pointer-events-none absolute top-1/2 left-4 text-[#8B8B8B]">
          <Search size={18} aria-hidden="true" />
        </span>

        <input
          type="text"
          placeholder={placeholder}
          className="h-10 w-full rounded-xl border border-[#E5E7EB] bg-white pr-4 pl-11 font-hana-main text-[#222222] text-sm shadow-sm outline-none placeholder:text-[#9CA3AF]"
        />
      </label>
    </div>
  );
}
