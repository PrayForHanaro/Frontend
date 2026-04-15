'use client';

import { useRouter } from 'next/navigation';

type MenuItemProps = {
  label: string;
  subLabel?: string;
  href: string;
};

export default function MenuItem({ label, subLabel, href }: MenuItemProps) {
  const router = useRouter();

  return (
    <div
      onClick={() => router.push(href)}
      className="flex items-center justify-between rounded-xl bg-white px-4 py-4 cursor-pointer hover:bg-gray-50"
    >
      <div className="flex flex-col">
        <span className="font-hana-main text-[16px] text-gray-800">
          {label}
        </span>
        {subLabel && <span className="text-sm text-gray-400">{subLabel}</span>}
      </div>

      <span className="text-gray-400">{'>'}</span>
    </div>
  );
}