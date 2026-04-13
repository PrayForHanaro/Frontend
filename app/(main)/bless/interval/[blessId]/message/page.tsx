'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Header from '@/components/ui/cmm/Header';
import Nav from '@/components/ui/cmm/Nav';
import BibleVerseBox from '../../../_components/bible-verse-box';
import BlessActionButton from '../../../_components/bless-action-button';
import MessageTextarea from '../../../_components/message-textarea';
import { getRandomVerse } from '../../../_data/bible-verses';

export default function BlessIntervalMessage() {
  const router = useRouter();
  const [message, setMessage] = useState('');
  const [verse] = useState(getRandomVerse);

  const handleNext = () => {
    router.push('/bless/interval/complete');
  };

  return (
    <div className="relative h-full w-full">
      <div className="flex h-full flex-col overflow-y-auto bg-hana-white-yellow pb-[70px]">
        <Header content="기도 메세지 작성" />
        <div className="flex flex-col gap-6 px-6 pt-8">
          <BibleVerseBox verse={verse} />
          <MessageTextarea value={message} onChange={setMessage} />
        </div>

        <div className="mt-auto px-6 pt-8 pb-6">
          <BlessActionButton onClick={handleNext}>
            다음 단계로
          </BlessActionButton>
        </div>
      </div>
      <Nav />
    </div>
  );
}
