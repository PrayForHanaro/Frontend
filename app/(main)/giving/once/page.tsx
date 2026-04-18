'use client';

import { Check } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import Header from '@/components/ui/cmm/Header';
import { GivingPersonSelector } from '@/components/ui/giving/GivingPersonSelector';
import TypeButton from '@/components/ui/giving/TypeButton';

/**
 * @page: 일회성 헌금 내용 작성
 * @description: 일회성 헌금 내용 작성 페이지입니다. 로딩을 제거하고 시연용 목데이터를 즉시 표시합니다.
 * @author: 이승빈
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
  orgId: number;
  accountId: number;
  donationRate: number;
};

export default function GivingOnce() {
  const [selectedType, setSelectedType] = useState<string>('감사헌금');
  const [givingPerson, setGivingPerson] = useState<'기명' | '무기명'>('기명');
  const [name, setName] = useState('하나');
  const [amount, setAmount] = useState('');
  const [point, setPoint] = useState('19000');
  const [useAllPoints, setUseAllPoints] = useState(true);
  const [prayerTopic, setPrayerTopic] = useState('');
  const [data, setData] = useState<GivingData>({
    name: '하나',
    maxPoint: 19000,
    bankAccount: '하나은행 123-456789-01107',
    churchName: '한마음교회',
    orgId: 1,
    accountId: 1,
    donationRate: 0.01,
  });

  const [errors, setErrors] = useState({
    name: false,
    amount: false,
  });

  const nameRef = useRef<HTMLInputElement>(null);
  const amountRef = useRef<HTMLInputElement>(null);
  const useAllPointsRef = useRef(useAllPoints);

  // useAllPoints 상태가 변할 때마다 ref 업데이트
  useEffect(() => {
    useAllPointsRef.current = useAllPoints;
  }, [useAllPoints]);

  const router = useRouter();

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch('/api/giving/once');
        const result = await res.json();

        if (res.ok && result.success && result.data) {
          const fetchedData = result.data;
          setData({
            name: fetchedData.name,
            maxPoint: fetchedData.maxPoint,
            bankAccount: fetchedData.bankAccount,
            churchName: fetchedData.churchName,
            orgId: fetchedData.orgId,
            accountId: fetchedData.accountId,
            donationRate: fetchedData.donationRate || 1,
          });

          if (useAllPointsRef.current)
            setPoint(fetchedData.maxPoint.toString());

          const savedState = sessionStorage.getItem('giving_once_state');
          if (!savedState) {
            setName(fetchedData.name);
          }
        }
      } catch (e: unknown) {
        console.error('데이터 로딩 오류:', e);
      }
    }
    fetchData();

    // 폼 데이터 복원
    const savedState = sessionStorage.getItem('giving_once_state');
    if (savedState) {
      try {
        const parsed = JSON.parse(savedState);
        setSelectedType(parsed.selectedType || '감사헌금');
        setGivingPerson(parsed.givingPerson || '기명');
        setName(parsed.name || '하나');
        setAmount(parsed.amount || '');
        setPoint(parsed.point || '19000');
        setUseAllPoints(parsed.useAllPoints ?? true);
      } catch (e) {
        console.error('세션 데이터 파싱 오류:', e);
      }
    }

    const savedPrayer = sessionStorage.getItem('giving_message');
    if (savedPrayer) {
      setPrayerTopic(savedPrayer);
    }
  }, []);
  const handleSaveState = () => {
    const state = {
      selectedType,
      givingPerson,
      name,
      amount,
      point,
      useAllPoints,
    };
    sessionStorage.setItem('giving_once_state', JSON.stringify(state));
  };

  const estimatedEarnedPoint =
    Math.floor(Number(amount) * data.donationRate) * 7;

  const handlePointChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (Number(val) >= 0 && Number(val) <= data.maxPoint) {
      setPoint(val);
      setUseAllPoints(Number(val) === data.maxPoint);
    }
  };

  const toggleAllPoints = () => {
    const newVal = !useAllPoints;
    setUseAllPoints(newVal);
    if (newVal) {
      setPoint(data.maxPoint.toString());
    } else {
      setPoint('');
    }
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

    try {
      sessionStorage.setItem('latest_giving_amount', amount);
      sessionStorage.setItem(
        'latest_earned_point',
        estimatedEarnedPoint.toString(),
      );
      sessionStorage.removeItem('giving_once_state');
      sessionStorage.removeItem('giving_message');
      router.push('/giving/once/complete');
    } catch (e) {
      console.error('Failed to submit giving', e);
      router.push('/giving/once/complete');
    }
  };

  return (
    <div className="flex flex-col">
      <Header content="헌금하기" />
      <main className="flex-1 space-y-8 p-5 pb-20">
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
          {Number(amount) > 0 && (
            <p className="px-1 font-hana-medium text-hana-mint text-sm">
              이번 헌금으로{' '}
              <span className="font-hana-bold">
                {estimatedEarnedPoint.toLocaleString()}P
              </span>
              가 적립됩니다.
            </p>
          )}
        </section>

        <section className="flex flex-col gap-3">
          <p className="font-hana-bold text-lg">포인트 사용</p>
          <input
            type="number"
            placeholder="사용할 포인트를 입력하세요"
            value={point}
            onChange={handlePointChange}
            className="w-full rounded-xl border border-gray-200 bg-white p-3 outline-none transition-colors focus:border-hana-main"
          />
          <div className="flex items-center justify-between px-1">
            <p className="text-gray-500 text-xs">
              보유 포인트: {data.maxPoint.toLocaleString()}P
            </p>
            <button
              type="button"
              onClick={toggleAllPoints}
              className="flex items-center gap-1.5"
            >
              <div
                className={`flex h-5 w-5 items-center justify-center rounded-md border transition-colors ${
                  useAllPoints
                    ? 'border-hana-main bg-hana-main text-white'
                    : 'border-gray-300 bg-white'
                }`}
              >
                {useAllPoints && <Check size={14} strokeWidth={3} />}
              </div>
              <span
                className={`text-xs ${
                  useAllPoints
                    ? 'font-hana-bold text-hana-main'
                    : 'text-gray-500'
                }`}
              >
                전액 사용
              </span>
            </button>
          </div>
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
              onClick={handleSaveState}
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
