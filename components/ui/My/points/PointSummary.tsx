type Props = {
  totalPoint: number;
};

export default function PointSummary({ totalPoint }: Props) {
  return (
    <div className="flex flex-col items-center">
      <img src="/pointgiving.svg" alt="point" className="mb-0 h-35 w-50" />

      <span className="mt-0 font-extrabold text-3xl text-hana-main">
        {totalPoint.toLocaleString()}P
      </span>
    </div>
  );
}
