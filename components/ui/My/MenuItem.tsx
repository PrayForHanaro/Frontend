'use client';

import type { Route } from 'next';
import Link from 'next/link';

type MenuItemProps = {
  label: string;
  subLabel?: string;
  href?: Route;
  isDanger?: boolean;
};

export default function MenuItem({
  label,
  subLabel,
  href,
  isDanger = false,
}: MenuItemProps) {
  const content = (
    <>
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

      <span className="text-gray-400" aria-hidden="true">
        {'>'}
      </span>
    </>
  );

  if (!href) {
    return (
      <div
        aria-disabled="true"
        className="flex items-center justify-between rounded-xl bg-white px-4 py-4 opacity-60"
      >
        {content}
      </div>
    );
  }

  return (
    <Link
      href={href}
      aria-label={subLabel ? `${label} ${subLabel}` : label}
      className="flex items-center justify-between rounded-xl bg-white px-4 py-4 hover:bg-gray-50"
    >
      {content}
    </Link>
  );
}
