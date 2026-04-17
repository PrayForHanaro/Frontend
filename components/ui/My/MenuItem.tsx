'use client';

import { useRouter } from 'next/navigation';
import { ChevronRight } from 'lucide-react'; // ChevronRight 아이콘 임포트

type MenuItemProps = {
  label: string;
  subLabel?: string;
  href: string;
  isDanger?: boolean;
  icon?: React.ReactNode;
};

export default function MenuItem({
  label,
  subLabel,
  href,
  isDanger = false,
  icon,
}: MenuItemProps) {
  const router = useRouter();

  return (
    <div
      onClick={() => router.push(href)}
      className="flex cursor-pointer items-center justify-between rounded-xl bg-white px-4 py-4 hover:bg-gray-50 shadow-sm"
    >
      {/* 왼쪽 영역: 아이콘 + (라벨/서브라벨) */}
      <div className="flex items-center gap-3">
        {icon && (
          <div
            className={`flex-shrink-0 ${isDanger ? 'text-red-500' : 'text-hana-bg-green'}`}
          >
            {' '}
            {/* 아이콘 색상 적용 */}
            {icon}
          </div>
        )}

        <div className="flex flex-col">
          <span
            className={`font-hana-main text-[16px] font-medium ${
              isDanger ? 'text-red-500' : 'text-gray-800'
            }`}
          >
            {label}
          </span>

          {subLabel && (
            <span className="text-sm text-gray-400">{subLabel}</span>
          )}
        </div>
      </div>

      {/* 오른쪽 화살표 영역: ChevronRight 아이콘으로 교체 */}
      <div className="text-bg-hana-badge-green">
        {' '}
        {/* 화살표 색상 적용 */}
        <ChevronRight size={20} /> {/* ChevronRight 아이콘 사용 */}
      </div>
    </div>
  );
}