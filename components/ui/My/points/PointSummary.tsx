type Props = {
  totalPoint: number;
};

export default function PointSummary({ totalPoint }: Props) {
  return (
    <div className="flex flex-col items-center">
      {/* 👇 그라데이션 영역 */}
      <div className="relative flex items-center justify-center">
        {/* 🌈 그라데이션 배경 */}
        <div className="absolute h-40 w-40 rounded-full bg-gradient-to-r from-green-200 via-green-100 to-transparent blur-2xl" />

        {/* 이미지 */}
        <img
          src="/pointgiving.svg"
          alt="point"
          className="relative z-10 h-35 w-50"
        />
      </div>

      <span className="mt-2 font-extrabold text-3xl text-hana-main">
        {totalPoint.toLocaleString()}P
      </span>
    </div>
  );
}