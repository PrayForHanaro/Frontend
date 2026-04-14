'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import Header from '@/components/ui/cmm/Header';
import { GivingPersonSelector } from '@/components/ui/giving/GivingPersonSelector';
import TypeButton from '@/components/ui/giving/TypeButton';

/**
 * @page: 일회성 헌금 내용 작성
 * @description: 일회성 헌금 내용 작성 페이지입니다. GET 호출 실패시 목업데이터를 넣습니다.
 * @author: 작성자명
 * @date: 2026-04-14
 */

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
  const [prayerTopic, setPrayerTopic] = useState('');
  const [data, setData] = useState<GivingData>({
    name: '',
    maxPoint: 0,
    bankAccount: '정보를 불러오는 중...',
    churchName: '정보를 불러오는 중...',
  });

  const [errors, setErrors] = useState({
    name: false,
    amount: false,
  });

  const nameRef = useRef<HTMLInputElement>(null);
  const amountRef = useRef<HTMLInputElement>(null);

  const route = useRouter();
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch('/api/giving/once');
        if (res.ok) {
          const json = await res.json();
          if (json.code === '200' && json.data) {
            setData(json.data);
            setName(json.data.name);
          } else {
            throw new Error(json.message || '정보를 불러오지 못했습니다.');
          }
        } else {
          throw new Error('네트워크 응답이 올바르지 않습니다.');
        }
      } catch (e) {
        console.error('Failed to fetch giving data, using mock data', e);
        // 목업 데이터 설정
        const mockData = {
          name: '하나',
          maxPoint: 5000,
          bankAccount: '하나은행 123-456789-01234',
          churchName: '한마음 교회',
        };
        setData(mockData);
        setName(mockData.name);
      }
    }
    fetchData();

    // 작성된 기도제목 불러오기
    const savedPrayer = sessionStorage.getItem('giving_message');
    if (savedPrayer) {
      setPrayerTopic(savedPrayer);
    }
  }, []);

  const handlePointChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (Number(val) >= 0 && Number(val) <= data.maxPoint) setPoint(val);
  };

  const handleGivingSubmit = async () => {
    const newErrors = {
      name: givingPerson === '기명' && !name.trim(),
      amount: !amount.trim() || Number(amount) <= 0,
    };

    setErrors(newErrors);

    if (newErrors.name) {
      nameRef.current?.focus();
      return;
    }

    if (newErrors.amount) {
      amountRef.current?.focus();
      return;
    }

    const payload = {
      type: selectedType,
      personType: givingPerson,
      name: givingPerson === '기명' ? name : null,
      amount: Number(amount),
      point: Number(point),
      prayerTopic: prayerTopic,
    };

    try {
      const res = await fetch('/api/giving/once', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const result = await res.json();

      if (res.ok && result.code === '200') {
        sessionStorage.setItem('latest_giving_amount', amount);
        route.push('/giving/once/complete');
      } else {
        // !!! 백엔드 연결 전 플로우 테스트를 위함. 연결 후 삭제 요망.
        sessionStorage.setItem('latest_giving_amount', amount);
        route.push('/giving/once/complete');
        alert(result.message || '헌금 접수에 실패했습니다. 다시 시도해주세요.');
      }
    } catch (e) {
      console.error('Failed to submit giving', e);
      alert('서버 오류가 발생했습니다. 나중에 다시 시도해주세요.');
    }
  };

  return (
    <div className="flex flex-col">
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
              ref={nameRef}
              type="text"
              placeholder="이름을 입력하세요"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (e.target.value.trim()) {
                  setErrors((prev) => ({ ...prev, name: false }));
                }
              }}
              className={`w-full rounded-xl border p-3 outline-none transition-colors ${
                errors.name
                  ? 'border-2 border-red-500 font-bold'
                  : 'border-gray-200 focus:border-hana-main'
              } bg-white`}
            />
          )}
        </section>

        <section className="flex flex-col gap-3">
          <p className="font-hana-bold text-lg">금액</p>
          <input
            ref={amountRef}
            type="number"
            placeholder="금액을 입력하세요"
            value={amount}
            onChange={(e) => {
              setAmount(e.target.value);
              if (e.target.value.trim() && Number(e.target.value) > 0) {
                setErrors((prev) => ({ ...prev, amount: false }));
              }
            }}
            className={`w-full rounded-xl border p-3 outline-none transition-colors ${
              errors.amount
                ? 'border-2 border-red-500 font-bold'
                : 'border-gray-200 focus:border-hana-main'
            } bg-white`}
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
              className="max-w-[200px] cursor-pointer truncate text-right font-hana-medium text-hana-main"
            >
              {prayerTopic ? '이어서 작성하기 >' : '작성하러가기 >'}
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
