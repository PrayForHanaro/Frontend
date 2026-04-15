interface GivingHistoryTotalCardProps {
  totalAmount: number;
  points?: number;
  nextPaymentDate?: string;
}

export default function GivingHistoryTotalCard({
  totalAmount,
  points = 0,
  nextPaymentDate = '',
}: GivingHistoryTotalCardProps) {
  const formattedAmount = totalAmount.toLocaleString('ko-KR');

  return (
    <div className="w-full rounded-3xl bg-gradient-to-br from-hana-checkin-green-b to-hana-checkin-green-t p-6 text-white">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-lg">총 헌금액</h3>
        {points > 0 && (
          <div className="rounded-full bg-white px-3 py-1 font-bold text-hana-checkin-green-b text-sm">
            +{points}P
          </div>
        )}
      </div>

      <div className="mt-4 font-bold text-3xl">₩{formattedAmount}</div>

      {nextPaymentDate && (
        <div className="mt-3 text-white/80 text-xs">
          다음 납부일: {nextPaymentDate}
        </div>
      )}
    </div>
  );
}
