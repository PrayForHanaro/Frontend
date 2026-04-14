'use client';

import { useRouter } from 'next/navigation';
import BlessActionButton from '../../_components/bless-action-button';
import HeartLetterIcon from '../../_components/heart-letter-icon';
import KakaoShareButton from '../../_components/kakao-share-button';

export default function BlessIntervalComplete() {
  const router = useRouter();

  return (
    <div className="flex h-full flex-col bg-hana-bless-bg">
      <div className="flex items-center justify-center py-4">
        <h1 className="font-hana-medium text-gray-900 text-lg">축복보내기</h1>
      </div>

      <div className="flex flex-1 flex-col items-center justify-center gap-8 px-6">
        <HeartLetterIcon />
        <p className="font-hana-bold text-gray-900 text-xl">
          감사한 마음이 잘 전해졌어요.
        </p>
      </div>

      <div className="flex flex-col gap-3 px-6 pb-10">
        <KakaoShareButton />
        <BlessActionButton onClick={() => router.push('/bless/interval')}>
          완료
        </BlessActionButton>
      </div>
    </div>
  );
}
