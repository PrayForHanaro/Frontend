'use client';

import { LoaderCircle } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Header from '@/components/ui/cmm/Header';
import { IMAGE_PATH } from '@/constants/images';

/**
 * @page: 헌금완료페이지
 * @description: 헌금완료페이지 입니다. 유저 서비스(8083)를 호출하여 데이터를 표시합니다.
 * @author: 이승빈
 * @date: 2026-04-14
 */

export default function GivingOnceComplete() {
  const router = useRouter();
  const [amount, setAmount] = useState<number>(0);
  const [point, setPoint] = useState<number>(0);
  const [userName, setUserName] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCompleteData = async () => {
      try {
        const savedAmount = sessionStorage.getItem('latest_giving_amount');
        const numAmount = savedAmount ? Number(savedAmount) : 0;
        setAmount(numAmount);

        const savedEarnedPoint = sessionStorage.getItem('latest_earned_point');
        if (savedEarnedPoint) {
          setPoint(Number(savedEarnedPoint));
        }

        // [BFF] 유저 정보 조회
        const res = await fetch('/api/me');
        let pointRate = 0.01;
        let name = '하나';

        if (res.ok) {
          const result = await res.json();
          if (result.success && result.data) {
            pointRate = result.data.pointRate || 0.01;
            name = result.data.name || '하나';
          }
        }

        setUserName(name);
        if (!savedEarnedPoint) {
          setPoint(Math.floor(numAmount * pointRate));
        }
      } catch (e) {
        console.error('데이터 로딩 오류:', e);
      } finally {
        setLoading(false);
      }
    };

    fetchCompleteData();
  }, []);

  const handleFinish = () => {
    sessionStorage.removeItem('latest_giving_amount');
    sessionStorage.removeItem('latest_earned_point');
    sessionStorage.removeItem('giving_message');
    router.push('/home');
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#F7F6F2]">
        <p className="animate-spin font-hana-medium text-gray-400 text-lg">
          <LoaderCircle />
        </p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header content="헌금 완료" />

      <main className="flex flex-1 flex-col items-center px-8 pt-10 pb-10">
        <div className="fade-in slide-in-from-bottom-10 mb-6 animate-in duration-700">
          <Image
            src={IMAGE_PATH.GIVINGONCE_COMPLETE}
            alt="헌금 봉투"
            width={180}
            height={315}
            priority
            className="drop-shadow-[0_15px_30px_rgba(0,0,0,0.1)]"
          />
        </div>

        <div className="mb-10 text-center">
          <p className="mb-2 font-hana-medium text-[#888888] text-xl">
            정성껏 드린 헌금액
          </p>
          <div className="flex items-baseline justify-center gap-1">
            <span className="font-hana-bold text-6xl text-[#008485]">
              {amount.toLocaleString()}
            </span>
            <span className="font-hana-bold text-2xl text-[#333333]">원</span>
          </div>
          <div className="mx-auto mt-5 h-1.5 w-20 rounded-full bg-[#008485] opacity-20" />
        </div>

        <div className="mb-8 w-full space-y-3">
          <div className="flex items-center justify-between rounded-2xl bg-[#EBEAE4] px-6 py-5">
            <span className="font-hana-medium text-[#666666] text-lg">
              성함
            </span>
            <span className="font-hana-bold text-[#333333] text-xl">
              {userName} 성도님
            </span>
          </div>

          <div className="flex items-center justify-between rounded-2xl bg-[#EBEAE4] px-6 py-5">
            <span className="font-hana-medium text-[#666666] text-lg">
              적립 포인트
            </span>
            <span className="font-hana-bold text-2xl text-[#D39431]">
              {point.toLocaleString()} <span className="text-lg">P</span>
            </span>
          </div>
        </div>

        <div className="w-full">
          <button
            type="button"
            onClick={handleFinish}
            className="w-full cursor-pointer rounded-2xl bg-[#008485] py-5 font-hana-bold text-2xl text-white shadow-lg transition-all active:scale-[0.98]"
          >
            확인
          </button>
        </div>
      </main>
    </div>
  );
}
