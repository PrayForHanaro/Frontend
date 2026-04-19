'use client';

import Link from 'next/link';

type PointCardProps = {
  pointSum: number;
};

export default function PointCard({ pointSum }: PointCardProps) {
  return (
    <section className="rounded-2xl bg-hana-main p-4 text-white shadow-sm">
      <p className="text-sm opacity-90">보유 포인트</p>
      <p className="mt-2 font-bold text-3xl">{pointSum.toLocaleString()}P</p>

      <div className="mt-4">
        <Link
          href="/giving/once"
          className="inline-flex rounded-xl bg-white px-4 py-2 font-medium text-hana-main text-sm"
        >
          헌금하기
        </Link>
      </div>
    </section>
  );
}
