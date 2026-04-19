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

type Pension = {
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
};

const pensions: Pension[] = [
  {
    pensionId: 1,
    userId: 1,
    accountNumber: '101-23-***456',
    pensionType: '국민연금',
    isHanaBank: true,
    totalContribution: 850000,
    totalWithdrawal: 0,
    profit: 9000,
    returnRate: 10,
    institutionName: '국민연금공단',
    productName: '국민연금 기본형',
  },
  {
    pensionId: 2,
    userId: 1,
    accountNumber: '213-90-***812',
    pensionType: '퇴직연금',
    isHanaBank: true,
    totalContribution: 850000,
    totalWithdrawal: 0,
    profit: 9000,
    returnRate: 10,
    institutionName: '하나은행',
    productName: '하나 퇴직연금',
  },
  {
    pensionId: 3,
    userId: 1,
    accountNumber: '334-11-***275',
    pensionType: '개인연금',
    isHanaBank: false,
    totalContribution: 850000,
    totalWithdrawal: 0,
    profit: 9000,
    returnRate: 10,
    institutionName: '두나생명',
    productName: '두나 개인연금',
  },
  {
    pensionId: 4,
    userId: 1,
    accountNumber: '558-72-***904',
    pensionType: '퇴직연금',
    isHanaBank: false,
    totalContribution: 1250000,
    totalWithdrawal: 0,
    profit: 12000,
    returnRate: 9,
    institutionName: '미래연금보험',
    productName: '미래 퇴직연금 플랜',
  },
];

export default function Transfer() {
  const [selectedPensions, setSelectedPensions] = useState<number[]>([]);

  const router = useRouter();

  const handleSelectPension = (pensionId: number, selected: boolean) => {
    if (selected) {
      setSelectedPensions((prev) => [...prev, pensionId]);
    } else {
      setSelectedPensions((prev) => prev.filter((id) => id !== pensionId));
    }
  };

  const selectAllNonHanaBank = () => {
    setSelectedPensions(nonHanaBankPensionList.map((p) => p.pensionId));
  };

  const deselectAllNonHanaBank = () => {
    setSelectedPensions([]);
  };

  const nonHanaBankPensionList = pensions.filter((p) => !p.isHanaBank);
  const hanaBankPensionList = pensions.filter((p) => p.isHanaBank);

  const isAllNonHanaBankSelected =
    selectedPensions !== null &&
    nonHanaBankPensionList.every((p) => selectedPensions.includes(p.pensionId));

  return (
    <div className="flex min-h-screen flex-col">
      <Header content="헌금 관리" />

      <div className="flex min-h-0 flex-1 flex-col overflow-hidden">
        <div className="scrollbar-hide flex-1 overflow-y-auto px-0 pt-7 pb-6">
          <div>
            <div className="text-l">내 연금 목록</div>
            <div className="pt-3 text-hana-gray-600">
              추가할 연금을 선택해주세요.
            </div>
          </div>

          <div className="pt-7">
            <div className="text-l">하나은행 연결된 연금</div>
            {hanaBankPensionList.map((p) => (
              <div key={p.pensionId} className="pt-3">
                <WhiteCard
                  align="left"
                  contents={p.institutionName}
                  description={p.accountNumber}
                  description2={p.productName}
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
                  align="left"
                  contents={p.institutionName}
                  description={p.accountNumber}
                  description2={p.productName}
                  isSelected={selectedPensions.includes(p.pensionId)}
                  setIsSelected={(selected) =>
                    handleSelectPension(p.pensionId, selected)
                  }
                  showCheckbox={true}
                />
              </div>
            ))}
          </div>

          {/* 마지막 카드가 버튼에 안 가리도록 여유 */}
          <div className="h-10" />
        </div>

        <div className="sticky bottom-0 w-full pt-4 pb-1">
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
              onClick={() => router.push('/giving')}
            >
              선택완료
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
