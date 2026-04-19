'use client';

import { useRouter } from 'next/navigation';
import Nav from '@/components/ui/cmm/Nav';
import BlessActionButton from '../../_components/bless-action-button';
import HeartLetterIcon from '../../_components/heart-letter-icon';

export default function BlessIntervalComplete() {
  const router = useRouter();

  return (
    <div className="relative h-full w-full overflow-hidden">
      <div className="scrollbar-hide h-full overflow-y-auto bg-hana-bless-bg px-4 pb-24">
        <div className="flex items-center justify-center py-4">
          <h1 className="font-hana-medium text-gray-900 text-lg">축복보내기</h1>
        </div>

        <div className="flex flex-col items-center justify-center gap-8 pt-20">
          <HeartLetterIcon />
          <p className="font-hana-bold text-gray-900 text-xl">
            감사한 마음이 잘 전해졌어요.
          </p>
        </div>

        <div className="mt-10 px-2">
          <BlessActionButton onClick={() => router.push('/bless/interval')}>
            완료
          </BlessActionButton>
        </div>
      </div>
      <Nav />
    </div>
  );
}
