'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Header from '@/components/ui/cmm/Header';
import Nav from '@/components/ui/cmm/Nav';

/**
 * @page: 일회성 헌금 기도문 작성 페이지
 * @description: 일회성 헌금 기도문 작성 페이지입니다. 기도문을 작성할 수 있습니다. 세션에 저장해 이전에 작성하던 글을 이어서 작성 가능합니다.
 * @author: 이승빈
 * @date: 2026-04-14
 */

export default function GivingPrayer() {
  const [prayer, setPrayer] = useState('');
  const router = useRouter();

  useEffect(() => {
    const savedPrayer = sessionStorage.getItem('giving_message');
    if (savedPrayer) setPrayer(savedPrayer);
  }, []);

  const handleComplete = () => {
    sessionStorage.setItem('giving_message', prayer);
    router.back();
  };

  return (
    <div className="relative h-full w-full overflow-hidden">
      <div className="scrollbar-hide h-full overflow-y-auto px-4 pb-24">
        <Header content="기도제목 작성" />
        <main className="mt-4">
          <section className="space-y-4">
            <div className="mt-3 flex flex-col gap-2">
              <p className="text-xl">하나님께 드리는 기도문</p>
              <p className="text-hana-gray-500 text-sm">
                오늘의 고민과 걱정거리를 하나님께
              </p>
            </div>

            <div className="relative">
              <textarea
                value={prayer}
                onChange={(e) => setPrayer(e.target.value.slice(0, 250))}
                placeholder="기도제목을 입력해주세요 "
                className="h-[400px] w-full resize-none rounded-2xl border border-hana-gray-200 bg-hana-gray-100 p-5 pr-16 text-lg outline-none transition-colors focus:border-hana-main focus:bg-white"
              />
              <div className="absolute right-5 bottom-4 text-hana-gray-400 text-sm">
                <span
                  className={
                    prayer.length > 0 ? 'font-hana-medium text-hana-main' : ''
                  }
                >
                  {prayer.length}
                </span>
                /250
              </div>
            </div>
          </section>
        </main>

        <div className="mt-6 flex gap-3 pb-10">
          <button
            type="button"
            onClick={() => router.back()}
            className="w-[120px] rounded-2xl bg-hana-fade-green py-4 font-hana-bold text-hana-main text-xl shadow-lg transition-transform active:scale-[0.98]"
          >
            취소
          </button>
          <button
            type="button"
            disabled={prayer.length === 0}
            onClick={handleComplete}
            className="w-full rounded-2xl bg-hana-main py-4 font-hana-bold text-white text-xl shadow-lg transition-transform active:scale-[0.98]"
          >
            작성 완료
          </button>
        </div>
      </div>
      <Nav />
    </div>
  );
}
