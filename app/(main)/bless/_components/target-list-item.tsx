'use client';

import { ChevronRight, CircleUserRound } from 'lucide-react';
import Link from 'next/link';
import type { BlessTarget } from '../_types';

type TargetListItemProps = {
  target: BlessTarget;
};

export default function TargetListItem({ target }: TargetListItemProps) {
  return (
    <Link
      href={`/bless/interval/${target.id}`}
      className="flex items-center gap-4 border-hana-gray-200 border-b px-4 py-4 transition-colors active:bg-hana-gray-100"
    >
      <CircleUserRound className="size-10 text-hana-gray-400" />
      <span className="flex-1 font-hana-medium text-base text-gray-900">
        {target.name} ({target.relation})
      </span>
      <ChevronRight className="size-5 text-hana-gray-400" />
    </Link>
  );
}
