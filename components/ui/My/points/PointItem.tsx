import { Gift, Wallet } from 'lucide-react';

type Props = {
  title: string;
  amount: number;
  date: string;
};

export default function PointItem({ title, amount, date }: Props) {
  const isPlus = amount > 0;

  return (
    <div className="flex items-center justify-between rounded-2xl bg-white px-4 py-3 shadow-sm hover:shadow-md transition">
      {/* 왼쪽 */}
      <div className="flex items-center gap-3">
        {/* 아이콘 */}
        <div
          className={`flex h-10 w-10 items-center justify-center rounded-full ${
            isPlus ? 'bg-hana-main/20' : 'bg-hana-badge-red/20'
          }`}
        >
          {isPlus ? (
            <Gift size={18} className="text-hana-linear-deep-green" />
          ) : (
            <Wallet size={18} className="text-hana-badge-red" />
          )}
        </div>

        {/* 텍스트 */}
        <div className="flex flex-col">
          <span className="text-sm font-medium text-gray-800">{title}</span>
          <span className="text-xs text-gray-400">{date}</span>
        </div>
      </div>

      {/* 금액 */}
      <span
        className={`text-base font-semibold ${
          isPlus ? 'text-hana-main' : 'text-red-500'
        }`}
      >
        {isPlus ? '+' : ''}
        {amount.toLocaleString()}P
      </span>
    </div>
  );
}