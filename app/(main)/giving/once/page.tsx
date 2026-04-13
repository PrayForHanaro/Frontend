'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Header from '@/components/ui/cmm/Header';
import { GivingPersonSelector } from '@/components/ui/giving/GivingPersonSelector';
import TypeButton from '@/components/ui/giving/TypeButton';

const GIVING_TYPES = [
  '십일조',
  '감사헌금',
  '선교헌금',
  '건축헌금',
  '기타',
] as const;

type GivingData = {
  name: string;
  maxPoint: number;
  bankAccount: string;
  churchName: string;
};

export default function GivingOnce() {
  const [selectedType, setSelectedType] = useState<string>('십일조');
  const [givingPerson, setGivingPerson] = useState<'기명' | '무기명'>('기명');
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [point, setPoint] = useState('');
  const [data, setData] = useState<GivingData>({
    name: '',
    maxPoint: 0,
    bankAccount: '정보를 불러오는 중...',
    churchName: '정보를 불러오는 중...',
  });

  const route = useRouter();
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch('/api/giving/once');
        const json = await res.json();
        setData(json);
        setName(json.name);
      } catch (e) {
        console.error('Failed to fetch giving data', e);
      }
    }
    fetchData();
  }, []);

  const handlePointChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (Number(val) <= data.maxPoint) setPoint(val);
  };

  const handleGivingSubmit = async () => {
    const payload = {
      type: selectedType,
      personType: givingPerson,
      name: givingPerson === '기명' ? name : null,
      amount: Number(amount),
      point: Number(point),
    };

    try {
      const res = await fetch('/api/giving/once', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        route.push('/bless/interval/complete');
      } else {
        alert('헌금 접수에 실패했습니다.');
      }
    } catch (e) {
      console.error('Failed to submit giving', e);
      alert('오류가 발생했습니다.');
    }
  };

  return (
    <div className="flex flex-col bg-white">
      <Header content="헌금하기" />
      <main className="flex-1 space-y-8 p-5">
        <section className="flex flex-col gap-3">
          <p className="font-hana-bold text-lg">헌금 종류</p>
          <div className="flex flex-wrap gap-2">
            {GIVING_TYPES.map((type) => (
              <TypeButton
                key={type}
                type={type}
                isActive={selectedType === type}
                onClick={() => setSelectedType(type)}
              />
            ))}
          </div>
        </section>

        <section className="flex flex-col gap-3">
          <p className="font-hana-bold text-lg">헌금하는 사람</p>
          <GivingPersonSelector
            selected={givingPerson}
            onChange={setGivingPerson}
          />
          {givingPerson === '기명' && (
            <input
              type="text"
              placeholder="이름을 입력하세요"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-xl border border-gray-200 bg-white p-3 outline-none transition-colors focus:border-hana-main"
            />
          )}
        </section>

        <section className="flex flex-col gap-3">
          <p className="font-hana-bold text-lg">금액</p>
          <input
            type="number"
            placeholder="금액을 입력하세요"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full rounded-xl border border-gray-200 bg-white p-3 outline-none transition-colors focus:border-hana-main"
          />
        </section>

        <section className="flex flex-col gap-3">
          <p className="font-hana-bold text-lg">포인트</p>
          <input
            type="number"
            placeholder="사용할 포인트를 입력하세요"
            value={point}
            onChange={handlePointChange}
            className="w-full rounded-xl border border-gray-200 bg-white p-3 outline-none transition-colors focus:border-hana-main"
          />
          <p className="text-gray-500 text-xs">보유 포인트: {data.maxPoint}P</p>
        </section>

        <div className="space-y-4 border-t pt-4 pb-5">
          <div className="space-y-3">
            <div className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
              <p className="mb-1 text-gray-500 text-xs">출금통장</p>
              <p className="font-medium text-black">{data.bankAccount}</p>
            </div>
            <div className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
              <p className="mb-1 text-gray-500 text-xs">교회</p>
              <p className="font-medium text-black">{data.churchName}</p>
            </div>
          </div>

          <div className="flex items-center justify-between px-1">
            <p className="font-hana-bold text-lg">기도제목</p>
            <Link
              href="/giving/once/prayer"
              className="cursor-pointer font-hana-medium text-hana-main"
            >
              작성하러가기 &gt;
            </Link>
          </div>
        </div>
      </main>

      <div className="border-gray-100 border-t p-5">
        <button
          type="button"
          onClick={handleGivingSubmit}
          className="w-full cursor-pointer rounded-xl bg-hana-main py-4 font-hana-bold text-lg text-white transition-transform active:scale-[0.98]"
        >
          헌금하기
        </button>
      </div>
    </div>
  );
}
