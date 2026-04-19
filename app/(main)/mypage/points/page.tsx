'use client';

import { useEffect, useState } from 'react';
import Header from '@/components/ui/cmm/Header';
import Nav from '@/components/ui/cmm/Nav';
import PointItem from '@/components/ui/My/points/PointItem';
import PointSummary from '@/components/ui/My/points/PointSummary';

// 👉 타입 정의
type PointHistory = {
  id: number;
  title: string;
  amount: number;
  date: string;
};

export default function PointPage() {
  const [points, setPoints] = useState<PointHistory[]>([]);
  const [totalPoint, setTotalPoint] = useState(0);

  useEffect(() => {
    const mockData: PointHistory[] = [
      {
        id: 1,
        title: '정기헌금: 주일헌금',
        amount: 500,
        date: '2026.04.06',
      },
      {
        id: 2,
        title: '헌금: 십일조',
        amount: 50000,
        date: '2026.04.01',
      },
      {
        id: 3,
        title: '적금 자동이체: 결혼 적금 - 승빈(아들)',
        amount: 50000,
        date: '2026.03.28',
      },
      {
        id: 4,
        title: '적금 가입: 수능적금 - 정수(딸)',
        amount: 50000,
        date: '2026.03.21',
      },
    ];

    setPoints(mockData);
    setTotalPoint(3255000);
  }, []);

  return (
    <div className="relative h-full w-full overflow-hidden">
      <div className="scrollbar-hide h-full overflow-y-auto px-4 pb-24">
        <Header content="포인트 내역" />

        <PointSummary totalPoint={totalPoint} />

        <div className="mt-8 flex flex-col gap-3">
          <span className="text-gray-500 text-sm">
            포인트 내역 총 {points.length}건
          </span>

          {points.map((point) => (
            <PointItem
              key={point.id}
              title={point.title}
              amount={point.amount}
              date={point.date}
            />
          ))}
        </div>
      </div>
      <Nav />
    </div>
  );
}
