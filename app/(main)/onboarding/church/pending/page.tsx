'use client';
import { Search } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import WhiteCard from '@/components/ui/cmm/WhiteCard';
import { Input } from '@/components/ui/input';
import { useDebounce } from '@/lib/debounce';

/**
 * @page: 다니는 종교 단체 선택 페이지
 * @description: 다니는 종교 단체 선택 페이지
 * @author: 이정수
 * @date: 2026-04-14
 */

// 임시 데이터
const churchList = [
  '여의도 순복음 교회',
  '여의도 교회',
  '여의도',
  '빛의 자녀 학교',
  '성락성결교회',
];
const username = '이징수';

export default function Pending() {
  //TODO churchList를 DB에서 가져오기
  //TODO 가져온 데이터의 종료를 확인하고 띄워주기
  const router = useRouter();
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [filteredChurches, setFilteredChurches] = useState<string[]>([]);

  const handleSelect = (item: string) => {
    setSelectedItem((prev) => (prev === item ? null : item));
  };
  const findChurch = (v: string) => {
    if (!v) {
      setFilteredChurches([]);
      return;
    }
    const filteredList = churchList.filter((item) =>
      item
        .toLowerCase()
        .replaceAll(' ', '')
        .includes(v.toLowerCase().replaceAll(' ', '')),
    );
    setFilteredChurches(filteredList);
  };

  const debouncedSearch = useDebounce(findChurch, 300);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
    }
  };

  const handleClick = () => {
    const queryParams = new URLSearchParams({
      id: '123', // TODO 수정 필요
      name: selectedItem || '',
      location: '영등포구',
    });
    router.push(`/onboarding/church/setup?${queryParams.toString()}`);
  };

  return (
    <form className="relative min-h-full w-full">
      <h1 className="pt-24 text-center font-hana-medium text-3xl text-hana-light-mint">
        안녕하세요, {username}님
      </h1>
      <h2 className="pt-2 text-center text-hana-gray-600">
        하나 신앙 금융 서비스
      </h2>
      <div className="flex items-center justify-center pt-20">
        <Search className="h-8 w-8 pr-1 text-gray-300" />
        <Input
          onKeyDown={handleKeyDown}
          id="fieldgroup-religion"
          placeholder="다니시는 교회, 성당, 절을 검색해보세요"
          className="flex-1 bg-white p-5 pt-5 pb-5 text-2xl placeholder:text-gray-500"
          onChange={(e) => debouncedSearch(e.target.value)}
        />
      </div>
      <div className="grid grid-cols-1 gap-3 pt-5">
        {filteredChurches.map((filteredItem) => (
          <WhiteCard
            key={filteredItem}
            contents={filteredItem}
            description="영등포구"
            isSelected={selectedItem === filteredItem}
            setIsSelected={() => handleSelect(filteredItem)}
          />
        ))}
      </div>
      <div className="absolute bottom-1 w-full items-center pt-10">
        <Button
          type="button"
          disabled={!selectedItem}
          className="h-15 w-full rounded-2xl bg-hana-linear-deep-green-end text-2xl hover:bg-hana-linear-deep-green disabled:opacity-50"
          onClick={handleClick}
        >
          선택 완료
        </Button>
      </div>
    </form>
  );
}
