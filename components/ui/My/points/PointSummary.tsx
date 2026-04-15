type Props = {
  totalPoint: number;
  count: number;
};

export default function PointSummary({ totalPoint, count }: Props) {
  return (
    <div className="flex flex-col items-center gap-3 py-6">
      <img src="/pointgiving.svg" alt="point" className="w-50 h-50" />

      <span className="text-3xl font-extrabold text-green-600">
        {totalPoint.toLocaleString()}P
      </span>

      <span className="text-sm text-gray-500">포인트 내역 총 {count}건</span>
    </div>
  );
}