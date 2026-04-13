'use client';

import { ChevronRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import type { BlessTarget } from '../_types';

type TargetListItemProps = {
  target: BlessTarget;
};

export default function TargetListItem({ target }: TargetListItemProps) {
  return (
    <Link
      href={`/bless/interval/${target.id}`}
      className="flex items-center gap-4 border-hana-gray-300 border-b px-5 py-4 transition-colors active:bg-hana-gray-100"
    >
      <Image
        src={target.avatar}
        alt={target.name}
        width={40}
        height={40}
        className="size-10 rounded-full object-contain"
      />
      <span className="flex-1 font-hana-medium text-base text-gray-900">
        {target.name} ({target.relation})
      </span>
      <ChevronRight className="size-5 text-hana-gray-400" />
    </Link>
  );
}
