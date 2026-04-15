'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import Header from '@/components/ui/cmm/Header';
import WhiteCard from '@/components/ui/cmm/WhiteCard';

/**
 * @page: 연금 이전 페이지입니다.
 * @description: 연금 이전 페이지입니다.
 * accountNumber에 대한 마스킹은 BFF에서 처리합니다.
 * @author: 이정수
 * @date: 2026-04-15
 */

type PensionType = '국민연금' | '퇴직연금' | '개인연금'; // 연금 종류에 대한 타입

interface Pension {
  pensionId: number; // 연금 ID
  userId: number; // 사용자 ID
  accountNumber: string; // 연결된 계좌 ID (null 허용)
  pensionType: PensionType; // 연금 종류
  isHanaBank: boolean; // 하나은행 여부
  totalContribution: number; // 총 납입액
  totalWithdrawal: number; // 총 출금액
  profit: number; // 운용 수익
  returnRate: number; // 수익률 (%)
  institutionName: string; // 연금 기관명
  productName: string; // 상품 이름
}

//TODO 임시 데이터, API 연동 필요
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
  const [selectedPensions, setSelectedPensions] = useState<number[] | null>(
    null,
  );

  const router = useRouter();

  const addPension = (pensionId: number) => {
    setSelectedPensions((prev) => {
      if (prev === null) {
        return [pensionId];
      } else {
        return [...prev, pensionId];
      }
    });
  };

  const transferPension = () => {
    router.push('/giving');
  };

  const removePension = (pensionId: number) => {
    setSelectedPensions((prev) => {
      if (prev === null) return null;
      return prev.filter((id) => id !== pensionId);
    });
  };

  const togglePension = (pensionId: number) => {
    if (selectedPensions?.includes(pensionId)) {
      removePension(pensionId);
    } else {
      addPension(pensionId);
    }
  };

  const selectAllNonHanaBank = () => {
    setSelectedPensions(nonHanaBankPensionList.map((p) => p.pensionId));
  };

  const deselectAllNonHanaBank = () => {
    setSelectedPensions(null);
  };

  const nonHanaBankPensionList = pensions.filter((p) => !p.isHanaBank);
  const hanaBankPensionList = pensions.filter((p) => p.isHanaBank);

  const isAllNonHanaBankSelected =
    selectedPensions !== null &&
    nonHanaBankPensionList.every((p) => selectedPensions.includes(p.pensionId));

  return (
    <div className="relative min-h-full w-full">
      <Header content="헌금 관리" />
      <div className="absolute pt-7">
        <div className="text-l">내 연금 목록</div>
        <div className="pt-3 text-hana-gray-600">
          추가할 연금을 선택해주세요.
        </div>
      </div>

      <div className="pt-25">
        <div className="text-l">하나은행 연결된 연금</div>
        {hanaBankPensionList.map((p) => (
          <div key={p.pensionId} className="pt-3">
            <WhiteCard
              contents={`${p.institutionName} | ${p.productName}`}
              description={`${p.accountNumber} | ${p.productName}`}
              isSelected={false}
              setIsSelected={() => {}}
              badgeContent="연결됨"
            />
          </div>
        ))}
      </div>

      <div className="pt-7">
        <div className="text-l">타은행 연금</div>
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
              contents={`${p.institutionName} | ${p.productName}`}
              description={`${p.accountNumber} | ${p.productName}`}
              isSelected={selectedPensions?.includes(p.pensionId) || false}
              setIsSelected={() => togglePension(p.pensionId)}
            />
          </div>
        ))}
      </div>
      <div className="absolute bottom-1 w-full pt-10">
        <div className="grid grid-cols-1 gap-3">
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
            onClick={transferPension}
          >
            선택완료
          </Button>
        </div>
      </div>
    </div>
  );
}
