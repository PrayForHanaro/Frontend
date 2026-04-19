'use client';

import Link from 'next/link';
import { Button } from '../button';

export default function PointCard() {
  return (
    <div className="flex flex-col gap-2">
      <div className="rounded-2xl bg-white p-4 shadow">
        <div className="flex items-center justify-start">
          <span className="font-bold text-3xl text-hana-main">12,500P</span>
        </div>

        {/* 👇 버튼 가로 정렬 */}
        <div className="mt-4 flex gap-2">
          <Link href="/giving/once" className="flex-1">
            <Button className="w-full rounded-xl bg-hana-main py-3 text-white">
              헌금하기
            </Button>
          </Link>

          <Link href="/mypage/points" className="flex-1">
            <Button className="w-full rounded-xl bg-hana-main py-3 text-white">
              포인트 내역 보기
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
