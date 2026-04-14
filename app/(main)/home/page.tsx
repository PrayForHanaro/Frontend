'use client';

import { ChevronRight, LoaderCircle } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { IMAGE_PATH } from '@/constants/images';

/**
 * @page: 홈
 * @description: 홈페이지입니다. 토탈 헌금액을 보여주며 페이지 이동을 위한 버튼으로 구성되어있습니다. api 호출 실패시 목업데이터를 넣습니다.
 * @author: 이승빈
 * @date: 2026-04-14
 */

const API_ROUTE = '/api/home';

interface HomeData {
  userName: string;
  myPoint: number;
  churchName: string;
  totalDonation: number;
  prayerPeople: {
    id: number;
    name: string;
    imagePath: string;
    relation: string;
  }[];
}

export default function Home() {
  const [data, setData] = useState<HomeData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        setLoading(true);
        const response = await fetch(API_ROUTE, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (response.ok) {
          const result = await response.json();
          if (result.code === '200' && result.data) {
            setData(result.data);
          } else {
            throw new Error(result.message || '데이터를 불러오지 못했습니다.');
          }
        } else {
          setData({
            userName: '하나',
            myPoint: 1200,
            churchName: '한마음',
            totalDonation: 1250,
            prayerPeople: [
              {
                id: 1,
                name: '김성도',
                imagePath: IMAGE_PATH.HOME_MAN,
                relation: '아들',
              },
              {
                id: 2,
                name: '이성도',
                imagePath: IMAGE_PATH.HOME_WOMAN,
                relation: '딸',
              },
              {
                id: 3,
                name: '박성도',
                imagePath: IMAGE_PATH.HOME_BABY,
                relation: '손주',
              },
            ],
          });
        }
      } catch (error) {
        console.error('데이터를 불러오는 중 오류 발생:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchHomeData();
  }, []);

  if (loading)
    return (
      <div className="flex h-screen animate-spin items-center justify-center text-hana-mint">
        <LoaderCircle />
      </div>
    );

  return (
    <div className="flex min-h-screen flex-col pb-20">
      <style>{`
        @keyframes slowFade {
          0%, 100% { opacity: 0; }
          50% { opacity: 1; }
        }
      `}</style>
      <main className="flex-1 px-5 pt-10">
        <section id="환영글" className="mb-6 px-1">
          <h2 className="font-hana-medium text-2xl text-hana-black leading-tight">
            안녕하세요, <br />
            <span className="font-hana-bold text-hana-mint">
              {data?.userName || '#'}
            </span>
            님 반갑습니다!
          </h2>
          <p className="mt-1 text-hana-gray-500">오늘도 함께하는 신앙생활</p>
        </section>

        <section
          id="홈 하나은행 기부금"
          className="relative mb-8 min-h-[190px] overflow-hidden rounded-[32px] bg-[#009697] p-8 text-white shadow-[#009697]/20 shadow-lg"
        >
          <div className="-top-12 -right-8 absolute h-48 w-48 animate-[slowFade_8s_infinite] rounded-full bg-white/20" />
          <div className="-bottom-16 -left-12 absolute h-64 w-64 animate-[slowFade_15s_infinite] rounded-full bg-black/10" />
          <div className="-translate-x-1/2 -translate-y-1/2 absolute top-1/2 left-1/2 h-32 w-32 animate-[slowFade_12s_infinite] rounded-full border border-white/20" />

          <div className="relative z-10 flex h-full flex-col justify-between">
            <div className="space-y-1">
              <p className="font-hana-medium text-lg text-white/90">
                이번 달 {data?.churchName || '#'}교회 성도들의 헌금과
              </p>
              <p className="font-hana-bold text-white text-xl">
                하나은행의 기부금
              </p>
            </div>

            <div className="mt-6">
              <div className="flex items-center gap-2">
                <span className="rounded-full bg-white/20 px-3 py-0.5 font-hana-bold text-sm uppercase tracking-wider">
                  Total
                </span>
              </div>
              <div className="mt-2 flex items-baseline gap-1">
                <h1 className="font-hana-heavy text-5xl tracking-tighter sm:text-6xl">
                  {data?.totalDonation?.toLocaleString() || '0'}
                </h1>
                <span className="font-hana-bold text-2xl opacity-90">만원</span>
              </div>
            </div>
          </div>

          <div className="-bottom-2 -right-1 absolute z-10 w-32 overflow-visible">
            <Image
              src={IMAGE_PATH.HOME_CHARACTER}
              alt="하나은행 캐릭터"
              width={128}
              height={128}
              className="object-contain"
            />
          </div>
        </section>

        <section
          id="홈 화면 버튼 모음"
          className="mb-10 grid grid-cols-2 gap-4"
        >
          <Link
            href="/bless/once/input"
            className="group relative h-44 overflow-hidden rounded-[32px] bg-gradient-to-br from-[#A34F6F] to-[#7D3A54] p-6 text-white shadow-[#A34F6F]/20 shadow-lg transition-all active:scale-95"
          >
            <div className="relative z-10 flex h-full flex-col justify-between">
              <div>
                <h3 className="mt-2 font-hana-bold text-2xl leading-tight">
                  오늘의 <br /> 기도
                </h3>
              </div>
              <div className="flex justify-end">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10">
                  <Image
                    src={IMAGE_PATH.HOME_PRAY}
                    alt="기도 이모지"
                    width={32}
                    height={32}
                  />
                </div>
              </div>
            </div>
            <div className="-bottom-4 -right-4 absolute h-24 w-24 rounded-full bg-white/5" />
          </Link>

          <Link
            href="/giving/once"
            className="group relative h-44 overflow-hidden rounded-[32px] bg-gradient-to-br from-[#FFB5C5] to-[#F899AD] p-6 text-white shadow-[#FFB5C5]/20 shadow-lg transition-all active:scale-95"
          >
            <div className="relative z-10 flex h-full flex-col justify-between">
              <div>
                <h3 className="mt-2 font-hana-bold text-2xl leading-tight">
                  헌금하기
                </h3>
              </div>
              <div className="flex justify-end">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10">
                  <Image
                    src={IMAGE_PATH.HOME_GIVING}
                    alt="헌금 이모지"
                    width={44}
                    height={44}
                    className="object-contain"
                  />
                </div>
              </div>
            </div>
            <div className="-bottom-4 -right-4 absolute h-24 w-24 rounded-full bg-white/5" />
          </Link>

          <Link
            href="/mypage"
            className="relative col-span-2 flex h-32 flex-col items-center justify-center rounded-[32px] border border-hana-mint/10 bg-[#f0f9f8] shadow-[0px_4px_0px_0px_#e6f4f1,0px_8px_0px_0px_#d1ede8] transition-all active:translate-y-[4px] active:shadow-none"
          >
            <div className="relative z-10 flex flex-col items-center gap-1 px-4 text-center">
              <span className="font-hana-medium text-hana-text-bold-green tracking-wide opacity-70">
                활동하며 정성껏 모은
              </span>
              <span className="font-hana-bold text-hana-dark-navy text-xl">
                나의 포인트
              </span>
            </div>

            <div className="relative z-10 mt-2 flex items-baseline gap-1.5 rounded-full bg-white/60 px-8 py-1.5 shadow-inner">
              <span className="font-hana-bold text-2xl text-hana-mint tracking-tight">
                {data?.myPoint?.toLocaleString()}
              </span>
              <span className="font-hana-bold text-hana-mint text-lg">P</span>
            </div>
          </Link>
        </section>

        <section id="홈 기도적금" className="mb-10 px-1">
          <div className="mb-2 flex items-center justify-between">
            <h2 className="font-hana-bold text-2xl text-hana-dark-navy">
              기도 적금
            </h2>
            <Link
              href="/bless/interval"
              className="font-hana-medium text-hana-gray-400 text-sm hover:text-hana-mint"
            >
              자세히 보기 〉
            </Link>
          </div>
          <div className="mb-4 text-hana-gray-600">{`${data?.userName}님이 기도드리는 성도님들이에요`}</div>
          <div className="space-y-3">
            {data?.prayerPeople && data.prayerPeople.length > 0 ? (
              data.prayerPeople.map((person) => (
                <Link
                  key={person.id}
                  href={`/bless/interval/${person.id}`}
                  className="group relative flex items-center justify-between overflow-hidden rounded-2xl bg-white p-5 shadow-sm transition-all hover:shadow-md active:scale-[0.98]"
                >
                  <div className="absolute top-0 left-0 h-full w-1.5 bg-[#F2E5D3]" />
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#FFF9F2] shadow-inner">
                      <Image
                        src={person.imagePath}
                        alt={person.name}
                        width={32}
                        height={32}
                      />
                    </div>
                    <div className="flex flex-row items-center gap-2">
                      <h3 className="font-hana-bold text-hana-dark-navy text-lg transition-colors group-hover:text-hana-mint">
                        {person.name} 성도님
                      </h3>
                      <span className="font-hana-medium text-hana-mint text-sm">
                        ({person.relation})
                      </span>
                    </div>
                  </div>
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-50 transition-colors group-hover:bg-hana-mint/10">
                    <ChevronRight className="h-5 w-5 text-hana-gray-300 group-hover:text-hana-mint" />
                  </div>
                </Link>
              ))
            ) : (
              <div className="rounded-2xl bg-white py-10 text-center shadow-sm">
                <p className="text-hana-gray-400 text-sm">
                  아직 기도 중인 분이 없어요.
                </p>
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
