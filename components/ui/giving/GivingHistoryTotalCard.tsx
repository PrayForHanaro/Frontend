interface GivingHistoryTotalCardProps {
  totalAmount: number;
  points?: number;
  nextPaymentDate?: string;
}

import { formatCurrency } from '@/lib/formatters';

export default function GivingHistoryTotalCard({
  totalAmount,
  points = 0,
  nextPaymentDate = '',
}: GivingHistoryTotalCardProps) {
  const formattedAmount = totalAmount.toLocaleString('ko-KR');

  return (
    <div className="w-full rounded-3xl bg-gradient-to-br from-hana-linear-deep-green-end to-hana-linear-deep-green p-6 text-white">
      <h3 className="font-semibold text-lg">총 헌금액</h3>

      <div className="mt-4 font-bold text-3xl">₩{formattedAmount}</div>

      {points > 0 && (
        <div className="mt-2 text-s text-white/70">
          {formatCurrency(points)} 포인트 사용
        </div>
      )}

      {nextPaymentDate && (
        <div className="mt-3 text-white/80 text-xs">
          다음 납부일: {nextPaymentDate}
        </div>
      )}
    </div>
  );
}
