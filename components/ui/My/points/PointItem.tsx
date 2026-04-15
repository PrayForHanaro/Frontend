type Props = {
  title: string;
  amount: number;
  date: string;
};

export default function PointItem({ title, amount, date }: Props) {
  const isPlus = amount > 0;

  return (
    <div className="rounded-2xl bg-white p-4 shadow flex justify-between items-center">
      <div className="flex flex-col gap-1">
        <span className="text-sm font-medium text-gray-800">{title}</span>

        <span
          className={`text-sm font-semibold ${
            isPlus ? 'text-yellow-500' : 'text-red-500'
          }`}
        >
          {isPlus ? '+' : ''}
          {amount.toLocaleString()}P
        </span>
      </div>

      <span className="text-xs text-gray-400">{date}</span>
    </div>
  );
}