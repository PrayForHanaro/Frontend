'use client';

/**
 * @page: 헌금 - 연금 상품 카드
 * @description: 하나은행 연금 목록과 타은행 연금 목록에서 공통으로 사용하는 카드 컴포넌트입니다.
 * @author: typeYu
 * @date: 2026-04-15
 */

type PensionProductCardProps = {
  categoryLabel: string;
  institutionName: string;
  depositAmount: string;
  totalAmount: string;
  monthlyAmount: string;
  simpleYield: string;
};

export default function PensionProductCard({
  categoryLabel,
  institutionName,
  depositAmount,
  totalAmount,
  monthlyAmount,
  simpleYield,
}: PensionProductCardProps) {
  return (
    <article className="w-full rounded-[1.5rem] bg-white px-4 py-5 shadow-[0_6px_20px_rgba(0,0,0,0.05)]">
      <div className="mb-3">
        <span className="inline-flex rounded-full bg-[#F5EFD9] px-3 py-1 font-hana-main text-[#C7A24D] text-[11px]">
          {categoryLabel}
        </span>
      </div>

      <div className="flex flex-col gap-1">
        <strong className="font-hana-main text-[18px] text-hana-black">
          {institutionName}
        </strong>

        <p className="font-hana-light text-[#9B9B9B] text-[13px]">
          총 납입액: {depositAmount}
        </p>
        <p className="font-hana-light text-[#9B9B9B] text-[13px]">
          총 출금액: {totalAmount}
        </p>
        <p className="font-hana-light text-[#9B9B9B] text-[13px]">
          운용 수익: {monthlyAmount}
        </p>
        <p className="font-hana-light text-[#9B9B9B] text-[13px]">
          단순 수익률: {simpleYield}
        </p>
      </div>
    </article>
  );
}
