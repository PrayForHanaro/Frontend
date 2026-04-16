'use client';

import { useEffect, useState } from 'react';
import Header from '@/components/ui/cmm/Header';
import Nav from '@/components/ui/cmm/Nav';
import PointItem from '@/components/ui/My/points/PointItem';
import PointSummary from '@/components/ui/My/points/PointSummary';

// 👉 타입 정의 (나중에 DTO 그대로 쓰면 됨)
type PointHistory = {
  id: number;
  title: string;
  amount: number;
  date: string;
};

export default function PointPage() {
  const [points, setPoints] = useState<PointHistory[]>([]);
  const [totalPoint, setTotalPoint] = useState(0);

  // 👉 지금은 하드코딩 (나중에 API로 교체)
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
    <div className="flex flex-col gap-4 pb-20">
      <Header content="포인트 내역" />

      {/* 👉 상단 요약 (props로 받기) */}
      <PointSummary totalPoint={totalPoint} />

      <div className="mt-8 flex flex-col gap-3 px-4">
        {/* 포인트 내역 텍스트 */}
        <span className="text-gray-500 text-sm">
          포인트 내역 총 {points.length}건
        </span>

        {/* 리스트 */}
        {points.map((point) => (
          <PointItem
            key={point.id}
            title={point.title}
            amount={point.amount}
            date={point.date}
          />
        ))}
      </div>

      <Nav />
    </div>
  );
}
