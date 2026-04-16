'use client';

import { useRouter } from 'next/navigation';

type MenuItemProps = {
  label: string;
  subLabel?: string;
  href: string;
  isDanger?: boolean;
};

export default function MenuItem({
  label,
  subLabel,
  href,
  isDanger = false,
}: MenuItemProps) {
  const router = useRouter();

  return (
    <div
      onClick={() => router.push(href)}
      className="flex cursor-pointer items-center justify-between rounded-xl bg-white px-4 py-4 hover:bg-gray-50"
    >
      <div className="flex flex-col">
        <span
          className={`font-hana-main text-[16px] ${
            isDanger ? 'text-red-500' : 'text-gray-800'
          }`}
        >
          {label}
        </span>

        {subLabel && <span className="text-gray-400 text-sm">{subLabel}</span>}
      </div>

      <span className="text-gray-400">{'>'}</span>
    </div>
  );
}
