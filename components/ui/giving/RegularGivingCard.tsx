'use client';

import CategoryTag from '../cmm/Activity/Tag';

/**
 * @page: 헌금 - 정기 헌금 여부 카드
 * @description: 정기 헌금 활성화 여부와 출금 정보를 보여주는 카드 컴포넌트입니다.
 * @author: typeYu
 * @date: 2026-04-14
 */

type RegularGivingCardProps = {
  givingType?: string;
  churchName: string;
  amount: number;
  nextWithdrawalDate: string;
  accountName: string;
  accountNumber: string;
  isEnabled: boolean;
  onToggle: () => void;
  onEdit?: () => void;
};

function formatAmount(amount: number) {
  return new Intl.NumberFormat('ko-KR').format(amount);
}

export default function RegularGivingCard({
  givingType = '십일조',
  churchName,
  amount,
  nextWithdrawalDate,
  accountName,
  accountNumber,
  isEnabled,
  onToggle,
  onEdit,
}: RegularGivingCardProps) {
  return (
    <section
      className={`w-full rounded-[2rem] p-6 shadow-sm transition-colors ${
        isEnabled ? 'bg-white' : 'bg-hana-gray-200'
      }`}
    >
      <div className="flex items-start justify-between gap-4">
        <CategoryTag label="교회행사" text={givingType} />

        <button
          type="button"
          role="switch"
          aria-checked={isEnabled}
          aria-label={`정기 헌금 ${isEnabled ? '끄기' : '켜기'}`}
          onClick={onToggle}
          className={`relative flex items-center rounded-full transition-colors ${
            isEnabled ? 'bg-[#53A867]' : 'bg-[#D9D9D9]'
          }`}
          style={{
            width: '48px',
            height: '24px',
            padding: '2px',
          }}
        >
          <span
            className="block rounded-full bg-white transition-transform"
            style={{
              width: '20px',
              height: '20px',
              transform: isEnabled ? 'translateX(24px)' : 'translateX(0)',
            }}
          />
        </button>
      </div>

      <div className="mt-6 flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <strong
            className="font-hana-main text-hana-black"
            style={{ fontSize: '18px', lineHeight: '1.3' }}
          >
            {churchName}
          </strong>
        </div>

        <p
          className="font-hana-main text-hana-black"
          style={{ fontSize: '24px', lineHeight: '1.3' }}
        >
          월 {formatAmount(amount)}
        </p>

        <div
          className="flex flex-col gap-1 font-hana-light text-[#9B9B9B]"
          style={{ fontSize: '14px', lineHeight: '1.4' }}
        >
          <p>다음 출금일: {nextWithdrawalDate}</p>
          <p>
            {accountName} ({accountNumber})
          </p>
        </div>
      </div>

      <button
        type="button"
        aria-label="정기 헌금 정보 수정"
        onClick={onEdit}
        className="mt-6 font-hana-main text-[#24477B]"
        style={{ fontSize: '14px', lineHeight: '1.4' }}
      >
        수정
      </button>
    </section>
  );
}
