'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import Header from '@/components/ui/cmm/Header';
import Nav from '@/components/ui/cmm/Nav';
import WhiteCard from '@/components/ui/cmm/WhiteCard';

/**
 * @page: 연금 이전 페이지입니다.
 * @description: 연금 이전 페이지입니다. 개별 Nav 적용 버전.
 * @author: 이정수
 * @date: 2026-04-15
 */

type PensionType = '국민연금' | '퇴직연금' | '개인연금';

type Pension = {
  pensionId: number;
  userId: number;
  accountNumber: string;
  pensionType: PensionType;
  isHanaBank: boolean;
  totalContribution: number;
  totalWithdrawal: number;
  profit: number;
  returnRate: number;
  institutionName: string;
  productName: string;
};

const pensions: Pension[] = [
  {
    pensionId: 1,
    userId: 123,
    accountNumber: '11111-1111111-1111',
    pensionType: '퇴직연금',
    isHanaBank: true,
    totalContribution: 1000000.0,
    totalWithdrawal: 500000.0,
    profit: 50000.0,
    returnRate: 5.0,
    institutionName: '하나은행',
    productName: '하나 IRP',
  },
  {
    pensionId: 2,
    userId: 124,
    accountNumber: '11111-1111111-1111',
    pensionType: '국민연금',
    isHanaBank: false,
    totalContribution: 1500000.0,
    totalWithdrawal: 700000.0,
    profit: 80000.0,
    returnRate: 6.0,
    institutionName: '국민연금공단',
    productName: '국민연금',
  },
];

export default function Transfer() {
  const [selectedPensions, setSelectedPensions] = useState<number[]>([]);
  const router = useRouter();

  const togglePension = (pensionId: number) => {
    setSelectedPensions((prev) =>
      prev.includes(pensionId)
        ? prev.filter((id) => id !== pensionId)
        : [...prev, pensionId],
    );
  };

  const selectAllNonHanaBank = () => {
    setSelectedPensions(nonHanaBankPensionList.map((p) => p.pensionId));
  };

  const deselectAllNonHanaBank = () => {
    setSelectedPensions([]);
  };

  const nonHanaBankPensionList = pensions.filter((p) => !p.isHanaBank);
  const hanaBankPensionList = pensions.filter((p) => p.isHanaBank);

  const isAllNonHanaBankSelected = nonHanaBankPensionList.every((p) =>
    selectedPensions.includes(p.pensionId),
  );

  return (
    <div className="relative h-full w-full overflow-hidden">
      <div className="scrollbar-hide h-full overflow-y-auto px-4 pb-48">
        <Header content="헌금 관리" />
        <div className="relative pt-7">
          <div className="font-hana-bold text-l">내 연금 목록</div>
          <div className="pt-3 text-hana-gray-600">
            추가할 연금을 선택해주세요.
          </div>
        </div>

        <div className="pt-7">
          <div className="font-hana-bold text-l">하나은행 연결된 연금</div>
          {hanaBankPensionList.map((p) => (
            <div key={p.pensionId} className="pt-3">
              <WhiteCard
                align="left"
                contents={`${p.institutionName} - ${p.productName}`}
                description={`${p.accountNumber}`}
                isSelected={false}
                setIsSelected={() => {}}
                badgeContent="연결됨"
              />
            </div>
          ))}
        </div>

        <div className="pt-7">
          <div className="font-hana-bold text-l">타은행 연금</div>
          <div className="flex items-center gap-3 pt-3">
            <input
              id="selectAll"
              type="checkbox"
              checked={isAllNonHanaBankSelected}
              onChange={() =>
                isAllNonHanaBankSelected
                  ? deselectAllNonHanaBank()
                  : selectAllNonHanaBank()
              }
              className="h-5 w-5 cursor-pointer accent-hana-light-mint"
            />
            <label htmlFor="selectAll" className="cursor-pointer text-l">
              전체 선택
            </label>
          </div>
          {nonHanaBankPensionList.map((p) => (
            <div key={p.pensionId} className="pt-3">
              <WhiteCard
                align="left"
                contents={`${p.institutionName} - ${p.productName}`}
                description={`${p.accountNumber}`}
                isSelected={selectedPensions.includes(p.pensionId)}
                setIsSelected={() => togglePension(p.pensionId)}
              />
            </div>
          ))}
        </div>

        <div className="mt-10 grid grid-cols-1 gap-3">
          <Button
            type="button"
            variant="outline"
            className="h-15 w-full rounded-2xl bg-hana-gray-200 text-2xl hover:bg-hana-gray-300"
            onClick={() => router.back()}
          >
            돌아가기
          </Button>
          <Button
            type="button"
            className="h-15 w-full rounded-2xl bg-hana-linear-deep-green-end text-2xl hover:bg-hana-linear-deep-green"
            onClick={() => router.push('/giving')}
          >
            선택완료
          </Button>
        </div>
      </div>
      <Nav />
    </div>
  );
}
