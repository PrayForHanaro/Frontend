'use client';

import { useRouter } from 'next/navigation';
import BlessActionButton from '../../_components/bless-action-button';
import HeartLetterIcon from '../../_components/heart-letter-icon';
import KakaoShareButton from '../../_components/kakao-share-button';

export default function BlessIntervalComplete() {
  const router = useRouter();

  return (
    <div className="flex min-h-full flex-col bg-hana-white-yellow pb-20">
      <div className="py-4 text-center">
        <span className="font-hana-bold text-hana-main text-sm">
          축복보내기
        </span>
      </div>

      <div className="flex flex-1 flex-col items-center justify-center gap-6 px-6">
        <HeartLetterIcon />
        <h1 className="font-hana-bold text-gray-900 text-xl">
          감사한 마음이 잘 전해졌어요.
        </h1>
      </div>

      <div className="flex flex-col gap-3 px-6 pb-6">
        <KakaoShareButton />
        <BlessActionButton onClick={() => router.push('/bless/interval')}>
          완료
        </BlessActionButton>
      </div>
    </div>
  );
}
