'use client';

import { ChevronRight } from 'lucide-react';
import type { Route } from 'next';
import { useRouter } from 'next/navigation';

type MenuItemProps = {
  label: string;
  subLabel?: string;
  href: Route;
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

  const normalizedLabel = label.replace(/\s/g, '');
  const displayLabel = label.trim();

  function handleMove() {
    router.push(href);
  }

  return (
    <button
      type="button"
      onClick={handleMove}
      className="box-border flex w-full appearance-none items-center justify-between rounded-xl border-0 bg-white px-4 py-4 text-left"
      aria-label={displayLabel}
    >
      <div className="flex min-w-0 flex-1 items-center gap-3">
        {icon ? (
          <div
            className={`mr-1 flex size-10 shrink-0 items-center justify-center rounded-xl ${
              isDanger ? 'text-red-500' : 'text-gray-500'
            }`}
          >
            {icon}
          </div>
        ) : null}

        <div className="flex min-w-0 flex-col items-start">
          <span
            className={`font-hana-main text-[18px] ${'font-medium'} ${isDanger ? 'text-red-500' : 'text-gray-800'}`}
          >
            {displayLabel}
          </span>

          {subLabel ? (
            <span className="font-hana-light text-[14px] text-gray-400">
              {subLabel}
            </span>
          ) : null}
        </div>
      </div>

      <div className="ml-3 shrink-0 text-gray-400">
        <ChevronRight size={20} />
      </div>
    </button>
  );
}
