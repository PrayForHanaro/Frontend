import { ChevronRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { RELATION_LABELS } from '../_constants';
import type { BlessTarget } from '../_types';

type TargetListItemProps = {
  target: BlessTarget;
};

export default function TargetListItem({ target }: TargetListItemProps) {
  return (
    <Link
      href={`/bless/interval/${target.id}`}
      className="group relative flex items-center justify-between overflow-hidden rounded-2xl bg-white p-5 shadow-sm transition-all hover:shadow-md active:scale-[0.98]"
    >
      <div className="absolute top-0 left-0 h-full w-1.5 bg-[#F2E5D3]" />
      <div className="flex items-center gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#FFF9F2] shadow-inner">
          <Image src={target.avatar} alt={target.name} width={32} height={32} />
        </div>
        <div className="flex flex-row items-center gap-2">
          <h3 className="font-hana-bold text-hana-dark-navy text-lg transition-colors group-hover:text-hana-mint">
            {target.name} 성도님
          </h3>
          <span className="font-hana-medium text-hana-mint text-sm">
            ({RELATION_LABELS[target.relation]})
          </span>
        </div>
      </div>
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-50 transition-colors group-hover:bg-hana-mint/10">
        <ChevronRight className="h-5 w-5 text-hana-gray-300 group-hover:text-hana-mint" />
      </div>
    </Link>
  );
}
