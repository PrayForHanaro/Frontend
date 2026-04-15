'use client';

import { useRouter } from 'next/navigation';

import LongButton from '@/components/ui/cmm/LongBtn';
import PensionActionButton from '@/components/ui/giving/PensionActionButton';
import PensionProductCard from '@/components/ui/giving/PensionProductCard';

/**
 * @page: 연금 연계 뷰
 * @description: 연금 연계 뷰 컴포넌트입니다. 하나은행 연금과 타은행 연금을 보여주고, 연금 가입하기, 불러오기, 이전하기 등의 액션을 제공합니다.
 * @author: typeYu
 * @date: 2026-04-15
 */

type PensionProduct = {
  id: number;
  categoryLabel: string;
  institutionName: string;
  depositAmount: string;
  totalAmount: string;
  monthlyAmount: string;
  simpleYield: string;
};

const HANA_PENSION_LIST: PensionProduct[] = [
  {
    id: 1,
    categoryLabel: '국민연금',
    institutionName: '국민연금공단',
    depositAmount: '₩850,000',
    totalAmount: '₩850,000',
    monthlyAmount: '₩9,000',
    simpleYield: '10%',
  },
  {
    id: 2,
    categoryLabel: '퇴직연금',
    institutionName: '하나은행',
    depositAmount: '₩850,000',
    totalAmount: '₩850,000',
    monthlyAmount: '₩9,000',
    simpleYield: '10%',
  },
];

const EXTERNAL_PENSION_LIST: PensionProduct[] = [
  {
    id: 3,
    categoryLabel: '개인연금',
    institutionName: '두나생명',
    depositAmount: '₩850,000',
    totalAmount: '₩850,000',
    monthlyAmount: '₩9,000',
    simpleYield: '10%',
  },
  {
    id: 4,
    categoryLabel: '퇴직연금',
    institutionName: '미래연금보험',
    depositAmount: '₩1,250,000',
    totalAmount: '₩1,250,000',
    monthlyAmount: '₩12,000',
    simpleYield: '9%',
  },
];

export default function PensionLinkedView() {
  const router = useRouter();

  function handleMoveTransferPage() {
    router.push('/giving/transfer');
  }

  function handleClickJoinPension() {
    console.log('연금 가입하기');
  }

  function handleClickLoadPension() {
    console.log('연금 불러오기');
  }

  return (
    <section className="mb-20 flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h2 className="font-hana-main text-[18px] text-hana-black">
          하나은행 연금 목록
        </h2>

        <span className="inline-flex items-center rounded-full border border-hana-main bg-white px-3 py-1 font-hana-main text-[13px] text-hana-main">
          + 헌금액 X 0.7%
        </span>
      </div>

      <div className="flex flex-col gap-3">
        {HANA_PENSION_LIST.map((item) => (
          <PensionProductCard
            key={item.id}
            categoryLabel={item.categoryLabel}
            institutionName={item.institutionName}
            depositAmount={item.depositAmount}
            totalAmount={item.totalAmount}
            monthlyAmount={item.monthlyAmount}
            simpleYield={item.simpleYield}
          />
        ))}

        <PensionActionButton
          text="연금 가입하기"
          onClick={handleClickJoinPension}
        />
      </div>

      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-1">
          <h3 className="font-hana-regular text-[18px] text-hana-black">
            타은행 연금 목록
          </h3>

          <p className="font-hana-regular font-semibold text-[14px] text-hana-main">
            ⓘ 연금을 이전하시면
          </p>
          <p className="font-hana-regular font-semibold text-[14px] text-hana-main">
            연금 하나 당 헌금의 일부를 추가로 지원해드립니다.
          </p>
        </div>

        {EXTERNAL_PENSION_LIST.map((item) => (
          <PensionProductCard
            key={item.id}
            categoryLabel={item.categoryLabel}
            institutionName={item.institutionName}
            depositAmount={item.depositAmount}
            totalAmount={item.totalAmount}
            monthlyAmount={item.monthlyAmount}
            simpleYield={item.simpleYield}
          />
        ))}

        <PensionActionButton
          text="연금 불러오기"
          onClick={handleClickLoadPension}
        />
      </div>

      <LongButton
        text="하나은행으로 연금 이전하기"
        onClick={handleMoveTransferPage}
      />
    </section>
  );
}
