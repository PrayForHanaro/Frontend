'use client';

import { formatCurrency } from '@/lib/formatters';
import WhiteCard from '../cmm/WhiteCard';
import GivingHistoryTotalCard from './GivingHistoryTotalCard';

enum OfferingType {
  십일조 = '십일조',
  감사헌금 = '감사헌금',
  선교헌금 = '선교헌금',
  건축헌금 = '건축헌금',
  기타 = '기타',
}

type Offering = {
  offeringId: number;
  userId: number;
  orgId: number;
  accountId: number;
  offeringType: OfferingType; // OfferingType의 enum 값을 String으로 변환하여 사용
  amount: number;
  offererName: string;
  prayerContent: string;
  createdAt: Date;
  updatedAt: Date;
};
const offering: Offering[] = [
  {
    offeringId: 1,
    userId: 123,
    orgId: 456,
    accountId: 789,
    offeringType: OfferingType.십일조,
    amount: 1500000.0,
    offererName: '김하나',
    prayerContent: '하나님께 기도드립니다. 항상 건강하게 지내게 해주세요.',
    createdAt: new Date('2026-04-28T10:00:00'),
    updatedAt: new Date('2026-04-28T11:00:00'),
  },
  {
    offeringId: 2,
    userId: 123,
    orgId: 456,
    accountId: 789,
    offeringType: OfferingType.감사헌금,
    amount: 1000000.0,
    offererName: '김하나',
    prayerContent: '하나님께 기도드립니다. 항상 건강하게 지내게 해주세요.',
    createdAt: new Date('2026-03-28T10:00:00'),
    updatedAt: new Date('2026-03-28T11:00:00'),
  },
  {
    offeringId: 3,
    userId: 123,
    orgId: 456,
    accountId: 789,
    offeringType: OfferingType.선교헌금,
    amount: 800000.0,
    offererName: '김하나',
    prayerContent: '하나님께 기도드립니다. 항상 건강하게 지내게 해주세요.',
    createdAt: new Date('2026-02-28T10:00:00'),
    updatedAt: new Date('2026-02-28T11:00:00'),
  },
];

export default function GivingHistorySection() {
  return (
    <div className="flex flex-col gap-3">
      <GivingHistoryTotalCard
        totalAmount={15130000103}
        points={100}
        nextPaymentDate="2026.05.28"
      />
      {/* TODO 데이터 임시값 */}
      <h2 className="pl-2 font-hana-bold text-[18px] text-hana-gray-600">
        봉헌 내역
      </h2>
      {offering.map((o) => (
        <WhiteCard
          key={o.offeringId}
          contents={o.offeringType}
          description={`+${formatCurrency(o.amount)}원`}
          isSelected={false}
          align="left"
          descriptionType="amount"
          badgeType="tag"
          tag={`${o.createdAt.getFullYear()}.${String(o.createdAt.getMonth() + 1).padStart(2, '0')}.${String(o.createdAt.getDate()).padStart(2, '0')}`}
        />
      ))}
    </div>
  );
}
