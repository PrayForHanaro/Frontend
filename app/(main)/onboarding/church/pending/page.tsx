'use client';
import { Search } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import WhiteCard from '@/components/ui/cmm/WhiteCard';
import { Input } from '@/components/ui/input';

//종교, 교회이름, 구역

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
  const [filteredChurches, setFilteredChurches] = useState<string[]>([]);

  const findChurch = (v: string) => {
    if (!v) {
      return [];
    }
    const filteredList = churchList.filter((item) =>
      item.replaceAll(' ', '').startsWith(v.replaceAll(' ', '')),
    );
    setFilteredChurches(filteredList);
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
          id="fieldgroup-phone"
          placeholder="다니시는 교회, 성당, 절을 검색해보세요"
          className="flex-1 bg-white p-5 pt-5 pb-5 text-2xl placeholder:text-gray-500"
          onChange={(e) => findChurch(e.target.value)}
        />
      </div>
      <div className="grid grid-cols-1 gap-3 pt-5">
        {filteredChurches.map((filteredItem) => (
          <WhiteCard key={filteredItem} contents={filteredItem} />
        ))}
      </div>
      <div className="absolute bottom-4 w-full items-center pt-10">
        <Button
          type="submit"
          className="h-15 w-full rounded-2xl bg-hana-linear-deep-green-end text-2xl hover:bg-hana-linear-deep-green"
        >
          선택 완료
        </Button>
      </div>
    </form>
  );
}
